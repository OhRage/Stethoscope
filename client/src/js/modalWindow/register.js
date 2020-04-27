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

    //Construction du modalFooter :
    let modalFooter = this.modalWindowFooterMount();

    //Ajout de tous les composant de la fenêtre modal :
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

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
      age: "Age :",
      socialNumber: "Numéro de sécurité sociale :",
      address: "Adresse :",
      city: "Ville :",
      postalCode: "Code postal :",
      phoneNumber: "Numéro de téléphone :",
    };

    let connexionInformationLabel = {
      emailAddress: "Adresse email :",
      password: "Mot de passe :",
      confirmEmailAddress: "Confirmez votre mot de passe",
      confirmPassword: "Confirmez votre adresse email",
    };

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      personnalInformationLabel,
      connexionInformationLabel
    );
    profileInformationsComponent.componentMount();

    //Récupération du formulaire :
    let form = modalBody.querySelector("[name=mainForm");
    form.setAttribute("id", "registerInformationModalForm");
    form.setAttribute("action", "/server/src/httpRequests.php");

    //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
    let formName = document.createElement("input");
    formName.setAttribute("type", "hidden");
    formName.setAttribute("name", "registerInformationModalForm");

    form.appendChild(formName);

    return modalBody;
  }

  modalWindowFooterMount() {
    //Création du modalFooter :
    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    let modalRow = document.createElement("div");
    modalRow.className = "row";

    //Bouton fermer
    let modalCloseButton = document.createElement("button");
    modalCloseButton.className = "btn btn-primary mr-4 ml-4";
    modalCloseButton.setAttribute("type", "button");
    modalCloseButton.setAttribute("data-dismiss", "modal");
    modalCloseButton.innerHTML = "Fermer";

    modalRow.appendChild(modalCloseButton);
    modalFooter.appendChild(modalRow);

    let modalValidateButton = document.createElement("button");
    modalValidateButton.className = "btn btn-primary mr-4 ml-4";
    modalValidateButton.setAttribute("type", "submit");
    modalValidateButton.innerHTML = "Valider";
    modalValidateButton.addEventListener("click", () => {
      this.onValidateButtonClick();
    });
    modalRow.appendChild(modalValidateButton);

    modalFooter.appendChild(modalRow);

    //Gestionnaire d'évenement sur le bouton fermer :
    modalCloseButton.addEventListener(
      "click",
      () => {
        this.componentUnmount();
      },
      false
    );

    return modalFooter;
  }

  onValidateButtonClick() {
    //Récupération du formulaire de la fenêtre modale :
    let mainForm = document.querySelector("#modalSection [name=mainForm]");

    //Vérification des saisies :

    //Envoi du formulaire :
    mainForm.submit();
  }
}
