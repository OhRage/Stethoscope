<?php
    include "database.php";

    $query = "DELETE FROM CONSULTATION
    WHERE CONSULTATION.ID_Consultation = {$_GET["consultationID"]};";

    $result = send_simple_query($query, "upsert");

    if($result){
        $code = 200;
        $msg = "RDV annulé avec succès.";
    }else{
        $code = 500;
        $msg = "Annulation impossible, veuillez contacter directement le médecin par téléphone.";
    }
    $json = [
        "message" => $msg,
    ];

    http_response_code($code);
    header('Content-type: application/json');
    echo json_encode($json);
?>