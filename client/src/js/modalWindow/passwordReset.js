class ResetPasswordModalWindow {
    constructor(domElement) {
        this.domElement = domElement;
    }

    componentMount() {
        //Modal :
        let modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("id", "forgotPasswordModal");

        //Modail Dialog :
        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";

        //Modal Content :
        let modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        //Modal Header :
        let modalHeader = document.createElement("div");
        modalHeader.className = "modal-header text-center";
        let modalWindowTitle = document.createElement("h3");
        modalWindowTitle.className = "col-12 modal-title text-center";
        modalWindowTitle.innerHTML = "Mot de passe oublié";
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
        $("#forgotPasswordModal").modal();

        //Ajout de la fenêtre modal au domElement :
        this.domElement.appendChild(modal);
    }

    componentUnmount() {
        let component = this.domElement.querySelector("#forgotPasswordModal");
        this.domElement.removeChild(component);
    }

    modalWindowBodyMount() {
        //Création du modalBody :
        let modalBody = document.createElement("div");
        modalBody.className = "modal-body text-center";

        let label = document.createElement("h1");
        label.className = "h6";
        label.innerHTML =
            "Veuillez contacter l'administrateur à l'adresse suivante : ";
        modalBody.appendChild(label);

        let hr = document.createElement("div");
        hr.className = "w-100";

        let row = document.createElement("div");
        row.className = "row mt-2";

        let col = document.createElement("div");
        col.className = "col";

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "administratorEmail");
        input.setAttribute("value", "kevin.icol.auditeur@lecnam.fr");
        input.disabled = true;

        col.appendChild(input);
        row.appendChild(col);
        modalBody.appendChild(row);

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
