<?php
    include "database.php";

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
?>