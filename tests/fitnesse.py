# -*- coding: utf-8 -*-
from fit.ColumnFixture import ColumnFixture


class Test(ColumnFixture):
    _typeDict = {
        "descrip": "String",
        "GP_L": "Int",
        "GP_R": "Int",
        "GP_C": "Int",
        "Actual_GP_L": "Int",
        "Actual_GP_R": "Int",
        "Actual_GP_C": "Int"
    }

    def _init_(self):
        ColumnFixture.__init__(self)
        self.descrip = ''
        self.GP_L = ''
        self.GP_R = ''
        self.GP_C = ''

    def Actual_GP_L(self):
        return self.GP_L+1

    def Actual_GP_C(self):
        return self.GP_C+2

    def Actual_GP_R(self):
        return self.GP_R+3