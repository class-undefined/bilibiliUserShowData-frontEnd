const signal = {
    UPDATE:"upDate",//更新数据
    SEARCH:"searching",
    SEARCHED:"searchDone"
}
const LOAD = {
    SEARCHING:"正在搜索...",
    LOADING:"正在加载...",
    UPDATE:"正在获取数据",
    SEARCHED:"搜索完毕",
    SEARCHED_FAIL:"获取结果失败",
    STATE_SUC:false,//成功状态
    STATE_DOING:true,//正在进行的状态
    STATE_FAIL:false
}
export default signal
export {signal,LOAD}