class ConsultationModalWindow {
  constructor(domElement, modalWindowTitle, serverDatas, modalWindowOrigin) {
    this.domElement = domElement;
    this.modalWindowTitle = modalWindowTitle;
    this.serverDatas = serverDatas;
    this.modalWindowOrigin = modalWindowOrigin;
  }

  componentMount() {
    //Modal :
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("id", "consultationInformationModal");

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
    modalWindowTitle.innerHTML = this.modalWindowTitle;
    modalHeader.appendChild(modalWindowTitle);

    //Construction du body :
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
    $("#consultationInformationModal").modal();

    //Ajout de la fenêtre modal au domElement :
    this.domElement.appendChild(modal);
  }

  componentUnmount() {
    let component = this.domElement.querySelector(
      "#consultationInformationModal"
    );
    this.domElement.removeChild(component);

    //On affiche la calendarModal dans le cas de la destruction d'une consultationModal :
    let calendarModalWindow = document.querySelector("#calendarModal");
    if (calendarModalWindow) {
      this.modalWindowOrigin.componentUnmount()
      this.modalWindowOrigin.componentMount();
      $("#calendarModal").modal("show");
    }
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
    modalCloseButton.setAttribute("id", "modalCloseButton");
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

  modalWindowBodyMount() {
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
}
