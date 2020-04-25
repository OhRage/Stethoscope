class ModalWindow {
  constructor(domElement, modalID, modalSize, modalTitle, serverDatas) {
    this.domElement = domElement;
    this.modalID = modalID.replace("#", "");
    this.modalSize = modalSize;
    this.modalTitle = modalTitle;
    this.serverDatas = serverDatas;
  }

  modalWindowFooter() {
    //Création du modalFooter :
    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    let modalRow = document.createElement("div");
    modalRow.className = "row";

    //Bouton fermer
    let modalCloseButton = document.createElement("button");
    modalCloseButton.className = "btn btn-primary mr-2";
    modalCloseButton.setAttribute("type", "button");
    modalCloseButton.setAttribute("data-dismiss", "modal");
    modalCloseButton.innerHTML = "Fermer";

    modalRow.appendChild(modalCloseButton);
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

    let personnalInformationLabel = [
      "Prénom :",
      "Nom :",
      "Age :",
      "Numéro de sécurité sociale :",
      "Adresse :",
      "Ville :",
      "Code postal :",
      "Numéro de téléphone :",
    ];

    let connexionInformationLabel = ["Adresse email :", "Mot de passe :"];

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      personnalInformationLabel,
      connexionInformationLabel
    );
    profileInformationsComponent.componentMount();

    return modalBody;
  }

  calendarModalWindowBody() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.setAttribute("id", "patientCalendar")

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

    let doctorInformationLabel = [
      "Prénom :",
      "Nom :",
      "Age :",
      "Secteur de convention :",
      "Adresse :",
      "Ville :",
      "Code postal :",
      "Numéro de téléphone :",
    ];

    //Ajout des informations générales :
    let profileInformationsComponent = new ProfileInformations(
      modalBody,
      this.serverDatas,
      doctorInformationLabel,
      undefined
    );
    profileInformationsComponent.componentMount();

    return modalBody;
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
    }

    //Construction du modalFooter :
    let modalFooter = this.modalWindowFooter();

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
    let calendarModalWindow = document.querySelector("#calendarModal")
    if(this.modalID === "consultationInformationModal" && calendarModalWindow){
      $("#calendarModal").modal("show");
    }
  }
}
