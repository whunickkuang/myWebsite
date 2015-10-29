/**
 * Created by paomer on 15/7/8.
 */



    var canvas =document.getElementById("mc3");
    var ic =canvas.getContext("2d");
//    var list1=["GP-R",-1.05, 0.00, 5.83, 0.0, 0.0, 0.0];
//    var list2=["GP-C",-0.25, 0.00, 5.76, 0.0, 0.0, 0.0];
//    var list3=["GP-L",0.54, 0.00, 5.69, 0.0, 0.0, 0.0];
//    var list4=["GP-R",-0.82, 0.00, 3.18, 0.0, 0.0, 0.0];
//    var list5=["GP-C",-0.02, 0.00, 3.24, 0.0, 0.0, 0.0];
//    var list6=["GP-L",0.77, 0.00, 3.32, 0.0, 0.0, 0.0];
//    var list7=["GP-R",-0.80, 0.00, 2.68, 0.0, 0.0, 0.0];
//    var list8=["GP-C",0.00, 0.00, 2.75, 0.0, 0.0, 0.0];
//    var list9=["GP-L",0.80, 0.00, 2.82, 0.0, 0.0, 0.0];
//    var list10=["GP-R",-0.80, 0.00, 0.25, 0.0, 0.0, 0.0];
//    var list11=["GP-C",-0.00, 0.00, 0.25, 0.0, 0.0, 0.0];
//    var list12=["GP-L",0.80, 0.00, 0.25, 0.0, 0.0, 0.0];
//    var list13=["GP-R",-0.80, 0.00, 0.00, 0.0, 0.0, 0.0];
//    var list14=["GP-C",-0.00, 0.00, 0.00, 0.0, 0.0, 0.0];
//    var list15=["GP-L",0.80, 0.00, 0.00, 0.0, 0.0, 0.0];

    //用浇筑值画图_测试数值
    //var list1=["GP-R",-0.8, 0.00, 5.74, 0.0, 0.0, 0.0];
    //var list2=["GP-C",-0.0, 0.00, 5.74, 0.0, 0.0, 0.0];
    //var list3=["GP-L",0.8, 0.00, 5.74, 0.0, 0.0, 0.0];
    //var list4=["GP-R",-0.80, 0.00, 3.25, 0.0, 0.0, 0.0];
    //var list5=["GP-C",-0.00, 0.00, 3.25, 0.0, 0.0, 0.0];
    //var list6=["GP-L",0.8, 0.00, 3.25, 0.0, 0.0, 0.0];
    //var list7=["GP-R",-0.80, 0.00, 2.74, 0.0, 0.0, 0.0];
    //var list8=["GP-C",0.00, 0.00, 2.74, 0.0, 0.0, 0.0];
    //var list9=["GP-L",0.80, 0.00, 2.74, 0.0, 0.0, 0.0];
    //var list10=["GP-R",-0.80, 0.00, 0.25, 0.0, 0.0, 0.0];
    //var list11=["GP-C",-0.00, 0.00, 0.25, 0.0, 0.0, 0.0];
    //var list12=["GP-L",0.80, 0.00, 0.25, 0.0, 0.0, 0.0];
    //var list13=["GP-R",-0.80, 0.00, 0.00, 0.0, 0.0, 0.0];
    //var list14=["GP-C",-0.00, 0.00, 0.00, 0.0, 0.0, 0.0];
    //var list15=["GP-L",0.80, 0.00, 0.00, 0.0, 0.0, 0.0];

//用测量值画图_测试数值
    var list1=["GP-R",-0.0, 0.00, 0, -0.8, 0.00, 5.74];
    var list2=["GP-C",-0.0, 0.00, 0, -0.0, 0.00, 5.74];
    var list3=["GP-L",0.0, 0.00, 0, 0.8, 0.00, 5.74];
    var list4=["GP-R",-0.00, 0.00, 0, -0.80, 0.00, 3.25];
    var list5=["GP-C",-0.00, 0.00, 0, -0.00, 0.00, 3.25];
    var list6=["GP-L",0.0, 0.00, 0, 0.8, 0.00, 3.25];
    var list7=["GP-R",-0.00, 0.00, 0, -0.80, 0.00, 2.74];
    var list8=["GP-C",0.00, 0.00, 0, 0.00, 0.00, 2.74];
    var list9=["GP-L",0.00, 0.00, 0, 0.80, 0.00, 2.74];
    var list10=["GP-R",-0.00, 0.00, 0.0, -0.80, 0.00, 0.25];
    var list11=["GP-C",-0.00, 0.00, 0.0, -0.00, 0.00, 0.25];
    var list12=["GP-L",0.00, 0.00, 0.0, 0.80, 0.00, 0.25];
    var list13=["GP-R",-0.00, 0.00, 0.00, -0.80, 0.00, 0.00];
    var list14=["GP-C",-0.00, 0.00, 0.00, -0.00, 0.00, 0.00];
    var list15=["GP-L",0.00, 0.00, 0.00, 0.80, 0.00, 0.00];
