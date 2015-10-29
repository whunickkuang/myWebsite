
function drawImapge(segmedata, value) {
    var mc = document.getElementById("mc1");//获取canvas画布
    var ic = mc.getContext("2d");//传参2d,声明画图为2D。
    var mc2 = document.getElementById("mc2");//获取canvas画布
    var ic2 = mc2.getContext("2d");//传参2d,声明画图为2D。
    if (value == "GP-L") {

        var type_l = 'GP-L';
        var x_l = [];
        var y_l = [];
        var z_l = [];
        var number_l = [];
        segmedata.forEach(function (e) {

            x_l.push(e['segment_B_GP_L_X'].toFixed(2));
            x_l.push(e['segment_E_GP_L_X'].toFixed(2));
            y_l.push(e['segment_B_GP_L_Y'].toFixed(2));
            y_l.push(e['segment_E_GP_L_Y'].toFixed(2));
            z_l.push(e['segment_B_GP_L_Z'].toFixed(2));
            z_l.push(e['segment_E_GP_L_Z'].toFixed(2));
            number_l.push(e['segment_number']);
            number_l.push(e['segment_number']);
        });


        Draw2d_xy(x_l, y_l, number_l, type_l, mc, ic);
        Draw2d_xz(x_l, z_l, number_l, type_l, mc2, ic2);
    }
    if (value == "GP-R") {

        var type_r = 'GP-R';
        var x_r = [];
        var y_r = [];
        var z_r = [];
        var number_r = [];
        segmedata.forEach(function (e) {

            x_r.push(e['segment_B_GP_R_X'].toFixed(2));
            y_r.push(e['segment_B_GP_R_Y'].toFixed(2));
            z_r.push(e['segment_B_GP_R_Z'].toFixed(2));
            x_r.push(e['segment_E_GP_R_X'].toFixed(2));
            y_r.push(e['segment_E_GP_R_Y'].toFixed(2));
            z_r.push(e['segment_E_GP_R_Z'].toFixed(2));
            number_r.push(e['segment_number']);
            number_r.push(e['segment_number']);

        });


        Draw2d_xy(x_r, y_r,number_r, type_r, mc, ic);
        Draw2d_xz(x_r, z_r, number_r, type_r,mc2, ic2);
    }
    if (value == "GP-D") {

        var type_d = 'GP-D';
        var x_d = [];
        var y_d = [];
        var z_d = [];
        var number_d = [];
        segmedata.forEach(function (e) {
            x_d.push(e['segment_B_GP_D_X'].toFixed(2));
            x_d.push(e['segment_E_GP_D_X'].toFixed(2));
            y_d.push(e['segment_B_GP_D_Y'].toFixed(2));
            y_d.push(e['segment_E_GP_D_Y'].toFixed(2));
            z_d.push(e['segment_B_GP_D_Z'].toFixed(2));
            z_d.push(e['segment_E_GP_D_Z'].toFixed(2));

            number_d.push(e['segment_number']);
            number_d.push(e['segment_number']);
        });


        Draw2d_xy(x_d, y_d, number_d, type_d, mc, ic);
        Draw2d_xz(x_d, z_d, number_d, type_d, mc2, ic2);
    }
    if (value == "GP-C") {

        var type_c = 'GP-C';
        var x_c = [];
        var y_c = [];
        var z_c = [];
        var number_c = [];
        segmedata.forEach(function (e) {

            x_c.push(e['segment_B_GP_C_X'].toFixed(2));
            y_c.push(e['segment_B_GP_C_Y'].toFixed(2));
            z_c.push(e['segment_B_GP_C_Z'].toFixed(2));
            x_c.push(e['segment_E_GP_C_X'].toFixed(2));
            y_c.push(e['segment_E_GP_C_Y'].toFixed(2));
            z_c.push(e['segment_E_GP_C_Z'].toFixed(2));
            number_c.push(e['segment_number']);
            number_c.push(e['segment_number']);
        });


        Draw2d_xy(x_c, y_c,number_c, type_c, mc, ic);
        Draw2d_xz(x_c, z_c,number_c, type_c, mc2, ic2);
    }

}

