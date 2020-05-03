class RegistrationModalWindow {
  constructor(domElement) {
    this.domElement = domElement;
  }

  componentMount() {
    //Modal :
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("id", "registerInformationModal");

    //Modail Dialog :
    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-lg";

    //Modal Content :
    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    //Modal Header :
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header text-center";
    let modalWindowTitle = document.createElement("h3");
    modalWindowTitle.className = "col-12 modal-title text-center";
    modalWindowTitle.innerHTML = "S'enregistrer";
    modalHeader.appendChild(modalWindowTitle);

    let modalBody = this.modalWindowBodyMount();

    //Ajout de tous les composant de la fenêtre modal :
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    //Link du button sur la fenêtre modal :
    $("#registerInformationModal").modal();

    //Ajout de la fenêtre modal au domElement :
    this.domElement.appendChild(modal);
  }

  componentUnmount() {
    let component = this.domElement.querySelector("#registerInformationModal");
    this.domElement.removeChild(component);
  }

  modalWindowBodyMount() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body text-left";

    let personnalInformationLabel = {
      firstName: "Prénom :",
      lastName: "Nom :",
      birthDate: "Date de naissance :",
      socialNumber: "Numéro de sécurité sociale :",
      address: "Adresse :",
      city: "Ville :",
      postalCode: "Code postal :",
      phoneNumber: "Numéro de téléphone :",
    };

    let connexionInformationLabel = {
      emailAddress: "Adresse email :",
      confirmEmailAddress: "Confirmez votre adresse email",
      password: "Mot de passe :",
      confirmPassword: "Confirmez votre mot de passe",
    };

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      personnalInformationLabel,
      connexionInformationLabel
    );
    profileInformationsComponent.componentMount();

    this.setModificationForm(modalBody);

    return modalBody;
  }

  setModificationForm(modalBody) {
    //Récupération du formulaire :
    let form = modalBody.querySelector("[name=mainForm");
    form.setAttribute("id", "registerInformationModalForm");
    form.setAttribute("action", "/server/src/httpRequests.php");

    //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
    let formName = document.createElement("input");
    formName.setAttribute("type", "hidden");
    formName.setAttribute("name", "registerInformationModalForm");

    //Ajout des invalid-feedback :
    let inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== "hidden") {
        inputs[i].insertAdjacentHTML(
          "afterend",
          "<div class='invalid-feedback'></div>"
        );
      }
    }

    //Ajout des boutons du formulaire :
    let modalRow = document.createElement("div");
    modalRow.className = "row justify-content-end";

    form.appendChild(formName);

    //Bouton fermer
    let modalCloseButton = document.createElement("button");
    modalCloseButton.className = "btn btn-primary mr-4 ml-4";
    modalCloseButton.setAttribute("type", "button");
    modalCloseButton.setAttribute("id", "closeButton");
    modalCloseButton.setAttribute("data-dismiss", "modal");
    modalCloseButton.innerHTML = "Fermer";
    modalRow.appendChild(modalCloseButton);

    let modalValidateButton = document.createElement("button");
    modalValidateButton.className = "btn btn-primary mr-4 ml-4";
    modalValidateButton.setAttribute("type", "button");
    modalValidateButton.innerHTML = "Valider";
    modalValidateButton.addEventListener("click", () => {
      this.onSubmitForm(form, event);
    });

    modalRow.appendChild(modalValidateButton);

    form.appendChild(modalRow);

    //Gestionnaire d'évenement sur le bouton fermer :
    modalCloseButton.addEventListener(
      "click",
      () => {
        this.componentUnmount();
      },
      false
    );
  }

  onSubmitForm(form, event) {
    //Contrôle de saisie :

    let inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== "hidden") {
        if (inputs[i].value === "") {
          //Les champs ne doivent pas être vide :
          inputs[i].setCustomValidity("Invalid field");
          let invalidFeedback = inputs[i].nextSibling;
          invalidFeedback.innerHTML = "Vous devez saisir une valeur.";
        } else {
          inputs[i].setCustomValidity("");

          //Contrôles supplémentaires
          let invalidFeedback;
          switch (inputs[i].getAttribute("id")) {
            case "birthDate":
              //L'utilisateur doit avoir plus de 18 ans :
              let age = getAge(inputs[i].value);
              if (age < 18) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Vous devez être majeur pour vous inscrire";
              }
              break;

            case "socialNumber":
              //Le numéro de sécurité social doit avoir 13 chiffres et aucune lettre :
              let socialNumber = inputs[i].value;
              if (
                isNaN(parseInt(socialNumber, 10)) ||
                socialNumber.length !== 13
              ) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Le numéro de sécurité social doit contenir 13 chiffres.";
              }
              break;

            case "city":
              //La ville doit contenir que des caractères :
              let city = inputs[i].value;
              if (city.match(/.*[0-9].*/gm)) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "La ville que vous avez renseignée est invalide.";
              }
              break;

            case "postalCode":
              //Le code postal doit contenir 5 chiffres :
              let postalCode = inputs[i].value;
              if (isNaN(parseInt(postalCode, 10)) || postalCode.length !== 5) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Vous devez saisir un code postal valide (ex : 69000)";
              }
              break;

            case "phoneNumber":
              //Le numéro de téléphone doit contenir 10 chiffres :
              let phoneNumber = inputs[i].value;
              if (
                isNaN(parseInt(phoneNumber, 10)) ||
                phoneNumber.length !== 10 ||
                phoneNumber.charAt(0) !== "0"
              ) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Vous devez saisir un numéro de téléphone valide (ex : 0601020304)";
              }
              break;

            case "emailAddress":
              //L'adresse email doit avoir un format correct :
              let email = inputs[i].value;
              if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Votre adresse email n'est pas au bon format (ex: jean.blanc@email.com).";
              }
              break;

            case "password":
              //Le mot de passe doit être fort :
              let password = inputs[i].value;
              if (
                !password.match(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g
                )
              ) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Votre mot de passe doit contenir 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial (!@#$%^&*).";
              }
              break;

            case "confirmEmailAddress":
              //Les emails renseignés doivent être égaux :
              let emailAddressValue = form.querySelector("#emailAddress").value;
              let confirmEmailAddress = inputs[i].value;
              if (emailAddressValue !== confirmEmailAddress) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Les adresses emails doivent être identiques.";
              }
              break;

            case "confirmPassword":
              //Les mot de passes doivent être égaux :
              let passwordValue = form.querySelector("#password").value;
              let confirmPassword = inputs[i].value;
              if (passwordValue !== confirmPassword) {
                inputs[i].setCustomValidity("Invalid Field");
                invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML =
                  "Les mot de passe doivent être identiques.";
              }
              break;
          }
        }
      }
    }

    if (form.checkValidity() === false) {
      //Retour à l'écran d'enregistrement :
      event.preventDefault();
      event.stopPropagation();

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "hidden") {
          let invalidFeedback = inputs[i].nextSibling;
          if (inputs[i].checkValidity() === false) {
            invalidFeedback.className = "invalid-feedback d-block";
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
        let msg = JSON.parse(ajax.response)["message"];

        if (
          status === 403 &&
          msg === "L'email que vous avez saisie est déjà utilisé."
        ) {
          //Information sur l'email déjà pris :
          let emailAddressInvalidFeedback = form.querySelector("#emailAddress")
            .nextSibling;
          emailAddressInvalidFeedback.className = "invalid-feedback d-block";
          emailAddressInvalidFeedback.innerHTML = msg;
        } else {
          //Ferme la fenêtre modal :
          form.querySelector("#closeButton").click();

          //Récupération du connexionFeedback :
          let connexionFeedback = document.querySelector("#connexionFeedback");
          connexionFeedback.innerHTML = msg;
          connexionFeedback.style.display = "block";

          if (status === 200) {
            //Information sur la connexion OK :
            connexionFeedback.style.color = "green";
          } else {
            connexionFeedback.style.color = "red";
          }
        }
      };

      ajax.open("POST", "http://stethoscope/server/src/httpRequests.php");
      ajax.send(new FormData(form));
    }
  }
}
