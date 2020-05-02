<?php 
    include "database.php";

    //Formulaire d'enregistrement :
    if (isset($_POST["registerInformationModalForm"])){

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
        $msg = "Erreur lors de l'enregistrement";
        $login = $datas["emailAddress"];
        $query = "SELECT login FROM USERS WHERE login = \"$login\";";
        $result = send_request($query, "select");
        

        //Redirection en fonction de $result :
        if (gettype($result) != "array" && $result == false){ //Erreur de transaction
            $msg = "Erreur serveur.";
        }elseif (gettype($result) == "array" && $result != false) { //Email déjà pris
            $msg = "L'email que vous avez saisie est déjà utilisé.";        
        }else if (gettype($result) == "array" && $result == false){ //Enregistrement OK
            //Création de l'utilisateur :
            $query = "INSERT INTO Stethoscope.USERS(
                login
                ,password
                ,administrator)
            VALUES(
                \"{$datas["emailAddress"]}\",
                \"{$datas["password"]}\",
                \"0\");";

            $result = send_request($query, "upsert");

            if ($result){

                //Récupération de l'ID de l'utilisateur :
                $query = "SELECT ID_User FROM USERS WHERE login = \"$login\"";
                $result = send_request($query, "select");

                if($result){

                    //Création du patient :
                    $userID = $result[0]["ID_User"];

                    $query = "INSERT INTO Stethoscope.PATIENT(
                        first_name
                        ,last_name
                        ,birth_date
                        ,social_security_number
                        ,phone_number
                        ,email_address
                        , ID_User
                    )
                    VALUES(
                        \"{$datas["firstName"]}\"
                        , \"{$datas["lastName"]}\"
                        , \"{$datas["birthDate"]}\"
                        , \"{$datas["socialNumber"]}\"
                        , \"{$datas["phoneNumber"]}\"
                        , \"{$datas["emailAddress"]}\"
                        , {$userID});";

                    $result = send_request($query, "upsert");

                    if($result){
                        $msg = "Enregistrement validé.";
                    }
                }
            }
        }

        //Redirection vers la page de connexion :
        $msg .= "\nVous allez être redirigé vers la page de connexion.";
        echo $msg;
        header("refresh:4;url=http://stethoscope/index.html"); 
        
    //Formulaire de récupération du mot de passe : 
    }elseif (isset($_POST["forgotPasswordModalForm"])) {
        echo "Récupération du mot de passe";
    }
?>

