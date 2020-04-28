class DoctorModalWindow {
  constructor(domElement, serverDatas) {
    this.domElement = domElement;
    this.serverDatas = serverDatas;
  }

  componentMount() {
    //Modal :
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("id", "doctorInformationModal");

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
    modalWindowTitle.innerHTML = "Mon médecin";
    modalHeader.appendChild(modalWindowTitle);

    //Construction du body  :
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
    $("#doctorInformationModal").modal();

    //Ajout de la fenêtre modal au domElement :
    this.domElement.appendChild(modal);
  }

  componentUnmount() {
    let component = this.domElement.querySelector("#doctorInformationModal");
    this.domElement.removeChild(component);
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

    let modalModifyButton = document.createElement("button");
    modalModifyButton.className = "btn btn-primary mr-4 ml-4";
    modalModifyButton.setAttribute("type", "button");
    modalModifyButton.innerHTML = "Modifier";
    modalModifyButton.addEventListener("click", () => {
      this.onModifyButtonClick();
    });
    modalRow.appendChild(modalModifyButton);

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

  modalWindowBodyMount() {
    //Création du modalBody :
    let modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    let doctorInformationLabel = {
      firstName: "Prénom :",
      lastName: "Nom :",
      birthDate: "Date de naissance :",
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

    //Récupération du formulaire :
    let form = modalBody.querySelector("[name=mainForm");
    form.setAttribute("id", "doctorInformationModalForm");
    form.setAttribute("action", "/server/src/httpRequests.php");

    //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
    let formName = document.createElement("input");
    formName.setAttribute("type", "hidden");
    formName.setAttribute("name", "doctorInformationModalForm");

    form.appendChild(formName);

    return modalBody;
  }

  onModifyButtonClick() {
    console.log("Bouton Modifier");
  }

  onValidateButtonClick() {
    //Récupération du formulaire de la fenêtre modale :
    let mainForm = document.querySelector("#modalSection [name=mainForm]");

    //Vérification des saisies :

    //Envoi du formulaire :
    mainForm.submit();
  }
}
