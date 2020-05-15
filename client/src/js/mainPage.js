class DateReservation {
    constructor(domElement, doctorDatas) {
        this.domElement = domElement;
        this.doctorDatas = doctorDatas;
        this.doctorCalendar = null;
        this.doctorList = [];
        this.medecineTypeList = [""];

        //Ajout des types de médecine à la medecineTypeList:
        for (let i = 0; i < this.doctorDatas.length; i++) {
            for (
                let j = 0;
                j < this.doctorDatas[i]["medicalType"].length;
                j++
            ) {
                if (
                    !this.medecineTypeList.includes(
                        this.doctorDatas[i]["medicalType"][j]
                    )
                ) {
                    this.medecineTypeList.push(
                        this.doctorDatas[i]["medicalType"][j]
                    );
                }
            }
        }
    }

    componentMount() {
        let mainContainer = document.createElement("div");
        mainContainer.className = "col-10";
        mainContainer.setAttribute("id", "mainPage");

        //Header :
        let mainContainerTitle = document.createElement("h1");
        mainContainerTitle.className = "h2";
        mainContainerTitle.setAttribute("id", "mainTitle");
        mainContainerTitle.innerHTML = "Prenez un rendez-vous :";
        mainContainer.appendChild(mainContainerTitle);

        let mainForm = document.createElement("form");
        mainForm.setAttribute("method", "post");
        mainForm.setAttribute("name", "mainForm");
        mainForm.setAttribute("id", "dateReservationForm");

        //Création du doctorPannel :
        let doctorPannel = this.doctorPannelMount();
        mainForm.appendChild(doctorPannel);

        //Création du placePannel :
        let placePannel = this.placePannelMount();
        mainForm.appendChild(placePannel);

        //Création du datePannel :
        let datePannel = this.datePannelMount();
        mainForm.appendChild(datePannel);

        //Création du reasonPannel :
        let reasonPannel = this.reasonPannelMount();
        mainForm.appendChild(reasonPannel);

        //Création du pannel de bouton :
        let buttonPannel = this.buttonsPannelMount(mainForm);
        mainForm.appendChild(buttonPannel);

        //Ajout d'un input au formulaire contenant le nom de celui (pour traitement côté server):
        let formName = document.createElement("input");
        formName.setAttribute("type", "hidden");
        formName.setAttribute("name", "dateReservationForm");
        mainForm.appendChild(formName);

        mainContainer.appendChild(mainForm);

        this.domElement.appendChild(mainContainer);
    }

    doctorPannelMount() {
        let doctorPannel = document.createElement("div");
        doctorPannel.className = "form-group p-4";

        //Titre du pannel :
        let doctorPannelTitle = document.createElement("h1");
        doctorPannelTitle.className = "row h4 mb-3 border-bottom";
        doctorPannelTitle.innerHTML = "Le médecin :";
        doctorPannel.appendChild(doctorPannelTitle);

        let labelList = [
            { medicalType: "Type de médecine" },
            { doctorName: "Nom du médecin" },
        ];

        let pannelRow = document.createElement("div");
        pannelRow.className = "row mt-3";

        for (let i = 0; i < labelList.length; i++) {
            let keyLabelListValue = Object.keys(labelList[i])[0];

            let pannelCol = document.createElement("div");
            pannelCol.className = "col-4";

            //Création du label :
            let label = document.createElement("label");
            label.className = "input-group-text";
            label.setAttribute("for", keyLabelListValue);
            label.innerHTML = labelList[i][keyLabelListValue];
            pannelRow.appendChild(label);

            //Création de la liste déroulante de valeur
            let optionList = document.createElement("select");
            optionList.className = "custom-select";
            optionList.setAttribute("id", keyLabelListValue);
            optionList.setAttribute("name", keyLabelListValue);

            if (optionList.getAttribute("id") === "medicalType") {
                for (let j = 0; j < this.medecineTypeList.length; j++) {
                    let option = document.createElement("option");
                    option.setAttribute("value", j);
                    option.setAttribute("id", "medicalTypeValue" + j);
                    option.innerHTML = this.medecineTypeList[j];
                    optionList.appendChild(option);
                }
                //Gestionnaire d'évenement de la liste medicalType :
                optionList.addEventListener("input", () => {
                    this.onMedicalTypeChangeValue(optionList);
                });
            } else {
                //Gestionnaire d'évenement de la liste doctorName :
                optionList.addEventListener("input", () => {
                    this.onDoctorNameChangeValue(optionList);
                });
            }

            pannelCol.appendChild(label);
            pannelCol.appendChild(optionList);

            pannelRow.appendChild(pannelCol);
        }

        doctorPannel.appendChild(pannelRow);

        return doctorPannel;
    }

    placePannelMount() {
        let placePannel = document.createElement("div");
        placePannel.className = "form-group p-4";

        //Titre du pannel :
        let placePannelTitle = document.createElement("h1");
        placePannelTitle.className = "row h4 mb-3 border-bottom";
        placePannelTitle.innerHTML = "Le lieu :";
        placePannel.appendChild(placePannelTitle);

        let placePannelRow = document.createElement("div");
        placePannelRow.className = "row mt-3";
        placePannelRow.setAttribute("id", "placePannel");

        let labelList = [
            { address: "Adresse du cabinet :" },
            { city: "Ville :" },
            { postalCode: "Code postal :" },
        ];

        for (let i = 0; i < labelList.length; i++) {
            let keyLabelListValue = Object.keys(labelList[i])[0];

            let inputCol = document.createElement("div");
            inputCol.className = "col-4";

            let label = document.createElement("label");
            label.setAttribute("for", keyLabelListValue);
            label.innerHTML = labelList[i][keyLabelListValue];

            //Construction de l'input
            let inputValue = document.createElement("input");
            inputValue.className = "form-control";
            inputValue.setAttribute("type", "text");
            inputValue.setAttribute("id", keyLabelListValue);
            inputValue.setAttribute("name", keyLabelListValue);
            inputValue.setAttribute("value", "");
            inputValue.disabled = true;

            //Ajout des composants à la col :
            inputCol.appendChild(label);
            inputCol.appendChild(inputValue);

            //Ajout de la col a la row :
            placePannelRow.appendChild(inputCol);
        }

        placePannel.appendChild(placePannelRow);

        return placePannel;
    }

    datePannelMount() {
        let datePannel = document.createElement("div");
        datePannel.className = "form-group p-4";
        datePannel.setAttribute("id", "calendarMainPage");

        //Titre du pannel :
        let datePannelTitle = document.createElement("h1");
        datePannelTitle.className = "row h4 mb-3 border-bottom";
        datePannelTitle.innerHTML = "La date :";
        datePannel.appendChild(datePannelTitle);

        let calendarPannelRow = document.createElement("div");
        calendarPannelRow.className = "row mt-3 justify-content-center";

        let calendarPannelCol = document.createElement("div");
        calendarPannelCol.className = "col-10";
        calendarPannelCol.setAttribute("id", "doctorCalendar");

        //Création du calendrier :
        const calendar = new Calendar(calendarPannelCol);
        calendar.componentMount("today", "calendarMainPage");
        this.doctorCalendar = calendar;

        calendarPannelRow.appendChild(calendarPannelCol);

        let datePannelRow = document.createElement("div");
        datePannelRow.className = "row mt-3 justify-content-center";

        //Création des inputs :
        let inputLabelList = {
            monthInput: "Mois :",
            dayInput: "Jour :",
        };
        let labelKey = Object.keys(inputLabelList);

        for (let i = 0; i < labelKey.length; i++) {
            let col = document.createElement("div");
            col.className = "col-3";

            let label = document.createElement("label");
            label.setAttribute("for", labelKey[i]);
            label.innerHTML = inputLabelList[labelKey[i]];

            let input = document.createElement("input");
            input.className = "form-control";
            input.setAttribute("type", "text");
            input.setAttribute("id", labelKey[i]);
            input.setAttribute("name", labelKey[i]);
            input.disabled = true;

            col.appendChild(label);
            col.appendChild(input);

            datePannelRow.appendChild(col);
        }

        //Création de la selectList hour :
        let hourCol = document.createElement("div");
        hourCol.className = "col-3";

        let hourLabel = document.createElement("label");
        hourLabel.className = "input-group-text";
        hourLabel.setAttribute("for", "hourList");
        hourLabel.innerHTML = "Heure du RDV";
        hourCol.appendChild(hourLabel);

        let hourOptionList = document.createElement("select");
        hourOptionList.className = "custom-select";
        hourOptionList.setAttribute("id", "hourList");
        hourOptionList.setAttribute("name", "hourList");
        hourCol.appendChild(hourOptionList);

        datePannelRow.appendChild(hourCol);

        datePannel.appendChild(calendarPannelRow);
        datePannel.appendChild(datePannelRow);

        return datePannel;
    }

    reasonPannelMount() {
        let reasonPannel = document.createElement("div");
        reasonPannel.className = "form-group p-4";

        //Titre du pannel :
        let reasonPannelTitle = document.createElement("h1");
        reasonPannelTitle.className = "row h4 mb-3 border-bottom";
        reasonPannelTitle.innerHTML = "Le motif :";
        reasonPannel.appendChild(reasonPannelTitle);

        let pannelRow = document.createElement("div");
        pannelRow.className = "row mt-3 col align-items-end";

        //Création de l'reasonInput du motif :
        let inputCol = document.createElement("div");
        inputCol.className = "col-4";

        let inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", "reasonInput");
        inputLabel.innerHTML = "Motif de la consultation :";

        let reasonInput = document.createElement("input");
        reasonInput.className = "form-control";
        reasonInput.setAttribute("type", "text");
        reasonInput.setAttribute("id", "reasonInput");
        reasonInput.setAttribute("name", "reasonInput");

        inputCol.appendChild(inputLabel);
        inputCol.appendChild(reasonInput);

        pannelRow.appendChild(inputCol);

        //Check box de premier rdv :
        let checkBoxCol = document.createElement("div");
        checkBoxCol.className = "col-4";

        let checkBoxLabel = document.createElement("label");
        checkBoxLabel.setAttribute("for", "firstDate");
        checkBoxLabel.innerHTML = "Est un premier RDV ";

        let checkBoxInput = document.createElement("input");
        checkBoxInput.className = "form-check-input ml-2";
        checkBoxInput.setAttribute("type", "checkbox");
        checkBoxInput.setAttribute("id", "firstDate");
        checkBoxInput.setAttribute("name", "firstDate");

        checkBoxCol.appendChild(checkBoxLabel);
        checkBoxCol.appendChild(checkBoxInput);

        pannelRow.appendChild(checkBoxCol);

        reasonPannel.appendChild(pannelRow);

        return reasonPannel;
    }

    onMedicalTypeChangeValue(optionList) {
        //Récupère la valeur contenu dans la medicalTypeList :
        let medicalTypeValue =
            optionList.options[optionList.selectedIndex].text;

        //On vide la liste déroulante de médecin :
        let doctorNameOption = this.domElement.querySelector("#doctorName");
        while (doctorNameOption.firstChild) {
            doctorNameOption.removeChild(doctorNameOption.lastChild);
        }

        //On réinitialise la doctorList :
        this.doctorList = [];

        if (medicalTypeValue) {
            //Ajout des noms et des ID des docteurs à la doctorList:
            for (let i = 0; i < this.doctorDatas.length; i++) {
                for (
                    let j = 0;
                    j < this.doctorDatas[i]["medicalType"].length;
                    j++
                ) {
                    if (
                        this.doctorDatas[i]["medicalType"][j] ===
                        medicalTypeValue
                    ) {
                        this.doctorList.push({
                            doctorID: this.doctorDatas[i]["doctorID"],
                            doctorName:
                                this.doctorDatas[i]["firstName"] +
                                " " +
                                this.doctorDatas[i]["lastName"],
                        });
                    }
                }
            }

            //On rend le bouton valider disponible :
            let validateMainFormButton = document.querySelector(
                "#validateMainFormButton"
            );
            validateMainFormButton.disabled = false;
        } else {
            //On rend le bouton valider indisponible :
            let validateMainFormButton = document.querySelector(
                "#validateMainFormButton"
            );
            validateMainFormButton.disabled = true;
        }

        //On construit la liste déroulante des docteurs :
        for (let i = 0; i < this.doctorList.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", this.doctorList[i]["doctorID"]);
            option.innerHTML = this.doctorList[i]["doctorName"];
            doctorNameOption.appendChild(option);
        }

        //On execute l'évenement sur changement de valeur de la liste doctorName :
        this.onDoctorNameChangeValue(doctorNameOption);
    }

    onDoctorNameChangeValue(optionList) {
        //On récupère le pannel Lieu :
        let placePannelInformation = this.domElement.querySelector(
            "#placePannel"
        );

        //On détruit le calendrier :
        let domElement = document.querySelector("#doctorCalendar");
        this.doctorCalendar.componentUnmount();

        //Récupère l'ID du médecin contenu dans la liste déroulante :
        if (optionList.options[optionList.selectedIndex]) {
            var doctorIDValue =
                optionList.options[optionList.selectedIndex].value;
            //On récupère les informations du docteur :
            for (let i = 0; i < this.doctorDatas.length; i++) {
                if (this.doctorDatas[i]["doctorID"] == doctorIDValue) {
                    var doctorInformation = this.doctorDatas[i];
                    break;
                }
            }

            //On change la valeur des inputs du pannel lieu :
            placePannelInformation
                .querySelector("#address")
                .setAttribute("value", doctorInformation["address"]);
            placePannelInformation
                .querySelector("#city")
                .setAttribute("value", doctorInformation["city"]);
            placePannelInformation
                .querySelector("#postalCode")
                .setAttribute("value", doctorInformation["postalCode"]);

            //On construit le calendrier du médecin correspondant :
            this.doctorCalendar = new Calendar(
                domElement,
                this.doctorDatas[doctorIDValue - 1]["planningID"]
            );
            this.doctorCalendar.componentMount("today", "calendarMainPage");
        } else {
            //On vide le informations du pannel Lieu :
            let inputElements = placePannelInformation.getElementsByTagName(
                "input"
            );
            for (let i = 0; i < inputElements.length; i++) {
                inputElements[i].setAttribute("value", "");
            }

            //On construit un calendrier vide :
            this.doctorCalendar = new Calendar(domElement);
            this.doctorCalendar.componentMount("today", "calendarMainPage");
        }
    }

    buttonsPannelMount(mainForm) {
        let modalRow = document.createElement("div");
        modalRow.className = "row justify-content-end";

        //Bouton Annuler
        let modalCancelButton = document.createElement("button");
        modalCancelButton.className = "btn btn-primary mx-4 my-4";
        modalCancelButton.setAttribute("type", "button");
        modalCancelButton.setAttribute("id", "cancelMainFormButton");
        modalCancelButton.innerHTML = "Annuler";
        modalRow.appendChild(modalCancelButton);
        modalCancelButton.addEventListener("click", () => {
            this.onCancelButtonClick();
        });
        modalRow.appendChild(modalCancelButton);

        //Bouton valider :
        let modalValidateButton = document.createElement("button");
        modalValidateButton.className = "btn btn-primary mx-4 my-4";
        modalValidateButton.setAttribute("type", "button");
        modalValidateButton.setAttribute("id", "validateMainFormButton");
        modalValidateButton.disabled = true;
        modalValidateButton.innerHTML = "Valider";
        modalValidateButton.addEventListener("click", () => {
            this.onValidateButtonClick(mainForm, modalCancelButton);
        });
        modalRow.appendChild(modalValidateButton);

        return modalRow;
    }

    onCancelButtonClick() {
        //On affecte une valeur nulle dans la liste "Type de médecine":
        let medicalType = document.querySelector("#medicalType");
        medicalType.querySelector("#medicalTypeValue0").selected = true;
        this.onMedicalTypeChangeValue(medicalType);
    }

    onValidateButtonClick(mainForm, modalCancelButton) {
        //Formatage des données :
        let hourList = mainForm.querySelector("#hourList");
        let doctorList = mainForm.querySelector("#doctorName");
        let consultationDate =
            mainForm
                .querySelector("#calendarActualMonth")
                .innerHTML.split(" ")[1] +
            "-" +
            getMonth(mainForm.querySelector("#monthInput").value) +
            "-" +
            mainForm.querySelector("#dayInput").value;

        let datas = {
            formID: "dateReservationForm",
            reason: mainForm.querySelector("#reasonInput").value,
            consultationDate: consultationDate,
            timeSlot: hourList.options[hourList.selectedIndex].value,
            firstTime: mainForm.querySelector("#firstDate").checked,
            login: sessionLogin,
            doctorID: doctorList.options[doctorList.selectedIndex].value,
        };

        //Envoi des données au serveur :
        let ajax = new AjaxCall("setConsultationAjax");
        ajax.setConsultationAjaxOnload(modalCancelButton);
        ajax.sendJSONAjax(
            "http://stethoscope/server/src/setConsultation.php",
            JSON.stringify(datas)
        );
    }
}

//Gestionnnaire d'évenement du document :
document.addEventListener("readystatechange", () => {
    loadMainPage();
});
function loadMainPage() {
    if (document.readyState === "complete") {
        //Récupération de l'ensemble des données nécessaire a la prise de RDV (nom et prénom du médecin, ID planning, type médecin, adresse du cabinet).
        let ajax = new AjaxCall("getDoctorAjax");
        ajax.getDoctorAjaxOnload();
        ajax.sendAjax(
            "GET",
            "http://stethoscope/server/src/getDoctorDatas.php"
        );
    }
}
