<?php 
    session_start();
    include "database.php";

    if (isset($_GET["destroyPhpSession"])){
        session_destroy();
        http_response_code(200);
    }
?>