function drawImageInSurvey(segmedata, value){
    var mc3 = document.getElementById("mc3");//获取canvas画布
    var ic3 = mc3.getContext("2d");//传参2d,声明画图为2D。
    var mc4 = document.getElementById("mc4");//获取canvas画布
    var ic4 = mc4.getContext("2d");//传参2d,声明画图为2D。
    if (value == "GP-L") {

        var type_l = 'GP-L';
        var x_l = [];
        var y_l = [];
        var z_l = [];
        var number_l = [];
        segmedata.forEach(function (e) {

            x_l.push(e['seg_act_B_GP_L_X'].toFixed(2));
            x_l.push(e['seg_act_E_GP_L_X'].toFixed(2));
            y_l.push(e['seg_act_B_GP_L_Y'].toFixed(2));
            y_l.push(e['seg_act_E_GP_L_Y'].toFixed(2));
            z_l.push(e['seg_act_B_GP_L_Z'].toFixed(2));
            z_l.push(e['seg_act_E_GP_L_Z'].toFixed(2));
            number_l.push(e['segment_number']);
            number_l.push(e['segment_number']);
        });


        Draw2d_xy(x_l, y_l, number_l, type_l, mc3, ic3);
        Draw2d_xz(x_l, z_l, number_l, type_l, mc4, ic4);
    }
    if (value == "GP-R") {

        var type_r = 'GP-R';
        var x_r = [];
        var y_r = [];
        var z_r = [];
        var number_r = [];
        segmedata.forEach(function (e) {

            x_r.push(e['seg_act_B_GP_R_X'].toFixed(2));
            y_r.push(e['seg_act_B_GP_R_Y'].toFixed(2));
            z_r.push(e['seg_act_B_GP_R_Z'].toFixed(2));
            x_r.push(e['seg_act_E_GP_R_X'].toFixed(2));
            y_r.push(e['seg_act_E_GP_R_Y'].toFixed(2));
            z_r.push(e['seg_act_E_GP_R_Z'].toFixed(2));
            number_r.push(e['segment_number']);
            number_r.push(e['segment_number']);

        });


        Draw2d_xy(x_r, y_r,number_r, type_r, mc3, ic3);
        Draw2d_xz(x_r, z_r, number_r, type_r,mc4, ic4);
    }
    if (value == "GP-D") {

        var type_d = 'GP-D';
        var x_d = [];
        var y_d = [];
        var z_d = [];
        var number_d = [];
        segmedata.forEach(function (e) {
            x_d.push(e['seg_act_B_GP_D_X'].toFixed(2));
            x_d.push(e['seg_act_E_GP_D_X'].toFixed(2));
            y_d.push(e['seg_act_B_GP_D_Y'].toFixed(2));
            y_d.push(e['seg_act_E_GP_D_Y'].toFixed(2));
            z_d.push(e['seg_act_B_GP_D_Z'].toFixed(2));
            z_d.push(e['seg_act_E_GP_D_Z'].toFixed(2));

            number_d.push(e['segment_number']);
            number_d.push(e['segment_number']);
        });


        Draw2d_xy(x_d, y_d, number_d, type_d, mc3, ic3);
        Draw2d_xz(x_d, z_d, number_d, type_d, mc4, ic4);
    }
    if (value == "GP-C") {

        var type_c = 'GP-C';
        var x_c = [];
        var y_c = [];
        var z_c = [];
        var number_c = [];
        segmedata.forEach(function (e) {

            x_c.push(e['seg_act_B_GP_C_X'].toFixed(2));
            y_c.push(e['seg_act_B_GP_C_Y'].toFixed(2));
            z_c.push(e['seg_act_B_GP_C_Z'].toFixed(2));
            x_c.push(e['seg_act_E_GP_C_X'].toFixed(2));
            y_c.push(e['seg_act_E_GP_C_Y'].toFixed(2));
            z_c.push(e['seg_act_E_GP_C_Z'].toFixed(2));
            number_c.push(e['segment_number']);
            number_c.push(e['segment_number']);
        });


        Draw2d_xy(x_c, y_c,number_c, type_c, mc3, ic3);
        Draw2d_xz(x_c, z_c,number_c, type_c, mc4, ic4);
    }
}
function changeControlSegTable(segmedata, value) {
    drawImapge(segmedata, value);
    if (value == "GP-L") {

        var lnumber = 0;
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(2)").html("GP-L-X-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(3)").html("GP-L-Y-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(4)").html("GP-L-Z-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(5)").html("GP-L-X-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(6)").html("GP-L-Y-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(7)").html("GP-L-Z-END");


        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_L_X'].toFixed(2) + "</td><td>" + e['segment_B_GP_L_Y'].toFixed(2) + "</td><td>" + e['segment_B_GP_L_Z'].toFixed(2) + "</td><td>" + e['segment_E_GP_L_X'].toFixed(2) + "</td><td>" + e['segment_E_GP_L_Y'].toFixed(2) + "</td><td>" + e['segment_E_GP_L_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            lnumber = lnumber + 1;

        });
        for (var l = 0; l < lnumber; l++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        $("#controlSegmentSetupTable").parent().siblings().remove();
    }
    if (value == "GP-R") {

        var rnumber = 0;
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(2)").html("GP-R-X-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(3)").html("GP-R-Y-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(4)").html("GP-R-Z-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(5)").html("GP-R-X-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(6)").html("GP-R-Y-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(7)").html("GP-R-Z-END");

        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_R_X'].toFixed(2) + "</td><td>" + e['segment_B_GP_R_Y'].toFixed(2) + "</td><td>" + e['segment_B_GP_R_Z'].toFixed(2) + "</td><td>" + e['segment_E_GP_R_X'].toFixed(2) + "</td><td>" + e['segment_E_GP_R_Y'].toFixed(2) + "</td><td>" + e['segment_E_GP_R_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            rnumber = rnumber + 1;

        });
        for (var r = 0; r < rnumber; r++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        $("#controlSegmentSetupTable").parent().siblings().remove();
    }

    if (value == "GP-D") {

        var dnumber = 0;
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(2)").html("GP-D-X-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(3)").html("GP-D-Y-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(4)").html("GP-D-Z-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(5)").html("GP-D-X-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(6)").html("GP-D-Y-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(7)").html("GP-D-Z-END");

        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_D_X'].toFixed(2) + "</td><td>" + e['segment_B_GP_D_Y'].toFixed(2) + "</td><td>" + e['segment_B_GP_D_Z'].toFixed(2) + "</td><td>" + e['segment_E_GP_D_X'].toFixed(2) + "</td><td>" + e['segment_E_GP_D_Y'].toFixed(2) + "</td><td>" + e['segment_E_GP_D_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            dnumber = dnumber + 1;

        });
        for (var d = 0; d < dnumber; d++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        $("#controlSegmentSetupTable").parent().siblings().remove();
    }


    if (value == "GP-C") {

        var cnumber = 0;
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(2)").html("GP-C-X-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(3)").html("GP-C-Y-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(4)").html("GP-C-Z-BEGIN");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(5)").html("GP-C-X-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(6)").html("GP-C-Y-END");
        $("#controlSegmentSetupTable tr:eq(0) th:nth-child(7)").html("GP-C-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_C_X'].toFixed(2) + "</td><td>" + e['segment_B_GP_C_Y'].toFixed(2) + "</td><td>" + e['segment_B_GP_C_Z'].toFixed(2) + "</td><td>" + e['segment_E_GP_C_X'].toFixed(2) + "</td><td>" + e['segment_E_GP_C_Y'].toFixed(2) + "</td><td>" + e['segment_E_GP_C_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRowD);
            cnumber = cnumber + 1;

        });
        for (var c = 0; c < cnumber; c++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }

        $("#controlSegmentSetupTable").parent().siblings().remove();


    }
}

