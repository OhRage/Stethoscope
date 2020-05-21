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
        , DOCTOR.first_name
        , DOCTOR.last_name
        , DOCTOR.image_path
    FROM CONSULTATION
    LEFT JOIN ADDRESS ON ADDRESS.is_office_address = 1
    INNER JOIN USERS ON USERS.login = \"{$_GET["login"]}\"
    INNER JOIN PATIENT ON PATIENT.ID_User = USERS.ID_User
    INNER JOIN DOCTOR ON DOCTOR.ID_Doctor = CONSULTATION.ID_Doctor
    WHERE CONSULTATION.ID_Patient = PATIENT.ID_Patient
    ORDER BY CONSULTATION.consultation_date;";

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
                "doctor_first_name" => $result["first_name"],
                "doctor_last_name" => $result["last_name"],
                "image_path" => $result["image_path"],
            );
        }

        http_response_code(200);
        header('Content-type: application/json');
        echo json_encode($json);
    }else{
        http_response_code(500);
    }
?>