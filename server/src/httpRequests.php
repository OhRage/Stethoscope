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
        $login = $datas["emailAddress"];
        $query = "SELECT login FROM USERS WHERE login = \"$login\"";

        //Enregistrement des données dans la DB :
        $result = send_select_request($query);
        print_r($result);
        echo("Enregistrement OK");


    //Formulaire de récupération du mot de passe : 
    }elseif (isset($_POST["forgotPasswordModalForm"])) {
        echo "Récupération du mot de passe";
    }
?>

