/**
 * Created by mac pro on 2015/7/5.
 */
/*设置节段表中偏置：*/
function setSegmentOffset(data) {
    var number = 0;
    var segmentData = data.segments_camber;
    segmentData.forEach(function (e) {
        var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_camber_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        //var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_camber_B_GP_C_X'].toFixed(2) + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(2) + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(2) + "</td></tr>";
        var expectRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_camber_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        $("#segActual tr:last").after(actualRow);
        $("#segIdeal tr:last").after(expectRow);
        number = number + 1;

    });
    for (var a = 0; a < number; a++) {
        $("#segActual tr:eq(1)").remove();
        $("#segIdeal tr:eq(1)").remove();
    }
}
/*取消节段表中偏置：*/
function disSegmentOffset(data) {
    var number = 0;
    var segmentData = data.segments_NO_camber;
    segmentData.forEach(function (e) {
        var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['seg_act_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        //var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_camber_B_GP_C_X'].toFixed(2) + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(2) + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(2) + "</td></tr>";
        var expectRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        $("#segActual tr:last").after(actualRow);
        $("#segIdeal tr:last").after(expectRow);
        number = number + 1;

    });
    for (var a = 0; a < number; a++) {
        $("#segActual tr:eq(1)").remove();
        $("#segIdeal tr:eq(1)").remove();
    }
}

function disSegmentCamber(data) {
    var number = 0;
    var segmentData = data.segments_NO_camber;
    segmentData.forEach(function (e) {
        var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['seg_act_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['seg_act_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        //var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_camber_B_GP_C_X'].toFixed(2) + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(2) + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(2) + "</td></tr>";
        var expectRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        $("#segActual tr:last").after(actualRow);
        $("#segIdeal tr:last").after(expectRow);
        number = number + 1;

    });
    for (var a = 0; a < number; a++) {
        $("#segActual tr:eq(1)").remove();
        $("#segIdeal tr:eq(1)").remove();
    }
}
function setSegmentCamber(data) {
    var number = 0;
    var segmentData = data.segments_camber;
    segmentData.forEach(function (e) {
        var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_camber_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        //var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_camber_B_GP_C_X'].toFixed(2) + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(2) + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(2) + "</td></tr>";
        var expectRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_camber_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_camber_E_GP_D_Z'].toFixed(4) + "</td></tr>";
        $("#segActual tr:last").after(actualRow);
        $("#segIdeal tr:last").after(expectRow);
        number = number + 1;

    });
    for (var a = 0; a < number; a++) {
        $("#segActual tr:eq(1)").remove();
        $("#segIdeal tr:eq(1)").remove();
    }
}
/*节段表中的值：*/
function showSegmentData(data) {
    var number = 0;
    var act_number = 0;
    var segmentData = data.segments_data;
    segmentData.forEach(function (e) {
        if (e['seg_act_B_GP_C_X'] != null) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
                e['seg_act_B_GP_C_X'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_C_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_C_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_R_X'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_R_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_R_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_L_X'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_L_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_L_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_D_X'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_D_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_B_GP_D_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_C_X'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_C_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_C_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_R_X'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_R_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_R_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_L_X'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_L_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_L_Z'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_D_X'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_D_Y'].toFixed(4) + "</td><td>" +
                e['seg_act_E_GP_D_Z'].toFixed(4) + "</td></tr>";
            $("#segActual tr:last").after(actualRow);
            act_number += 1;
        }
        //var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_camber_B_GP_C_X'].toFixed(2) + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(2) + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(2) + "</td></tr>";
        var expectRow = "<tr><td>" + e['segment_number'] + "</td><td>" +
            e['segment_B_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_B_GP_D_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_C_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_R_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_L_Z'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_X'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Y'].toFixed(4) + "</td><td>" +
            e['segment_E_GP_D_Z'].toFixed(4) + "</td></tr>";

        $("#segIdeal tr:last").after(expectRow);
        number = number + 1;

    });
    for (var a = 0; a < number; a++) {

        $("#segIdeal tr:eq(1)").remove();
    }
    for (var b = 0; b < act_number; b++) {
        $("#segActual tr:eq(1)").remove();

    }
}
/*节点的预拱值：*/
function setNodeCamber(data) {

    var number = 0;
    var act_number = 0;
    var nodesData = data.result;

    nodesData.forEach(function (e) {
        if (e['node_surveyed_x_after_camber'] != null) {

            var actualRow = "<tr><td>" + e['node_number'] + "</td><td>" + e['node_surveyed_x_after_camber'].toFixed(4)
                + "</td><td>" + e['node_surveyed_y_after_camber'].toFixed(4)
                + "</td><td>" + e['node_surveyed_z_after_camber'].toFixed(4) + "</td></tr>";
            $("#nodeActual tr:last").after(actualRow);
            act_number = act_number + 1;
        }
        var expectRow = "<tr><td>" + e['node_number'] + "</td><td>" + e['node_x_after_camber'].toFixed(4)
            + "</td><td>" + e['node_y_after_camber'].toFixed(4)
            + "</td><td>" + e['node_z_after_camber'].toFixed(4) + "</td></tr>";
        $("#nodeExpect tr:last").after(expectRow);
        number = number + 1;
    });

    for (var a = 0; a < number; a++) {
        $("#nodeExpect tr:eq(1)").remove();
    }
    for (var b = 0; b < act_number; b++) {
        $("#nodeActual tr:eq(1)").remove();
    }
}
/*节点表未预拱值：*/
function disNodeCamber(data) {
    var number = 0;
    var act_number = 0;
    var nodesData = data.result;
    nodesData.forEach(function (e) {
        if (e['node_surveyed_x_coord'] != null) {
            var actualRow = "<tr><td>" + e['node_number'] + "</td><td>" + e['node_surveyed_x_coord'].toFixed(4) + "</td><td>" + e['node_surveyed_y_coord'].toFixed(4) + "</td><td>" + e['node_surveyed_z_coord'].toFixed(4) + "</td></tr>";
            $("#nodeActual tr:last").after(actualRow);
            act_number += 1;
        }
        var expectRow = "<tr><td>" + e['node_number'] + "</td><td>" + e['node_x_coord'].toFixed(4) + "</td><td>" + e['node_y_coord'].toFixed(4) + "</td><td>" + e['node_z_coord'].toFixed(4) + "</td></tr>";
        $("#nodeExpect tr:last").after(expectRow);
        number = number + 1;
    });

    for (var a = 0; a < number; a++) {
        $("#nodeExpect tr:eq(1)").remove();
    }
    for (var b = 0; b < act_number; b++) {
        $("#nodeActual tr:eq(1)").remove();
    }
}

/*绘制控制线中casted图：*/
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
            x_l.push(e['segment_B_GP_L_X'].toFixed(4));
            x_l.push(e['segment_E_GP_L_X'].toFixed(4));
            y_l.push(e['segment_B_GP_L_Y'].toFixed(4));
            y_l.push(e['segment_E_GP_L_Y'].toFixed(4));
            z_l.push(e['segment_B_GP_L_Z'].toFixed(4));
            z_l.push(e['segment_E_GP_L_Z'].toFixed(4));
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

            x_r.push(e['segment_B_GP_R_X'].toFixed(4));
            y_r.push(e['segment_B_GP_R_Y'].toFixed(4));
            z_r.push(e['segment_B_GP_R_Z'].toFixed(4));
            x_r.push(e['segment_E_GP_R_X'].toFixed(4));
            y_r.push(e['segment_E_GP_R_Y'].toFixed(4));
            z_r.push(e['segment_E_GP_R_Z'].toFixed(4));

            number_r.push(e['segment_number']);
            number_r.push(e['segment_number']);

        });


        Draw2d_xy(x_r, y_r, number_r, type_r, mc, ic);
        Draw2d_xz(x_r, z_r, number_r, type_r, mc2, ic2);
    }
    if (value == "GP-D") {

        var type_d = 'GP-D';
        var x_d = [];
        var y_d = [];
        var z_d = [];
        var number_d = [];
        segmedata.forEach(function (e) {
            x_d.push(e['segment_B_GP_D_X'].toFixed(4));
            x_d.push(e['segment_E_GP_D_X'].toFixed(4));
            y_d.push(e['segment_B_GP_D_Y'].toFixed(4));
            y_d.push(e['segment_E_GP_D_Y'].toFixed(4));
            z_d.push(e['segment_B_GP_D_Z'].toFixed(4));
            z_d.push(e['segment_E_GP_D_Z'].toFixed(4));

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

            x_c.push(e['segment_B_GP_C_X'].toFixed(4));
            y_c.push(e['segment_B_GP_C_Y'].toFixed(4));
            z_c.push(e['segment_B_GP_C_Z'].toFixed(4));
            x_c.push(e['segment_E_GP_C_X'].toFixed(4));
            y_c.push(e['segment_E_GP_C_Y'].toFixed(4));
            z_c.push(e['segment_E_GP_C_Z'].toFixed(4));
            number_c.push(e['segment_number']);
            number_c.push(e['segment_number']);
        });


        Draw2d_xy(x_c, y_c, number_c, type_c, mc, ic);
        Draw2d_xz(x_c, z_c, number_c, type_c, mc2, ic2);
    }

}