function changeControlSegSurveyTable(segmedata, value) {
    drawImageInSurvey(segmedata, value);
    if (value == "GP-C") {

        var cnumber = 0;
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(2)").html("GP-C-X-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(3)").html("GP-C-Y-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(4)").html("GP-C-Z-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(5)").html("GP-C-X-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(6)").html("GP-C-Y-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(7)").html("GP-C-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_C_X'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_C_Y'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_C_Z'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_C_X'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_C_Y'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_C_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSurveyTable tr:last").after(actualRowD);
            cnumber = cnumber + 1;

        });
        for (var c = 0; c < cnumber; c++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        $("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-R") {

        var rnumber = 0;
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(2)").html("GP-R-X-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(3)").html("GP-R-Y-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(4)").html("GP-R-Z-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(5)").html("GP-R-X-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(6)").html("GP-R-Y-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(7)").html("GP-R-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_R_X'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_R_Y'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_R_Z'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_R_X'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_R_Y'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_R_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSurveyTable tr:last").after(actualRowD);
            rnumber = rnumber + 1;

        });
        for (var r = 0; r < rnumber; r++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        $("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-L") {

        var lnumber = 0;
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(2)").html("GP-L-X-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(3)").html("GP-L-Y-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(4)").html("GP-L-Z-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(5)").html("GP-L-X-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(6)").html("GP-L-Y-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(7)").html("GP-L-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_L_X'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_L_Y'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_L_Z'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_L_X'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_L_Y'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_L_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSurveyTable tr:last").after(actualRowD);
            lnumber = lnumber + 1;

        });
        for (var l = 0; l < lnumber; l++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        $("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-D") {

        var dnumber = 0;
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(1)").html("节段编号");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(2)").html("GP-D-X-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(3)").html("GP-D-Y-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(4)").html("GP-D-Z-BEGIN");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(5)").html("GP-D-X-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(6)").html("GP-D-Y-END");
        $("#controlSegmentSurveyTable tr:eq(0) th:nth-child(7)").html("GP-D-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_D_X'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_D_Y'].toFixed(2) + "</td><td>" + e['seg_act_B_GP_D_Z'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_D_X'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_D_Y'].toFixed(2) + "</td><td>" + e['seg_act_E_GP_D_Z'].toFixed(2) + "</td></tr>";
            $("#controlSegmentSurveyTable tr:last").after(actualRowD);
            dnumber = dnumber + 1;

        });
        for (var d = 0; d < dnumber; d++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        $("#controlSegmentSurveyTable").parent().siblings().remove();
    }


}
