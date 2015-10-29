# coding=utf8
__author__ = 'terry'
from math import fabs, sqrt
from copy import deepcopy

eps = 1e-8


# 判断一个float型的数字是不是0
def is_zero_number(number):
    if fabs(number) < eps:
        return True
    return False


# 判断一个float型的数字的符号
def sign(number):
    if is_zero_number(number):
        return 0
    elif number > eps:
        return 1
    else:
        return -1


class Point3D:
    def __init__(self, x=0.0, y=0.0, z=0.0):
        self.x, self.y, self.z = float(x), float(y), float(z)

    def is_zero_vector(self):
        if is_zero_number(self.x) and is_zero_number(self.y) and is_zero_number(self.z):
            return True
        return False

    def copy(self):
        return deepcopy(self)

    def to_tuple(self):
        return tuple([self.x, self.y, self.z])

    def __str__(self):
        return "(%f, %f, %f)" % (self.x, self.y, self.z)

    def __add__(self, other):
        return Point3D(self.x + other.x, self.y + other.y, self.z + other.z)

    def __sub__(self, other):
        return Point3D(self.x - other.x, self.y - other.y, self.z - other.z)

    def __mul__(self, other):
        return Point3D(self.x * other, self.y * other, self.z * other)

    def get_unit(self):
        length = mod(self)
        return Point3D(self.x / length, self.y / length, self.z / length)

    @classmethod
    def value_of(cls, tuple):
        if tuple is None:
            return None
        return Point3D(tuple[0], tuple[1], tuple[2])


# 向量叉乘
def cross_product(vector_a, vector_b):
    return Point3D(vector_a.y * vector_b.z - vector_a.z * vector_b.y,
                   vector_a.z * vector_b.x - vector_a.x * vector_b.z,
                   vector_a.x * vector_b.y - vector_a.y * vector_b.x)


# 向量点乘
def dot_product(vector_a, vector_b):
    return vector_a.x * vector_b.x + vector_a.y * vector_b.y + vector_a.z * vector_b.z


# 求一个三维向量的模长
def mod(vector_3d):
    if vector_3d.is_zero_vector():
        return 0
    return sqrt(vector_3d.x ** 2 + vector_3d.y ** 2 + vector_3d.z ** 2)


# 获取一个三维向量的方向余弦
def get_director_cos_vector(vector_3d):
    m = mod(vector_3d)
    if is_zero_number(m):
        return 0
    return [vector_3d.x / m, vector_3d.y / m, vector_3d.z / m]


class Line3D:
    def __init__(self, point_begin, point_end):
        self.point_beg = point_begin.copy()
        self.point_end = point_end.copy()

    def __str__(self):
        return "(%s,%s)" % (self.point_beg, self.point_end)


class Plane3D:
    def __init__(self, point_a, point_b, point_c):
        self.point_a = point_a.copy()
        self.point_b = point_b.copy()
        self.point_c = point_c.copy()

    def normal_vector(self):
        return cross_product(self.point_b - self.point_a, self.point_c - self.point_a)

    def __str__(self):
        return "(%s,%s,%s)" % (self.point_a, self.point_b, self.point_c)


# 判断两直线是否相交
def is_line_inter(line_a, line_b):
    return True


# 获取直线与直线相交交点
def line_line_inter(line_a, line_b):
    ret = line_a.point_beg.copy()
    v1 = cross_product(line_a.point_beg - line_b.point_beg,
                       line_b.point_end - line_b.point_beg)
    v2 = cross_product(line_a.point_end - line_a.point_beg,
                       line_b.point_end - line_b.point_beg)
    factor = mod(v1) / mod(v2)
    if dot_product(v1, v2) > 0:
        factor *= -1
    return ret + (line_a.point_end - line_a.point_beg) * factor


# 获取直线与平面的交点
def line_plane_inter(line, plane):
    ret = plane.normal_vector()
    direction_vector = line.point_end - line.point_beg
    factor = dot_product(ret, plane.point_a - line.point_beg) / dot_product(ret, line.point_end - line.point_beg)
    return line.point_beg + direction_vector * factor


# 判断点是否在线段上
def point_is_on_segment(point, line):
    if point is None:
        return False
    return sign(mod(cross_product(point - line.point_beg, line.point_end - line.point_beg))) == 0 and \
           (point.x - line.point_beg.x) * (point.x - line.point_end.x) < eps and \
           (point.y - line.point_beg.y) * (point.y - line.point_end.y) < eps and \
           (point.z - line.point_beg.z) * (point.z - line.point_end.z) < eps


