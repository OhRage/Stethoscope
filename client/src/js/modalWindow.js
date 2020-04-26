class ModalWindow {
  constructor(domElement, modalID, modalSize, modalTitle, serverDatas) {
    this.domElement = domElement;
    this.modalID = modalID.replace("#", "");
    this.modalSize = modalSize;
    this.modalTitle = modalTitle;
    this.serverDatas = serverDatas;
  }

  modalWindowFooter(modalID) {
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

    //Spécification par modalWindow :
    if (
      modalID === "personalInformationModal" ||
      modalID === "doctorInformationModal"
    ) {
      let modalModifyButton = document.createElement("button");
      modalModifyButton.className = "btn btn-primary mr-4 ml-4";
      modalModifyButton.setAttribute("type", "button");
      modalModifyButton.innerHTML = "Modifier";
      modalModifyButton.addEventListener("click", () => {
        this.onModifyButtonClick();
      });
      modalRow.appendChild(modalModifyButton);
    } else if (
      modalID === "registerInformationModal" ||
      modalID === "forgotPasswordModal"
    ) {
      let modalValidateButton = document.createElement("button");
      modalValidateButton.className = "btn btn-primary mr-4 ml-4";
      modalValidateButton.setAttribute("type", "submit");
      modalValidateButton.innerHTML = "Valider";
      modalValidateButton.addEventListener("click", () => {
        this.onValidateButtonClick();
      });
      modalRow.appendChild(modalValidateButton);
    }

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

  profileModalWindowBody() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";

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
    };

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      personnalInformationLabel,
      connexionInformationLabel
    );
    profileInformationsComponent.componentMount();

    this.setFormAttribute(modalBody);

    return modalBody;
  }

  calendarModalWindowBody() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.setAttribute("id", "patientCalendar");

    //Ajout des informations générales :
    const calendar = new Calendar(modalBody);
    calendar.componentMount("today");

    return modalBody;
  }

  consultationModalWindowBody() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    for (let i = 0; i < this.serverDatas.length; i++) {
      var consultationComponent = new Consultation(
        modalBody,
        this.serverDatas[i]
      );
      consultationComponent.componentMount();
    }

    return modalBody;
  }

  doctorInformationWindow() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    let doctorInformationLabel = {
      firstName: "Prénom :",
      lastName: "Nom :",
      age: "Age :",
      conventionArea: "Secteur de convention :",
      address: "Adresse :",
      city: "Ville :",
      postalCode: "Code postal :",
      phoneNumber: "Numéro de téléphone :",
    };

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      doctorInformationLabel,
      undefined
    );
    profileInformationsComponent.componentMount();

    this.setFormAttribute(modalBody);

    return modalBody;
  }

  setFormAttribute(modalBody) {
    //Récupération du formulaire :
    let form = modalBody.querySelector("[name=mainForm");
    form.setAttribute("id", this.modalID + "Form");
    form.setAttribute("action", "/server/src/httpRequests.php");

    //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
    let formName = document.createElement("input");
    formName.setAttribute("type", "hidden");
    formName.setAttribute("name", form.getAttribute("id"));

    form.appendChild(formName)
  }

  componentMount() {
    //Modal :
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("id", this.modalID);

    //Modail Dialog :
    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog " + this.modalSize;

    //Modal Content :
    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    //Modal Header :
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header text-center";
    let modalWindowTitle = document.createElement("h3");
    modalWindowTitle.className = "col-12 modal-title text-center";
    modalWindowTitle.innerHTML = this.modalTitle;
    modalHeader.appendChild(modalWindowTitle);

    let originPage = "homepage";

    //Construction du body et du footer en fonction de l'ID de la fenêtre modale :
    switch (this.modalID) {
      case "personalInformationModal":
        var modalBody = this.profileModalWindowBody();
        break;
      case "consultationInformationModal":
        var modalBody = this.consultationModalWindowBody();
        break;
      case "calendarModal":
        var modalBody = this.calendarModalWindowBody();
        break;
      case "doctorInformationModal":
        var modalBody = this.doctorInformationWindow();
        break;
      case "registerInformationModal":
        var modalBody = this.registerInformationWindow();
        originPage = "index";
        break;
      case "forgotPasswordModal":
        var modalBody = this.forgotPasswordWindow();
        originPage = "index";
        break;
    }

    //Construction du modalFooter :
    let modalFooter = this.modalWindowFooter(this.modalID);

    //Ajout de tous les composant de la fenêtre modal :
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    //Link du button sur la fenêtre modal :
    $("#" + this.modalID).modal();

    //Ajout de la fenêtre modal au domElement :
    this.domElement.appendChild(modal);
  }

  componentUnmount() {
    let component = this.domElement.querySelector("#" + this.modalID);
    this.domElement.removeChild(component);

    //On affiche la calendarModal dans le cas de la destruction d'une consultationModal :
    let calendarModalWindow = document.querySelector("#calendarModal");
    if (
      this.modalID === "consultationInformationModal" &&
      calendarModalWindow
    ) {
      $("#calendarModal").modal("show");
    }
  }

  onModifyButtonClick() {
    console.log("Bouton Modifier");
  }

  onValidateButtonClick() {
    //Récupération du formulaire de la fenêtre modale :
    let mainForm = document.querySelector("#modalSection [name=mainForm]");
    console.log(mainForm)
    //Vérification des saisies :

    //Envoi du formulaire :
    mainForm.submit();
  }
}
