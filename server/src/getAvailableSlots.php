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
    // var_dump($result);
    if(gettype($result) == "array"){
        $json = ["1","2","3","4","5","6","7","8"];
        $time_slots = [];
        if($result){
            foreach($result as $result){
                array_push($time_slots, $result["time_slot"]);
            }
            $json = array_diff($json, $time_slots);
        }

        http_response_code(200);
        header('Content-type: application/json');
        echo json_encode($json);
    }else{
        http_response_code(500);
    }
?>