//上面下面都有 且含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
    function drawProcessAllHasMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[1]-10,600-150+10,'GP-R',l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[1]+75,600-150+10,'GP-C',l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[1]+160,600-150+10,'GP-L',l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }
    //drawProcessAllHasMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//上面下面都有 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
    function drawProcessAllNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
        ic.fillStyle = '#A9A9A9' ;
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[1]-10,600-(150)+10,'GP-R',l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[1]+75,600-(150)+10,'GP-C',l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[1]+160,600-(150)+10,'GP-L',l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }
    //drawProcessAllNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//只有下面部分 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
    function drawProcessBottomNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])+10,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[1]-10,600-(150+k*l10[3])-80,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])+10,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[1]+75,600-(150+k*l11[3])-80,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])+10,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[1]+160,600-(150+k*l12[3])-80,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }
    //drawProcessBottomNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);

//只有上面部分 不含右侧测量值
//----------------------------------------------------------------------------------------------------------------------
    function drawProcessTopNoMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])+10,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])-80,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])+10,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])-80,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])+10,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])-80,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
    }
    //drawProcessTopNoMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);
    //上面下面都有 用测量值画图
    //----------------------------------------------------------------------------------------------------------------------
    function drawProcessAllUseMeasure(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
        DrawDescriptionChart(350+150*l1[4]-10,600-(150+k*l1[6])+10,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l4[4]-10,600-(150+k*l4[6])-80,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l2[4]+75,600-(150+k*l2[6])+10,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l5[4]+75,600-(150+k*l5[6])-80,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l3[4]+160,600-(150+k*l3[6])+10,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l6[4]+160,600-(150+k*l6[6])-80,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[4]-10,600-(150+k*l7[6])+10,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l10[4]-10,600-(150+k*l10[6])-80,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawDescriptionChart(350+150*l8[4]+75,600-(150+k*l8[6])+10,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l11[4]+75,600-(150+k*l11[6])-80,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawDescriptionChart(350+150*l9[4]+160,600-(150+k*l9[6])+10,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawDescriptionChart(350+150*l12[4]+160,600-(150+k*l12[6])-80,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
        DrawBottomDescriptionChart(350+150*l13[4]-10,600-(150)+10,'GP-R',l13[1],l13[2],l13[3],l13[4],l13[5],l13[6]);
        DrawBottomDescriptionChart(350+150*l14[4]+75,600-(150)+10,'GP-C',l14[1],l14[2],l14[3],l14[4],l14[5],l14[6]);
        DrawBottomDescriptionChart(350+150*l15[4]+160,600-(150)+10,'GP-L',l15[1],l15[2],l15[3],l15[4],l15[5],l15[6]);
    }
    //drawProcessAllUseMeasure(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,list13,list14,list15);
    //上面下面都有 且含右侧测量值
    //----------------------------------------------------------------------------------------------------------------------
    function drawProcessAllHasMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])-80,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])-80,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])-80,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])-80,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])-80,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])-80,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawBottomDescriptionChart(350+150*l10[1]-10,600-(150)+10,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawBottomDescriptionChart(350+150*l11[1]+75,600-(150)+10,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawBottomDescriptionChart(350+150*l12[1]+160,600-(150)+10,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }
    //drawProcessAllHasMeasureNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);


    //--------上面下面都有 不含右侧测量值
    function drawProcessAllNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])-80,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])-80,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])-80,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])-80,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])-80,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])-80,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawBottomDescriptionChart(350+150*l10[1]-10,600-(150)+10,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawBottomDescriptionChart(350+150*l11[1]+75,600-(150)+10,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawBottomDescriptionChart(350+150*l12[1]+160,600-(150)+10,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }
    //drawProcessAllNoMeasureNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);
    //下面 无测量值
    //----------------------------------------------------------------------------------------------------------------------
    function drawProcessBottomNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
        DrawDescriptionChart(350+150*l4[1]-10,600-(150+k*l4[3])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[1]+75,600-(150+k*l5[3])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[1]+160,600-(150+k*l6[3])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[1]-10,600-(150+k*l7[3])-80,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[1]+75,600-(150+k*l8[3])-80,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[1]+160,600-(150+k*l9[3])-80,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
    }
    //drawProcessBottomNoMeasureNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);
    //上面 无测量值
    //----------------------------------------------------------------------------------------------------------------------
    function drawProcessTopNoMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
        ic.fillStyle = '#969696';
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
        DrawDescriptionChart(350+150*l1[1]-10,600-(150+k*l1[3])-80,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[1]+75,600-(150+k*l2[3])-80,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[1]+160,600-(150+k*l3[3])-80,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
    }
    //drawProcessTopNoMeasureNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);
    //上面下面都有 用测量值画图
    //----------------------------------------------------------------------------------------------------------------------
    function drawProcessAllUseMeasureNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
        ic.fillStyle = '#969696';
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
        DrawDescriptionChart(350+150*l1[4]-10,600-(150+k*l1[6])-80,'GP-R',l1[1],l1[2],l1[3],l1[4],l1[5],l1[6]);
        DrawDescriptionChart(350+150*l2[4]+75,600-(150+k*l2[6])-80,'GP-C',l2[1],l2[2],l2[3],l2[4],l2[5],l2[6]);
        DrawDescriptionChart(350+150*l3[4]+160,600-(150+k*l3[6])-80,'GP-L',l3[1],l3[2],l3[3],l3[4],l3[5],l3[6]);
        DrawDescriptionChart(350+150*l4[4]-10,600-(150+k*l4[6])+10,'GP-R',l4[1],l4[2],l4[3],l4[4],l4[5],l4[6]);
        DrawDescriptionChart(350+150*l5[4]+75,600-(150+k*l5[6])+10,'GP-C',l5[1],l5[2],l5[3],l5[4],l5[5],l5[6]);
        DrawDescriptionChart(350+150*l6[4]+160,600-(150+k*l6[6])+10,'GP-L',l6[1],l6[2],l6[3],l6[4],l6[5],l6[6]);
        DrawDescriptionChart(350+150*l7[4]-10,600-(150+k*l7[6])-80,'GP-R',l7[1],l7[2],l7[3],l7[4],l7[5],l7[6]);
        DrawDescriptionChart(350+150*l8[4]+75,600-(150+k*l8[6])-80,'GP-C',l8[1],l8[2],l8[3],l8[4],l8[5],l8[6]);
        DrawDescriptionChart(350+150*l9[4]+160,600-(150+k*l9[6])-80,'GP-L',l9[1],l9[2],l9[3],l9[4],l9[5],l9[6]);
        DrawBottomDescriptionChart(350+150*l10[4]-10,600-(150+k*l10[6])+10,'GP-R',l10[1],l10[2],l10[3],l10[4],l10[5],l10[6]);
        DrawBottomDescriptionChart(350+150*l11[4]+75,600-(150+k*l11[6])+10,'GP-C',l11[1],l11[2],l11[3],l11[4],l11[5],l11[6]);
        DrawBottomDescriptionChart(350+150*l12[4]+160,600-(150+k*l12[6])+10,'GP-L',l12[1],l12[2],l12[3],l12[4],l12[5],l12[6]);
    }
    //drawProcessAllUseMeasureNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);
    //-------------------------------------------------------------------------------
    //15个点简化结构第一步 只显示上面，且显示的是实际值
    function drawProcessSimpleStructureTop(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
    function drawProcessSimpleStructureBottom(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
    function drawProcessSimpleStructureAll(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15){
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
    function drawProcessSimpleStructureTopNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
    function drawProcessSimpleStructureBottomNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
    function drawProcessSimpleStructureAllNo1(l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12){
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
    //drawProcessSimpleStructureAllNo1(list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12);