/*绘制控制线中compare两条线图：*/
function drawImageInCompare(segmedata, value) {
    var mc_compare_xy = document.getElementById("mc_compare_xy");//获取canvas画布
    var ic_compare_xy = mc_compare_xy.getContext("2d");//传参2d,声明画图为2D。
    var mc_compare_xz = document.getElementById("mc_compare_xz");//获取canvas画布
    var ic_compare_xz = mc_compare_xz.getContext("2d");//传参2d,声明画图为2D。
    if (value == "GP-L") {

        var type_l = 'GP-L';
        var x_l = [];
        var y_l = [];
        var z_l = [];
        var x_l2 = [];
        var y_l2 = [];
        var z_l2 = [];

        var number_l = [];
        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_L_X'] != null) {


                x_l.push(e['seg_act_B_GP_L_X'].toFixed(4));
                x_l.push(e['seg_act_E_GP_L_X'].toFixed(4));
                y_l.push(e['seg_act_B_GP_L_Y'].toFixed(4));
                y_l.push(e['seg_act_E_GP_L_Y'].toFixed(4));
                z_l.push(e['seg_act_B_GP_L_Z'].toFixed(4));
                z_l.push(e['seg_act_E_GP_L_Z'].toFixed(4));
                x_l2.push(e['segment_B_GP_L_X'].toFixed(4));
                x_l2.push(e['segment_E_GP_L_X'].toFixed(4));
                y_l2.push(e['segment_B_GP_L_Y'].toFixed(4));
                y_l2.push(e['segment_E_GP_L_Y'].toFixed(4));
                z_l2.push(e['segment_B_GP_L_Z'].toFixed(4));
                z_l2.push(e['segment_E_GP_L_Z'].toFixed(4));
                number_l.push(e['segment_number']);
                number_l.push(e['segment_number']);
            }
        });


        Draw2d_xy_compare(x_l, y_l, number_l, type_l, x_l2, y_l2, mc_compare_xy, ic_compare_xy);
        Draw2d_xz_compare(x_l, z_l, number_l, type_l, x_l2, z_l2, mc_compare_xz, ic_compare_xz);
    }
    if (value == "GP-R") {

        var type_r = 'GP-R';
        var x_r = [];
        var y_r = [];
        var z_r = [];
        var x_r2 = [];
        var y_r2 = [];
        var z_r2 = [];

        var number_r = [];
        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_R_X'] != null) {
                x_r.push(e['seg_act_B_GP_R_X'].toFixed(4));
                x_r.push(e['seg_act_E_GP_R_X'].toFixed(4));
                y_r.push(e['seg_act_B_GP_R_Y'].toFixed(4));
                y_r.push(e['seg_act_E_GP_R_Y'].toFixed(4));
                z_r.push(e['seg_act_B_GP_R_Z'].toFixed(4));
                z_r.push(e['seg_act_E_GP_R_Z'].toFixed(4));
                x_r2.push(e['segment_B_GP_R_X'].toFixed(4));
                x_r2.push(e['segment_E_GP_R_X'].toFixed(4));
                y_r2.push(e['segment_B_GP_R_Y'].toFixed(4));
                y_r2.push(e['segment_E_GP_R_Y'].toFixed(4));
                z_r2.push(e['segment_B_GP_R_Z'].toFixed(4));
                z_r2.push(e['segment_E_GP_R_Z'].toFixed(4));
                number_r.push(e['segment_number']);
                number_r.push(e['segment_number']);
            }
        });


        Draw2d_xy_compare(x_r, y_r, number_r, type_r, x_r2, y_r2, mc_compare_xy, ic_compare_xy);
        Draw2d_xz_compare(x_r, z_r, number_r, type_r, x_r2, z_r2, mc_compare_xz, ic_compare_xz);
    }
    if (value == "GP-C") {

        var type_c = 'GP-C';
        var x_c = [];
        var y_c = [];
        var z_c = [];
        var x_c2 = [];
        var y_c2 = [];
        var z_c2 = [];

        var number_c = [];
        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_C_X'] != null) {


                x_c.push(e['seg_act_B_GP_C_X'].toFixed(4));
                x_c.push(e['seg_act_E_GP_C_X'].toFixed(4));
                y_c.push(e['seg_act_B_GP_C_Y'].toFixed(4));
                y_c.push(e['seg_act_E_GP_C_Y'].toFixed(4));
                z_c.push(e['seg_act_B_GP_C_Z'].toFixed(4));
                z_c.push(e['seg_act_E_GP_C_Z'].toFixed(4));
                x_c2.push(e['segment_B_GP_C_X'].toFixed(4));
                x_c2.push(e['segment_E_GP_C_X'].toFixed(4));
                y_c2.push(e['segment_B_GP_C_Y'].toFixed(4));
                y_c2.push(e['segment_E_GP_C_Y'].toFixed(4));
                z_c2.push(e['segment_B_GP_C_Z'].toFixed(4));
                z_c2.push(e['segment_E_GP_C_Z'].toFixed(4));
                number_c.push(e['segment_number']);
                number_c.push(e['segment_number']);
            }
        });


        Draw2d_xy_compare(x_c, y_c, number_c, type_c, x_c2, y_c2, mc_compare_xy, ic_compare_xy);
        Draw2d_xz_compare(x_c, z_c, number_c, type_c, x_c2, z_c2, mc_compare_xz, ic_compare_xz);
    }
    if (value == "GP-D") {

        var type_d = 'GP-D';
        var x_d = [];
        var y_d = [];
        var z_d = [];
        var x_d2 = [];
        var y_d2 = [];
        var z_d2 = [];

        var number_d = [];
        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_D_X'] != null) {


                x_d.push(e['seg_act_B_GP_D_X'].toFixed(4));
                x_d.push(e['seg_act_E_GP_D_X'].toFixed(4));
                y_d.push(e['seg_act_B_GP_D_Y'].toFixed(4));
                y_d.push(e['seg_act_E_GP_D_Y'].toFixed(4));
                z_d.push(e['seg_act_B_GP_D_Z'].toFixed(4));
                z_d.push(e['seg_act_E_GP_D_Z'].toFixed(4));
                x_d2.push(e['segment_B_GP_D_X'].toFixed(4));
                x_d2.push(e['segment_E_GP_D_X'].toFixed(4));
                y_d2.push(e['segment_B_GP_D_Y'].toFixed(4));
                y_d2.push(e['segment_E_GP_D_Y'].toFixed(4));
                z_d2.push(e['segment_B_GP_D_Z'].toFixed(4));
                z_d2.push(e['segment_E_GP_D_Z'].toFixed(4));
                number_d.push(e['segment_number']);
                number_d.push(e['segment_number']);
            }
        });


        Draw2d_xy_compare(x_d, y_d, number_d, type_d, x_d2, y_d2, mc_compare_xy, ic_compare_xy);
        Draw2d_xz_compare(x_d, z_d, number_d, type_d, x_d2, z_d2, mc_compare_xz, ic_compare_xz);
    }

}
/*绘制控制线中survey图：*/
function drawImageInSurvey(segmedata, value) {
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
            if (e['seg_act_B_GP_L_X'] != null) {


                x_l.push(e['seg_act_B_GP_L_X'].toFixed(4));
                x_l.push(e['seg_act_E_GP_L_X'].toFixed(4));
                y_l.push(e['seg_act_B_GP_L_Y'].toFixed(4));
                y_l.push(e['seg_act_E_GP_L_Y'].toFixed(4));
                z_l.push(e['seg_act_B_GP_L_Z'].toFixed(4));
                z_l.push(e['seg_act_E_GP_L_Z'].toFixed(4));
                number_l.push(e['segment_number']);
                number_l.push(e['segment_number']);
            }
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
            if (e['seg_act_B_GP_R_X'] != null) {


                x_r.push(e['seg_act_B_GP_R_X'].toFixed(4));
                y_r.push(e['seg_act_B_GP_R_Y'].toFixed(4));
                z_r.push(e['seg_act_B_GP_R_Z'].toFixed(4));
                x_r.push(e['seg_act_E_GP_R_X'].toFixed(4));
                y_r.push(e['seg_act_E_GP_R_Y'].toFixed(4));
                z_r.push(e['seg_act_E_GP_R_Z'].toFixed(4));
                number_r.push(e['segment_number']);
                number_r.push(e['segment_number']);
            }
        });


        Draw2d_xy(x_r, y_r, number_r, type_r, mc3, ic3);
        Draw2d_xz(x_r, z_r, number_r, type_r, mc4, ic4);
    }
    if (value == "GP-D") {

        var type_d = 'GP-D';
        var x_d = [];
        var y_d = [];
        var z_d = [];
        var number_d = [];
        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_D_X'] != null) {
                x_d.push(e['seg_act_B_GP_D_X'].toFixed(4));
                x_d.push(e['seg_act_E_GP_D_X'].toFixed(4));
                y_d.push(e['seg_act_B_GP_D_Y'].toFixed(4));
                y_d.push(e['seg_act_E_GP_D_Y'].toFixed(4));
                z_d.push(e['seg_act_B_GP_D_Z'].toFixed(4));
                z_d.push(e['seg_act_E_GP_D_Z'].toFixed(4));

                number_d.push(e['segment_number']);
                number_d.push(e['segment_number']);
            }
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
            if (e['seg_act_B_GP_C_X'] != null) {

                x_c.push(e['seg_act_B_GP_C_X'].toFixed(4));
                y_c.push(e['seg_act_B_GP_C_Y'].toFixed(4));
                z_c.push(e['seg_act_B_GP_C_Z'].toFixed(4));
                x_c.push(e['seg_act_E_GP_C_X'].toFixed(4));
                y_c.push(e['seg_act_E_GP_C_Y'].toFixed(4));
                z_c.push(e['seg_act_E_GP_C_Z'].toFixed(4));
                number_c.push(e['segment_number']);
                number_c.push(e['segment_number']);
            }
        });


        Draw2d_xy(x_c, y_c, number_c, type_c, mc3, ic3);

        Draw2d_xz(x_c, z_c, number_c, type_c, mc4, ic4);
    }
}
function drawImgs(id1,id2,position,data1,data2,series_name){
    //var mc1 = document.getElementById(id1);//获取canvas画布
    //var ic1 = mc1.getContext("2d");//传参2d,声明画图为2D。
    //var mc2 = document.getElementById(id2);//获取canvas画布
    //var ic2 = mc2.getContext("2d");//传参2d,声明画图为2D。

        var options = {
                chart: {
                    renderTo : id1,
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
                        text: 'x坐标(米)'
                    }
                },
                yAxis: {
                    title: {
                        text: 'y坐标(米)'
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
        var options2 = {
                chart: {
                    renderTo : id2,
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
                        text: 'x坐标(米)'
                    }
                },
                yAxis: {
                    title: {
                        text: 'y坐标(米)'
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


    var x = [];
    var y = [];
    var z = [];
    var number = [];
    var segs = data1[0];
    for (var seg in segs){
        x.push(segs[seg][0][0].toFixed(4));
        y.push(segs[seg][0][1].toFixed(4));
        z.push(segs[seg][0][2].toFixed(4));
        x.push(segs[seg][1][0].toFixed(4));
        y.push(segs[seg][1][1].toFixed(4));
        z.push(segs[seg][1][2].toFixed(4));
        number.push(seg);
        number.push(seg);
    }
    //console.log(x);
    //console.log(y);
    //console.log(z);
    if(data2 != null){
        var x_2 = [];
        var y_2 = [];
        var z_2 = [];
        var segs = data2[0];
        for (var seg in segs){
            x_2.push(segs[seg][0][0].toFixed(4));
            y_2.push(segs[seg][0][1].toFixed(4));
            z_2.push(segs[seg][0][2].toFixed(4));
            x_2.push(segs[seg][1][0].toFixed(4));
            y_2.push(segs[seg][1][1].toFixed(4));
            z_2.push(segs[seg][1][2].toFixed(4));
            number.push(seg);
            number.push(seg);
        }

        //console.log(x_2);
        //console.log(y_2);
        //console.log(z_2);
        //Draw2d_xy_compare(x, y, number, position, x_2, y_2, mc1, ic1);
        //Draw2d_xz_compare(x, z, number, position, x_2, z_2, mc2, ic2);
        drawChartCompare(options,x,y,number,position, x_2, y_2, 'y');
        drawChartCompare(options2,x,y,number,position, x_2, z_2, 'z');
        return;

    }
    drawChart(options,x,y,number,position, 'y', series_name);
    drawChart(options2,x,z,number,position, 'z', series_name);

    //Draw2d_xy(x, y, number, position, mc1, ic1);
    //Draw2d_xz(x, z, number, position, mc2, ic2);
}
function changeTable(segnumber,position,type,data){

    var lnumber = 0;
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(1)").html("节段编号");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(2)").html(position+"-X-BEGIN");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(3)").html(position+"-Y-BEGIN");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(4)").html(position+"-Z-BEGIN");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(5)").html(position+"-X-END");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(6)").html(position+"-Y-END");
    $(".displaySeg"+segnumber+" tr:eq(0) th:nth-child(7)").html(position+"-Z-END");


    var segs = data[0];
    for(var seg in segs){
        //console.log(segs[seg]);
        var actualRow = "<tr><td>" + seg + "</td><td>" + segs[seg][0][0].toFixed(4) + "</td><td>" + segs[seg][0][1].toFixed(4) + "</td><td>" + segs[seg][0][2].toFixed(4) + "</td><td>" + segs[seg][1][0].toFixed(4) + "</td><td>" + segs[seg][1][1].toFixed(4) + "</td><td>" + segs[seg][1][2].toFixed(4) + "</td></tr>";

        /*var actualRow = "<tr><td>" + seg + "</td><td>"
            + segs[seg][0][0].toFixed(4) + "</td><td>"
            + segs[seg][0][1].toFixed(4) + "</td><td>"
            + segs[seg][0][2].toFixed(4) + "</td><td>"
            + segs[seg][1][0].toFixed(4) + "</td><td>"
            + segs[seg][1][1].toFixed(4) + "</td><td>"
            + segs[seg][1][2].toFixed(4) + "</td><tr>";*/
        $("#controlSegment"+type+"Table tr:last").after(actualRow);
        lnumber = lnumber + 1;
    }
    //console.log("#controlSegment"+type+"Table tr:last")

    for (var l = 0; l < lnumber; l++) {
        $("#controlSegment"+type+"Table tr:eq(1)").remove();


    }
}
/*切换select框，显示casted数据表：*/
function changeControlSegTable(segmedata, value) {
    drawImapge(segmedata, value);
    if (value == "GP-L") {

        var lnumber = 0;
        $(".displaySeg2 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg2 tr:eq(0) th:nth-child(2)").html("GP-L-X-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(3)").html("GP-L-Y-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(4)").html("GP-L-Z-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(5)").html("GP-L-X-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(6)").html("GP-L-Y-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(7)").html("GP-L-Z-END");


        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_L_X'].toFixed(4) + "</td><td>" + e['segment_B_GP_L_Y'].toFixed(4) + "</td><td>" + e['segment_B_GP_L_Z'].toFixed(4) + "</td><td>" + e['segment_E_GP_L_X'].toFixed(4) + "</td><td>" + e['segment_E_GP_L_Y'].toFixed(4) + "</td><td>" + e['segment_E_GP_L_Z'].toFixed(4) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            lnumber = lnumber + 1;

        });
        for (var l = 0; l < lnumber; l++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSetupTable").parent().siblings().remove();
    }
    if (value == "GP-R") {

        var rnumber = 0;
        $(".displaySeg2 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg2 tr:eq(0) th:nth-child(2)").html("GP-R-X-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(3)").html("GP-R-Y-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(4)").html("GP-R-Z-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(5)").html("GP-R-X-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(6)").html("GP-R-Y-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(7)").html("GP-R-Z-END");

        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_R_X'].toFixed(4) + "</td><td>" + e['segment_B_GP_R_Y'].toFixed(4) + "</td><td>" + e['segment_B_GP_R_Z'].toFixed(4) + "</td><td>" + e['segment_E_GP_R_X'].toFixed(4) + "</td><td>" + e['segment_E_GP_R_Y'].toFixed(4) + "</td><td>" + e['segment_E_GP_R_Z'].toFixed(4) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            rnumber = rnumber + 1;

        });
        for (var r = 0; r < rnumber; r++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSetupTable").parent().siblings().remove();
    }

    if (value == "GP-D") {

        var dnumber = 0;
        $(".displaySeg2 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg2 tr:eq(0) th:nth-child(2)").html("GP-D-X-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(3)").html("GP-D-Y-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(4)").html("GP-D-Z-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(5)").html("GP-D-X-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(6)").html("GP-D-Y-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(7)").html("GP-D-Z-END");

        segmedata.forEach(function (e) {

            var actualRow = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_D_X'].toFixed(4) + "</td><td>" + e['segment_B_GP_D_Y'].toFixed(4) + "</td><td>" + e['segment_B_GP_D_Z'].toFixed(4) + "</td><td>" + e['segment_E_GP_D_X'].toFixed(4) + "</td><td>" + e['segment_E_GP_D_Y'].toFixed(4) + "</td><td>" + e['segment_E_GP_D_Z'].toFixed(4) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRow);
            dnumber = dnumber + 1;

        });
        for (var d = 0; d < dnumber; d++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSetupTable").parent().siblings().remove();
    }


    if (value == "GP-C") {

        var cnumber = 0;
        $(".displaySeg2 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg2 tr:eq(0) th:nth-child(2)").html("GP-C-X-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(3)").html("GP-C-Y-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(4)").html("GP-C-Z-BEGIN");
        $(".displaySeg2 tr:eq(0) th:nth-child(5)").html("GP-C-X-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(6)").html("GP-C-Y-END");
        $(".displaySeg2 tr:eq(0) th:nth-child(7)").html("GP-C-Z-END");

        segmedata.forEach(function (e) {

            var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['segment_B_GP_C_X'].toFixed(4) + "</td><td>" + e['segment_B_GP_C_Y'].toFixed(4) + "</td><td>" + e['segment_B_GP_C_Z'].toFixed(4) + "</td><td>" + e['segment_E_GP_C_X'].toFixed(4) + "</td><td>" + e['segment_E_GP_C_Y'].toFixed(4) + "</td><td>" + e['segment_E_GP_C_Z'].toFixed(4) + "</td></tr>";
            $("#controlSegmentSetupTable tr:last").after(actualRowD);
            cnumber = cnumber + 1;

        });
        for (var c = 0; c < cnumber; c++) {
            $("#controlSegmentSetupTable tr:eq(1)").remove();

        }

        //$("#controlSegmentSetupTable").parent().siblings().remove();


    }
}
/*切换select框，显示survey数据表：*/
function changeControlSegSurveyTable(segmedata, value) {
    drawImageInSurvey(segmedata, value);
    if (value == "GP-C") {

        var cnumber = 0;
        $(".displaySeg3 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg3 tr:eq(0) th:nth-child(2)").html("GP-C-X-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(3)").html("GP-C-Y-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(4)").html("GP-C-Z-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(5)").html("GP-C-X-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(6)").html("GP-C-Y-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(7)").html("GP-C-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_C_X'] != null) {


                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_C_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_C_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_C_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentSurveyTable tr:last").after(actualRowD);
                cnumber = cnumber + 1;
            }
        });
        for (var c = 0; c < cnumber; c++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-R") {

        var rnumber = 0;
        $(".displaySeg3 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg3 tr:eq(0) th:nth-child(2)").html("GP-R-X-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(3)").html("GP-R-Y-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(4)").html("GP-R-Z-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(5)").html("GP-R-X-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(6)").html("GP-R-Y-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(7)").html("GP-R-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_R_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_R_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_R_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_R_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentSurveyTable tr:last").after(actualRowD);
                rnumber = rnumber + 1;
            }
        });
        for (var r = 0; r < rnumber; r++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-L") {

        var lnumber = 0;
        $(".displaySeg3 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg3 tr:eq(0) th:nth-child(2)").html("GP-L-X-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(3)").html("GP-L-Y-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(4)").html("GP-L-Z-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(5)").html("GP-L-X-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(6)").html("GP-L-Y-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(7)").html("GP-L-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_L_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_L_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_L_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_L_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentSurveyTable tr:last").after(actualRowD);
                lnumber = lnumber + 1;
            }
        });
        for (var l = 0; l < lnumber; l++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSurveyTable").parent().siblings().remove();
    }

    if (value == "GP-D") {

        var dnumber = 0;
        $(".displaySeg3 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg3 tr:eq(0) th:nth-child(2)").html("GP-D-X-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(3)").html("GP-D-Y-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(4)").html("GP-D-Z-BEGIN");
        $(".displaySeg3 tr:eq(0) th:nth-child(5)").html("GP-D-X-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(6)").html("GP-D-Y-END");
        $(".displaySeg3 tr:eq(0) th:nth-child(7)").html("GP-D-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_D_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_D_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_D_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_D_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentSurveyTable tr:last").after(actualRowD);
                dnumber = dnumber + 1;
            }
        });
        for (var d = 0; d < dnumber; d++) {
            $("#controlSegmentSurveyTable tr:eq(1)").remove();

        }
        //$("#controlSegmentSurveyTable").parent().siblings().remove();
    }


}


