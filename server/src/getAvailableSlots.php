<?php
    include "database.php";

    $query = "SELECT 
        CONSULTATION.time_slot
    FROM CONSULTATION
    WHERE CONSULTATION.ID_Doctor = {$_GET["doctorID"]}
        AND (SELECT DAY(CONSULTATION.consultation_date)) = {$_GET["day"]}
        AND (SELECT MONTH(CONSULTATION.consultation_date)) = {$_GET["month"]}
        AND (SELECT YEAR(CONSULTATION.consultation_date)) = {$_GET["year"]};";

    $result = send_simple_query($query, "select");

    if(gettype($result) == "array"){
        $json = [
            "1" => "8h-9h",
            "2" => "9h-10h",
            "3" => "10h-11h",
            "4" => "11h-12h",
            "5" => "14h-15h",
            "6" => "15h-16h",
            "7" => "16h-17h",
            "8" => "17h-18h",
        ];

        if($result){
            foreach($result as $result){
                $time_slot = $result["time_slot"];
                if(array_key_exists($time_slot, $json)){
                    unset($json[$time_slot]);
                }
            }
        }

        http_response_code(200);
        header('Content-type: application/json');
        echo json_encode($json);
    }else{
        http_response_code(500);
    }
?>