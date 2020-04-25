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

    return modalBody;
  }

  registerInformationWindow() {
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
      undefined,
      personnalInformationLabel,
      connexionInformationLabel
    );
    profileInformationsComponent.componentMount();

    return modalBody;
  }

  forgotPasswordWindow() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body text-left";

    let form = document.createElement("form");
    form.className = "needs-validation";
    form.noValidate = true;

    let formGroup = document.createElement("div");
    formGroup.className = "form-group p-4";

    let label = document.createElement("h1");
    label.className = "h6";
    label.innerHTML = "Veuillez renseigner votre adresse email : ";

    let hr = document.createElement("div");
    hr.className = "w-100";

    let row = document.createElement("div");
    row.className = "row mt-2";

    let col = document.createElement("div");
    col.className = "col";

    let input = document.createElement("input");
    input.setAttribute("type", "email");
    input.setAttribute("id", "inputEmail");
    input.setAttribute("placeholder", "jean.blanc@gmail.com");
    input.setAttribute("aria-describedby", "emailHelp");
    input.required = true;
    input.className = "form-control";

    col.appendChild(input);
    row.appendChild(col);
    formGroup.appendChild(label);
    formGroup.appendChild(hr);
    formGroup.appendChild(row);
    form.appendChild(formGroup);
    modalBody.appendChild(form);

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
      case "registerInformationModal":
        var modalBody = this.registerInformationWindow();
        break;
      case "forgotPasswordModal":
        var modalBody = this.forgotPasswordWindow();
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
    let calendarModalWindow = document.querySelector("#calendarModal");
    if (
      this.modalID === "consultationInformationModal" &&
      calendarModalWindow
    ) {
      $("#calendarModal").modal("show");
    }
  }
}
