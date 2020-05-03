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

function onLoginClick() {
  //Récupération du formulaire :
  let form = document.querySelector("[name=mainForm");
  let inputs = form.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type !== "hidden" && inputs[i].type !== "checkbox") {
      if (inputs[i].value === "") {
        //Les champs ne doivent pas être vide :
        inputs[i].setCustomValidity("Invalid field");
        let invalidFeedback = inputs[i].nextSibling;
        invalidFeedback.innerHTML = "Vous devez saisir une valeur.";
      } else {
        inputs[i].setCustomValidity("");
      }
    }
  }

  if (form.checkValidity() === false) {
    //Retour à l'écran d'enregistrement :
    event.preventDefault();
    event.stopPropagation();
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== "hidden" && inputs[i].type !== "checkbox") {
        let invalidFeedback = inputs[i].nextSibling;
        if (inputs[i].checkValidity() === false) {
          invalidFeedback.className = "invalid-feedback d-block mb-3";
        } else {
          invalidFeedback.className = "invalid-feedback";
        }
      }
    }
  }
}

function onRegistrationClick() {
  let modalSection = document.getElementById("modalSection");

  //On ajoute la fenêtre modal au domElement :
  var modalWindow = new RegistrationModalWindow(modalSection);
  modalWindow.componentMount();
}

function onForgotClick() {
  let modalSection = document.getElementById("modalSection");

  //On ajoute la fenêtre modal au domElement :
  var modalWindow = new ResetPasswordModalWindow(modalSection);
  modalWindow.componentMount();
}

//Gestionnnaire d'évenement du document :
document.addEventListener("readystatechange", () => {
  loginButtonsEvent();
});
