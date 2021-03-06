<?php
  session_start();
  include "server/src/database.php";

  if (isset($_POST["loginForm"])) {

    //Récupération des inputs :
    $datas = [
        "login" => strtolower($_POST["emailAddress"]),
        "password" => ($_POST["password"]),
     ];

    //Vérification des identifiants de connexion :
    $query = "SELECT password FROM USERS WHERE login = \"{$datas["login"]}\"";
    $result = send_simple_query($query, "select");

    if($result != false && $result[0]["password"] == $datas["password"]){
        echo "OK";
        http_response_code(200);
        $_SESSION["login"]=$datas["login"];
    }else{
        http_response_code(403);
    }     
}else{
?>
<!DOCTYPE html>
<html lang="fr" style="height: 100%;">
  <head>
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
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
      charset="UTF-8"
    />
    <link rel="stylesheet" href="client/src/css/index.css" />
    <title>Stethoscope</title>
  </head>
  <body class="text-center">
    <section id="section-1">
      <div class="container col-3 mt-5 mb-5" id="container-1">
        <div
          class="row justify-content-center align-items-center mt-3 mb-3"
          id="row-1"
        >
          <h1 class="h1 mt-3" id="generalTitle">Stethoscope</h1>
          <div class="w-100"></div>
          <h2 class="h5 mb-4">Gérez vos rendez-vous avec votre médecin</h2>
        </div>
        <div
          class="row justify-content-center align-items-center mb-5"
          id="row-2"
        >
          <img src="client/src/img/logo.svg" alt="" />
        </div>
        <div class="row justify-content-center align-items-center" id="row-3">
          <form
            class="needs-validation"
            name="mainForm"
            id="loginForm"
            novalidate
          >
            <h1 class="h4 mb-3 font-weight-normal text-center">Se connecter</h1>
            <label for="inputEmail" class="sr-only">Email : </label>
            <input
              type="email"
              id="inputEmail"
              name="emailAddress"
              class="form-control mb-3"
              placeholder="Email"
              required=""
              autofocus=""
            /><div class="invalid-feedback"></div>
            <label for="inputPassword" class="sr-only">Mot de passe : </label>
            <input
              type="password"
              id="inputPassword"
              name="password"
              class="form-control mb-3"
              placeholder="Mot de passe"
              required
            /><div class="invalid-feedback"></div>
            <input type="hidden" name="loginForm" />
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Se souvenir de moi
              </label>
            </div>
            <div class="mb-3" id="connexionFeedback"></div>
            <button
              class="btn btn-lg btn-primary btn-block mb-3"
              type="button"
              id="loginButton"
            >
              Connexion
            </button>
          </form>
        </div>
        <div
          class="row justify-content-center align-items-center mb-2"
          id="actionSupport"
        >
          <button
            type="button"
            class="btn ml-2 mb-3"
            id="registrationButton"
            data-toggle="modal"
            data-target="#registerInformationModal"
            data-backdrop="static"
          >
            S'enregistrer
          </button>
          <div class="w-100"></div>
          <button
            type="button"
            class="btn ml-2 mb-3"
            id="forgetPasswordButton"
            data-toggle="modal"
            data-target="#forgotPasswordModal"
            data-backdrop="static"
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
    </section>
    <section id="modalSection"></section>
  </body>
  <script type="text/javascript" src="client/src/js/index.js"></script>
  <script
    type="text/javascript"
    src="client/src/js/modalWindow/register.js"
  ></script>
  <script
    type="text/javascript"
    src="client/src/js/modalWindow/passwordReset.js"
  ></script>
  <script type="text/javascript" src="client/src/js/profile.js"></script>
  <script type="text/javascript" src="client/src/js/util.js"></script>
  <script type="text/javascript" src="client/src/js/ajaxCall.js"></script>
</html>
<?php
}
?>