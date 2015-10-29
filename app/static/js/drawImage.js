
//$(document).ready(function(){
//    console.log("111111111111");
//            var count = 0;
//
//            var options = {
//                chart: {
//                    renderTo : 'container',
//                    type: 'line',
//                    //plotBorderWidth: 1,
//                    zoomType: 'xy'
//                },
//                title: {
//                    text: 'x-y展示数据图',
//                    x: -20 //center
//                },
//                xAxis: {
//                    title: {
//                        text: 'y坐标(米)'
//                    }
//                },
//                yAxis: {
//                    title: {
//                        text: 'x坐标(米)'
//                    },
//                    plotLines: [{
//                        value: 0,
//                        width: 1,
//                        color: '#808080'
//                    }]
//                },
//                tooltip: {
//                    formatter:function(){
//                        if( this.point.extra2 == 'END' ){
//                            return '<b>' + this.series.name + '</b>:<br/> x=' + (this.x+this.point.extra3) + '米,y=' + this.y + '米<br/> ' +this.point.extra;}
//                        else{
//                            return '<b>' + this.series.name + '</b>:<br/> x=' + this.x + '米,y=' + this.y + '米<br/> ' +this.point.extra;
//                    }}
//                },
//                credits: {
//                    enabled:false
//                },
//                legend: {
//                    layout: 'vertical',
//                    align: 'right',
//                    verticalAlign: 'middle',
//                    borderWidth: 0
//                },
//                series: [{
//                    name: '实际值',
//                    data: [
//                    ]
//                }]
//        }
//        var options2 = {
//                chart: {
//                    renderTo : 'container2',
//                    type: 'line',
//                    //plotBorderWidth: 1,
//                    zoomType: 'xy'
//                },
//                title: {
//                    text: 'x-y展示数据图',
//                    x: -20 //center
//                },
//                xAxis: {
//                    title: {
//                        text: 'y坐标(米)'
//                    }
//                },
//                yAxis: {
//                    title: {
//                        text: 'x坐标(米)'
//                    },
//                    plotLines: [{
//                        value: 0,
//                        width: 1,
//                        color: '#808080'
//                    }]
//                },
//                tooltip: {
//                    formatter:function(){
//                        if( this.point.extra2 == 'END' ){
//                            return '<b>' + this.series.name + '</b>:<br/> x=' + (this.x+this.point.extra3) + '米,y=' + this.y + '米<br/> ' +this.point.extra;}
//                        else{
//                            return '<b>' + this.series.name + '</b>:<br/> x=' + this.x + '米,y=' + this.y + '米<br/> ' +this.point.extra;
//                    }}
//                },
//                credits: {
//                    enabled:false
//                },
//                legend: {
//                    layout: 'vertical',
//                    align: 'right',
//                    verticalAlign: 'middle',
//                    borderWidth: 0
//                },
//                series: [{
//                    name: '实际值',
//                    data: [
//                    ]
//                }]
//        }
//         drawChartCompare(options);
//         drawChart(options2);
//        });
function drawChart(options, amount_x, amount_y, amount_nodeID, type, axis, series){
    var chart;
    //console.log("111111111111");
    //console.log("x = "+amount_x);
    //console.log("y = "+amount_y);
    //console.log("nodeid = "+amount_nodeID);
    //console.log("type = "+type);
    //console.log("axis = "+axis);
    //console.log("series = " + series);
    var x = [];
    var y = [];
    var id = [];
    //console.log("amount_x.length"+amount_x.length);
    for (var i = 0; i< amount_x.length; i++) {

        x.push(parseFloat(amount_x[i]));
        y.push(parseFloat(amount_y[i]));
        id.push(parseFloat(amount_nodeID[i]));
    }
    //console.log(x);
    //console.log(y);
    //console.log(id);
    //console.log(x);
    //console.log(parseFloat(amount_x));
    //var amount_x=[0,2,2,4,4,6,6,8,8,10];
    //var amount_y=[0,2,2,4,4,6,6,8,8,10];
    //var amount_nodeID = [101,101,102,102,103,103,104,104,105,105];
    //var type = 'GP-L';
    var ratio1 = Math.abs(x[x.length-1]-x[0])/70;
    //var axis = 'z';
    //var series = '测量值';
    if (series == "setup")
        series = '实际值';
    else
        series = '测量值';

    if(axis == 'z'){
        options.title.text = 'x-z展示数据图';
        options.yAxis.title.text = 'z坐标(米)'
    }
    else{
        options.title.text = 'x-y展示数据图';
        options.yAxis.title.text = 'y坐标(米)'
    }
    if(series == '实际值')
        options.series[0].name = '实际值';
    else
        options.series[0].name = '测量值';
    for(var i=0;i<x.length;i++) {
        if(i%2 == 1) {
            var obj = {
                x: (x[i] - ratio1),
                y: y[i],
                extra: type + ' ' + id[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio1
            };
        }
        else {
            var obj = {
                x: x[i],
                y: y[i],
                extra: type + ' ' + id[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio1
            };
        }
        options.series[0].data.push(obj);

    }
    console.log("options = "+options);
    chart = new Highcharts.Chart(options);
    console.log("chart = "+chart);
}
function drawChartCompare(options,amount_x, amount_y, amount_nodeID, type, amount_x2, amount_y2, axis){
    var chart;
    var x = [];
    var y = [];
    var x2 = [];
    var y2 = [];
    var id = [];
    for (var i = 0; i< amount_x.length; i++) {

        x.push(parseFloat(amount_x[i]));
        y.push(parseFloat(amount_y[i]));
        x2.push(parseFloat(amount_x2[i]));
        y2.push(parseFloat(amount_y2[i]));
        id.push(parseFloat(amount_nodeID[i]));
    }
    console.log("amount_x2[i]="+x2);
    console.log("amount_y2[i]="+y2);
    //var amount_x=[0,2,2,4,4,6,6,8,8,10];
    //var amount_y=[0,2,2,4,4,6,6,8,8,10];
    //var id = [101,101,102,102,103,103,104,104,105,105];
    //var type = 'GP-L';
    //var amount_x2=[1.5,3.5,3.5,5.5,5.5,7.5,7.5,9.5,9.5,11.5,11.5,13.5];
    //var amount_y2=[1.5,4.5,4.5,5.2,5.2,7.0,7.0,10.6,10.6,11.1,11.1,13.5];
    var ratio1 = Math.abs(x[x.length-1]-x[0])/70;
    var ratio2 = Math.abs(x2[x2.length-1]-x2[0])/70;
    //var axis = 'z';
    if(axis == 'z'){
        options.title.text = 'x-z展示数据图';
        options.xAxis.title.text = 'z坐标(米)';
    }
    else{
        options.title.text = 'x-y展示数据图';
        options.xAxis.title.text = 'y坐标(米)';
    }
    var series = {
        name: '测量值',
        data: []
    }
    options.series[0].name = '实际值';
    options.series.push(series);
    for(var i=0;i<x.length;i++) {
        if(i%2 == 1) {
            var obj = {
                x: (x[i] - ratio1),
                y: y[i],
                extra: type + ' ' + id[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio1
            };
            var obj2 = {
                x: (x2[i] - ratio2),
                y: y2[i],
                extra: type + ' ' + id[i] + ' ' + '-END',
                extra2: 'END',
                extra3: ratio2
            };
        }
        else {
            var obj = {
                x: x[i],
                y: y[i],
                extra: type + ' ' + id[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio1
            };
            var obj2 = {
                x: x2[i],
                y: y2[i],
                extra: type + ' ' + id[i] + ' ' + '-BEGIN',
                extra2: 'BEGIN',
                extra3: ratio2
            };
        }
        options.series[0].data.push(obj);
        options.series[1].data.push(obj2);

    }
    chart = new Highcharts.Chart(options);
}
/*画控制线中xy图：*/
//function Draw2d_xy(a,b,c,e,mc,ic){
//        ic.clearRect(0, 0, mc.width, mc.height);
//        //ic.translate(0.5, 0.5);
//        var x = mc.width - 50;//设定画笔所在层面的宽度 x轴的长度
//        var y = mc.height - 15;//获取可视高度
//        var kx = (x - 50) / a[a.length - 1];
//        if(b[b.length - 1] == 0)
//            var ky = (y - 15) / 1;
//        else
//            var ky = (y - 15) / b[b.length - 1];
//        //GP-...
//        for (i = 0; i < a.length; i++) {
//            ic.fillStyle = '#A9A9A9';
//            ic.font = "10pt Arial";
//            ic.save();
//
//            if(y - (b[i] * ky)+90 >235)
//                ic.translate(50 + a[i] * kx + 5, 235);
//            else{
//                ic.translate(50 + a[i] * kx + 5,y - (b[i] * ky)+50);
//                if(i ==0 ){
//                    console.log(y - (b[i] * ky)+50);
//                }
//                }
//
//            ic.rotate(Math.PI*3/2);
//            var n = i%2;
//            if(n == 1){
//                ic.translate(0,-15);
//                ic.fillText(e+' '+c[i]+' END',0,0);
//            }
//            if(n == 0){
//                ic.translate(0,15);
//                ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//            }
//            ic.restore();
//        }
//
//        ic.beginPath();//开始作画
//        ic.strokeStyle = "#000000";//曲线的颜色
//
//
//
//        ic.moveTo(50, 5);//y最大值
//        ic.lineTo(50, y);//画y轴
//        ic.lineTo(x + 20, y);//x轴
//        ic.stroke();
//        ic.beginPath();
//        //ic.moveTo(50, y);//移动到圆点
//
//        //顶点上数字的颜色大小等
//        ic.font = "10pt Arial";
//        ic.textAlign = "center";
//        ic.lineWidth = 2;
//
//        //第一条线
//        for (i = 0; i < a.length; i++) {
//            ic.strokeStyle = "#32AE95";
//            //将10个点以此画到画布上
//            if(i%2 == 0)
//                ic.moveTo(50 + a[i] * kx, y - (b[i] * ky));
//            else
//                ic.lineTo(50 + a[i] * kx, y - (b[i] * ky));
//            //字体为橙色
//            ic.fillStyle = "#FFA500";
//            //在点上写出节段号
//            if(i%2 == 0)
//                ic.fillText(c[i], 50 + a[i] * kx, y - (b[i] * ky)-3);
//            if(i == a.length-1){
//                ic.fillText(Math.abs(c[i])+1, 50 + a[i] * kx, y - (b[i] * ky)-3);
//            }
//
//            //取中点 标注E.. 白色
//            if (i%2==1) {
//                ic.fillStyle = "#000000";
//                ic.fillText('E' + c[i], 50 + a[i-1] * kx + ((50 + a[i] * kx) - (50 + a[i-1] * kx)) / 2, y - ((b[i] * ky) + (b[i - 1] * ky)) / 2-5);
//            }
//        }
//        ic.stroke();
//
//
//        ic.beginPath();
//        for(i=0;i< a.length;i++){
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y-(b[i]*ky),4,0,2*Math.PI,true);
//            ic.fillStyle = '#ffffff';
//            ic.fill();
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y-(b[i]*ky),3,0,2*Math.PI,true);
//            ic.fillStyle = '#32AE95';
//            ic.fill();
//        }
//
//        ic.beginPath();
//        ic.lineWidth = 1;
//        for(ly=0;ly< a.length;ly++){
//            //绘制坐标轴上的坐标
//            ic.font = "10pt Arial";
//            ic.fillStyle = "#000000";
//            ic.strokeStyle = "#000000";
//
//
//            if(ly==0){
//                ic.fillText(a[ly], a[ly] * kx+55, y+13);//圆点时月份右移，下移，展现出“0”//有bug，不能显示0.000
//            }else{
//                ic.fillText(a[ly], a[ly] * kx+50, y+13);//x轴上的数字
//                ic.moveTo(a[ly] * kx+50,y-2);
//                ic.lineTo(a[ly] * kx+50,y+1);
//
//                ic.fillText(b[ly], 30, y-(b[ly]*ky));//y轴上的数字
//                ic.moveTo(49,y-(b[ly]*ky));
//                ic.lineTo(52,y-(b[ly]*ky));
//            }
//        }
//
//        //填写坐标轴属性
//        ic.font = "10pt Arial";
//        ic.fillStyle = "##000000";
//        ic.fillText('x', x + 10, y - 10);
//        ic.fillText('y', 60, 10);
//        ic.stroke();
//    }
//
//
///*画控制线中xz图：*/
//    function Draw2d_xz(a,b,c,e,mc,ic) {
//     /*  alert(b.length);
//        var b = new Array(0.000,0.2,0.8,-0.8);*/
//        ic.clearRect ( 0, 0 , 800 , 250 );//清除画布
//        //ic.translate(0.5, 0.5);
//        var x = mc.width - 50;//设定画笔所在层面的宽度 x轴的长度
//        var y = mc.height - 15;//获取可视高度
//
//        var num = Math.abs(b[0]);
//        var max = num;
//        for(i = 1; i < b.length; i++){
//            num = Math.abs(b[i]);
//            var max = num;
//            if(max < num)
//                max = num;
//        }
//        if(max == 0){
//            max = 1;
//        }
//        var kx = (x - 50) / a[a.length - 1];
//        var ky = (y - 15) / max*0.4;
//        //GL-...
//        for (i = 0; i < a.length; i++) {
//            ic.fillStyle = '#A9A9A9';
//            ic.font = "10pt Arial";
//            ic.save();
//
//            if(y/2 - (b[i] * ky)+50 >235)
//                ic.translate(50 + a[i] * kx+5,235);
//            else
//                ic.translate(50 + a[i] * kx+5,y/2 - (b[i] * ky)+50);
//
//            ic.rotate(Math.PI*3/2);
//            var n = i%2;
//            if(n == 1){
//                ic.translate(0,-15);
//                ic.fillText(e+' '+c[i]+' END',0,0);
//            }
//            if(n == 0){
//                ic.translate(0,15);
//                ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//            }
//            ic.restore();
//        }
//
//        ic.beginPath();//开始作画
//        ic.strokeStyle = "#000000";//曲线的颜色
//
//        ic.moveTo(50, 5);//y最大值
//        ic.lineTo(50, y);//画y轴
//        ic.lineTo(x + 20, y);//x轴
//        ic.stroke();
//        ic.beginPath();
//        //ic.moveTo(50+a[0] * kx, y/2-b[0] * ky);//移动到圆点
//
//
//        //顶点上数字的颜色大小等
//        ic.font = "10pt Arial";
//        ic.textAlign = "center";
//        ic.lineWidth = 2;
//
//
//        //第一条线
//        for (i = 0; i < a.length; i++) {
//            ic.strokeStyle = "#32AE95"
//            //将10个点以此画到画布上
//            if(i%2 == 0)
//                ic.moveTo(50 + a[i] * kx, y/2 - (b[i] * ky));
//            else
//                ic.lineTo(50 + a[i] * kx, y/2 - (b[i] * ky));
//            //字体为橙色
//            ic.fillStyle = "#FFA500";
//            //在点上写出节段号
//            if(i%2 == 0)
//                ic.fillText(c[i], 50 + a[i] * kx, y/2 - (b[i] * ky)-3);
//                //console.log(c[i], 50 + a[i] * kx);
//                //console.log(y/2 - (b[i] * ky)-3);
//            if(i == a.length-1)
//                ic.fillText(Math.abs(c[i])+1, 50 + a[i] * kx, y/2 - (b[i] * ky)-3)
//            //取中点 标注E.. 白色
//            if (i%2==1) {
//                ic.fillStyle = "#000000";
//                ic.fillText('E' + c[i], 50 + a[i-1] * kx + ((50 + a[i] * kx) - (50 + a[i-1] * kx)) / 2, y/2 - ((b[i] * ky) + (b[i - 1] * ky)) / 2-5);
//            }
//        }
//        ic.stroke();
//
//        ic.beginPath();
//        ic.strokeStyle = '#ffffff';
//        for(i=0;i< a.length;i++){
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y/2-(b[i]*ky),4,0,2*Math.PI,true);
//            ic.fillStyle = '#ffffff';
//            ic.fill();
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y/2-(b[i]*ky),3,0,2*Math.PI,true);
//            ic.fillStyle = '#32AE95';
//            ic.fill();
//        }
//
//        ic.beginPath();
//        ic.lineWidth = 1;
//        for(ly=0;ly< a.length;ly++){
//            //绘制坐标轴上的坐标
//            ic.font = "10pt Arial";
//            ic.fillStyle = "#000000";
//            ic.strokeStyle = "#000000";
//            if(ly==0){
//                ic.fillText(a[ly], a[ly] * kx+55, y+13);//圆点时月份右移，下移，展现出“0”//有bug，不能显示0.000
//            }else{
//                ic.fillText(a[ly], a[ly] * kx+50, y+13);//x轴上的数字
//                ic.moveTo(a[ly] * kx+50,y-2);
//                ic.lineTo(a[ly] * kx+50,y+1);
//
//                ic.fillText(b[ly], 30, y/2-(b[ly]*ky));//y轴上的数字
//                ic.moveTo(49,y/2-(b[ly]*ky));
//                ic.lineTo(52,y/2-(b[ly]*ky));
//            }
//        }
//        ic.stroke();
//
//        ic.font = "10pt Arial";
//        ic.fillStyle = "#000000";
//        ic.fillText('x', x + 10, y - 10);
//        ic.fillText('z', 60, 10);
//        ic.stroke();
//    }
//
//
///*画控制线中比较部分两条线xy图：*/
//function Draw2d_xy_compare(a,b,c,e,p,q,mc,ic) {
//    //console.log(a);
//    //console.log(b);
//    //console.log(p);
//    //console.log(q);
//
//    ic.clearRect ( 0, 0 , 800 , 250 );//清除画布
//            //ic.translate(0.5, 0.5);
//            var x = mc.width - 50;//设定画笔所在层面的宽度 x轴的长度
//            var y = mc.height - 15;//获取可视高度
//            var num_a = Math.abs(a[a.length - 1]);
//            var num_q = Math.abs(p[p.length - 1]);
//            if(num_a>num_q)
//                var maxx = num_a;
//            else
//                var maxx = num_q;
//            if(b[b.length - 1]>q[q.length - 1])
//                var maxy = b[b.length - 1];
//            else
//                var maxy = q[q.length - 1];
//            if(maxx == 0)
//                maxx = 1;
//            if(maxy == 0)
//                maxy = 1;
//            var kx = (x - 50) / maxx;
//            var ky = (y - 15) / maxy;
//
//            //GP-...
//            for (i = 0; i < a.length; i++) {
//                ic.fillStyle = '#A9A9A9';
//                ic.font = "10pt Arial";
//                ic.save();
//
//                if(y - (b[i] * ky)+50 >235)
//                    ic.translate(50 + a[i] * kx+5,235);
//                else
//                    ic.translate(50 + a[i] * kx+5,y - (b[i] * ky)+50);
//
//                ic.rotate(Math.PI*3/2);
//                var n = i%2;
//                if(n == 1){
//                    ic.translate(0,-15);
//                    ic.fillText(e+' '+c[i]+' END',0,0);
//                }
//                if(n == 0){
//                    ic.translate(0,15);
//                    ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//                }
//                ic.restore();
//            }
//            for (i = 0; i < p.length; i++) {
//                ic.fillStyle = '#A9A9A9';
//                ic.font = "10pt Arial";
//                ic.save();
//
//                if(y - (q[i] * ky)+50 >235)
//                    ic.translate(50 + p[i] * kx+5,235);
//                else
//                    ic.translate(50 + p[i] * kx+5,y - (q[i] * ky)+50);
//
//                ic.rotate(Math.PI*3/2);
//                var n = i%2;
//                if(n == 1){
//                    ic.translate(0,-15);
//                    ic.fillText(e+' '+c[i]+' END',0,0);
//                }
//                if(n == 0){
//                    ic.translate(0,15);
//                    ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//                }
//                ic.restore();
//            }
//
//            ic.beginPath();//开始作画
//            ic.strokeStyle = "#000000";//曲线的颜色
//
//
//
//            ic.moveTo(50, 5);//y最大值
//            ic.lineTo(50, y);//画y轴
//            ic.lineTo(x + 20, y);//x轴
//            ic.stroke();
//            ic.beginPath();
//            //ic.moveTo(50, y);//移动到圆点
//
//            //顶点上数字的颜色大小等
//            ic.font = "10pt Arial";
//            ic.textAlign = "center";
//            ic.lineWidth = 2;
//
//            //第一条线
//            for (i = 0; i < a.length; i++) {
//                ic.strokeStyle = "#32AE95";
//                //将10个点以此画到画布上
//                if(i%2 == 0)
//                    ic.moveTo(50 + a[i] * kx, y - (b[i] * ky));
//                else
//                    ic.lineTo(50 + a[i] * kx, y - (b[i] * ky));
//                //字体为橙色
//                ic.fillStyle = "#FFA500";
//                //在点上写出节段号
//                if(i%2 == 0)
//                    ic.fillText(c[i], 50 + a[i] * kx, y - (b[i] * ky)-3);
//                if(i == a.length-1){
//                    ic.fillText(Math.abs(c[i])+1, 50 + a[i] * kx, y - (b[i] * ky)-3);
//                }
//
//                //取中点 标注E.. 白色
//                if (i%2==1) {
//                    ic.fillStyle = "#000000";
//                    ic.fillText('E' + c[i], 50 + a[i-1] * kx + ((50 + a[i] * kx) - (50 + a[i-1] * kx)) / 2, y - ((b[i] * ky) + (b[i - 1] * ky)) / 2-5);
//                }
//            }
//            ic.stroke();
//
//            //第二条线
//            ic.beginPath();
//            //ic.moveTo(50, y);
//            ic.strokeStyle = "#81DAC8";//曲线的颜色
//            for (i = 0; i < p.length; i++) {
//                //将10个点以此画到画布上
//                if(i%2 == 0)
//                    ic.moveTo(50 + p[i] * kx, y - (q[i] * ky));
//                else
//                    ic.lineTo(50 + p[i] * kx, y - (q[i] * ky));
//                //字体为红色
//                ic.fillStyle = "#FFA500";
//                //在点上写出节段号
//                if(i%2 == 0)
//                    ic.fillText(c[i], 50 + p[i] * kx, y - (q[i] * ky)-3);
//                if(i == a.length-1){
//                    ic.fillText(Math.abs(c[i])+1, 50 + p[i] * kx, y - (q[i] * ky)-3);
//                }
//
//                //取中点 标注E.. 白色
//                if (i%2==1) {
//                    ic.fillStyle = "#000000";
//                    ic.fillText('E' + c[i], 50 + p[i-1] * kx + ((50 + p[i] * kx) - (50 + p[i-1] * kx)) / 2, y - ((q[i] * ky) + (q[i - 1] * ky)) / 2-5);
//                }
//            }
//            ic.stroke();
//
//            ic.beginPath();
//    console.log(y-(b[0]*ky));
//    console.log(y-(q[0]*ky));
//
//            for(i=0;i< a.length;i++){
//                ic.beginPath();
//                ic.arc(50+a[i] * kx,y-(b[i]*ky),4,0,2*Math.PI,true);
//                console.log("y-(b[i]*ky)"+y-(b[i]*ky));
//                ic.fillStyle = '#ffffff';
//                ic.fill();
//                ic.beginPath();
//                ic.arc(50+a[i] * kx,y-(b[i]*ky),3,0,2*Math.PI,true);
//                ic.fillStyle = '#32AE95';
//                ic.fill();
//            }
//            for(i=0;i< p.length;i++){
//                ic.beginPath();
//                ic.arc(50+p[i] * kx,y-(q[i]*ky),4,0,2*Math.PI,true);
//                console.log("y-(q[i]*ky)"+y-(q[0]*ky));
//                ic.fillStyle = '#ffffff';
//                ic.fill();
//                ic.beginPath();
//                ic.arc(50+p[i] * kx,y-(q[i]*ky),3,0,2*Math.PI,true);
//                ic.fillStyle = '#81DAC8';
//                ic.fill();
//            }
//            ic.beginPath();
//            ic.lineWidth = 1;
//            for(ly=0;ly< a.length;ly++){
//                //绘制坐标轴上的坐标
//                ic.font = "10pt Arial";
//                ic.fillStyle = "#000000";
//                ic.strokeStyle = "#000000";
//
//
//                if(ly==0){
//                    ic.fillText(a[ly], a[ly] * kx+55, y+13);//圆点时月份右移，下移，展现出“0”//有bug，不能显示0.000
//                }else{
//                    ic.fillText(a[ly], a[ly] * kx+50, y+13);//x轴上的数字
//                    ic.moveTo(a[ly] * kx+50,y-2);
//                    ic.lineTo(a[ly] * kx+50,y+1);
//                    ic.fillText(p[ly], p[ly] * kx+50, y+13);//x轴上的数字
//                    ic.moveTo(p[ly] * kx+50,y-2);
//                    ic.lineTo(p[ly] * kx+50,y+1);
//
//                    ic.fillText(b[ly], 30, y-(b[ly]*ky));//y轴上的数字
//                    ic.moveTo(49,y-(b[ly]*ky));
//                    ic.lineTo(52,y-(b[ly]*ky));
//                    ic.fillText(q[ly], 30, y-(q[ly]*ky));//y轴上的数字
//                    ic.moveTo(49,y-(q[ly]*ky));
//                    ic.lineTo(52,y-(q[ly]*ky));
//                }
//            }
//
//            //填写坐标轴属性
//            ic.font = "10pt Arial";
//            ic.fillStyle = "##000000";
//            ic.fillText('x', x + 10, y - 10);
//            ic.fillText('y', 60, 10);
//            ic.stroke();
//}
///*画控制线中比较部分两条线xz图：*/
//function Draw2d_xz_compare (a,b,c,e,p,q,mc,ic) {
//    //console.log(a);
//    //console.log(b);
//    //console.log(p);
//    //console.log(q);
//        ic.clearRect ( 0, 0 , 800 , 250 );//清除画布
//        //ic.translate(0.5, 0.5);
//        var x = mc.width - 50;//设定画笔所在层面的宽度 x轴的长度
//        var y = mc.height - 15;//获取可视高度
//
//        var num = Math.abs(b[0]);
//        var max = num;
//        for(i = 1; i < b.length; i++){
//            num = Math.abs(b[i]);
//            var max = num;
//            if(max < num)
//                max = num;
//        }
//        for(i = 1; i < q.length; i++){
//            num = Math.abs(q[i]);
//            var max = num;
//            if(max < num)
//                max = num;
//        }
//        var num_a = Math.abs(a[a.length - 1]);
//        var num_q = Math.abs(p[p.length - 1]);
//        if(num_a>num_q)
//            var maxx = num_a;
//        else
//            var maxx = num_q;
//        if(maxx == 0)
//            maxx = 1;
//        if(max == 0)
//            max = 1;
//        var kx = (x - 50) / maxx;
//        var ky = (y - 15) / max*0.4;
//    console.log("maxx"+maxx);
//    console.log("max"+max);
//
//
//        //GL-...
//        for (i = 0; i < a.length; i++) {
//            ic.fillStyle = '#A9A9A9';
//            ic.font = "10pt Arial";
//            ic.save();
//
//            if(y/2 - (b[i] * ky)+50 >235)
//                ic.translate(50 + a[i] * kx+5,235);
//            else
//                ic.translate(50 + a[i] * kx+5,y/2 - (b[i] * ky)+50);
//
//            ic.rotate(Math.PI*3/2);
//            var n = i%2;
//            if(n == 1){
//                ic.translate(0,-15);
//                ic.fillText(e+' '+c[i]+' END',0,0);
//            }
//            if(n == 0){
//                ic.translate(0,15);
//                ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//            }
//            ic.restore();
//        }
//        for (i = 0; i < p.length; i++) {
//            ic.fillStyle = '#A9A9A9';
//            ic.font = "10pt Arial";
//            ic.save();
//
//            if(y/2 - (q[i] * ky)+50 >235)
//                ic.translate(50 + p[i] * kx+5,235);
//            else
//                ic.translate(50 + p[i] * kx+5,y/2 - (q[i] * ky)+50);
//
//            ic.rotate(Math.PI*3/2);
//            var n = i%2;
//            if(n == 1){
//                ic.translate(0,-15);
//                ic.fillText(e+' '+c[i]+' END',0,0);
//            }
//            if(n == 0){
//                ic.translate(0,15);
//                ic.fillText(e+' '+c[i]+' BEGIN',0,0);
//            }
//            ic.restore();
//        }
//
//        ic.beginPath();//开始作画
//        ic.strokeStyle = "#000000";//曲线的颜色
//
//        ic.moveTo(50, 5);//y最大值
//        ic.lineTo(50, y);//画y轴
//        ic.lineTo(x + 20, y);//x轴
//        ic.stroke();
//        ic.beginPath();
//        //ic.moveTo(50+a[0] * kx, y/2-b[0] * ky);//移动到圆点
//
//
//        //顶点上数字的颜色大小等
//        ic.font = "10pt Arial";
//        ic.textAlign = "center";
//        ic.lineWidth = 2;
//
//
//        //第一条线
//        for (i = 0; i < a.length; i++) {
//            ic.strokeStyle = "#32AE95"
//            //将10个点以此画到画布上
//            if(i%2 == 0)
//                ic.moveTo(50 + a[i] * kx, y/2 - (b[i] * ky));
//            else
//                ic.lineTo(50 + a[i] * kx, y/2 - (b[i] * ky));
//            //字体为橙色
//            ic.fillStyle = "#FFA500";
//            //在点上写出节段号
//            if(i%2 == 0)
//                ic.fillText(c[i], 50 + a[i] * kx, y/2 - (b[i] * ky)-3);
//            if(i == a.length-1)
//                ic.fillText(Math.abs(c[i])+1, 50 + a[i] * kx, y/2 - (b[i] * ky)-3)
//            //取中点 标注E.. 白色
//            if (i%2==1) {
//                ic.fillStyle = "#000000";
//                ic.fillText('E' + c[i], 50 + a[i-1] * kx + ((50 + a[i] * kx) - (50 + a[i-1] * kx)) / 2, y/2 - ((b[i] * ky) + (b[i - 1] * ky)) / 2-5);
//            }
//        }
//        ic.stroke();
//
//        //第二条线
//        ic.beginPath();
//        ic.strokeStyle = '#00ffff';
//        //ic.moveTo(50, y/2);
//        for (i = 0; i < p.length; i++) {
//            ic.strokeStyle = "#81DAC8"
//            //将10个点以此画到画布上
//            if(i%2 == 0)
//                ic.moveTo(50 + p[i] * kx, y/2 - (q[i] * ky));
//            else
//                ic.lineTo(50 + p[i] * kx, y/2 - (q[i] * ky));
//            //字体为红色
//            ic.fillStyle = "#FFA500";
//            //在点上写出节段号
//            if(i%2 == 0)
//                ic.fillText(c[i], 50 + p[i] * kx, y/2 - (q[i] * ky)-3);
//            if(i == a.length-1)
//                ic.fillText(Math.abs(c[i])+1, 50 + p[i] * kx, y/2 - (q[i] * ky)-3)
//            //取中点 标注E.. 白色
//            if (i%2==1) {
//                ic.fillStyle = "#000000";
//                ic.fillText('E' + c[i], 50 + p[i-1] * kx + ((50 + p[i] * kx) - (50 + p[i-1] * kx)) / 2, y/2 - ((q[i] * ky) + (q[i - 1] * ky)) / 2-5);
//            }
//        }
//        ic.stroke();
//
//        ic.beginPath();
//        ic.strokeStyle = '#ffffff';
//        for(i=0;i< a.length;i++){
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y/2-(b[i]*ky),4,0,2*Math.PI,true);
//            ic.fillStyle = '#ffffff';
//            ic.fill();
//            ic.beginPath();
//            ic.arc(50+a[i] * kx,y/2-(b[i]*ky),3,0,2*Math.PI,true);
//            ic.fillStyle = '#32AE95';
//            ic.fill();
//        }
//        for(i=0;i< p.length;i++){
//            ic.beginPath();
//            ic.arc(50+p[i] * kx,y/2-(q[i]*ky),4,0,2*Math.PI,true);
//            ic.fillStyle = '#ffffff';
//            ic.fill();
//            ic.beginPath();
//            ic.arc(50+p[i] * kx,y/2-(q[i]*ky),3,0,2*Math.PI,true);
//            ic.fillStyle = '#81DAC8';
//            ic.fill();
//        }
//
//        ic.beginPath();
//        ic.lineWidth = 1;
//        for(ly=0;ly< a.length;ly++){
//            //绘制坐标轴上的坐标
//            ic.font = "10pt Arial";
//            ic.fillStyle = "#000000";
//            ic.strokeStyle = "#000000";
//            if(ly==0){
//                ic.fillText(a[ly], a[ly] * kx+55, y+13);//圆点时月份右移，下移，展现出“0”//有bug，不能显示0.000
//            }else{
//                ic.fillText(a[ly], a[ly] * kx+50, y+13);//x轴上的数字
//                ic.moveTo(a[ly] * kx+50,y-2);
//                ic.lineTo(a[ly] * kx+50,y+1);
//
//                ic.fillText(b[ly], 30, y/2-(b[ly]*ky));//y轴上的数字
//                ic.moveTo(49,y/2-(b[ly]*ky));
//                ic.lineTo(52,y/2-(b[ly]*ky));
//
//                ic.fillText(p[ly], p[ly] * kx+50, y+13);//x轴上的数字
//                ic.moveTo(p[ly] * kx+50,y-2);
//                ic.lineTo(p[ly] * kx+50,y+1);
//
//                ic.fillText(q[ly], 30, y/2-(q[ly]*ky));//y轴上的数字
//                ic.moveTo(49,y/2-(q[ly]*ky));
//                ic.lineTo(52,y/2-(q[ly]*ky));
//            }
//        }
//        ic.stroke();
//
//        ic.font = "10pt Arial";
//        ic.fillStyle = "#000000";
//        ic.fillText('x', x + 10, y - 10);
//        ic.fillText('z', 60, 10);
//        ic.stroke();
//}

