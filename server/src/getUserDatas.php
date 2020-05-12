<?php
    include "database.php";

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
?>