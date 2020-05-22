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

        //Liste déroulante des médecins :
        let doctorCol = document.createElement("div");
        doctorCol.className = "col-4";

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

        modalBody.appendChild(doctorCol);

        //Photo du médecin :
        let doctorPhoto = this.doctorPhotoMount();
        modalBody.appendChild(doctorPhoto);

        //Informations générale du médecin :
        let doctorInformations = this.doctorInformationsMount();
        modalBody.appendChild(doctorInformations);

        //Récupération des informations des médecins du cabinets :
        let ajax = new AjaxCall("getDoctorsMWAjax");
        ajax.getDoctorsForDoctorModalWindowAjaxOnload(
            this,
            doctorOptionList,
        );
        ajax.sendAjax(
            "GET",
            "http://stethoscope/server/src/getDoctorDatas.php"
        );

        return modalBody;
    }

    doctorPhotoMount() {
        let displayPhoto = document.createElement("div");
        displayPhoto.className =
            "row col-6 my-2 justify-content-center align-items-center";
        let doctorPhoto = document.createElement("img");
        doctorPhoto.className = "img-fluid";
        doctorPhoto.setAttribute("id", "doctorPhoto");
        doctorPhoto.setAttribute("src", "");
        doctorPhoto.setAttribute("alt", "");
        displayPhoto.appendChild(doctorPhoto);

        return displayPhoto;
    }

    doctorInformationsMount() {
        let doctorInformations = document.createElement("div");
        doctorInformations.className =
            "row col-12 my-2 justify-content-center align-items-center";

        let labels = [
            "Prénom",
            "Nom",
            "Age",
            "Sexe",
            "Type de médecine",
            "Numéro de téléphone",
        ];

        let inputID = [
            "firstName",
            "lastName",
            "age",
            "sexe",
            "medicalType",
            "phoneNumber",
        ];

        //Prénom :
        for (let i = 0; i < labels.length; i++) {
            let row = document.createElement("div");
            row.className = "row";

            let label = document.createElement("p");
            label.className = "label";
            label.innerHTML = labels[i];
            row.appendChild(label);

            //Construction du paragraphe pour la valeur :
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", inputID[i]);
            input.disabled = true;
            row.appendChild(input);

            doctorInformations.appendChild(row);
        }
        return doctorInformations;
    }

    setDoctorInformations() {
        let doctorModalWindow = document.querySelector("#doctorInformationModal")
        let doctorOptionList = document.querySelector("#doctorChoice")
        //Récupère la valeur contenu dans la liste déroulante :
        let doctorID = doctorOptionList.options[doctorOptionList.selectedIndex].value;
        let doctorDatas = {}

        for( let i = 0; i < this.doctorsDatas.length; i++){
            if(this.doctorsDatas[i]["doctorID"] === doctorID){
                doctorDatas = this.doctorsDatas[i]
                break;
            }
        }

        //On affecte la photo du médecin :
        doctorModalWindow.querySelector("#doctorPhoto").setAttribute("src", doctorDatas["imagePath"])
        
        //On change la valeur de tous les inputs :
        let inputs = doctorModalWindow.querySelectorAll("input");
        console.log(doctorDatas)
        for(let i = 0; i < inputs.length; i++){
            inputs[i].setAttribute("value", doctorDatas[inputs[i].getAttribute("id")])
        }

        
    }
}