# 计算过定点且与定条直线垂直的平面
def plane_vertical_to_line(line, point_on_plane=Point3D(0, 0, 0)):
    if line.point_beg.x == line.point_end.x and line.point_beg.z == line.point_end.z:
        point_h = point_on_plane + Point3D(z=1)
    else:
        point_beg_h = line.point_beg - Point3D(y=line.point_beg.y)
        point_end_h = line.point_end - Point3D(y=line.point_end.y)
        vector_h = point_end_h - point_beg_h
        vertial_vector_h = Point3D(x=vector_h.z,z=-vector_h.x)
        point_h = point_on_plane + vertial_vector_h
    if line.point_beg.x == line.point_end.x and line.point_beg.y == line.point_end.y:
        point_v = point_on_plane + Point3D(y=1)
    else:
        point_beg_v = line.point_beg - Point3D(z=line.point_beg.z)
        point_end_v = line.point_end - Point3D(z=line.point_end.z)
        vector_v = point_end_v - point_beg_v
        vertial_vector_v = Point3D(x=vector_v.y,y=-vector_v.x)
        point_v = point_on_plane + vertial_vector_v
    plane = Plane3D(point_on_plane, point_h, point_v)
    return plane


# 坐标转换类
class CoordinateTransformation:
    # 将坐标系B的三个坐标轴方向用坐标系A中的向量vector_x, vector_y, vector_z表示，
    # 将坐标系B的原点O用坐标系A中的坐标表示
    # 从而获得两坐标系转换的方向余弦矩阵
    def __init__(self, vector_x, vector_y, vector_z, original_point):
        self.direct_cos_vector_x = get_director_cos_vector(vector_x)
        self.direct_cos_vector_y = get_director_cos_vector(vector_y)
        self.direct_cos_vector_z = get_director_cos_vector(vector_z)
        self.original_point = original_point.copy()

    # 将坐标系B中的点point_3d的坐标(X, Y, Z)转换为坐标系A下的坐标(x,y,z)
    def point_transformation(self, point_3d):
        x = self.direct_cos_vector_x[0] * point_3d.x + self.direct_cos_vector_y[0] * point_3d.y + \
            self.direct_cos_vector_z[0] * point_3d.z + self.original_point.x
        y = self.direct_cos_vector_x[1] * point_3d.x + self.direct_cos_vector_y[1] * point_3d.y + \
            self.direct_cos_vector_z[1] * point_3d.z + self.original_point.y
        z = self.direct_cos_vector_x[2] * point_3d.x + self.direct_cos_vector_y[2] * point_3d.y + \
            self.direct_cos_vector_z[2] * point_3d.z + self.original_point.z
        return Point3D(x, y, z)

    # 将坐标系A中的点point_3d的坐标(x,y,z)转换回坐标系B下的坐标(X, Y, Z)
    def point_transformation_back(self, point_3d):
        l1 = self.direct_cos_vector_x[0]
        l2 = self.direct_cos_vector_y[0]
        l3 = self.direct_cos_vector_z[0]
        m1 = self.direct_cos_vector_x[1]
        m2 = self.direct_cos_vector_y[1]
        m3 = self.direct_cos_vector_z[1]
        n1 = self.direct_cos_vector_x[2]
        n2 = self.direct_cos_vector_y[2]
        n3 = self.direct_cos_vector_z[2]

        X = (- (m2 * n3 - m3 * n2) * (point_3d.x - self.original_point.x)
             + (l2 * n3 - l3 * n2) * (point_3d.y - self.original_point.y)
             - (l2 * m3 - l3 * m2) * (point_3d.z - self.original_point.z)) \
            / (- l1 * (m2 * n3 - m3 * n2)
               + l2 * (m1 * n3 - m3 * n1)
               - l3 * (m1 * n2 - m2 * n1))
        Y = (- (m3 * n1 - m1 * n3) * (point_3d.x - self.original_point.x)
             + (l3 * n1 - l1 * n3) * (point_3d.y - self.original_point.y)
             - (l3 * m1 - l1 * m3) * (point_3d.z - self.original_point.z)) \
            / (- m1 * (n2 * l3 - n3 * l2)
               + m2 * (n1 * l3 - n3 * l1)
               - m3 * (n1 * l2 - n2 * l1))
        Z = (- (m1 * n2 - m2 * n1) * (point_3d.x - self.original_point.x)
             + (l1 * n2 - l2 * n1) * (point_3d.y - self.original_point.y)
             - (l1 * m2 - l2 * m1) * (point_3d.z - self.original_point.z)) \
            / (- n1 * (l2 * m3 - l3 * m2)
               + n2 * (l1 * m3 - l3 * m1)
               - n3 * (l1 * m2 - l2 * m1))
        return Point3D(X, Y, Z)


'''
下面的函数用于桥梁计算
'''


# 将一个点(x, y, z) 和其预拱(delta_x, delta_y, delta_z)用点的形式传入，传出相应的预拱后的点的坐标
def point_after_camber(point_3d, delta_3d):
    ret = point_3d + delta_3d
    return ret.to_tuple()


# 固定端横切面在相应横向偏置位置，上表面对应的点的局部坐标系坐标
def cross_section_point(cross_section, offset):
    for i in range(len(cross_section) - 1):
        a = cross_section[i]
        b = cross_section[i + 1]
        line_a = Line3D(Point3D(y=a[1], z=a[0]), Point3D(y=b[1], z=b[0]))
        line_b = Line3D(Point3D(y=0, z=offset), Point3D(y=1, z=offset))
        cross_point = line_line_inter(line_a, line_b)
        if point_is_on_segment(cross_point, line_a):
            return cross_point
    return Point3D(0, 0, 0)


