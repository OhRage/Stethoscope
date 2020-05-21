class UserMenu {
    constructor(domElement, serverDatas) {
        this.domElement = domElement;
        this.userDatas = serverDatas;
        this.menuInformations = [
            {
                modalWindowID: "#personalInformationModal",
                iconPath: "../img/profil-icon.svg",
                labelValue: "Mon profil",
            },
            {
                modalWindowID: "#doctorInformationModal",
                iconPath: "../img/doctor-icon.svg",
                labelValue: "Les médecins",
            },
            {
                modalWindowID: "#calendarModal",
                iconPath: "../img/calendar2-icon.svg",
                labelValue: "Mon planning",
            },
            {
                modalWindowID: "#consultationInformationModal",
                iconPath: "../img/history-icon.svg",
                labelValue: "Mon historique",
            },
            {
                modalWindowID: "#logoutButton",
                iconPath: "../img/logout-icon.svg",
                labelValue: "Se déconnecter",
            },
        ];
    }

    userPhotoMount() {
        //Cadre photo :
        let displayPhoto = document.createElement("div");
        displayPhoto.className = "row justify-items-center my-3 mx-auto";

        //Image par défaut de l'utilisateur :
        displayPhoto.setAttribute("id", "userImage");
        let defaultImage = document.createElement("div");
        defaultImage.setAttribute("id", "userDefaultImage");
        defaultImage.innerHTML =
            this.userDatas["firstName"].charAt(0) +
            this.userDatas["lastName"].charAt(0);
        displayPhoto.appendChild(defaultImage);

        return displayPhoto;
    }

    usernameMount() {
        //Username :
        let displayUsername = document.createElement("div");
        displayUsername.className = "row align-items-center mb-3";

        //FirstName
        let userFirstName = document.createElement("div");
        userFirstName.className = "col-6 text-right";
        userFirstName.setAttribute("id", "personnalFirstName");
        userFirstName.innerHTML = this.userDatas["firstName"];

        //LastName
        let userLastName = document.createElement("div");
        userLastName.className = "col-6 text-left";
        userLastName.setAttribute("id", "personnalLastName");
        userLastName.innerHTML = this.userDatas["lastName"];

        displayUsername.appendChild(userFirstName);
        displayUsername.appendChild(userLastName);

        return displayUsername;
    }

    subMenuMount(subMenu) {
        var displaySubMenu = document.createElement("div");
        displaySubMenu.className = "row align-items-center my-5";
        if (this.menuInformations[subMenu].modalWindowID === "#logoutButton") {
            displaySubMenu.setAttribute(
                "style",
                "position: absolute;bottom: 0;width: 100%;"
            );
        }

        let imgCol = document.createElement("div");
        imgCol.className = "col-3";

        let iconImg = document.createElement("img");
        iconImg.setAttribute("src", this.menuInformations[subMenu].iconPath);

        let buttonCol = document.createElement("div");
        buttonCol.className = "col-8";

        let button = document.createElement("button");
        button.className = "btn ml-2 mb-2";
        button.setAttribute("type", "button");

        if (this.menuInformations[subMenu].modalWindowID != "#logoutButton") {
            button.setAttribute("data-toggle", "modal");
            button.setAttribute(
                "data-target",
                this.menuInformations[subMenu].modalWindowID
            );
            button.setAttribute("data-backdrop", "static");
        }
        button.innerHTML = this.menuInformations[subMenu].labelValue;

        buttonCol.appendChild(button);
        imgCol.appendChild(iconImg);
        displaySubMenu.appendChild(imgCol);
        displaySubMenu.appendChild(buttonCol);

        //Gestionnaire d'évenement du bouton :
        button.addEventListener(
            "click",
            () => {
                this.modalWindowMount(
                    this.menuInformations[subMenu].modalWindowID
                );
            },
            false
        );

        return displaySubMenu;
    }

    modalWindowMount(modalWindowID) {
        let serverDatas = undefined;
        let modalSection = document.querySelector("#modalSection");

        // TODO : requete HTTP qui récupère les infos du serveurs en fonction de la window appelé (ID de la window passée en paramètre)
        switch (modalWindowID) {
            case "#personalInformationModal":
                //Récupération des informations de l'utilisateur :
                let ajax = new AjaxCall("getProfileAjax");
                ajax.getProfileAjaxOnload();
                ajax.sendAjax(
                    "GET",
                    "http://stethoscope/server/src/getUserDatas.php?login=" +
                        sessionLogin
                );
                break;
            case "#doctorInformationModal":
                //On ajoute la fenêtre modal au domElement :
                let doctorModalWindow = new DoctorModalWindow(
                    modalSection,
                );
                doctorModalWindow.componentMount();

                break;
            case "#calendarModal":
                //On ajoute la fenêtre modal au domElement :
                let calendarModalWindow = new CalendarModalWindow(modalSection);
                calendarModalWindow.componentMount();
                break;
            case "#consultationInformationModal":
                //Récupération des 10 derniers RDV :
                let consultationDatas = this.getPatientHistory();

                //Ouverture de la fenêtre des consultations :
                var consultationModalWindow = new ConsultationModalWindow(
                    modalSection,
                    "Historique récent de vos RDV : ",
                    consultationDatas,
                    this
                );
                consultationModalWindow.componentMount();
                break;
            case "#logoutButton":
                let userResponse = confirm(
                    "Etes vous sur de vouloir vous déconnecter?"
                );
                if (userResponse == true) {
                    let destroySessionAjax = new AjaxCall("destroySessionAjax");
                    destroySessionAjax.destroySessionOnload();
                    destroySessionAjax.sendAjax(
                        "GET",
                        "http://stethoscope/server/src/destroyPhpSession.php"
                    );
                }
                break;
        }
    }

    componentMount() {
        //Container principal :
        let mainContainer = document.createElement("div");
        mainContainer.className = "col-2 justify-content-start";
        mainContainer.setAttribute("id", "userMenuComponent");

        //Création de la photo :
        let displayPhoto = this.userPhotoMount();
        mainContainer.appendChild(displayPhoto);

        //Ajout d'une barre HR :
        let horizontalLine1 = document.createElement("hr");
        mainContainer.appendChild(horizontalLine1);

        //Création du username :
        let displayUsername = this.usernameMount();
        mainContainer.appendChild(displayUsername);

        //Ajout d'une barre HR :
        let horizontalLine2 = document.createElement("hr");
        mainContainer.appendChild(horizontalLine2);

        //Création du pannel de menu :
        for (
            let subMenu = 0;
            subMenu < this.menuInformations.length;
            subMenu++
        ) {
            let displaySubMenu = this.subMenuMount(subMenu);
            mainContainer.appendChild(displaySubMenu);
        }

        //Ajout des composant au DOM :
        this.domElement.prepend(mainContainer);
    }

    getPatientHistory() {
        let patientConsultationDatas = [];
        let datas = new XMLHttpRequest();
        datas.open(
            "GET",
            "http://stethoscope/server/src/getPatientConsultation.php?login=" +
                sessionLogin,
            false
        );
        datas.send();

        if (datas.status == 200) {
            datas = JSON.parse(datas.response);
        }

        if (datas.length > 0) {
            let actualDay = new Date();

            for (let key in datas) {
                let consultation = datas[key];
                let consultationYear = parseInt(
                    consultation["consultation_date"].split("-")[0]
                );
                let consultationMonth = parseInt(
                    consultation["consultation_date"].split("-")[1]
                );
                let consultationDay = parseInt(
                    consultation["consultation_date"].split("-")[2]
                );

                let consultationDatas = {
                    userType: "Docteur",
                    consultationID: parseInt(consultation["ID_Consultation"]),
                    lastName: consultation["doctor_last_name"].toUpperCase(),
                    firstName: firstLetterUpperCase(
                        consultation["doctor_first_name"]
                    ),
                    date: consultation["consultation_date"],
                    hour: getHourFromTimeSlot(
                        parseInt(consultation["time_slot"])
                    ),
                    address: consultation["address"],
                    city: consultation["city"],
                    postalCode: consultation["postal_code"],
                    reason:
                        consultation["reason"] == ""
                            ? "aucun"
                            : consultation["reason"],
                    imagePath: consultation["image_path"],
                    status: consultation["is_validate"],
                };

                if (
                    consultationYear === actualDay.getFullYear() &&
                    consultationMonth === actualDay.getMonth() + 1 &&
                    consultationDay < actualDay.getDate()
                ) {
                    patientConsultationDatas.push(consultationDatas);
                }
            }
        }

        return patientConsultationDatas;
    }
}

//Gestionnnaire d'évenement du document :
document.addEventListener("readystatechange", () => {
    loadUserMenu();
});
function loadUserMenu() {
    if (document.readyState === "complete") {
        //Récupération des infos de l'utilisateur sur le serveur :
        let ajax = new AjaxCall("usernameAjax");
        ajax.getUsernameAjaxOnload();
        ajax.sendAjax(
            "GET",
            "http://stethoscope/server/src/getUserDatas.php?login=" +
                sessionLogin
        );
    }
}
