<?php 
    //Formulaire d'enregistrement :
    if (isset($_POST["registerInformationModalForm"])){
        echo "Enregistrement";

    //Formulaire de récupération du mot de passe : 
    }elseif (isset($_POST["forgotPasswordModalForm"])) {
        echo "Récupération du mot de passe";
    }
?>