# 计算前一个相对坐标系下的横断面在当前相对坐标系下的位置
def get_cross_section_from_pre(ct_now,
                               shift_cross_section,  # 当前需要转换坐标的横切面
                               fixed_node,  # 固定端模方向节点
                               shift_node,  # 移动端模方向节点
                               ):
    original_point = fixed_node
    vector_x = shift_node - fixed_node
    vector_z = Point3D(vector_x.z, 0, -vector_x.x)
    vector_y = cross_product(vector_x, vector_z)
    ct_bef = CoordinateTransformation(vector_x, vector_y, vector_z, original_point)  # 局部坐标系和整体坐标系的转化
    ret = []
    for p in shift_cross_section:
        point_3d = Point3D(y=p[1], z=p[0])
        point_global = ct_bef.point_transformation(point_3d)
        ret.append(ct_now.point_transformation_back(point_global))
    return ret


# 获取bd点未偏置时的位置
def get_bd_point(ct_now,
                 offset_d,
                 fixed_node,
                 shift_node):
    original_point = fixed_node
    vector_x = shift_node - fixed_node
    vector_z = Point3D(vector_x.z, 0, -vector_x.x)
    vector_y = cross_product(vector_x, vector_z)
    ct_bef = CoordinateTransformation(vector_x, vector_y, vector_z, original_point)  # 局部坐标系和整体坐标系的转化
    point = Point3D(y=offset_d)
    point_global = ct_bef.point_transformation(point)
    return ct_now.point_transformation_back(point_global)


# 计算横断面上表面和一个平面的交点
def cross_section_plane(shift_cross_section_3d, plane):
    for i in range(len(shift_cross_section_3d) - 1):
        line = Line3D(shift_cross_section_3d[i], shift_cross_section_3d[i + 1])
        cross_point = line_plane_inter(line, plane)
        if point_is_on_segment(cross_point, line):
            return cross_point
    return None


class Results:
    def __init__(self):
        self.c = (0, 0, 0)
        self.l = (0, 0, 0)
        self.r = (0, 0, 0)
        self.d = (0, 0, 0)
        self.o_c = (0, 0, 0)
        self.o_l = (0, 0, 0)
        self.o_r = (0, 0, 0)
        self.o_d = (0, 0, 0)
        self.node = (0, 0, 0)

    @staticmethod
    def tuple_sub(t_a, t_b):
        return tuple([a - b for a, b in zip(t_a, t_b)])

    def remove_camber(self, tuple):
        self.c = self.tuple_sub(self.c, tuple)
        self.l = self.tuple_sub(self.l, tuple)
        self.r = self.tuple_sub(self.r, tuple)
        self.d = self.tuple_sub(self.d, tuple)
        self.o_c = self.tuple_sub(self.o_c, tuple)
        self.o_l = self.tuple_sub(self.o_l, tuple)
        self.o_r = self.tuple_sub(self.o_r, tuple)
        self.o_d = self.tuple_sub(self.o_d, tuple)
        self.node = self.tuple_sub(self.node, tuple)

    def reversed(self):
        self.l, self.r = self.r, self.l
        self.o_r, self.o_l = self.o_l, self.o_r

    def __str__(self):
        return "node:%s\nc:%s\nl:%s\nr:%s\nd:%s\no_c:%s\no_l:%s\no_r:%s\no_d:%s\n" % (
            self.node,
            self.c, self.l, self.r, self.d,
            self.o_c, self.o_l, self.o_r, self.o_d)


# 线性插值
def linear_interpolation(point_a, point_b, delta_x):
    return Point3D(point_a.x + delta_x,
                   point_a.y + delta_x * (point_b.y - point_a.y) / (point_b.x - point_a.x),
                   point_a.z + delta_x * (point_b.z - point_a.z) / (point_b.x - point_a.x))


def linear_interpolation_by_length(point_a, point_b, length):
    return point_b + (point_b - point_a).get_unit() * length


