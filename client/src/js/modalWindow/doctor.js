class DoctorModalWindow {
    constructor(domElement) {
        this.domElement = domElement;
        this.doctorsDatas = [];
    }

    componentMount() {
        //Construction du composant :
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
        modalWindowTitle.innerHTML = "Les médecins du cabinet";
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
        let component = this.domElement.querySelector(
            "#doctorInformationModal"
        );
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

        //Liste de choix du médecin :
        let doctorChoice = this.doctorChoiceListMount();
        modalBody.appendChild(doctorChoice);

        let doctorInformationRow = document.createElement("div");
        doctorInformationRow.className = "row my-5 mx-3";
        doctorInformationRow.setAttribute("id", "doctorInformationsPannel")

        //Identité du médecin :
        let doctorIdentity = this.doctorIdentityMount();
        doctorInformationRow.appendChild(doctorIdentity);

        //Informations générale du médecin :
        let doctorInformations = this.doctorInformationsMount();
        doctorInformationRow.appendChild(doctorInformations);

        modalBody.appendChild(doctorInformationRow);

        //Récupération des informations des médecins du cabinets :
        let ajax = new AjaxCall("getDoctorsMWAjax");
        ajax.getDoctorsForDoctorModalWindowAjaxOnload(this);
        ajax.sendAjax(
            "GET",
            "http://stethoscope/server/src/getDoctorDatas.php"
        );

        return modalBody;
    }

    doctorChoiceListMount() {
        let doctorRow = document.createElement("div");
        doctorRow.className = "row my-4 mx-3";

        //Liste déroulante des médecins :
        let doctorCol = document.createElement("div");
        doctorCol.className = "col-6 m-auto";

        let doctorLabel = document.createElement("label");
        doctorLabel.className = "input-group-text";
        doctorLabel.setAttribute("for", "doctorChoice");
        doctorLabel.innerHTML = "Choix du médecin : ";
        doctorCol.appendChild(doctorLabel);

        let doctorOptionList = document.createElement("select");
        doctorOptionList.className = "custom-select";
        doctorOptionList.setAttribute("id", "doctorChoice");
        doctorOptionList.setAttribute("name", "doctorChoice");

        //Gestionnaire d'évenement de la liste medicalType :
        doctorOptionList.addEventListener("input", () => {
            this.setDoctorInformations();
        });

        doctorCol.appendChild(doctorOptionList);
        doctorRow.appendChild(doctorCol);

        return doctorRow;
    }

    doctorIdentityMount() {
        let doctorIDRow = document.createElement("div");
        doctorIDRow.className = "row col-12 mx-auto my-4 justify-content-between";

        let row = document.createElement("div");
        row.className = "row col-12 m-auto";

        //Photo du docteur :
        let displayPhoto = document.createElement("div");
        displayPhoto.className = "row col-4 m-auto";
        let doctorPhoto = document.createElement("img");
        doctorPhoto.className = "img-fluid";
        doctorPhoto.setAttribute("id", "doctorPhoto");
        doctorPhoto.setAttribute("src", "");
        doctorPhoto.setAttribute("alt", "");
        displayPhoto.appendChild(doctorPhoto);
        row.appendChild(displayPhoto);

        //Description sur le docteur :
        let doctorDescription = document.createElement("div");
        doctorDescription.className = "col-8 mx-auto";

        let descriptionlabel = document.createElement("p");
        descriptionlabel.className = "label";
        descriptionlabel.innerHTML = "Description : ";
        doctorDescription.appendChild(descriptionlabel);

        //Construction du paragraphe pour la valeur :
        let descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type", "text");
        descriptionInput.disabled = true;
        doctorDescription.appendChild(descriptionInput);

        row.appendChild(doctorDescription);
        doctorIDRow.appendChild(row)

        return doctorIDRow;
    }

    doctorInformationsMount() {
        let doctorInformations = document.createElement("div");
        doctorInformations.className = "row col-12 mx-auto my-4 align-items-center justify-content-between";

        let labels = ["Prénom", "Nom", "Age", "Sexe", "Médecine", "Téléphone"];

        let inputID = [
            "firstName",
            "lastName",
            "age",
            "sexe",
            "medicalType",
            "phoneNumber",
        ];

        //Construction des labels et inputs :
        for (let i = 0; i < labels.length / 2; i++) {
            let row = document.createElement("div");
            row.className = "row col-12 m-auto";

            let carriageReturn = document.createElement("div");
            carriageReturn.className = "w-100";

            for (let j = i * 2; j <= i * 2 + 1; j++) {
                let col = document.createElement("div");
                col.className = "col m-auto";

                let label = document.createElement("p");
                label.className = "label my-2 mr-2";
                label.innerHTML = labels[j] + " : ";
                col.appendChild(label);

                //Construction du paragraphe pour la valeur :
                let input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("id", inputID[j]);
                input.disabled = true;
                col.appendChild(input);

                row.appendChild(col);
            }
            doctorInformations.appendChild(row);
            doctorInformations.appendChild(carriageReturn);
        }

        return doctorInformations;
    }

    setDoctorInformations() {
        let doctorModalWindow = document.querySelector(
            "#doctorInformationModal"
        );
        let doctorOptionList = document.querySelector("#doctorChoice");
        //Récupère la valeur contenu dans la liste déroulante :
        let doctorID =
            doctorOptionList.options[doctorOptionList.selectedIndex].value;
        let doctorDatas = {};

        for (let i = 0; i < this.doctorsDatas.length; i++) {
            if (this.doctorsDatas[i]["doctorID"] === doctorID) {
                doctorDatas = this.doctorsDatas[i];
                break;
            }
        }

        //On affecte la photo du médecin :
        doctorModalWindow
            .querySelector("#doctorPhoto")
            .setAttribute("src", doctorDatas["imagePath"]);

        //On change la valeur de tous les inputs :
        let inputs = doctorModalWindow.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute(
                "value",
                doctorDatas[inputs[i].getAttribute("id")]
            );
        }
    }
}
