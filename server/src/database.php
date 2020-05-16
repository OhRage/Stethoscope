<?php
    // /* Configuration du fichier de log */
    ini_set("log_errors", 1);
    ini_set("error_log", "../log/error.stethoscope.fr.log");

    function send_simple_query($query, $type){

        /* Ouverture de la connexion non persistante : */
        $connection = mysqli_connect("127.0.0.1:3306", "root", "Jupiter2020!", "Stethoscope");

        /* Vérification de la connexion */
        if ($error = mysqli_connect_errno()){
            error_log("Echec de la connexion : {$error}\n", 0);
            exit();
        }
            
        $result = mysqli_query($connection, $query);
        $error = mysqli_error($connection);
        if ($error){
            error_log("Erreur de transaction : {$error} Requête : {$query}", 0);
            $rows = false;
        } else {
            /* Récupération des données : */
            if($type = "select" && gettype($result) != "boolean"){
                $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
                /* Libération des résultats */
                mysqli_free_result($result);
            } elseif ($type = "upsert"){
                $rows = $result;
            }
        }
    
        /* Fermeture de la connexion */
        mysqli_close($connection);

        return $rows;
    }

    function send_multiple_upsert_query($query){

        /* Ouverture de la connexion non persistante : */
        $connection = mysqli_connect("127.0.0.1:3306", "root", "Jupiter2020!", "Stethoscope");
        $result = true;
        /* Vérification de la connexion */
        if ($error = mysqli_connect_errno()){
            error_log("Echec de la connexion : {$error}", 0);
            $result = false;
            exit();
        }
            
        if (mysqli_multi_query($connection, $query)) {
            do {
                $error = mysqli_error($connection);
                if ($error) {
                    $result = false;
                    error_log("Erreur de transaction : {$error} Requête : {$query}", 0);
                    break;
                }
            } while (mysqli_next_result($connection));
        };
   
        /* Fermeture de la connexion */
        mysqli_close($connection);

        return $result;
    }
?>