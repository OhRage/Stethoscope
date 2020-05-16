<?php 
    include "database.php";

    $request_payload = file_get_contents("php://input");
    $datas = json_decode($request_payload, true);

    //Récupération de l'ID du planning :
    $query = "SELECT
        PLANNING.ID_Planning
    FROM PLANNING
    WHERE PLANNING.ID_Doctor = {$datas["doctorID"]};";

    $result = send_simple_query($query, "select");

    if($result){
        $id_planning = $result[0]["ID_Planning"];
        
        //Récupération de l'ID du patient :
        $query = "SELECT
            PATIENT.ID_Patient 
        FROM PATIENT
        INNER JOIN USERS ON USERS.ID_User = PATIENT.ID_User
        WHERE USERS.login = \"{$datas["login"]}\";";

        $result = send_simple_query($query, "select");

        if($result){
            $id_patient = $result[0]["ID_Patient"];

            //Controle sur le slot time :
            $query = "SELECT
                CONSULTATION.time_slot
            FROM CONSULTATION
            WHERE CONSULTATION.consultation_date = \"{$datas["consultationDate"]}\"
                AND CONSULTATION.ID_Planning = {$id_planning}
                AND CONSULTATION.time_slot = {$datas["timeSlot"]};";
            
            $result = send_simple_query($query, "select");

            if(gettype($result) == "array" && $result == false){

                //Vérification si c'est un premier RDV :
                $first_time = 1;

                $query = "SELECT
                    CONSULTATION.ID_Consultation
                FROM CONSULTATION
                WHERE CONSULTATION.ID_Patient = {$id_patient}
                    AND CONSULTATION.ID_Planning = {$id_planning};";

                $result = send_simple_query($query, "select");

                if($result){
                    $first_time = 0;
                }

                //Ajout d'un enregistrement dans la table CONSULTATION                
                $query = "INSERT INTO CONSULTATION (
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
                    , {$id_patient}
                    , {$id_planning}
                );";

                $result = send_simple_query($query, "upsert");

                if($result){
                    $msg = " Réservation validée.";
                    $code = 200;
                }else{
                    $msg = " Veuillez réessayer.";
                    $code = 500;
                }
            }else{
                $msg = " Créneaux déjà réservé.";
                $code = 500;  
            }

        }else{
            $msg = " Médecin non reconnu.";
            $code = 500; 
        }

    }else{
        $msg = " Utilisateur non reconnu.";
        $code = 500; 
    }

    if($code == 500){
        $msg = "Echec lors de la réservation du rendez-vous." .$msg;
    }

    $json = ["message" => $msg];

    http_response_code($code);
    header('Content-type: application/json');
    echo json_encode($json);
?>