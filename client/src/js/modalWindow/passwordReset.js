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
    modalBody.className = "modal-body text-left";

    let mainForm = document.createElement("form");
    mainForm.setAttribute("method", "post");
    mainForm.setAttribute("name", "mainForm");
    mainForm.className = "needs-validation";
    mainForm.noValidate = true;

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
    input.setAttribute("name", "inputEmail");
    input.setAttribute("placeholder", "jean.blanc@gmail.com");
    input.setAttribute("aria-describedby", "emailHelp");
    input.required = true;
    input.className = "form-control";

    col.appendChild(input);
    row.appendChild(col);
    formGroup.appendChild(label);
    formGroup.appendChild(hr);
    formGroup.appendChild(row);
    mainForm.appendChild(formGroup);
    modalBody.appendChild(mainForm);

    //Récupération du formulaire :
    let form = modalBody.querySelector("[name=mainForm");
    form.setAttribute("id", "forgotPasswordModalForm");

    //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
    let formName = document.createElement("input");
    formName.setAttribute("type", "hidden");
    formName.setAttribute("name", "forgotPasswordModalForm");

    form.appendChild(formName)

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