def calc_locate_points(
        offset_length,
        offset_height,
        offset_left,
        offset_right,
        offset_down,
        shift_section_points,
        fixed_section_points,
        shift_node,
        fixed_node,
        is_first_segment,
        pre_node
):
    original_point = fixed_node
    vector_x = shift_node - fixed_node
    vector_z = Point3D(-vector_x.z, 0, vector_x.x)
    vector_y = cross_product(vector_z, vector_x)
    ct = CoordinateTransformation(vector_x, vector_y, vector_z, original_point)  # 局部坐标系和整体坐标系的转化

    # 获取局部坐标系下各点未加测量钉偏置的坐标
    fc = Point3D(0, 0, 0) + Point3D(y=offset_height)
    fl = cross_section_point(fixed_section_points, offset_left) + Point3D(y=offset_height)
    fr = cross_section_point(fixed_section_points, offset_right) + Point3D(y=offset_height)
    fd = Point3D(y=-offset_down)
    if is_first_segment:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        bl = cross_section_point(shift_section_points, offset_left) + bc
        br = cross_section_point(shift_section_points, offset_right) + bc
        bd = Point3D(0, - offset_down, 0) + bc - Point3D(y=offset_height)
    else:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        shift_cross_section_3d = get_cross_section_from_pre(ct, shift_section_points, shift_node, pre_node)
        # 获取浮动端模侧横切面上表面部分各点在当前相对坐标系下的位置
        tmp_a = Point3D(1, 0, 0)
        tmp_b = Point3D(0, 1, 0)
        plane_l = Plane3D(tmp_a + fl, tmp_b + fl, fl)  # 轴线所对应的相对坐标系下XoY平面平移至过fl点的平面
        bl = cross_section_plane(shift_cross_section_3d, plane_l) + Point3D(y=offset_height)  # 计算平面与浮动端模侧横切面上表面部分的交点
        plane_r = Plane3D(tmp_a + fr, tmp_b + fr, fr)
        br = cross_section_plane(shift_cross_section_3d, plane_r) + Point3D(y=offset_height)
        bd = get_bd_point(ct, - offset_down, shift_node, pre_node)
    o_fc = linear_interpolation_by_length(bc, fc, -offset_length)
    o_bc = linear_interpolation_by_length(fc, bc, -offset_length)
    o_fl = linear_interpolation_by_length(bl, fl, -offset_length)
    o_bl = linear_interpolation_by_length(fl, bl, -offset_length)
    o_fr = linear_interpolation_by_length(br, fr, -offset_length)
    o_br = linear_interpolation_by_length(fr, br, -offset_length)
    o_fd = linear_interpolation_by_length(bd, fd, -offset_length)
    o_bd = linear_interpolation_by_length(fd, bd, -offset_length)
    return bc, bl, br, bd, fc, fl, fr, fd, o_bc, o_bl, o_br, o_bd, o_fc, o_fl, o_fr, o_fd


# 理论值计算
def theoretical_value(
        offset_vertical,  # 测量钉偏置(纵向偏置 和 竖向偏置)
        offset_horizontal,  # 横向偏置 左向 右向 下向
        shift_section_points,  # 浮动端或匹配端模方向的横切面(只包括外表面的上部)
        fixed_section_points,  # 固定端模方向的横切面(只包括外表面的上部)
        shift_node_point,  # 浮动或匹配端模侧的节点
        fixed_node_point,  # 固定端模侧的节点
        is_first_segment,  # 是否为首个节段
        is_at_begin,  # 是否浮动侧为起始节点
        match_segment_point  # 匹配节段的另一个节点
):
    # 获取纵向偏置，标高，横向的偏置值
    offset_length, offset_height = offset_vertical
    offset_left, offset_right, offset_down = offset_horizontal
    # 将节点转化为Point3D类型
    shift_node = Point3D.value_of(shift_node_point)  # 浮动端模方向节点
    fixed_node = Point3D.value_of(fixed_node_point)  # 固定端模方向节点
    pre_node = Point3D.value_of(match_segment_point)  # 匹配节段的另一个节点

    original_point = fixed_node
    vector_x = shift_node - fixed_node
    vector_z = Point3D(-vector_x.z, 0, vector_x.x)
    vector_y = cross_product(vector_z, vector_x)
    ct = CoordinateTransformation(vector_x, vector_y, vector_z, original_point)  # 局部坐标系和整体坐标系的转化

    # 获取局部坐标系下各点未加测量钉偏置的坐标
    fc = Point3D(0, 0, 0) + Point3D(y=offset_height)
    fl = cross_section_point(fixed_section_points, offset_left) + Point3D(y=offset_height)
    fr = cross_section_point(fixed_section_points, offset_right) + Point3D(y=offset_height)
    fd = Point3D(y=-offset_down)
    if is_first_segment:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        bl = cross_section_point(shift_section_points, offset_left) + bc
        br = cross_section_point(shift_section_points, offset_right) + bc
        bd = Point3D(0, - offset_down, 0) + bc - Point3D(y=offset_height)
    else:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        shift_cross_section_3d = get_cross_section_from_pre(ct, shift_section_points, shift_node, pre_node)
        # 获取浮动端模侧横切面上表面部分各点在当前相对坐标系下的位置
        tmp_a = Point3D(1, 0, 0)
        tmp_b = Point3D(0, 1, 0)
        plane_l = Plane3D(tmp_a + fl, tmp_b + fl, fl)  # 轴线所对应的相对坐标系下XoY平面平移至过fl点的平面
        bl = cross_section_plane(shift_cross_section_3d, plane_l) + Point3D(y=offset_height)  # 计算平面与浮动端模侧横切面上表面部分的交点
        plane_r = Plane3D(tmp_a + fr, tmp_b + fr, fr)
        br = cross_section_plane(shift_cross_section_3d, plane_r) + Point3D(y=offset_height)
        bd = get_bd_point(ct, - offset_down, shift_node, pre_node)
    o_fc = linear_interpolation_by_length(bc, fc, -offset_length)
    o_bc = linear_interpolation_by_length(fc, bc, -offset_length)
    o_fl = linear_interpolation_by_length(bl, fl, -offset_length)
    o_bl = linear_interpolation_by_length(fl, bl, -offset_length)
    o_fr = linear_interpolation_by_length(br, fr, -offset_length)
    o_br = linear_interpolation_by_length(fr, br, -offset_length)
    o_fd = linear_interpolation_by_length(bd, fd, -offset_length)
    o_bd = linear_interpolation_by_length(fd, bd, -offset_length)

    fixed_res = Results()
    float_res = Results()
    float_res.c = ct.point_transformation(bc).to_tuple()
    float_res.l = ct.point_transformation(bl).to_tuple()
    float_res.r = ct.point_transformation(br).to_tuple()
    float_res.d = ct.point_transformation(bd).to_tuple()
    float_res.o_c = ct.point_transformation(o_bc).to_tuple()
    float_res.o_l = ct.point_transformation(o_bl).to_tuple()
    float_res.o_r = ct.point_transformation(o_br).to_tuple()
    float_res.o_d = ct.point_transformation(o_bd).to_tuple()
    fixed_res.c = ct.point_transformation(fc).to_tuple()
    fixed_res.l = ct.point_transformation(fl).to_tuple()
    fixed_res.r = ct.point_transformation(fr).to_tuple()
    fixed_res.d = ct.point_transformation(fd).to_tuple()
    fixed_res.o_c = ct.point_transformation(o_fc).to_tuple()
    fixed_res.o_l = ct.point_transformation(o_fl).to_tuple()
    fixed_res.o_r = ct.point_transformation(o_fr).to_tuple()
    fixed_res.o_d = ct.point_transformation(o_fd).to_tuple()
    # print("float:%s" % float_res)
    # print("fixed:%s" % fixed_res)
    if is_at_begin:
        return tuple([float_res, fixed_res])
    else:
        fixed_res.reversed()
        float_res.reversed()
        return tuple([fixed_res, float_res])


