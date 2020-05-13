<?php 
    include "database.php";

    $request_payload = file_get_contents("php://input");
    $datas = json_decode($request_payload, true);
    $first_time =  (int)$datas["firstTime"];

    //Construction de la requête :
    $query = "SET AUTOCOMMIT=0;";
    
    //Récupération de l'ID du patient :
    $query .= "SET @ID_Patient  = (
    SELECT
        PATIENT.ID_Patient 
    FROM PATIENT
    INNER JOIN USERS ON USERS.ID_User = PATIENT.ID_User
    WHERE USERS.login = \"{$datas["login"]}\"
    );";
    
    //Récupération de l'ID du planning :
    $query .= "SET @ID_Planning  = (
    SELECT
        PLANNING.ID_Planning
    FROM PLANNING
    WHERE PLANNING.ID_Doctor = {$datas["doctorID"]}
    );";

    //Ajout d'un enregistrement dans la table CONSULTATION
    $query .= "INSERT INTO CONSULTATION (
        reason
        , consultation_date
        , time_slot
        , first_time
        , ID_Patient
        , ID_Planning
    ) VALUES (
        \"{$datas["reason"]}\"
        , \"{$datas["consultationDate"]}\" 
        , {$datas["timeSlot"]} 
        , {$first_time} 
        , @ID_Patient
        , @ID_Planning
    );";

    $query .= "COMMIT;";    

    $result = send_multiple_upsert_query($query);

    if($result){
        $msg = "Rendez-vous reservé avec succès.";
        $code = 200;
    }else{
        $msg = "Echec lors de la réservation du rendez-vous. Veuillez réessayer.";
        $code = 500;
    }

    http_response_code($code);
    header('Content-type: application/json');
    echo json_encode($query);
?>