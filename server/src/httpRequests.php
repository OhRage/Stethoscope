<?php 
    session_start();
    include "database.php";

    //Formulaire d'enregistrement ou de mise a jour du profil :
    if (isset($_POST["registerInformationModalForm"]) || isset($_POST["personalInformationModalForm"])){

        //Récupération des inputs :
        $datas = [
           "firstName" => strtolower($_POST["firstName"]),
           "lastName" => strtolower($_POST["lastName"]),
           "birthDate" => strtotime($_POST["birthDate"]),
           "socialNumber" => $_POST["socialNumber"],
           "address" => strtolower($_POST["address"]),
           "city" => strtolower($_POST["city"]),
           "postalCode" => $_POST["postalCode"],
           "phoneNumber" => $_POST["phoneNumber"],
           "emailAddress" => strtolower($_POST["emailAddress"]),
           "password" => $_POST["password"],
        ];

        //Vérification de l'unicité de l'email:
        $msg = "Erreur lors de l'enregistrement des données. Veuillez réesayer.";
        $code = 403;
        $login = $datas["emailAddress"];
        
        if(isset($_POST["personalInformationModalForm"]) && $login == $_SESSION["login"]){ //Cas ou l'utilisateur n'a pas modfier son adresse email dans son profil.
            $result = [];
        }else{
            $query = "SELECT login FROM USERS WHERE login = \"$login\";";
            $result = send_simple_query($query, "select");
        }

        //Redirection en fonction de $result :
        if (gettype($result) != "array" && $result == false){ //Erreur de transaction
            $msg = "Erreur serveur. Veuillez réessayer";
            $code = 500;
        }elseif (gettype($result) == "array" && $result != false) { //Email déjà pris
            $msg = "L'email que vous avez saisie est déjà utilisé.";        
        }else if (gettype($result) == "array" && $result == false){ //Enregistrement OK
            //On enlève l'autocommit :
            $query = "SET AUTOCOMMIT=0;";

            if(isset($_POST["registerInformationModalForm"])){
                //Création de l'utilisateur :
                $query .= "INSERT INTO Stethoscope.USERS(
                    login
                    , password
                    , administrator)
                VALUES(
                    \"{$datas["emailAddress"]}\",
                    \"{$datas["password"]}\",
                    \"0\");";

                $query .= "SET @User_id = (SELECT ID_User FROM USERS WHERE login = \"$login\");";  

                //Création du patient :
                $query .= "INSERT INTO Stethoscope.PATIENT(
                    first_name
                    , last_name
                    , birth_date
                    , social_security_number
                    , phone_number
                    , email_address
                    , ID_User
                )
                VALUES(
                    \"{$datas["firstName"]}\"
                    , \"{$datas["lastName"]}\"
                    , \"{$datas["birthDate"]}\"
                    , \"{$datas["socialNumber"]}\"
                    , \"{$datas["phoneNumber"]}\"
                    , \"{$datas["emailAddress"]}\"
                    , @User_id);";

                // Création de l'addresse : 
                $query .= "INSERT INTO Stethoscope.ADDRESS(
                    address
                    , city
                    , postal_code
                    , ID_User
                )
                VALUES(
                    \"{$datas["address"]}\"
                    , \"{$datas["city"]}\"
                    , \"{$datas["postalCode"]}\"
                    , @User_id);";

            }else if (isset($_POST["personalInformationModalForm"])){
                $login = $_SESSION["login"];

                //Update de la table USERS :
                $query .= "SET @User_id = (SELECT ID_User FROM USERS WHERE login = \"$login\");";

                $query .= "UPDATE Stethoscope.USERS
                SET 
                    login = \"{$datas["emailAddress"]}\"
                    , password = \"{$datas["password"]}\"
                WHERE ID_User = @User_id;";

                // Update de la table PATIENT :
                $query .= "UPDATE Stethoscope.PATIENT
                SET
                    first_name = \"{$datas["firstName"]}\"
                    , last_name = \"{$datas["lastName"]}\"
                    , birth_date = \"{$datas["birthDate"]}\"
                    , social_security_number = \"{$datas["socialNumber"]}\"
                    , phone_number = \"{$datas["phoneNumber"]}\"
                    , email_address = \"{$datas["emailAddress"]}\"
                WHERE ID_User = @User_id;";

                // Update de la table USERS :
                $query .= "UPDATE Stethoscope.ADDRESS
                SET
                    address = \"{$datas["address"]}\"
                    , city = \"{$datas["city"]}\"
                    , postal_code = \"{$datas["postalCode"]}\"
                WHERE ID_User = @User_id;";
            }

            $query .= "COMMIT;";

            $result = send_multiple_upsert_query($query);

            if ($result){
                if(isset($_POST["registerInformationModalForm"])){
                    $msg = "Enregistrement validé. Vous pouvez vous connecter.";
                }else if(isset($_POST["personalInformationModalForm"])){
                    $msg = "Modification validées avec succès. Veuillez vous reconnecter.";
                }
                $code = 200;
            }else{
                $code = 403;
            }
        }

        //Redirection vers la page de connexion :
        http_response_code($code);
        header('Content-type: application/json');
        $json = ["message" => $msg];
        echo json_encode($json);
    
    // Récupération des données de l'utilisateur : 
    }else if (isset($_GET["getUserDatas"])){

        //Récupération des données de l'utilisateur :
        $query = "SELECT
                PATIENT.first_name
                , PATIENT.last_name
                , PATIENT.birth_date
                , PATIENT.social_security_number
                , ADDRESS.address
                , ADDRESS.city
                , ADDRESS.postal_code
                , PATIENT.phone_number
                , PATIENT.email_address
                , USERS.password
            FROM PATIENT
                INNER JOIN USERS ON USERS.ID_User = PATIENT.ID_User
                LEFT JOIN ADDRESS ON ADDRESS.ID_User = PATIENT.ID_User
            WHERE USERS.login = \"{$_GET["login"]}\";";

        $result = send_simple_query($query, "select");

        if($result){
            http_response_code(200);
            header('Content-type: application/json');
            $json = [
                "personnal_datas" => [
                    "first_name" => $result[0]["first_name"],
                    "last_name" => $result[0]["last_name"],
                    "birth_date" => $result[0]["birth_date"],
                    "social_security_number" => $result[0]["social_security_number"],
                    "address" => $result[0]["address"],
                    "city" => $result[0]["city"],
                    "postal_code"=> $result[0]["postal_code"],
                    "phone_number"=> $result[0]["phone_number"],
                ],
                "connexion_datas" => [
                    "email_address"=> $result[0]["email_address"],
                    "password"=> $result[0]["password"],
                ],
            ];

            echo json_encode($json);

        }else{
            http_response_code(500);
            error_log("Aucune valeur retournée pour la requête http \"get_user_datas\"");
        }

    // Récupération des données des médecins : 
    }else if (isset($_GET["getDoctorDatas"])){

        //Récupération des données du docteur :
        $query = "SELECT DISTINCT
            DOCTOR.ID_Doctor
            , DOCTOR.first_name
            , DOCTOR.last_name
            , ADDRESS.address
            , ADDRESS.city
            , ADDRESS.postal_code
            , PLANNING.ID_Planning
        FROM DOCTOR
            INNER JOIN OFFICE ON OFFICE.ID_Office = DOCTOR.ID_Office
            INNER JOIN ADDRESS ON ADDRESS.ID_Address = OFFICE.ID_Address 
            INNER JOIN PRACTICE ON PRACTICE.ID_Doctor = DOCTOR.ID_Doctor
            INNER JOIN PLANNING ON PLANNING.ID_Doctor = DOCTOR.ID_Doctor;";

        $result1 = send_simple_query($query, "select");

        //Récupération du type de médecine pour chaque docteur :
        $query = "SELECT 
            DOCTOR.ID_Doctor
            , MEDICAL_TYPE.Name
        FROM MEDICAL_TYPE
            INNER JOIN PRACTICE ON PRACTICE.ID_Medical_Type = MEDICAL_TYPE.ID_Medical_Type
            INNER JOIN DOCTOR ON PRACTICE.ID_Doctor = DOCTOR.ID_Doctor;";

        $result2 = send_simple_query($query, "select");

        if($result1 && $result2){
            $json = [];
            $medical = [];

            foreach($result2 as $result2){
                $medical[$result2["ID_Doctor"]] =  $medical[$result2["ID_Doctor"]] .= "&" . $result2["Name"];
            }

            foreach($result1 as $result1){
                $json[$result1["ID_Doctor"]] = array(
                    "ID_Doctor" => $result1["ID_Doctor"],
                    "first_name" => $result1["first_name"],
                    "last_name" => $result1["last_name"],
                    "medical_type" => $medical[$result1["ID_Doctor"]],
                    "address" => $result1["address"],
                    "city" => $result1["city"],
                    "postal_code" => $result1["postal_code"],
                    "ID_Planning" => $result1["ID_Planning"],
                );
            }

            http_response_code(200);
            header('Content-type: application/json');
            echo json_encode($json);
        }else{
            http_response_code(500);
        }
    
    // Récupération des jours qui n'ont plus de créneaux de disponible :
    }else if (isset($_GET["getFullSlotDay"])){

        $query = "SELECT 
            DAY(CONSULTATION.consultation_date) as consultation_day
            , COUNT(CONSULTATION.consultation_date) AS slots_number
        FROM CONSULTATION
        WHERE CONSULTATION.ID_Planning = {$_GET["planningID"]}
            AND (SELECT MONTH(CONSULTATION.consultation_date)) = {$_GET["month"]}
            AND (SELECT YEAR(CONSULTATION.consultation_date)) = {$_GET["year"]}
        GROUP BY consultation_day
        HAVING slots_number = 8;";

        $result = send_simple_query($query, "select");

        if(gettype($result) == "array"){
            $json = [];

            if($result){
                foreach($result as $result){
                    array_push($json, $result["consultation_day"]);
                }
            }

            http_response_code(200);
            header('Content-type: application/json');
            echo json_encode($json);
        }else{
            http_response_code(500);
        }
      
    }else if (isset($_GET["destroyPhpSession"])){
        session_destroy();
        http_response_code(200);
    }
?>