# 获取施工指令
def get_construction_instruct(
        offset_vertical,  # 测量钉偏置(纵向偏置 和 竖向偏置)
        offset_horizontal,  # 横向偏置 左向 右向 下向
        shift_section_points,  # 浮动端或匹配端模方向的横切面(只包括外表面的上部)
        fixed_section_points,  # 固定端模方向的横切面(只包括外表面的上部)
        shift_node_point,  # 浮动或匹配端模侧的节点
        fixed_node_point,  # 固定端模侧的节点
        is_first_segment,  # 是否为首个节段
        is_at_begin,  # 是否浮动侧为起始节点
        match_segment_point,  # 匹配节段的另一个节点
        pre_GP_points
):
    # 获取纵向偏置，标高，横向的偏置值
    offset_length, offset_height = offset_vertical
    offset_left, offset_right, offset_down = offset_horizontal
    # 将节点转化为Point3D类型
    shift_node = Point3D.value_of(shift_node_point)  # 浮动端模方向节点
    fixed_node = Point3D.value_of(fixed_node_point)  # 固定端模方向节点
    pre_node = Point3D.value_of(match_segment_point)  # 匹配节段的另一个节点

    original_point = fixed_node
    vector_x = shift_node - fixed_node
    vector_z = Point3D(-vector_x.z, 0, vector_x.x)
    vector_y = cross_product(vector_z, vector_x)
    ct = CoordinateTransformation(vector_x, vector_y, vector_z, original_point)  # 局部坐标系和整体坐标系的转化
    # 获取局部坐标系下各点未加测量钉偏置的坐标
    fc = Point3D(0, 0, 0) + Point3D(y=offset_height)
    fl = cross_section_point(fixed_section_points, offset_left) + Point3D(y=offset_height)
    fr = cross_section_point(fixed_section_points, offset_right) + Point3D(y=offset_height)
    fd = Point3D(y=-offset_down)
    if is_first_segment:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        bl = cross_section_point(shift_section_points, offset_left) + bc
        br = cross_section_point(shift_section_points, offset_right) + bc
        bd = Point3D(0, - offset_down, 0) + bc - Point3D(y=offset_height)
    else:
        bc = ct.point_transformation_back(shift_node) + Point3D(y=offset_height)
        shift_cross_section_3d = get_cross_section_from_pre(ct, shift_section_points, shift_node, pre_node)
        # 获取浮动端模侧横切面上表面部分各点在当前相对坐标系下的位置
        tmp_a = Point3D(1, 0, 0)
        tmp_b = Point3D(0, 1, 0)
        plane_l = Plane3D(tmp_a + fl, tmp_b + fl, fl)  # 轴线所对应的相对坐标系下XoY平面平移至过fl点的平面
        bl = cross_section_plane(shift_cross_section_3d, plane_l) + Point3D(y=offset_height)  # 计算平面与浮动端模侧横切面上表面部分的交点
        plane_r = Plane3D(tmp_a + fr, tmp_b + fr, fr)
        br = cross_section_plane(shift_cross_section_3d, plane_r) + Point3D(y=offset_height)
        bd = get_bd_point(ct, - offset_down, shift_node, pre_node)
    o_fc = linear_interpolation_by_length(bc, fc, -offset_length)
    o_bc = linear_interpolation_by_length(fc, bc, -offset_length)
    o_fl = linear_interpolation_by_length(bl, fl, -offset_length)
    o_bl = linear_interpolation_by_length(fl, bl, -offset_length)
    o_fr = linear_interpolation_by_length(br, fr, -offset_length)
    o_br = linear_interpolation_by_length(fr, br, -offset_length)
    o_fd = linear_interpolation_by_length(bd, fd, -offset_length)
    o_bd = linear_interpolation_by_length(fd, bd, -offset_length)

    fixed_res = Results()
    float_res = Results()
    float_res.c = bc.to_tuple()
    float_res.l = bl.to_tuple()
    float_res.r = br.to_tuple()
    float_res.d = bd.to_tuple()
    float_res.o_c = o_bc.to_tuple()
    float_res.o_l = o_bl.to_tuple()
    float_res.o_r = o_br.to_tuple()
    float_res.o_d = o_bd.to_tuple()
    fixed_res.c = fc.to_tuple()
    fixed_res.l = fl.to_tuple()
    fixed_res.r = fr.to_tuple()
    fixed_res.d = fd.to_tuple()
    fixed_res.o_c = o_fc.to_tuple()
    fixed_res.o_l = o_fl.to_tuple()
    fixed_res.o_r = o_fr.to_tuple()
    fixed_res.o_d = o_fd.to_tuple()

    pre_res = Results()
    if pre_GP_points is not None:
        # o_clr 是匹配块起始端的点，clr 为匹配块终止端的点
        pre_res.c = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("fc"))).to_tuple()
        pre_res.l = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("fl"))).to_tuple()
        pre_res.r = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("fr"))).to_tuple()
        pre_res.o_c = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("bc"))).to_tuple()
        pre_res.o_l = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("bl"))).to_tuple()
        pre_res.o_r = ct.point_transformation_back(Point3D.value_of(pre_GP_points.get("br"))).to_tuple()
        if not is_at_begin:
            pre_res.c, pre_res.o_c = pre_res.o_c, pre_res.c
            pre_res.l, pre_res.o_r = pre_res.o_r, pre_res.l
            pre_res.r, pre_res.o_l = pre_res.o_l, pre_res.r
    # print("float:%s" % float_res)
    # print("fixed:%s" % fixed_res)
    # print("pre_res:%s" % pre_res)
    if is_at_begin:
        return tuple([float_res, fixed_res, pre_res])
    else:
        float_res.reversed()
        fixed_res.reversed()
        return tuple([fixed_res, float_res, pre_res])


