
CREATE TABLE IF NOT EXISTS `test_data`(
    `id` int,
    `name` VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `test_data`(
    `id` int,
    `name` varchar(50)
);

CREATE TABLE `class_data`(
    `id` INT UNSIGNED auto_increment,
    `number` int(10) not null,
    `name` VARCHAR(50) not NULL,
    `class_name` varchar(50) not NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into class_data
(number,name,class_name)
VALUES
(1001,"张三","mysql");
insert into class_data
(number,name,class_name)
VALUES
(1002,"李四","mysql");
insert into class_data
(number,name,class_name)
VALUES
(1003,"王五","mysql");

SELECT * FROM class_data;

SELECT * FROM class_data WHERE id=3;

SELECT * FROM class_data WHERE id=1 or id=2;

INSERT INTO class_data
(number,name,class_name)
VALUES
(1003,"王五","python");

SELECT * FROM class_data WHERE number=1003 AND class_name="python";

UPDATE class_data SET class_name="Python" WHERE class_name="python";
UPDATE class_data SET class_name="Mysql" WHERE class_name="mysql";


DELETE FROM class_data where id = 5;

INSERT INTO class_data(number,name,class_name)
VALUES(1004,"赵六","Python");

