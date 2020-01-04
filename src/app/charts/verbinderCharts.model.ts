export class verbinderCharts{

    verbinderCharts = {
 title : {
        text: '',
        top:'',
        left:15,
        textStyle:{
            fontSize:13,
        }
    },
    color: [],
    legend:{
        // data:[]
    },
    tooltip : {
        trigger: 'axis'
    },
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
            colorAlpha: 0.1
        },
        // brushStyle: {
        //     borderWidth: 2,
        //     color: 'rgba(0,0,0,0.2)',
        //     borderColor: 'rgba(0,0,0,0.5)',
        // },
        throttleType: 'debounce',
        throttleDelay: 300,
        
    },
    dataZoom:[{
　　　　type:"inside"
 　　　}],
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine:{
                lineStyle:{
                    // color:'#4a4a4a'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#edf0f2'],
                    type:'solid',
                    width:1
                }
            },
            axisLabel : {//Y轴字体颜色
                color:'#4a4a4a',
                textStyle:{
                    fontSize:'0.648vmin'
                }
            },
            axisTick:{//X轴刻度颜色
                lineStyle:{
                    color:'#edf0f2'
                }
            },
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine:{
                lineStyle:{
                    // color:'#4a4a4a'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#edf0f2'],
                    type:'solid',
                    width:1
                }
            },
            axisLabel : {//Y轴字体颜色
                color:'#4a4a4a',
                textStyle:{
                    fontSize:'0.648vmin'
                }
            },
            axisTick:{//Y轴刻度颜色
                lineStyle:{
                    color:'#edf0f2'
                }
            }
        }
    ],
    series : [],
    grid : {}
}
}