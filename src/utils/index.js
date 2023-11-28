/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 更简单的写法
/**
 * list transListToTreeData
 */
export function transListToTreeData(list,pid){
  // arr是整合后的所有内容
  const arr = []

  list.forEach(item=>{
    // 遍历传入的数据
    if (item.pid == pid){
      // 找到了匹配的菜单
      arr.push(item)
      // 传入数据和父菜单的id,就可以找到对应的子菜单
      const children = transListToTreeData(list,item.id);
      item.children = children;
    }
  })
  return arr;
}

 // 递归数组,拿到数据
 /**
  * list to tree
  * @param {} tree 
  * @param {*} pid 
  * @returns 
  */
export function getTreeList(tree, pid) {
  // pid与父级id是相同的,我们需要先拿到一级菜单的内容
  let oneMenu = [];
  tree.forEach((item) => {
    if (item.pid == pid) {
      // 添加到一级菜单中
      oneMenu.push(item);
    }
  });
  // 拿到一级菜单后,遍历并递归原数组,并让pid变为一级菜单的id
  oneMenu.forEach((item) => {
    // 拿到一级菜单中的每一项
    // 对其进行递归,传入总菜单和对应的id,因为id所对应的就是其子菜单的pid
    // 这时候,二次递归,就会拿到对应的所有二级菜单
    let backMenu = this.getTreeList(tree, item.id);
    item.children = backMenu;
  });
  return oneMenu;
}