USE sys;
#------------------------------------------------------------
#        CREATE STETHOSCOPE DATABASE
#------------------------------------------------------------
DROP DATABASE IF EXISTS Stethoscope;

CREATE DATABASE Stethoscope;

USE Stethoscope;

#------------------------------------------------------------
#        CREATE STETHOSCOPE ADMIN
#------------------------------------------------------------
DROP USER IF EXISTS 'stethoscope_root@localhost';

CREATE USER 'stethoscope_root@localhost' IDENTIFIED BY 'Jupiter2020!';

GRANT ALL PRIVILEGES ON *.* TO 'stethoscope_root@localhost';

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
        sexe Int NOT NULL,
        description  Varchar (10000)
	,CONSTRAINT DOCTOR_PK PRIMARY KEY (ID_Doctor)
)ENGINE=InnoDB;



# Table: CONSULTATION

CREATE TABLE CONSULTATION(
        ID_Consultation Int  Auto_increment  NOT NULL ,
        reason          Varchar (300) NOT NULL ,
        consultation_date  Date NOT NULL ,
        time_slot 		int NOT NULL,
        first_time      Bool NOT NULL ,
        is_validate 	Bool NOT NULL,
        ID_Patient      Int NOT NULL ,
        ID_Doctor     Int NOT NULL
	,CONSTRAINT CONSULTATION_PK PRIMARY KEY (ID_Consultation)
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
        is_office_address Bool NOT NULL,
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

    
SET SQL_SAFE_UPDATES=0;

#------------------------------------------------------------
# ADD SOME DATAS IN DB :
#------------------------------------------------------------

# Table: ADDRESS

INSERT INTO Stethoscope.ADDRESS(
    address
    , city
    , postal_code
    , is_office_address
)
VALUES
("1er rue Paul Bert", "Lyon", "69003", 1);



# Table: DOCTOR

INSERT INTO Stethoscope.DOCTOR(
    first_name
    , last_name
    , birth_date
    , phone_number
    , image_path
    , sexe
    , description
)
VALUES
("gregory", "house", -333214664, "0713798254", "../img/gregory-house.jpg", 1, "Renommé pour ses compétences dans le domaine médical, il use souvent de méthodes peu orthodoxes, en refusant le plus possible d'entrer en contact avec ses patients, en faisant des tests médicaux originaux et en poussant la rationalité à l'extrême, ce qui l'entraine dans de nombreux conflits avec ses collègues. Il est également décrit régulièrement comme misanthrope, narcissique, antipathique avec ses patients et travaillant peu, de sorte qu'il a le temps de poser les diagnostics les plus compliqués.")
, ("stephen", "strange", -204997064, "0796543971", "../img/stephen-strange.jpg", 1, "Le docteur Stephen Strange est un brillant neurochirurgien américain, mais aussi un être dépravé, cynique et égoïste. Oublieux de ses devoirs et de la déontologie médicale, il cherche avant tout à faire fortune et sélectionne ses patients d'après le contenu de leur compte en banque.")
, ("michel", "cymes", -398705864, "0696348721", "../img/michel-cymes.jpg", 1, " Michel Cymes fait son service militaire comme médecin volontaire en Afrique.

Il effectue une partie de son internat en médecine à Paris-Descartes puis à l'hôtel-Dieu de Chartres. Il est aussi étudiant à la faculté de médecine à l'hôpital Necker de Paris. Lors de ses études, il se spécialise dans la chirurgie otorhinolaryngologique. C'est au cours de son internat qu'il développe un humour de type « carabin », par sa fonction « d'économe » et de président chargé d'organiser les fêtes et les soirées dans les salles de garde.")
, ("meredith", "grey", -4451864, "0799468237", "../img/meredith-grey.jpg", 2, "Elle a été introduite comme interne en chirurgie dans le fictif Seattle Grace Hospital (plus tard Seattle Grace-Mercy West Hospital, et ensuite Grey+Sloan Memorial), obtenant finalement le poste de résident en chirurgie, puis celui de titulaire, et en 2015, celui de chef de la chirurgie générale. Fille du chirurgien de renommée mondiale Ellis Grey.")
, ("francoise", "dolto", -1929789464, "0791275946", "../img/francoise-dolto.jpg", 2, "Elle est une pédiatre et psychanalyste française qui s'intéresse particulièrement à la psychanalyse des enfants et à la diffusion des connaissances dans le domaine de l'éducation des enfants dans de nombreux écrits et particulièrement dans des émissions radiodiffusées qui ont contribué à la faire connaître du grand public. ");

# Table: MEDICAL_TYPE

INSERT INTO Stethoscope.MEDICAL_TYPE(
    Name
)
VALUES
("Chirurgie")
, ("Generale")
, ("Pediatrie")
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


# Création d'utilisateur :

INSERT INTO Stethoscope.USERS(
	ID_User
    , login
    , password
    , administrator
)
VALUES
(1, "kevin.icol@cnam.fr", "Jupiter2020!", 0)
, (2, "jean.blanc@gmail.com", "Jupiter2020!", 0);

INSERT INTO Stethoscope.ADDRESS(
    address
    , city
    , postal_code
    , is_office_address
    , ID_User
)
VALUES
("1 rue des cadets de la france libre", "Lyon", "69003", 0, 1)
, ("4 rue de la liberte", "Bron", "69500", 0, 2);

INSERT INTO Stethoscope.PATIENT(
    ID_Patient
    , first_name
    , last_name
    , birth_date
    , social_security_number
    , phone_number
    , email_address
    , ID_User
)
VALUES
(1, "kevin", "icol", 634198139, "1901487963254", "0612345678", "kevin.icol@cnam.fr", 1)
, (2, "jean", "blanc", 444809339, "1901578951264", "0678541239", "jean.blanc@gmail.com", 2);


# Création de consultation :

INSERT INTO Stethoscope.CONSULTATION(
    ID_Consultation
    , reason
    , consultation_date
    , time_slot
    , first_time
    , is_validate
    , ID_Patient
    , ID_Doctor
)
VALUES
(1, "Bilan sanguin", "2020-06-08", 1, 1, 1, 1, 1)
, (2, "Medecine du travail", "2020-06-15", 2, 1, 1, 2, 1)
, (3, "Douleur a la jambe", "2020-05-18", 3, 1, 0, 2, 1)
, (4, "Mal au dents", "2020-05-18", 4, 0, 0, 1, 1)
, (5, "Toux et fievre", "2020-06-17", 5, 0, 1, 2, 1)
, (6, "Douleur a la tete", "2020-06-11", 6, 0, 0, 1, 1)
, (7, "Douleur au tendon d'achille", "2020-05-18", 7, 0, 1, 2, 1)
, (8, "Grosseur dans la hanche", "2020-06-11", 8, 0, 1, 2, 1)
, (9, "Bilan sanguin", "2020-06-27", 1, 0, 0, 1, 1)
, (10, "Medecine du travail", "2020-06-27", 3, 0, 0, 2, 2)
, (11, "Rhume", "2020-05-19", 1, 0, 0, 1, 1)
, (12, "Douleur aux yeux", "2020-05-25", 4, 0, 1, 1, 2)
, (13, "Fatigue importante", "2020-05-28", 5, 0, 1, 1, 3);



