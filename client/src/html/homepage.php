<?php
  session_start();
  if(!isset($_SESSION["login"])){
    header("Location:../../../index.php");
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Stethoscope</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
      charset="utf-8"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito&display=swap"
      rel="stylesheet"
    />
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="../css/homepage.css" />
    <link rel="stylesheet" href="../css/userMenu.css" />
    <link rel="stylesheet" href="../css/mainPage.css" />
    <link rel="stylesheet" href="../css/calendar.css" />
    <link rel="stylesheet" href="../css/consultation.css" />
  </head>
  <body>
    <section id="mainPageSection" class="container-fluid">
      <div class="container-fluid" id="mainContainer">
        <div class="row" id="mainRow">
        </div>
      </div>
    </section>
    <section id="modalSection">
    </section>
  </body>
  <script type="text/javascript" src="../js/userMenu.js"></script>
  <script type="text/javascript" src="../js/mainPage.js"></script>
  <script type="text/javascript" src="../js/modalWindow/profile.js"></script>
  <script type="text/javascript" src="../js/modalWindow/doctor.js"></script>
  <script type="text/javascript" src="../js/modalWindow/calendar.js"></script>
  <script type="text/javascript" src="../js/modalWindow/consultation.js"></script>
  <script type="text/javascript" src="../js/calendar.js"></script>
  <script type="text/javascript" src="../js/consulation.js"></script>
  <script type="text/javascript" src="../js/profile.js"></script>
  <script type="text/javascript" src="../js/util.js"></script>
</html>
