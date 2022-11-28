// eslint-disable-next-line no-unused-vars
const getOption = function (userInfo,config){
    let data = dealData(userInfo)
    let option = {
        title: {
            text: '第' + data.rank +'名（超过 '+ data.followerpercent +'% 达人）',
            textStyle:{
                fontWeight:300,
                fontSize:15
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid:{
            left:0,
            bottom:0
        },
        xAxis: {
            data: data.xData,
            show:false
        },
        yAxis: {
        },
        series: [{
            name: '排名',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbolSize: 1,
            data: data.yData
        }]
    }
    return option
}
const dealData = function (userInfo){
    /*
    * 处理数据，返回option需要的数据
    * @param option : 传递的是一个userInfo
    * :return {xData,yData}
    * */
    let rankInfo = userInfo.rankinfo
    let xData = []//x轴数据
    let yData = []//y轴数据
    let followerpercent = rankInfo.rank_info[0].followerpercent//粉丝
    let rank = rankInfo.rank_info[0].count//排名
    for(let i = 0; i<rankInfo.rank_info.length;i++){
        let rankInfoItem = rankInfo.rank_info[i]
        xData.push(rankInfoItem.ddate)
        yData.push(rankInfoItem.count)
    }
    xData = xData.reverse()
    yData = yData.reverse()
    return {xData,yData,followerpercent,rank}
}
export {getOption,dealData}