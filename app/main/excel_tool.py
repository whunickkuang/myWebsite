# coding=utf8
import xlrd
import os

def read_excel(filename):
    excel_sheet = None
    try:
        excel_sheet = xlrd.open_workbook(filename).sheet_by_index(0)
    except Exception, e:
        print e
    return excel_sheet


def find_index(name, excel_sheet):
    col = excel_sheet.col_values(0)
    return col.index(name)


def analysis_single(excel_sheet, row_beg, col_beg, num):
    dic = dict()
    for i in range(num):
        row, col = row_beg + i, col_beg
        key = excel_sheet.cell_value(row, col)
        value = excel_sheet.cell_value(row, col + 1)
        if not isinstance(value, float):
            value = float(value)
        dic[key] = value
    return dic


def analysis_cast(name, excel_sheet):
    dic = dict()
    row_beg = find_index(name, excel_sheet) + 1
    for i in range(2):
        for j in range(3):
            row, col = row_beg + i * 4, j * 2
            sub_name = excel_sheet.cell_value(row, col)
            row += 1
            dic[sub_name] = analysis_single(excel_sheet, row, col, 3)
    return dic


def analysis_bulkhead(name, excel_sheet):
    dic = dict()
    row_beg = find_index(name, excel_sheet) + 1
    for i in range(1):
        for j in range(3):
            row, col = row_beg + i * 3, j * 2
            sub_name = excel_sheet.cell_value(row, col)
            row += 1
            dic[sub_name] = analysis_single(excel_sheet, row, col, 2)
    return dic


def analysis_surveyed_data(path, filename):
    excel_sheet = read_excel(path + os.sep + filename)
    dic = dict()
    dic['filename'] = filename
    try:
        dic['Match-cast'] = analysis_cast('Match-cast', excel_sheet)
        dic['Wet-cast'] = analysis_cast('Wet-cast', excel_sheet)
        dic['Fixed bulkhead'] = analysis_bulkhead('Fixed bulkhead', excel_sheet)
    except Exception, e:
        print e
    return dic


if __name__ == "__main__":
    dics = analysis_surveyed_data(r"C:\Users\terry\Downloads"
                                  + r"\20150415180520match-forward2015-03-04-01.xls")
    for l in dics:
        print(l)
        print(dics[l])