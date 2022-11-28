// eslint-disable-next-line no-unused-vars
const getOption = function (userInfo, config) {
    let data = dealData(userInfo)
    let option = {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        yAxis: {
            type: 'category',
            axisLine: {
                show: false //坐标线
            },
            axisTick: {
                show: false //小横线
            },
            axisLabel: {
                color: '#090909', //坐标轴字颜色
                fontWeight: '300',
                fontSize: 10
            },
            data: data.xData,
        },

        xAxis: {
            show: false,
        },
        grid: {
            top: '40',
            right: '50',
            left: '80',
            bottom: '40' //图表尺寸大小
        },
        // animationDuration: function (idx) {
        //                 // 越往后的数据时长越大
        //                 return idx * 9000;
        //             },
        animationDuration: 2000,
        series: [{
            /* data: [120, 200, 150, 80, 70, 110, 130], */
            type: 'bar',
            barWidth: '10px',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.4)',
                barBorderRadius: [30, 30, 30, 30] //圆角大小
            },
            label: {
                show: true,
                position: 'right' //每一条的数据位置

            },
            itemStyle: {
                normal: {
                    color: (params) => {
                        let colors = ['#4956ff', '#2d82ff', '#2dc6ff', '#2fca95', '#4956ff', '#2d82ff', '#2dc6ff', '#2fca95']
                        return colors[params.dataIndex]
                    }, //每个数据的颜色
                    barBorderRadius: [30, 30, 30, 30], //圆角大小
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 103, 255, 0.2)',
                    shadowOffsetX: -5,
                    shadowOffsetY: 5,

                },
            },
            data: data.yData
        }]
    }
    return option

}
const dealData = function (typeInfo) {
    let data = typeInfo.tlist
    let sum = 0
    let xData = []
    let yData = []
    let other = {name: '其他', value: 0}
    for (let key in data) {
        let count = data[key].count
        sum += count
    }
    for (let key in data) {
        let name = data[key].name
        if (data[key].count === 1) {
            other.value += 1
            continue
        }
        let count = data[key].count / sum * 100
        count = count.toFixed(2)//保留两位小数
        xData.push(name)//标签
        yData.push({value: count})//占比
    }
    other.value /= sum
    other.value *= 100
    other.value = other.value.toFixed(2)
    xData.push(other.name)
    yData.push({value: other.value})
    return {xData, yData}
}
export {getOption, dealData}