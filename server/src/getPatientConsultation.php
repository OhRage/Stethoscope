<?php
    include "database.php";

    //Récupération des données du docteur :
    $query = "SELECT
        CONSULTATION.ID_Consultation
        , CONSULTATION.reason
        , CONSULTATION.consultation_date
        , CONSULTATION.time_slot
        , CONSULTATION.first_time
        , CONSULTATION.is_validate
        , CONSULTATION.ID_Doctor
        , ADDRESS.address
        , ADDRESS.city
        , ADDRESS.postal_code
    FROM CONSULTATION
    LEFT JOIN ADDRESS ON ADDRESS.is_office_address = 1
    INNER JOIN USERS ON USERS.login = \"{$_GET["login"]}\"
    INNER JOIN PATIENT ON PATIENT.ID_User = USERS.ID_User
    WHERE CONSULTATION.ID_Patient = PATIENT.ID_Patient;";

    $result = send_simple_query($query, "select");

    if($result){
        $json = [];
   
        foreach($result as $result){
            $json[$result["ID_Consultation"]] = array(
                "ID_Consultation" => $result["ID_Consultation"],
                "reason" => $result["reason"],
                "consultation_date" => $result["consultation_date"],
                "time_slot" => $result["time_slot"],
                "first_time" => $result["first_time"],
                "is_validate" => $result["is_validate"],
                "ID_Doctor" => $result["ID_Doctor"],
                "address" => $result["address"],
                "city" => $result["city"],
                "postal_code" => $result["postal_code"],
            );
        }

        http_response_code(200);
        header('Content-type: application/json');
        echo json_encode($json);
    }else{
        http_response_code(500);
    }
?>