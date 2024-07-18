create database nolatech;
use nolatech;
create table tbl_user(
	int_id int auto_increment primary key,
    vch_email varchar(100) not null,
    vch_password varchar(255) not null,
    vch_username varchar(20) not null,
    vch_name varchar(100) not null,
    vch_lastname varchar(100) not null,
    int_created_by int null,
    dtt_created_at datetime default CURRENT_TIMESTAMP,
    int_updated_by int null,
    dtt_updated_at datetime null ON UPDATE CURRENT_TIMESTAMP,
    dtt_deleted_at datetime null,
    foreign key (int_created_by) references tbl_user(int_id),
    foreign key (int_updated_by) references tbl_user(int_id)
);