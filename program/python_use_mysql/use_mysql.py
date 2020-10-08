import pymysql
from pymysql import cursors
from pymysql import err


#连接数据库
def connect_mysql():
    db = pymysql.connect("localhost","root","baozi","data_school",3306)
    cursor = db.cursor()
    cursor.execute("select * from class_data;")
    data = cursor.fetchall()
    print(f"data:{data}")
    # print("data:",data)
    db.close()


#插入操作

def insert_record():
    db = pymysql.connect("localhost","root","baozi","data_school")
    cursor = db.cursor()
    sql = """
        INSERT INTO class_data(number,name,class_name)
        VALUES(1004,"赵六","Python");"""
    try:
        cursor.execute(sql) #执行SQL语句
        db.commit() #提交到数据库执行
        print("插入记录完成")
    except err:
        print("插入记录错误")
        db.rollback()   #发生错误时回滚
    db.close()


#查询操作
def select_record():
    db = pymysql.connect("localhost","root","baozi","data_school")
    cursor = db.cursor()
    s_number = 1003
    sql = "select * from class_data where number = {}".format(s_number)
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        print(data)
    except err:
        print("查询错误")
    db.close()

#更新操作
def update_record():
    db = pymysql.connect("localhost","root","baozi","data_school")
    cursor = db.cursor()
    sql = "update class_data set class_name = '{}' where class_name = '{}'".format("MySql","Mysql")
    try:
        cursor.execute(sql)
        db.commit()
        print("更新完成")
    except err:
        db.rollback()
        print("更新失败")
    db.close()

if __name__ == "__main__":
    # connect_mysql()
    # insert_record()
    # select_record()
    update_record()