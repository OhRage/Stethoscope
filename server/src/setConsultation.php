<?php 

    $request_payload = file_get_contents("php://input");
    var_dump($request_payload);
    //     //Récupération de l'ID du patient :


    //     //Récupération des inputs :
    //     $datas = [
    //         "reason" => strtolower($_POST["medicalType"]),
    //         "consultation_date" => ,
    //         "consultation_time" => $_POST["hourList"],
    //         "time_slot" => ,
    //         "first_time" => $_POST["firstDate"],
    //         "ID_Patient" => ,
    //         "ID_Planning" => ,
    //      ];

    //     $code = 200;
    //     // $query = "INSERT INTO CONSULTATION (
    //     //     reason
    //     //     , consultation_date
    //     //     , consultation_time
    //     //     , time_slot
    //     //     , first_time
    //     //     , ID_Patient
    //     //     , ID_Planning
    //     // ) VALUES (
            
    //     // );"

    //     // $result = send_simple_query($query, "upsert");

    //     // if($result){
            
            
    //     // }else{

    //     // }

    //     http_response_code($code);
    //     header('Content-type: application/json');
    //     echo json_encode($datas);

?>