<?php
    include "database.php";

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
?>