$(document).ready(function(){
            var count = 0;
            var options = {
                chart: {
                    renderTo : 'container',
                    type: 'line',
                    //plotBorderWidth: 1,
                    zoomType: 'xy'
                },
                title: {
                    text: 'x-y展示数据图',
                    x: -20 //center
                },
                xAxis: {
                    title: {
                        text: 'y坐标(米)'
                    }
                },
                yAxis: {
                    title: {
                        text: 'x坐标(米)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter:function(){
                        if( this.point.extra2 == 'END' ){
                            return '<b>' + this.series.name + '</b>:<br/> x=' + (this.x+this.point.extra3) + '米,y=' + this.y + '米<br/> ' +this.point.extra;}
                        else{
                            return '<b>' + this.series.name + '</b>:<br/> x=' + this.x + '米,y=' + this.y + '米<br/> ' +this.point.extra;
                    }}
                },
                credits: {
                    enabled:false
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: '实际值',
                    data: [
                    ]
                }]
        }
         drawChartCompare(options);
        });
function drawChart(options){
    var chart;
    var amount_x=[0,2,2,4,4,6,6,8,8,10];
    var amount_y=[0,2,2,4,4,6,6,8,8,10];
    var amount_nodeID = [101,101,102,102,103,103,104,104,105,105];
    var type = 'GP-L';
    var ratio1 = Math.abs(amount_x[amount_x.length-1]-amount_x[0])/100;
    var axis = 'z';
    var series = '测量值';
    if(axis == 'z'){
        options.title.text = 'x-z展示数据图';
        options.xAxis.title.text = 'z坐标(米)'
    }
    else{
        options.title.text = 'x-y展示数据图';
        options.xAxis.title.text = 'y坐标(米)'
    }
    if(series == '实际值')
        options.series[0].name = '实际值';
    else
        options.series[0].name = '测量值';
    for(var i=0;i<amount_x.length;i++) {
        if(i%2 == 1) {
            var obj = {
                x: (amount_x[i] - ratio1),
                y: amount_y[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio1
            };
        }
        else {
            var obj = {
                x: amount_x[i],
                y: amount_y[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio1
            };
        }
        options.series[0].data.push(obj);

    }
    chart = new Highcharts.Chart(options);
}
function drawChartCompare(options){
    var chart;
    var amount_x=[0,2,2,4,4,6,6,8,8,10];
    var amount_y=[0,2,2,4,4,6,6,8,8,10];
    var amount_nodeID = [101,101,102,102,103,103,104,104,105,105];
    var type = 'GP-L';
    var amount_x2=[1.5,3.5,3.5,5.5,5.5,7.5,7.5,9.5,9.5,11.5,11.5,13.5];
    var amount_y2=[1.5,4.5,4.5,5.2,5.2,7.0,7.0,10.6,10.6,11.1,11.1,13.5];
    var ratio1 = Math.abs(amount_x[amount_x.length-1]-amount_x[0])/100;
    var ratio2 = Math.abs(amount_x2[amount_x2.length-1]-amount_x2[0])/100;
    var axis = 'z';
    if(axis == 'z'){
        options.title.text = 'x-z展示数据图';
        options.xAxis.title.text = 'z坐标(米)'
    }
    else{
        options.title.text = 'x-y展示数据图';
        options.xAxis.title.text = 'y坐标(米)'
    }
    var series = {
        name: '测量值',
        data: []
    }
    options.series[0].name = '实际值';
    options.series.push(series);
    for(var i=0;i<amount_x.length;i++) {
        if(i%2 == 1) {
            var obj = {
                x: (amount_x[i] - ratio1),
                y: amount_y[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio1
            };
            var obj2 = {
                x: (amount_x2[i] - ratio2),
                y: amount_y2[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio2
            };
        }
        else {
            var obj = {
                x: amount_x[i],
                y: amount_y[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio1
            };
            var obj2 = {
                x: amount_x2[i],
                y: amount_y2[i],
                extra: type + ' ' + amount_nodeID[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio2
            };
        }
        options.series[0].data.push(obj);
        options.series[1].data.push(obj2);

    }
    chart = new Highcharts.Chart(options);
}