def get_real_y(offset_horizontal, fixed_cross_section, fixed_bulkhead_l, fixed_bulkhead_r, fixed_bulkhead_c):
    temp_l = cross_section_point(fixed_cross_section, offset_horizontal[0])
    temp_r = cross_section_point(fixed_cross_section, offset_horizontal[1])
    temp_c = Point3D(0, 0, 0)
    fixed_bulkhead_l.z = offset_horizontal[0]
    fixed_bulkhead_r.z = offset_horizontal[1]
    ret = fixed_bulkhead_c.y
    return ret


# 处理回测数据并确定当前节段的测量值(整体坐标系下)
def get_surveyed_data_in_geodetic_coordinate(
        is_first_construction,
        offset_horizontal,
        offset_vertical,
        float_and_fixed_nodes,
        surveyed_dict,
        is_at_begin,
        real_dict,
        fixed_cross_section
):
    # print(is_first_construction)
    # print(offset_horizontal)
    # print(offset_vertical)
    # for node in float_and_fixed_nodes:
    #     print(node)
    # print('==========surveyed_dict')
    # print(surveyed_dict)
    # print('==========real_dict')
    # print(real_dict)
    # print(fixed_cross_section)
    wet_fc = Point3D.value_of(surveyed_dict.get('wet_fc'))
    wet_fl = Point3D.value_of(surveyed_dict.get('wet_fl'))
    wet_fr = Point3D.value_of(surveyed_dict.get('wet_fr'))
    wet_bc = Point3D.value_of(surveyed_dict.get('wet_bc'))
    wet_bl = Point3D.value_of(surveyed_dict.get('wet_bl'))
    wet_br = Point3D.value_of(surveyed_dict.get('wet_br'))
    if is_first_construction:
        float_bulkhead_c = Point3D.value_of(surveyed_dict.get('float_bulkhead_c'))
        float_bulkhead_l = Point3D.value_of(surveyed_dict.get('float_bulkhead_l'))
        float_bulkhead_r = Point3D.value_of(surveyed_dict.get('float_bulkhead_r'))
        fixed_bulkhead_c = Point3D.value_of(surveyed_dict.get('bulkhead_c'))
        fixed_bulkhead_l = Point3D.value_of(surveyed_dict.get('bulkhead_l'))
        fixed_bulkhead_r = Point3D.value_of(surveyed_dict.get('bulkhead_r'))
        float_node = float_and_fixed_nodes[0]
        fix_node = float_and_fixed_nodes[1]
        vector_x_real = float_node - fix_node
        vector_y_real = Point3D(0, 1, 0)
        vector_z_real = cross_product(vector_x_real, vector_y_real)
        ct = CoordinateTransformation(vector_x_real, vector_y_real, vector_z_real, fix_node)
        fixed_res = Results()
        float_res = Results()
        fixed_bulkhead_c.y = get_real_y(offset_horizontal, fixed_cross_section,
                                        fixed_bulkhead_l.copy(), fixed_bulkhead_r.copy(), fixed_bulkhead_c)
        fixed_res.node = ct.point_transformation(fixed_bulkhead_c - Point3D(y=offset_vertical[1])).to_tuple()
        fixed_res.c = ct.point_transformation(fixed_bulkhead_c).to_tuple()
        fixed_res.l = ct.point_transformation(fixed_bulkhead_l).to_tuple()
        fixed_res.r = ct.point_transformation(fixed_bulkhead_r).to_tuple()
        fixed_res.d = ct.point_transformation(
            fixed_bulkhead_c - Point3D(y=offset_horizontal[2] + offset_vertical[1])).to_tuple()
        fixed_res.o_c = ct.point_transformation(wet_fc).to_tuple()
        fixed_res.o_l = ct.point_transformation(wet_fl).to_tuple()
        fixed_res.o_r = ct.point_transformation(wet_fr).to_tuple()
        fixed_res.o_d = ct.point_transformation(
            wet_fc - Point3D(y=offset_horizontal[2] + offset_vertical[1])).to_tuple()

        float_res.node = ct.point_transformation(
            fixed_bulkhead_c + Point3D(x=wet_bc.x + offset_vertical[0]) - Point3D(y=offset_vertical[1])).to_tuple()
        float_res.c = ct.point_transformation(float_bulkhead_c).to_tuple()
        float_res.l = ct.point_transformation(float_bulkhead_l).to_tuple()
        float_res.r = ct.point_transformation(float_bulkhead_r).to_tuple()
        float_res.d = ct.point_transformation(
            float_bulkhead_c - Point3D(y=offset_horizontal[2]) - Point3D(y=offset_vertical[1])).to_tuple()
        float_res.o_c = ct.point_transformation(wet_bc).to_tuple()
        float_res.o_l = ct.point_transformation(wet_bl).to_tuple()
        float_res.o_r = ct.point_transformation(wet_br).to_tuple()
        float_res.o_d = ct.point_transformation(
            wet_bc - Point3D(y=offset_horizontal[2] + offset_vertical[1])).to_tuple()
    else:
        match_fc = Point3D.value_of(surveyed_dict.get('match_fc'))
        match_fl = Point3D.value_of(surveyed_dict.get('match_fl'))
        match_fr = Point3D.value_of(surveyed_dict.get('match_fr'))
        match_bc = Point3D.value_of(surveyed_dict.get('match_bc'))
        match_bl = Point3D.value_of(surveyed_dict.get('match_bl'))
        match_br = Point3D.value_of(surveyed_dict.get('match_br'))
        bulkhead_c = Point3D.value_of(surveyed_dict.get('bulkhead_c'))
        bulkhead_l = Point3D.value_of(surveyed_dict.get('bulkhead_l'))
        bulkhead_r = Point3D.value_of(surveyed_dict.get('bulkhead_r'))

        plane = Plane3D(match_fl, match_fr, match_bl)
        vector_y = plane.normal_vector()
        vector_z = cross_product(match_bc - match_fc, vector_y)
        vector_x = cross_product(vector_y, vector_z)
        ct_1 = CoordinateTransformation(vector_x, vector_y, vector_z, match_fc)

        match_fc_real = Point3D.value_of(real_dict.get('fc'))
        match_fl_real = Point3D.value_of(real_dict.get('fl'))
        match_fr_real = Point3D.value_of(real_dict.get('fr'))
        match_bc_real = Point3D.value_of(real_dict.get('bc'))
        match_bl_real = Point3D.value_of(real_dict.get('bl'))
        match_br_real = Point3D.value_of(real_dict.get('br'))
        float_node = float_and_fixed_nodes[0]
        plane = Plane3D(match_fl_real, match_fr_real, match_bl_real)
        vector_y_real = plane.normal_vector()
        vector_z_real = cross_product(match_bc_real - match_fc_real, vector_y_real)
        vector_x_real = cross_product(vector_y_real, vector_z_real)
        ct_2 = CoordinateTransformation(vector_x_real, vector_y_real, vector_z_real, match_fc_real)

        fixed_res = Results()
        float_res = Results()
        float_node_in_ct1 = ct_1.point_transformation(ct_2.point_transformation_back(float_node))
        fixed_res.node = (ct_2.point_transformation(ct_1.point_transformation_back(
            float_node_in_ct1 + ((bulkhead_c - Point3D(y=offset_vertical[1]) - float_node_in_ct1).get_unit())
            * (wet_bc.x + offset_vertical[0])
        ))).to_tuple()
        fixed_res.c = ct_2.point_transformation(ct_1.point_transformation_back(bulkhead_c)).to_tuple()
        fixed_res.l = ct_2.point_transformation(ct_1.point_transformation_back(bulkhead_l)).to_tuple()
        fixed_res.r = ct_2.point_transformation(ct_1.point_transformation_back(bulkhead_r)).to_tuple()
        fixed_res.d = ct_2.point_transformation(ct_1.point_transformation_back(
            bulkhead_c - Point3D(y=offset_horizontal[2] + offset_vertical[1]))).to_tuple()
        fixed_res.o_c = ct_2.point_transformation(ct_1.point_transformation_back(wet_fc)).to_tuple()
        fixed_res.o_l = ct_2.point_transformation(ct_1.point_transformation_back(wet_fl)).to_tuple()
        fixed_res.o_r = ct_2.point_transformation(ct_1.point_transformation_back(wet_fr)).to_tuple()
        fixed_res.o_d = ct_2.point_transformation(
            ct_1.point_transformation_back(wet_fc - Point3D(y=offset_horizontal[2] + offset_vertical[1]))).to_tuple()

        float_res.o_c = ct_2.point_transformation(ct_1.point_transformation_back(wet_bc)).to_tuple()
        float_res.o_l = ct_2.point_transformation(ct_1.point_transformation_back(wet_bl)).to_tuple()
        float_res.o_r = ct_2.point_transformation(ct_1.point_transformation_back(wet_br)).to_tuple()
        float_res.o_d = ct_2.point_transformation(
            ct_1.point_transformation_back(wet_bc - Point3D(y=offset_horizontal[2]))).to_tuple()
        float_res.c = ct_2.point_transformation(ct_1.point_transformation_back(
            linear_interpolation_by_length(wet_fc, wet_bc, offset_vertical[0])
        )).to_tuple()
        float_res.l = ct_2.point_transformation(ct_1.point_transformation_back(
            linear_interpolation_by_length(wet_fl, wet_bl, offset_vertical[0])
        )).to_tuple()
        float_res.r = ct_2.point_transformation(ct_1.point_transformation_back(
            linear_interpolation_by_length(wet_fr, wet_br, offset_vertical[0])
        )).to_tuple()
        float_res.d = ct_2.point_transformation(ct_1.point_transformation_back(
            linear_interpolation_by_length(wet_fc, wet_bc, offset_vertical[0])
            - Point3D(y=offset_horizontal[2] + offset_vertical[1])
        )).to_tuple()
    print("float:%s" % float_res)
    print("fixed:%s" % fixed_res)
    if is_at_begin:
        return tuple([fixed_res, float_res])
    else:
        float_res.reversed()
        fixed_res.reversed()
        return tuple([float_res, fixed_res])


