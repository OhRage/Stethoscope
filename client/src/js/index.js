function loginButtonsEvent() {
  if (document.readyState === "complete") {
    //Récupération des boutons de la loginPage :
    let loginButton = document.getElementById("loginButton");
    let registrationButton = document.getElementById("registrationButton");
    let forgetPasswordButton = document.getElementById("forgetPasswordButton");

    //Affectation d'évenements aux boutons :
    loginButton.addEventListener(
      "click",
      () => {
        onLoginClick();
      },
      false
    );

    registrationButton.addEventListener(
      "click",
      () => {
        onRegistrationClick();
      },
      false
    );

    forgetPasswordButton.addEventListener(
      "click",
      () => {
        onForgotClick();
      },
      false
    );
  }
}

function onLoginClick() {}

function onRegistrationClick() {
  let modalSection = document.getElementById("modalSection");


  //On ajoute la fenêtre modal au domElement :
  var modalWindow = new RegistrationModalWindow(
    modalSection,
  );
  modalWindow.componentMount();
}

function onForgotClick() {
    let modalSection = document.getElementById("modalSection");


    //On ajoute la fenêtre modal au domElement :
    var modalWindow = new ModalWindow(
      modalSection,
      "#forgotPasswordModal",
      "",
      "S'enregistrer",
      undefined
    );
    modalWindow.componentMount();
}

//Gestionnnaire d'évenement du document :
document.addEventListener("readystatechange", () => {
  loginButtonsEvent();
});
