class ProfileModalWindow {
    constructor(domElement, serverDatas) {
        this.domElement = domElement;
        this.serverDatas = serverDatas;
    }

    componentMount() {
        //Modal :
        let modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("id", "personalInformationModal");

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
        modalWindowTitle.innerHTML = "Mon profil";
        modalHeader.appendChild(modalWindowTitle);

        //Construction du body  :
        var modalBody = this.modalWindowBodyMount();

        //Ajout de tous les composant de la fenêtre modal :
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);

        //Ajout de la fenêtre modal au domElement :
        this.domElement.appendChild(modal);
    }

    componentUnmount() {
        let component = this.domElement.querySelector(
            "#personalInformationModal"
        );
        this.domElement.removeChild(component);
    }

    modalWindowBodyMount() {
        //Création du modalBody :
        let modalBody = document.createElement("div");
        modalBody.className = "modal-body";

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

        this.setModificationForm(modalBody);

        return modalBody;
    }

    setModificationForm(modalBody) {
        //Récupération du formulaire :
        let form = modalBody.querySelector("[name=mainForm");
        form.setAttribute("id", "personalInformationModalForm");

        //On rend les inputs disabled :
        let inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }

        //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
        let formName = document.createElement("input");
        formName.setAttribute("type", "hidden");
        formName.setAttribute("name", "personalInformationModalForm");
        form.appendChild(formName);

        //Ajout des invalid-feedback :
        inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== "hidden") {
                inputs[i].insertAdjacentHTML(
                    "afterend",
                    "<div class='invalid-feedback'></div>"
                );
            }
        }

        let modalRow = document.createElement("div");
        modalRow.className = "row justify-content-end";

        //Ajout du feedback des reponses serveurs :
        let feedbackConnexion = document.createElement("div");
        feedbackConnexion.setAttribute("id", "connexionFeedback");
        feedbackConnexion.className = "mb-3";
        modalRow.appendChild(feedbackConnexion);

        //Ajout des boutons du formulaire :
        //Bouton fermer
        let modalCloseButton = document.createElement("button");
        modalCloseButton.className = "btn btn-primary mr-4 ml-4";
        modalCloseButton.setAttribute("type", "button");
        modalCloseButton.setAttribute("data-dismiss", "modal");
        modalCloseButton.setAttribute("id", "modalCloseButton");
        modalCloseButton.innerHTML = "Fermer";
        modalRow.appendChild(modalCloseButton);

        //Bouton modifier :
        let modalModifyButton = document.createElement("button");
        modalModifyButton.className = "btn btn-primary mr-4 ml-4";
        modalModifyButton.setAttribute("type", "button");
        modalModifyButton.setAttribute("id", "modalModifyButton");
        modalModifyButton.innerHTML = "Modifier";
        modalRow.appendChild(modalModifyButton);

        //Bouton valider :
        let modalValidateButton = document.createElement("button");
        modalValidateButton.className = "btn btn-primary mr-4 ml-4";
        modalValidateButton.setAttribute("type", "button");
        modalValidateButton.setAttribute("id", "modalValidateButton");
        modalValidateButton.innerHTML = "Valider";
        modalValidateButton.style.display = "none";
        modalValidateButton.addEventListener("click", () => {
            this.onValidateButtonClick(modalModifyButton, modalValidateButton);
        });
        modalRow.appendChild(modalValidateButton);

        modalModifyButton.addEventListener("click", () => {
            this.onModifyButtonClick(modalModifyButton, modalValidateButton);
        });

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

    onModifyButtonClick(modifyButton, validateButton) {
        //On rend les input enabled :
        let form = document.querySelector("#personalInformationModalForm");
        let inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        //On masque le bouton "Modifier":
        modifyButton.style.display = "none";

        //On affiche le bouton valider :
        validateButton.style.display = "block";
    }

    onValidateButtonClick(modifyButton, validateButton) {
        //Récupération des inputs du formulaire de la fenêtre modale :
        let form = document.querySelector("#personalInformationModalForm");
        let inputs = form.getElementsByTagName("input");

        //Vérification des saisies :
        registerInputControl(form, inputs);

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
            let ajax = new AjaxCall("setProfileAjax");
            ajax.registerAjaxOnload();
            ajax.sendAjax(
                "POST",
                "http://localhost:8080/server/src/setUserDatas.php",
                new FormData(form)
            );
        }
    }
}