function changeControlSegCompareTable(segmedata, value) {
    drawImageInCompare(segmedata, value);
    if (value == "GP-C") {

        var cnumber = 0;
        $(".displaySeg4 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg4 tr:eq(0) th:nth-child(2)").html("GP-C-X-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(3)").html("GP-C-Y-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(4)").html("GP-C-Z-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(5)").html("GP-C-X-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(6)").html("GP-C-Y-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(7)").html("GP-C-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_C_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_C_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_C_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_C_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_C_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentCompareTable tr:last").after(actualRowD);
                cnumber = cnumber + 1;
            }
        });
        for (var c = 0; c < cnumber; c++) {
            $("#controlSegmentCompareTable tr:eq(1)").remove();

        }
        //$("#controlSegmentCompareTable").parent().siblings().remove();
    }

    if (value == "GP-R") {

        var rnumber = 0;
        $(".displaySeg4 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg4 tr:eq(0) th:nth-child(2)").html("GP-R-X-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(3)").html("GP-R-Y-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(4)").html("GP-R-Z-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(5)").html("GP-R-X-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(6)").html("GP-R-Y-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(7)").html("GP-R-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_R_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_R_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_R_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_R_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_R_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentCompareTable tr:last").after(actualRowD);
                rnumber = rnumber + 1;
            }
        });
        for (var r = 0; r < rnumber; r++) {
            $("#controlSegmentCompareTable tr:eq(1)").remove();

        }
        //  $("#controlSegmentCompareTable").parent().siblings().remove();
    }

    if (value == "GP-L") {

        var lnumber = 0;
        $(".displaySeg4 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg4 tr:eq(0) th:nth-child(2)").html("GP-L-X-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(3)").html("GP-L-Y-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(4)").html("GP-L-Z-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(5)").html("GP-L-X-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(6)").html("GP-L-Y-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(7)").html("GP-L-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_L_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_L_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_L_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_L_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_L_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentCompareTable tr:last").after(actualRowD);
                lnumber = lnumber + 1;
            }
        });
        for (var l = 0; l < lnumber; l++) {
            $("#controlSegmentCompareTable tr:eq(1)").remove();

        }
        //$("#controlSegmentCompareTable").parent().siblings().remove();
    }

    if (value == "GP-D") {

        var dnumber = 0;
        $(".displaySeg4 tr:eq(0) th:nth-child(1)").html("节段编号");
        $(".displaySeg4 tr:eq(0) th:nth-child(2)").html("GP-D-X-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(3)").html("GP-D-Y-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(4)").html("GP-D-Z-BEGIN");
        $(".displaySeg4 tr:eq(0) th:nth-child(5)").html("GP-D-X-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(6)").html("GP-D-Y-END");
        $(".displaySeg4 tr:eq(0) th:nth-child(7)").html("GP-D-Z-END");

        segmedata.forEach(function (e) {
            if (e['seg_act_B_GP_D_X'] != null) {
                var actualRowD = "<tr><td>" + e['segment_number'] + "</td><td>" + e['seg_act_B_GP_D_X'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_D_Y'].toFixed(4) + "</td><td>" + e['seg_act_B_GP_D_Z'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_X'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_Y'].toFixed(4) + "</td><td>" + e['seg_act_E_GP_D_Z'].toFixed(4) + "</td></tr>";
                $("#controlSegmentCompareTable tr:last").after(actualRowD);
                dnumber = dnumber + 1;
            }
        });
        for (var d = 0; d < dnumber; d++) {
            $("#controlSegmentCompareTable tr:eq(1)").remove();

        }
        //$("#controlSegmentCompareTable").parent().siblings().remove();
    }


}
function list_swap(list, idx_a, idx_b) {
    var tmp = list[idx_a];
    list[idx_a] = list[idx_b];
    list[idx_b] = tmp;
}
function get_lists(order, survey_data) {
    var order_lists = [];
    if (survey_data == null) {
        if (order['segment_is_first']) {
            order_lists[order_lists.length] = ["GP-L", order['float_bulkhead_GP_L_offset'], order['float_bulkhead_GP_L_elevation'], order['float_bulkhead_GP_L_length']];
            order_lists[order_lists.length] = ["GP-C", order['float_bulkhead_GP_C_offset'], order['float_bulkhead_GP_C_elevation'], order['float_bulkhead_GP_C_length']];
            order_lists[order_lists.length] = ["GP-R", order['float_bulkhead_GP_R_offset'], order['float_bulkhead_GP_R_elevation'], order['float_bulkhead_GP_R_length']];
        }
        else {
            order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_begin_match'], order['GP_L_elevation_begin_match'], order['GP_L_length_begin_match'], order['GP_L_offset_begin_match'], order['GP_L_elevation_begin_match'], order['GP_L_length_begin_match']];
            order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_begin_match'], order['GP_C_elevation_begin_match'], order['GP_C_length_begin_match'], order['GP_C_offset_begin_match'], order['GP_C_elevation_begin_match'], order['GP_C_length_begin_match']];
            order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_begin_match'], order['GP_R_elevation_begin_match'], order['GP_R_length_begin_match'], order['GP_R_offset_begin_match'], order['GP_R_elevation_begin_match'], order['GP_R_length_begin_match']];
            order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_end_match'], order['GP_L_elevation_end_match'], order['GP_L_length_end_match'], order['GP_L_offset_end_match'], order['GP_L_elevation_end_match'], order['GP_L_length_end_match']];
            order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_end_match'], order['GP_C_elevation_end_match'], order['GP_C_length_end_match'], order['GP_C_offset_end_match'], order['GP_C_elevation_end_match'], order['GP_C_length_end_match']];
            order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_end_match'], order['GP_R_elevation_end_match'], order['GP_R_length_end_match'], order['GP_R_offset_end_match'], order['GP_R_elevation_end_match'], order['GP_R_length_end_match']];
        }
        order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_begin'], order['GP_L_elevation_begin'], order['GP_L_length_begin'], order['GP_L_offset_begin'], order['GP_L_elevation_begin'], order['GP_L_length_begin']];
        order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_begin'], order['GP_C_elevation_begin'], order['GP_C_length_begin'], order['GP_C_offset_begin'], order['GP_C_elevation_begin'], order['GP_C_length_begin']];
        order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_begin'], order['GP_R_elevation_begin'], order['GP_R_length_begin'], order['GP_R_offset_begin'], order['GP_R_elevation_begin'], order['GP_R_length_begin']];
        order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_end'], order['GP_L_elevation_end'], order['GP_L_length_end'], order['GP_L_offset_end'], order['GP_L_elevation_end'], order['GP_L_length_end']];
        order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_end'], order['GP_C_elevation_end'], order['GP_C_length_end'], order['GP_C_offset_end'], order['GP_C_elevation_end'], order['GP_C_length_end']];
        order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_end'], order['GP_R_elevation_end'], order['GP_R_length_end'], order['GP_R_offset_end'], order['GP_R_elevation_end'], order['GP_R_length_end']];
        order_lists[order_lists.length] = ["GP-L", order['bulkhead_GP_L_offset'], order['bulkhead_GP_L_elevation'], order['bulkhead_GP_L_offset'], order['bulkhead_GP_L_elevation']];
        order_lists[order_lists.length] = ["GP-C", order['bulkhead_GP_C_offset'], order['bulkhead_GP_C_elevation'], order['bulkhead_GP_C_offset'], order['bulkhead_GP_C_elevation']];
        order_lists[order_lists.length] = ["GP-R", order['bulkhead_GP_R_offset'], order['bulkhead_GP_R_elevation'], order['bulkhead_GP_R_offset'], order['bulkhead_GP_R_elevation']];
    }
    else {
        if (order['segment_is_first']) {
            order_lists[order_lists.length] = ["GP-L", order['float_bulkhead_GP_L_offset'], order['float_bulkhead_GP_L_elevation'], order['float_bulkhead_GP_L_length'], survey_data['float_bulkhead_GP_L_offset'], survey_data['float_bulkhead_GP_L_elevation'], survey_data['float_bulkhead_GP_L_length']];
            order_lists[order_lists.length] = ["GP-C", order['float_bulkhead_GP_C_offset'], order['float_bulkhead_GP_C_elevation'], order['float_bulkhead_GP_C_length'], survey_data['float_bulkhead_GP_C_offset'], survey_data['float_bulkhead_GP_C_elevation'], survey_data['float_bulkhead_GP_C_length']];
            order_lists[order_lists.length] = ["GP-R", order['float_bulkhead_GP_R_offset'], order['float_bulkhead_GP_R_elevation'], order['float_bulkhead_GP_R_length'], survey_data['float_bulkhead_GP_R_offset'], survey_data['float_bulkhead_GP_R_elevation'], survey_data['float_bulkhead_GP_R_length']];
        }
        else {
            order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_begin_match'], order['GP_L_elevation_begin_match'], order['GP_L_length_begin_match'], survey_data['GP_L_offset_begin_match'], survey_data['GP_L_elevation_begin_match'], survey_data['GP_L_length_begin_match']];
            order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_begin_match'], order['GP_C_elevation_begin_match'], order['GP_C_length_begin_match'], survey_data['GP_C_offset_begin_match'], survey_data['GP_C_elevation_begin_match'], survey_data['GP_C_length_begin_match']];
            order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_begin_match'], order['GP_R_elevation_begin_match'], order['GP_R_length_begin_match'], survey_data['GP_R_offset_begin_match'], survey_data['GP_R_elevation_begin_match'], survey_data['GP_R_length_begin_match']];
            order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_end_match'], order['GP_L_elevation_end_match'], order['GP_L_length_end_match'], survey_data['GP_L_offset_end_match'], survey_data['GP_L_elevation_end_match'], survey_data['GP_L_length_end_match']];
            order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_end_match'], order['GP_C_elevation_end_match'], order['GP_C_length_end_match'], survey_data['GP_C_offset_end_match'], survey_data['GP_C_elevation_end_match'], survey_data['GP_C_length_end_match']];
            order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_end_match'], order['GP_R_elevation_end_match'], order['GP_R_length_end_match'], survey_data['GP_R_offset_end_match'], survey_data['GP_R_elevation_end_match'], survey_data['GP_R_length_end_match']];
        }
        order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_begin'], order['GP_L_elevation_begin'], order['GP_L_length_begin'], survey_data['GP_L_offset_begin'], survey_data['GP_L_elevation_begin'], survey_data['GP_L_length_begin']];
        order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_begin'], order['GP_C_elevation_begin'], order['GP_C_length_begin'], survey_data['GP_C_offset_begin'], survey_data['GP_C_elevation_begin'], survey_data['GP_C_length_begin']];
        order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_begin'], order['GP_R_elevation_begin'], order['GP_R_length_begin'], survey_data['GP_R_offset_begin'], survey_data['GP_R_elevation_begin'], survey_data['GP_R_length_begin']];
        order_lists[order_lists.length] = ["GP-L", order['GP_L_offset_end'], order['GP_L_elevation_end'], order['GP_L_length_end'], survey_data['GP_L_offset_end'], survey_data['GP_L_elevation_end'], survey_data['GP_L_length_end']];
        order_lists[order_lists.length] = ["GP-C", order['GP_C_offset_end'], order['GP_C_elevation_end'], order['GP_C_length_end'], survey_data['GP_C_offset_end'], survey_data['GP_C_elevation_end'], survey_data['GP_C_length_end']];
        order_lists[order_lists.length] = ["GP-R", order['GP_R_offset_end'], order['GP_R_elevation_end'], order['GP_R_length_end'], survey_data['GP_R_offset_end'], survey_data['GP_R_elevation_end'], survey_data['GP_R_length_end']];
        order_lists[order_lists.length] = ["GP-L", order['bulkhead_GP_L_offset'], order['bulkhead_GP_L_elevation'], 0, survey_data['bulkhead_GP_L_offset'], survey_data['bulkhead_GP_L_elevation'], 0];
        order_lists[order_lists.length] = ["GP-C", order['bulkhead_GP_C_offset'], order['bulkhead_GP_C_elevation'], 0, survey_data['bulkhead_GP_C_offset'], survey_data['bulkhead_GP_C_elevation'], 0];
        order_lists[order_lists.length] = ["GP-R", order['bulkhead_GP_R_offset'], order['bulkhead_GP_R_elevation'], 0, survey_data['bulkhead_GP_R_offset'], survey_data['bulkhead_GP_R_elevation'], 0];

    }
    if (!order['segment_is_at_begin']) {
        if (order['segment_is_first']) {
            list_swap(order_lists, 0, 2);
            list_swap(order_lists, 3, 8);
            list_swap(order_lists, 5, 6);
            list_swap(order_lists, 4, 7);
            list_swap(order_lists, 9, 11);
        }
        else {
            list_swap(order_lists, 0, 5);
            list_swap(order_lists, 2, 3);
            list_swap(order_lists, 1, 4);
            list_swap(order_lists, 6, 11);
            list_swap(order_lists, 8, 9);
            list_swap(order_lists, 7, 10);
            list_swap(order_lists, 12, 14);
        }
    }
    return order_lists;
}
function drawProcessAllOrder(order, survey_data, ic, step, is_first, is_simply) {
    var order_list = get_lists(order, survey_data);
    if (is_first && !is_simply) {
        drawProcessFirstOrderImage(order_list, ic, step);
    }
    else if (!is_first && !is_simply) {
        drawProcessImage(order_list, ic, step);
    }
    else if (is_first && is_simply) {

        drawProcessFirstOrderImageSimply(order_list, ic, step);
    }
    else {
        drawProcessImageSimply(order_list, ic, step);
    }
}

