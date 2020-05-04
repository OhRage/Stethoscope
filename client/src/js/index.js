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

        //L'adresse email doit avoir un format correct :
        if (inputs[i].getAttribute("id") === "inputEmail") {
          let email = inputs[i].value;
          if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            inputs[i].setCustomValidity("Invalid Field");
            invalidFeedback = inputs[i].nextSibling;
            invalidFeedback.innerHTML =
              "Mauvais format d'email (ex: jean.blanc@email.com).";
          }
        }
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
  } else {
    //Appel AJAX :
    let ajax = new XMLHttpRequest();

    ajax.onload = () => {
      let status = ajax.status;
      if (status === 200) {
        //Enregistrement du login dans un cookie :
        let login = document.querySelector("#inputEmail").value;
        setCookie("login", login);

        //Connexion a la page d'accueil :
        window.location.href =
          "http://stethoscope/client/src/html/homepage.php";
      } else if (status === 403) {
        //Informations de connexion invalides :
        let connexionFeedback = form.querySelector("#connexionFeedback");
        connexionFeedback.innerHTML =
          "Les informations que vous avez saisies sont invalides.";
        connexionFeedback.style.display = "block";
        connexionFeedback.style.color = "red";
      }
    };

    ajax.open("POST", "http://stethoscope/index.php");
    ajax.send(new FormData(form));
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
