const DEBUG_LOCAL_KEY = `DEBUG_LOCAL_KEY`

export const comlibDebugUtils = {
  get() {
    const res = localStorage.getItem(DEBUG_LOCAL_KEY) || "[]"
    let comlib = JSON.parse(res)
    if (!Array.isArray(comlib) || comlib.length === 0) {
      comlib = [{
        key: 'mybricks.normal-pc',
        value: ' http://localhost:20000/comlib.js',
        checked: false,
      }, {
        key: 'mmybricks.basic-comlib',
        value: ' http://localhost:20001/comlib.js',
        checked: false,
      }]
    }
    return comlib
  },
  set(val) {
    localStorage.setItem(DEBUG_LOCAL_KEY, JSON.stringify(val))
  }
}

export const checkIfDebugComlib = () => {
  return window.location.search.indexOf(`debug`) !== -1
}

export const replaceComlib = (originComlibs: any[], targetComlibs: any[]) => {
  if (!Array.isArray(targetComlibs)) {
    console.error(`replaceComlib: targetComlibs is not an array`)
    return originComlibs
  }
  return originComlibs.map((comlib) => {
    if (!comlib.namespace) {
      return comlib
    }
    const lib = targetComlibs.find(item => item.key === comlib.namespace && item?.checked)
    return lib?.value || comlib
  })
}