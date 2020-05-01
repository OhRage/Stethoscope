<?php
    // /* Configuration du fichier de log */
    ini_set("log_errors", 1);
    ini_set("error_log", "../log/error.stethoscope.fr.log");

    function send_select_request($request){

        /* Ouverture de la connexion non persistante : */
        $connection = mysqli_connect("127.0.0.1:3306", "root", "Jupiter2020!", "Stethoscope");

        /* Vérification de la connexion */
        if (mysqli_connect_errno()){
            error_log("Echec de la connexion : %s\n", mysqli_connect_error());
            exit();
        }
            
        $result = mysqli_query($connection, $request);

        if ($result  == false){
            error_log("Erreur de transaction sur la requête suivante : %s\n", $request);
        }
        
        /* Récupération des données : */
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

        /* Libération des résultats */
        mysqli_free_result($result);
        
        /* Fermeture de la connexion */
        mysqli_close($connection);

        return $rows;
    }
?>