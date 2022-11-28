const getOption = function(optionData,config){
    /*
    * @param optionData 可视化数据
    * @param config.color 线条颜色
    * @param config.text  可视化图像标题
    * */
    let color = [config.color];
    let ec_tool_option = {
        title: {
            // text: config.text,
            textStyle:{
                fontSize:15,
                fontWeight:300
            }
        },
        tooltip: {
            trigger: 'axis',
            show:true,
//      formatter:"日期:{b}<br />体温异常:{c}人",
            axisPointer:{
                type:"cross",
                show:true,
                //animation:true,
                crossStyle:{
                    type:"dotted",
                }
            }
        },
        toolbox:{
            show:true,
            showTitle:true,
            feature:{
                magicType:{
                    type:["bar","line","stack","tiled"],
                },
                dataZoom:{
                    show:true,
                }
            },
        },
        legend: {
            data: [config.text],
            textStyle:{
                fontWeight:300,
                fontSize:14
            }
        },
        grid: {
            left: '4%',
            right: '6%',
            bottom: '4%',
            top:50,
            containLabel: true
        },


        splitLine:{
            show:true,
            lineStyle:{
                color:'#17273b',
                width:1,
                // type:'solid',
            }
        },
        xAxis: {
            axisLine:{
                lineStyle:{
                    //color:'#222222',
                    width:1
                }
            },
            axisPointer:{
                //show:true,
            },
            axisLabel: {
                interval:30,//横轴信息全部显示
                color: '#1f1f1d',
                fontSize: 12,
                fontWeight:300
                //rotate: 60
            },
            type: 'category',
            data: optionData.xData //x轴数据
        },
        yAxis: {
            axisLine:{
                lineStyle:{
                    //color:'#222222',
                    // width:1
                }
            },
            axisPointer:{
                //type:"cross",
                //show:true,
            },
            type: 'value',
            axisLabel: {
                show: true,
                //color: '#CACCC1',
                fontSize: 12,
            },
            splitLine: {
                show: true,
                //  改变轴线颜色
                lineStyle: {
                    // 使用深浅的间隔色
                    //color: ['black'],
                    width:1
                }
            },
        },
        series: [
            {
                name:config.text,
                data: optionData.yData,
                type: 'line',
                smooth:true,
                lineStyle: {
                    normal: {
                        color: color[0],
                    }
                },
                itemStyle:{
                    color: color[0]
                },
                effect:{
                    show:true
                }
            }
        ]
    };
    return ec_tool_option
}
export default getOption