def get_twice_adjust_point(node_bef, node_now, node_next):
    print("----------")
    point_bef = Point3D.value_of(node_bef)
    point_now = Point3D.value_of(node_now)
    point_next = Point3D.value_of(node_next)
    plane = plane_vertical_to_line(Line3D(point_bef, point_now), point_on_plane=point_now)
    line = Line3D(point_bef, point_next)
    node_new = line_plane_inter(line, plane)
    print("new point for adjust  %s"%node_new)
    return node_new.to_tuple()


def get_delta(node_float,node_fixed,node_fixed_real):
    print(node_float)
    print(node_fixed)
    print(node_fixed_real)
    point_float = Point3D.value_of(node_float)
    point_fixed = Point3D.value_of(node_fixed)
    point_fixed_real = Point3D.value_of(node_fixed_real)
    delta_v = abs(point_fixed.y - point_fixed_real.y)

    point_float_in_horizontal = point_float - Point3D(y=point_float.y)
    point_fixed_in_horizontal = point_fixed - Point3D(y=point_float.y)
    point_fixed_real_in_horizontal = point_fixed_real - Point3D(y=point_fixed_real.y)
    x0 = point_fixed_real_in_horizontal.x
    x1 = point_float_in_horizontal.x
    x2 = point_fixed_in_horizontal.x
    z0 = point_fixed_real_in_horizontal.z
    z1 = point_float_in_horizontal.z
    z2 = point_fixed_in_horizontal.z
    a = z2 - z1
    b = x1 - x2
    c = x2 * z1 - x1 * z2

    delta_s = abs((a * x0 + b * z0 + c) / sqrt(a * a + b * b))
    return delta_v, delta_s


if __name__ == '__main__':
    get_twice_adjust_point((3,0,0),(6,0,0),(9,0,0))
    pass
