class CalendarModalWindow {
    constructor(domElement) {
        this.domElement = domElement;
    }

    componentMount() {
        //Modal :
        let modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("id", "calendarModal");

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
        modalWindowTitle.innerHTML = "Mon planning";
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
        $("#calendarModal").modal();

        //Ajout de la fenêtre modal au domElement :
        this.domElement.appendChild(modal);
    }

    componentUnmount() {
        let component = this.domElement.querySelector("#calendarModal");
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
        modalCloseButton.setAttribute("id", "modalCloseButton");
        modalCloseButton.innerHTML = "Fermer";

        modalRow.appendChild(modalCloseButton);
        modalFooter.appendChild(modalRow);

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
        modalBody.setAttribute("id", "patientCalendar");

        //Ajout des informations générales :
        const calendar = new Calendar(modalBody);
        calendar.componentMount("today");

        return modalBody;
    }
}