/*
画过程中的包含测量值图：*/
function DrawProcess(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#696969';
        ic.fill();
        ic.fillStyle = '#483d8b';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();


        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = 'white';
            ic.fillRect(a,b,152,70);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            ic.fillText(i,a+102,b+61);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawDescriptionChart(350+150*l13[1]-10,600-(150+k*l13[3])+10,l13[0],l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawDescriptionChart(350+150*l14[1]+75,600-(150+k*l14[3])+10,l14[0],l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawDescriptionChart(350+150*l15[1]+160,600-(150+k*l15[3])+10,l15[0],l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);

    }

//上面下面都有 用测量值画图
//----------------------------------------------------------------------------------------------------------------------
function drawProcessAllUseMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[6];
        if(l2[6]>max){
            max = l2[6];
        }
        if(l3[6]>max){
            max = l3[6];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[4],600-(150+k*lm[6]));
            ic.lineTo(500+150*ln[4],600-(150+k*ln[6]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[4],600-(150+k*lm[6]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[4],600-(150+k*ln[6]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[4]-l9[4])*150,((600-(150+k*l9[6]))-(600-(150+k*l6[6])))/2+600-(150+k*l6[6]));
        ic.lineTo(350+(l12[4]-l9[4])*150,((600-(150+k*l7[6]))-(600-(150+k*l4[6])))/2+600-(150+k*l4[6]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[4]-l9[4])*150,((600-(150+k*l9[6]))-(600-(150+k*l6[6])))/2+600-(150+k*l6[6]));
        ic.lineTo(350+(l12[4]-l9[4])*150,((600-(150+k*l7[6]))-(600-(150+k*l4[6])))/2+600-(150+k*l4[6]));
        ic.lineTo(350+(l1[4]-l4[4])*150,600-(150+k*l1[6])-15);
        ic.lineTo(650+(l3[4]-l6[4])*150,600-(150+k*l3[6])-15);
        ic.lineTo(650+(l12[4]-l9[4])*150,((600-(150+k*l9[6]))-(600-(150+k*l6[6])))/2+600-(150+k*l6[6]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[4],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[4],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[4],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();

        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[4]-10,600-(150+k*l1[6])+10,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[4]-10,600-(150+k*l4[6])-80,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[4]+75,600-(150+k*l2[6])+10,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[4]+75,600-(150+k*l5[6])-80,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[4]+160,600-(150+k*l3[6])+10,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[4]+160,600-(150+k*l6[6])-80,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[4]-10,600-(150+k*l7[6])+10,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[4]-10,600-(150+k*l10[6])-80,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[4]+75,600-(150+k*l8[6])+10,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[4]+75,600-(150+k*l11[6])-80,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[4]+160,600-(150+k*l9[6])+10,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[4]+160,600-(150+k*l12[6])-80,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[4]-10,600-(150)+10,l13[0],l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[4]+75,600-(150)+10,l14[0],l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[4]+160,600-(150)+10,l15[0],l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }

//上面下面都有 且含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessAllHasMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#696969';
        ic.fill();
        ic.fillStyle = '#483d8b';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();

        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = 'white';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = 'white';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[1]-10,600-(150+k*l13[3])+10,l13[0],l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[1]+75,600-(150+k*l14[3])+10,l14[0],l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[1]+160,600-(150+k*l15[3])+10,l15[0],l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }
    //drawProcessAllHasMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//上面下面都有 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessAllNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#800080';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#696969';
        ic.fill();
        ic.fillStyle = '#483d8b';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#800080';
        ic.fill();

        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = 'white';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = 'white';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[1]-10,600-(150+k*l13[3])+10,l13[0],l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[1]+75,600-(150+k*l14[3])+10,l14[0],l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[1]+160,600-(150+k*l15[3])+10,l15[0],l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }
   // drawProcessAllNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//只有下面部分 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessBottomNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();

        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }
   // drawProcessBottomNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//只有上面部分 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessTopNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);


            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }

        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();


        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
    }
   // drawProcessTopNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

 //以下为只有第一个节段
    //---------------------------------------------------------------------------------------------------------------

    //上面下面都有 且含右侧测量值
    //----------------------------------------------------------------------------------------------------------------------
function drawProcessAllNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])-80,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])-80,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])-80,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])+10,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])+10,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])+10,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])-80,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])-80,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])-80,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawBottomDescriptionChart(350+150*l10[1]-10,600-(150)+10,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawBottomDescriptionChart(350+150*l11[1]+75,600-(150)+10,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawBottomDescriptionChart(350+150*l12[1]+160,600-(150)+10,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }

//下面 有测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessBottomNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])+10,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])+10,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])+10,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])-80,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])-80,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])-80,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
    }


//上面 有测量值
//----------------------------------------------------------------------------------------------------------------------
function drawProcessTopNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            //ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            //ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            //ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])-80,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])-80,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])-80,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
    }


//上面下面都有 用测量值画图,第一个节段
function drawProcessAllUseMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[6];
        if(l2[6]>max){
            max = l2[6];
        }
        if(l3[6]>max){
            max = l3[6];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[4],600-(150+k*lm[6]));
            ic.lineTo(500+150*ln[4],600-(150+k*ln[6]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[4],600-(150+k*lm[6]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[4],600-(150+k*ln[6]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[6]-l1[6])/(l3[4]-l1[4]);
        //x10-350
        var p2 = 650-500+150*l12[4];
        var p1 = 350-500+150*l10[4];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[4]-l1[4])*150, p2*k1+600-(150+k*l3[6]) );
        ic.lineTo(350+(l10[4]-l1[4])*150, p1*k1+600-(150+k*l1[6]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[4]-l1[4])*150, p2*k1+600-(150+k*l3[6]));
        ic.lineTo(350+(l10[4]-l1[4])*150, p1*k1+600-(150+k*l1[6]) );
        ic.lineTo(350+(l10[4]-l1[4])*150, p1*k1+600-(150+k*l1[6])-100 );
        ic.lineTo(650+(l10[4]-l1[4])*150, p2*k1+600-(150+k*l3[6])-100 );
        ic.lineTo(650+(l10[4]-l1[4])*150, p2*k1+600-(150+k*l3[6]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[4],600-(150+k*l1[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[4],600-(150+k*l2[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[4],600-(150+k*l3[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[4],600-(150+k*l10[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[4],600-(150+k*l11[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[4],600-(150+k*l12[6]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        var DrawDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,65);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+63);
            ic.lineTo(a+51,b+63);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+51, b+48);
            ic.lineTo(a+149,b+48);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+63);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText('长度：',a+5,b+60);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
            ic.fillText(f,a+53,b+61);
            ic.fillText(i,a+102,b+61);
        }
        var DrawBottomDescriptionChart = function (a,b,c,d,e,f,g,h,i) {
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,152,50);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+51, b+18);
            ic.lineTo(a+149,b+18);
            ic.lineTo(a+149,b+48);
            ic.lineTo(a+51,b+48);
            ic.lineTo(a+51,b+18);
            ic.moveTo(a+51, b+33);
            ic.lineTo(a+149,b+33);
            ic.moveTo(a+100, b+18);
            ic.lineTo(a+100,b+48);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText(c,a+5,b+15);
            ic.fillText('浇筑',a+50,b+15);
            ic.fillText('测量值',a+100,b+15);
            ic.fillText('偏置：',a+5,b+30);
            ic.fillText('高度：',a+5,b+45);
            ic.fillText(d,a+53,b+31);
            ic.fillText(g,a+102,b+31);
            ic.fillText(e,a+53,b+46);
            ic.fillText(h,a+102,b+46);
        }
        DrawDescriptionChart(350+150*l1[4]-10,600-(150+k*l1[6])-80,l1[0],l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[4]+75,600-(150+k*l2[6])-80,l2[0],l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[4]+160,600-(150+k*l3[6])-80,l3[0],l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l4[4]-10,600-(150+k*l4[6])+10,l4[0],l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[4]+75,600-(150+k*l5[6])+10,l5[0],l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[4]+160,600-(150+k*l6[6])+10,l6[0],l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[4]-10,600-(150+k*l7[6])-80,l7[0],l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[4]+75,600-(150+k*l8[6])-80,l8[0],l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[4]+160,600-(150+k*l9[6])-80,l9[0],l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawBottomDescriptionChart(350+150*l10[4]-10,600-(150+k*l10[6])+10,l10[0],l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawBottomDescriptionChart(350+150*l11[4]+75,600-(150+k*l11[6])+10,l11[0],l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawBottomDescriptionChart(350+150*l12[4]+160,600-(150+k*l12[6])+10,l12[0],l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }




//-------------------------------------------------------------------------------
    //15个点简化结构第一步 只显示上面，且显示的是实际值
    function drawProcessSimpleStructureTop(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max)
            max = l2[3];
        if(l3[3]>max)
            max = l3[3];
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
//x轴也应该有个k值 即这个150要改
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighActual(a,b,e){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(e,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetActual(a,b,d){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(d,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetLongActual(a,b,d,f){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,36);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+34);
            ic.lineTo(a+50,b+34);
            ic.lineTo(a+50,b+1);
            ic.moveTo(a+50,b+19);
            ic.lineTo(a+99,b+19);
            ic.stroke();
            ic.restore();

            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(d,a+53,b+15);//浇筑位置
            ic.fillText('长度：',a+5,b+30);//偏执位置
            ic.fillText(f,a+53,b+31);//偏执数据位置
        }

        SimpleDescriptionChartHighActual(350+150*l1[1]+40,600-(150+k*l1[3])+10,l1[2]);
        SimpleDescriptionChartHighActual(350+150*l4[1]+40,600-(150+k*l4[3])-50,l4[2]);
        SimpleDescriptionChartOffsetActual(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[1]);
        SimpleDescriptionChartOffsetLongActual(350+150*l5[1]+75,600-(150+k*l5[3])-50,l5[1],l5[3]);
        SimpleDescriptionChartHighActual(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[2]);
        SimpleDescriptionChartHighActual(350+150*l6[1]+160,600-(150+k*l6[3])-50,l6[2]);
    }
    //drawProcessSimpleStructureTop(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

    //---------------------------------------------------------
    //15个点简化结构第二步 只显示下面 且显示的是实际值
    function drawProcessSimpleStructureBottom(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max)
            max = l2[3];
        if(l3[3]>max)
            max = l3[3];
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
//x轴也应该有个k值 即这个150要改
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighActual(a,b,e){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(e,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetActual(a,b,d){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(d,a+53,b+15);//浇筑位置
        }
        SimpleDescriptionChartHighActual(350+150*l7[1]+40,600-(150+k*l7[3])+10,l7[2]);
        SimpleDescriptionChartHighActual(350+150*l10[1]+40,600-(150+k*l10[3])-50,l10[2]);
        SimpleDescriptionChartOffsetActual(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[1]);
        SimpleDescriptionChartOffsetActual(350+150*l11[1]+75,600-(150+k*l11[3])-50,l11[1]);
        SimpleDescriptionChartHighActual(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[2]);
        SimpleDescriptionChartHighActual(350+150*l12[1]+160,600-(150+k*l12[3])-50,l12[2]);
    }
    //drawProcessSimpleStructureBottom(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);
    //-------------------------------------------------------------------------------
    //15个点简化结构第三步 全显示，且显示的是测量值
    function drawProcessSimpleStructureAll(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max)
            max = l2[3];
        if(l3[3]>max)
            max = l3[3];
        var k = 400/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
//x轴也应该有个k值 即这个150要改
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350,450);
        ic.fillStyle = '#A9A9A9';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.lineTo(350+(l12[1]-l9[1])*150,((600-(150+k*l7[3]))-(600-(150+k*l4[3])))/2+600-(150+k*l4[3]));
        ic.lineTo(350+(l1[1]-l4[1])*150,600-(150+k*l1[3])-15);
        ic.lineTo(650+(l3[1]-l6[1])*150,600-(150+k*l3[3])-15);
        ic.lineTo(650+(l12[1]-l9[1])*150,((600-(150+k*l9[3]))-(600-(150+k*l6[3])))/2+600-(150+k*l6[3]));
        ic.fillStyle = '#969696';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l1,l4);
        DrawLine(l2,l5);
        DrawLine(l3,l6);
        DrawLine(l7,l10);
        DrawLine(l8,l11);
        DrawLine(l9,l12);
        ic.beginPath();
        ic.arc(500+150*l13[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l14[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l15[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighMeasure(a,b,h){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(h,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetMeasure(a,b,g){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(g,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetLongMeasure(a,b,g,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,36);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+34);
            ic.lineTo(a+50,b+34);
            ic.lineTo(a+50,b+1);
            ic.moveTo(a+50,b+19);
            ic.lineTo(a+99,b+19);
            ic.stroke();
            ic.restore();

            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(g,a+53,b+15);//浇筑位置
            ic.fillText('长度：',a+5,b+30);//偏执位置
            ic.fillText(i,a+53,b+31);//偏执数据位置
        }

        SimpleDescriptionChartHighMeasure(350+150*l1[1]+40,600-(150+k*l1[3])+10,l1[5]);
        SimpleDescriptionChartHighMeasure(350+150*l4[1]+40,600-(150+k*l4[3])-50,l4[5]);
        SimpleDescriptionChartOffsetMeasure(350+150*l2[1]+75,600-(150+k*l2[3])+10,l2[4]);
        SimpleDescriptionChartOffsetLongMeasure(350+150*l5[1]+75,600-(150+k*l5[3])-50,l5[4],l5[5]);
        SimpleDescriptionChartHighMeasure(350+150*l3[1]+160,600-(150+k*l3[3])+10,l3[5]);
        SimpleDescriptionChartHighMeasure(350+150*l6[1]+160,600-(150+k*l6[3])-50,l6[5]);
        SimpleDescriptionChartHighMeasure(350+150*l7[1]+40,600-(150+k*l7[3])+10,l7[5]);
        SimpleDescriptionChartHighMeasure(350+150*l10[1]+40,600-(150+k*l10[3])-50,l10[5]);
        SimpleDescriptionChartOffsetMeasure(350+150*l8[1]+75,600-(150+k*l8[3])+10,l8[4]);
        SimpleDescriptionChartOffsetMeasure(350+150*l11[1]+75,600-(150+k*l11[3])-50,l11[4]);
        SimpleDescriptionChartHighMeasure(350+150*l9[1]+160,600-(150+k*l9[3])+10,l9[5]);
        SimpleDescriptionChartHighMeasure(350+150*l12[1]+160,600-(150+k*l12[3])-50,l12[5]);
        SimpleDescriptionChartHighMeasure(350+150*l13[1]+40,600-150+10,l13[5]);
        SimpleDescriptionChartOffsetMeasure(350+150*l14[1]+75,600-150+10,l14[4]);
        SimpleDescriptionChartHighMeasure(350+150*l15[1]+160,600-150+10,l15[5]);
    }
    //drawProcessSimpleStructureAll(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);


    //-------------------------------------------------------------------------------
    //12个点简化结构第一步 显示上面，且显示的是实际值
    function drawProcessSimpleStructureTopNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(e,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(d,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartHighLongMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,36);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+34);
            ic.lineTo(a+50,b+34);
            ic.lineTo(a+50,b+1);
            ic.moveTo(a+50,b+19);
            ic.lineTo(a+99,b+19);
            ic.stroke();
            ic.restore();

            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(e,a+53,b+15);//浇筑位置
            ic.fillText('长度：',a+5,b+30);//偏执位置
            ic.fillText(f,a+53,b+31);//偏执数据位置
        }
        SimpleDescriptionChartHighLongMeasure(350+150*l1[1]+40,600-(150+k*l1[3])-50,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l2[1]+75,600-(150+k*l2[3])-50,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        SimpleDescriptionChartHighLongMeasure(350+150*l3[1]+160,600-(150+k*l3[3])-50,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
    }
    //drawProcessSimpleStructureTopNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);

    //-------------------------------------------------------------------------------
    //12个点简化结构第二步 显示下面，且显示的是测量值
    function drawProcessSimpleStructureBottomNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(e,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(d,a+53,b+15);//浇筑位置
        }
        SimpleDescriptionChartHighMeasure(350+150*l4[1]+40,600-(150+k*l4[3])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l5[1]+75,600-(150+k*l5[3])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        SimpleDescriptionChartHighMeasure(350+150*l6[1]+160,600-(150+k*l6[3])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        SimpleDescriptionChartHighMeasure(350+150*l7[1]+40,600-(150+k*l7[3])-50,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l8[1]+75,600-(150+k*l8[3])-50,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        SimpleDescriptionChartHighMeasure(350+150*l9[1]+160,600-(150+k*l9[3])-50,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
    }
    //drawProcessSimpleStructureBottomNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);
    //-------------------------------------------------------------------------------
    //12个点简化结构第三步 全显示，且显示的是测量值
    function drawProcessSimpleStructureAllNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,ic){
        ic.clearRect ( 0, 0 , 1000 , 600 );//清除画布
        var max = l1[3];
        if(l2[3]>max){
            max = l2[3];
        }
        if(l3[3]>max){
            max = l3[3];
        }
        var k = 300/max;
        var DrawLine = function(lm,ln){
            ic.beginPath();
            ic.strokeStyle = 'white';
            ic.save();
            ic.translate(0.5,0.5);
            ic.moveTo(500+150*lm[1],600-(150+k*lm[3]));
            ic.lineTo(500+150*ln[1],600-(150+k*ln[3]));
            ic.closePath();
            ic.restore();
            ic.stroke();
            ic.fillStyle = 'white';
            //ic.fillText('GP-R',400,150);

            ic.beginPath();
            ic.arc(500+150*lm[1],600-(150+k*lm[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
            ic.beginPath();
            ic.arc(500+150*ln[1],600-(150+k*ln[3]),4,0,2*Math.PI,true);
            ic.fillStyle = '#00CED1';
            ic.fill();
        }
        //k1 = (y3-y1)/(x3-x1)
        var k1 = (l3[3]-l1[3])/(l3[1]-l1[1]);
        //x10-350
        var p2 = 650-500+150*l12[1];
        var p1 = 350-500+150*l10[1];
        ic.beginPath();
        ic.moveTo(350,450);
        ic.lineTo(650,450);
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350,450);
        ic.fillStyle = '#808080';
        ic.fill();
        ic.beginPath();
        ic.moveTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3]) );
        ic.lineTo(350+(l10[1]-l1[1])*150, p1*k1+600-(150+k*l1[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3])-100 );
        ic.lineTo(650+(l10[1]-l1[1])*150, p2*k1+600-(150+k*l3[3]));
        ic.fillStyle = '#8cd9c9';
        ic.fill();
        ic.fillStyle = '#1cb392';
        ic.fillRect(350,450,300,100);

        DrawLine(l4,l7);
        DrawLine(l5,l8);
        DrawLine(l6,l9);
        ic.beginPath();
        ic.arc(500+150*l1[1],600-(150+k*l1[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l2[1],600-(150+k*l2[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l3[1],600-(150+k*l3[3]),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l10[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l11[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        ic.beginPath();
        ic.arc(500+150*l12[1],600-(150),4,0,2*Math.PI,true);
        ic.fillStyle = '#00CED1';
        ic.fill();
        function SimpleDescriptionChartHighMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(h,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartOffsetMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,20);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+19);
            ic.lineTo(a+50,b+19);
            ic.lineTo(a+50,b+1);
            ic.stroke();
            ic.restore();
            ic.fillStyle = 'black';
            ic.fillText('偏置',a+5,b+15);//GP-R位置
            ic.fillText(g,a+53,b+15);//浇筑位置
        }
        function SimpleDescriptionChartHighLongMeasure(a,b,c,d,e,f,g,h,i){
            ic.fillStyle = '#ededed';
            ic.fillRect(a,b,100,36);
            ic.strokeStyle = "#808080";//曲线的颜色
            ic.save();
            ic.translate(0.5,0.5);
            ic.lineWidth = 1;
            ic.beginPath();
            ic.moveTo(a+50,b+1);
            ic.lineTo(a+99,b+1);
            ic.lineTo(a+99,b+34);
            ic.lineTo(a+50,b+34);
            ic.lineTo(a+50,b+1);
            ic.moveTo(a+50,b+19);
            ic.lineTo(a+99,b+19);
            ic.stroke();
            ic.restore();

            ic.fillStyle = 'black';
            ic.fillText('高度',a+5,b+15);//GP-R位置
            ic.fillText(h,a+53,b+15);//浇筑位置
            ic.fillText('长度：',a+5,b+30);//偏执位置
            ic.fillText(i,a+53,b+31);//偏执数据位置
        }
        SimpleDescriptionChartHighLongMeasure(350+150*l1[1]+40,600-(150+k*l1[3])-50,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l2[1]+75,600-(150+k*l2[3])-50,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        SimpleDescriptionChartHighLongMeasure(350+150*l3[1]+160,600-(150+k*l3[3])-50,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        SimpleDescriptionChartHighMeasure(350+150*l4[1]+40,600-(150+k*l4[3])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l5[1]+75,600-(150+k*l5[3])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        SimpleDescriptionChartHighMeasure(350+150*l6[1]+160,600-(150+k*l6[3])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        SimpleDescriptionChartHighMeasure(350+150*l7[1]+40,600-(150+k*l7[3])-50,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l8[1]+75,600-(150+k*l8[3])-50,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        SimpleDescriptionChartHighMeasure(350+150*l9[1]+160,600-(150+k*l9[3])-50,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        SimpleDescriptionChartHighMeasure(350+150*l10[1]+40,600-(150)+10,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        SimpleDescriptionChartOffsetMeasure(350+150*l11[1]+75,600-(150)+10,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        SimpleDescriptionChartHighMeasure(350+150*l12[1]+160,600-(150)+10,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }