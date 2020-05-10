#------------------------------------------------------------
#        CREATE STETHOSCOPE DATABASE
#------------------------------------------------------------
DROP DATABASE IF EXISTS Stethoscope;

CREATE DATABASE Stethoscope;

USE Stethoscope;

#------------------------------------------------------------
# CREATE TABLES : 
#------------------------------------------------------------

# Table: MEDICAL TYPE

CREATE TABLE MEDICAL_TYPE(
        ID_Medical_Type Int  Auto_increment  NOT NULL ,
        Name            Varchar (300) NOT NULL
	,CONSTRAINT MEDICAL_TYPE_PK PRIMARY KEY (ID_Medical_Type)
)ENGINE=InnoDB;



# Table: PATIENT

CREATE TABLE PATIENT(
        ID_Patient             Int  Auto_increment  NOT NULL ,
        first_name             Varchar (50) NOT NULL ,
        last_name              Varchar (50) NOT NULL ,
        birth_date             bigint NOT NULL ,
        social_security_number Varchar (50) NOT NULL ,
        phone_number           Varchar (50) NOT NULL ,
        email_address          Varchar (50) NOT NULL ,
        ID_User                Int NOT NULL
	,CONSTRAINT PATIENT_PK PRIMARY KEY (ID_Patient)
)ENGINE=InnoDB;



# Table: DOCTOR

CREATE TABLE DOCTOR(
        ID_Doctor    Int  Auto_increment  NOT NULL ,
        first_name   Varchar (50) NOT NULL ,
        last_name    Varchar (50) NOT NULL ,
        birth_date   bigint NOT NULL ,
        phone_number Varchar (50) NOT NULL ,
        image_path Varchar (100) NULL,
        ID_Office int NOT NULL      
	,CONSTRAINT DOCTOR_PK PRIMARY KEY (ID_Doctor)
)ENGINE=InnoDB;



# Table: CONSULTATION

CREATE TABLE CONSULTATION(
        ID_Consultation Int  Auto_increment  NOT NULL ,
        reason          Varchar (300) NOT NULL ,
        date            Datetime NOT NULL ,
        first_time      Bool NOT NULL ,
        ID_Patient      Int NOT NULL ,
        ID_Doctor       Int NOT NULL ,
        ID_Planning     Int NOT NULL
	,CONSTRAINT CONSULTATION_PK PRIMARY KEY (ID_Consultation)
)ENGINE=InnoDB;



# Table: PLANNING

CREATE TABLE PLANNING(
        ID_Planning Int  Auto_increment  NOT NULL ,
        ID_Doctor   Int NOT NULL
	,CONSTRAINT PLANNING_PK PRIMARY KEY (ID_Planning)
)ENGINE=InnoDB;



# Table: OFFICE

CREATE TABLE OFFICE(
        ID_Office  Int  Auto_increment  NOT NULL ,
        ID_Address Int NOT NULL
	,CONSTRAINT OFFICE_PK PRIMARY KEY (ID_Office)
)ENGINE=InnoDB;



# Table: USERS

CREATE TABLE USERS(
        ID_User       Int  Auto_increment  NOT NULL ,
        login         Varchar (50) NOT NULL ,
        password      Varchar (300) NOT NULL ,
        administrator Bool NOT NULL
	,CONSTRAINT USER_PK PRIMARY KEY (ID_User)
)ENGINE=InnoDB;



# Table: ADDRESS

CREATE TABLE ADDRESS(
        ID_Address  Int  Auto_increment  NOT NULL ,
        address     Varchar (300) NOT NULL ,
        city        Varchar (50) NOT NULL ,
        postal_code Varchar (50) NOT NULL ,
        ID_User     Int NULL
	,CONSTRAINT ADDRESS_PK PRIMARY KEY (ID_Address)
)ENGINE=InnoDB;


# Table: PRACTICE

CREATE TABLE PRACTICE(
        ID_Doctor       Int NOT NULL ,
        ID_Medical_Type Int NOT NULL
	,CONSTRAINT PRACTICE_PK PRIMARY KEY (ID_Doctor,ID_Medical_Type)
)ENGINE=InnoDB;


#------------------------------------------------------------
# ADD FOREIGN KEYS
#------------------------------------------------------------


# Table: PATIENT

ALTER TABLE PATIENT
	ADD CONSTRAINT PATIENT_USER_FK
	FOREIGN KEY (ID_User)
	REFERENCES USERS(ID_User);

ALTER TABLE PATIENT 
	ADD CONSTRAINT PATIENT_USER_AK 
	UNIQUE (ID_User);   

# Table: DOCTOR

ALTER TABLE DOCTOR
	ADD CONSTRAINT DOCTOR_OFFICE_FK
	FOREIGN KEY (ID_Office)
	REFERENCES OFFICE(ID_Office);  
    
# Table: ADDRESS
    
ALTER TABLE ADDRESS
	ADD CONSTRAINT ADDRESS_USER_FK
	FOREIGN KEY (ID_User)
	REFERENCES USERS(ID_User);


# Table: CONSULTATION

ALTER TABLE CONSULTATION
	ADD CONSTRAINT CONSULTATION_PATIENT_FK
	FOREIGN KEY (ID_Patient)
	REFERENCES PATIENT(ID_Patient);
    
ALTER TABLE CONSULTATION
	ADD CONSTRAINT CONSULTATION_DOCTOR_FK
	FOREIGN KEY (ID_Doctor)
	REFERENCES DOCTOR(ID_Doctor);
    
ALTER TABLE CONSULTATION
	ADD CONSTRAINT CONSULTATION_PLANNING_FK
	FOREIGN KEY (ID_Planning)
	REFERENCES PLANNING(ID_Planning);


# Table: OFFICE

ALTER TABLE OFFICE
	ADD CONSTRAINT OFFICE_ADDRESS_FK
	FOREIGN KEY (ID_Address)
	REFERENCES ADDRESS(ID_Address);


# Table: PLANNING

ALTER TABLE PLANNING
	ADD CONSTRAINT PLANNING_DOCTOR_FK
	FOREIGN KEY (ID_Doctor)
	REFERENCES DOCTOR(ID_Doctor);
    
SET SQL_SAFE_UPDATES=0;

#------------------------------------------------------------
# ADD SOME DATAS IN DB :
#------------------------------------------------------------

# Table: ADDRESS

INSERT INTO Stethoscope.ADDRESS(
    address
    , city
    , postal_code
)
VALUES
("1er rue Paul Bert", "Lyon", "69003")
, ("3er rue de la République", "Lyon", "69002")
, ("10 rue Henri Rolland", "Villeurbanne", "69100");


# Table: OFFICE

INSERT INTO Stethoscope.OFFICE(
    ID_Address
)
VALUES
(1)
, (2)
, (3);

# Table: DOCTOR

INSERT INTO Stethoscope.DOCTOR(
    first_name
    , last_name
    , birth_date
    , phone_number
    , image_path
    , ID_Office
)
VALUES
("gregory", "house", -333214664, "0713798254", "../../img/gregory-house.jpg", 1)
, ("stephen", "strange", -204997064, "0796543971", "../../img/stephen-strange.jpg", 2)
, ("michel", "cymes", -398705864, "0696348721", "../../img/michel-cymes.jpg", 3)
, ("meredith", "grey", -398705864, "0799468237", "../../img/meredith-grey.jpg", 1)
, ("françoise", "dolto", -4462664, "0791275946", "../../img/francoise-dolto.jpg", 2);

# Table: MEDICAL_TYPE

INSERT INTO Stethoscope.MEDICAL_TYPE(
    Name
)
VALUES
("Chirurgie")
, ("Générale")
, ("Pédiatrie")
, ("Neurologie");

# Table: PRACTICE

INSERT INTO Stethoscope.PRACTICE(
    ID_Doctor
    , ID_Medical_type
)
VALUES
(1, 1)
, (1, 2)
, (2, 1)
, (2, 4)
, (3, 1)
, (3, 2)
, (4, 1)
, (5, 3);

# Table: PLANNING

INSERT INTO Stethoscope.PLANNING(
    ID_Doctor
)
VALUES
(1)
, (2)
, (3)
, (4)
, (5);