function drawProcessImage(order, ic, step) {
    if (step == 1) {
        drawProcessTopNoMeasure(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8],
            order[9], order[10], order[11], order[12], order[13], order[14], ic);
    }
    if (step == 2) {
        drawProcessBottomNoMeasure(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8],
            order[9], order[10], order[11], order[12], order[13], order[14], ic);

    }
    if (step == 3) {
        drawProcessAllUseMeasure(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], order[12], order[13], order[14], ic);

    }


}

function drawProcessFirstOrderImage(order, ic, step) {
    if (step == 1) {
        drawProcessTopNoMeasureNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }
    if (step == 2) {
        drawProcessBottomNoMeasureNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }
    if (step == 3) {
        drawProcessAllUseMeasureNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }
}

function drawProcessImageSimply(order, ic, step) {
    if (step == 1) {
        drawProcessSimpleStructureTop(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], order[12], order[13], order[14], ic);
    }
    if (step == 2) {
        drawProcessSimpleStructureBottom(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], order[12], order[13], order[14], ic);
    }
    if (step == 3) {
        drawProcessSimpleStructureAll(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], order[12], order[13], order[14], ic);
    }
}

function drawProcessFirstOrderImageSimply(order, ic, step) {
    if (step == 1) {
        drawProcessSimpleStructureTopNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }
    if (step == 2) {
        drawProcessSimpleStructureBottomNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }
    if (step == 3) {
        drawProcessSimpleStructureAllNo1(order[0], order[1], order[2], order[3], order[4], order[5], order[6], order[7], order[8], order[9], order[10], order[11], ic);
    }


}