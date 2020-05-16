class Calendar {
    constructor(domElement, doctorID = undefined) {
        this.domElement = domElement;
        this.doctorID = doctorID;
        this.monthList = new Array(
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Aout",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        );

        this.dayList = new Array(
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi"
        );

        //Informations sur la date actuelle :
        this.today = new Date();
        this.firstDayOfMonth = new Date(
            this.today.getFullYear(),
            this.today.getMonth(),
            1
        );
        this.lastdayOfMonth = new Date(
            this.today.getFullYear(),
            this.today.getMonth() + 1,
            0
        );
    }

    setFirstDayOfMonth(action) {
        switch (action) {
            case "previous":
                this.firstDayOfMonth = new Date(
                    this.firstDayOfMonth.getFullYear(),
                    this.firstDayOfMonth.getMonth() - 1,
                    1
                );
                break;
            case "next":
                this.firstDayOfMonth = new Date(
                    this.firstDayOfMonth.getFullYear(),
                    this.firstDayOfMonth.getMonth() + 1,
                    1
                );
                break;
            case "today":
                this.firstDayOfMonth = new Date(
                    this.today.getFullYear(),
                    this.today.getMonth(),
                    1
                );
                break;
        }
    }

    setLastDayOfMonth(action) {
        switch (action) {
            case "previous":
                this.lastdayOfMonth = this.lastdayOfMonth = new Date(
                    this.lastdayOfMonth.getFullYear(),
                    this.lastdayOfMonth.getMonth(),
                    0
                );
                break;
            case "next":
                this.lastdayOfMonth = new Date(
                    this.lastdayOfMonth.getFullYear(),
                    this.lastdayOfMonth.getMonth() + 2,
                    0
                );
                break;
            case "today":
                this.lastdayOfMonth = new Date(
                    this.today.getFullYear(),
                    this.today.getMonth() + 1,
                    0
                );
                break;
        }
    }

    topBannerMount(month) {
        //Création du bandeau au dessus du calendrier :
        let topBanner = document.createElement("div");
        topBanner.className = "row align-items-center";

        //Mois actuel :
        let actualMonth = document.createElement("div");
        actualMonth.className = "col-6 text-left ";
        actualMonth.setAttribute("id", "calendarActualMonth");
        actualMonth.innerHTML =
            this.monthList[month] + " " + this.firstDayOfMonth.getFullYear();

        //Pannel de boutons d'actions :
        let actionButtons = document.createElement("div");
        actionButtons.className =
            "row  align-items-center col-6 justify-content-end";
        actionButtons.setAttribute("id", "calendarActionButtons");

        //Bouton précédent :
        let previousButton = document.createElement("button");
        previousButton.setAttribute("id", "calendarPreviousButton");
        previousButton.className = "btn mr-2 py-0";
        previousButton.innerHTML = "<";
        actionButtons.appendChild(previousButton);

        //Bouton aujourd'hui :
        let todayButton = document.createElement("input");
        todayButton.className = "p-2";
        todayButton.setAttribute("id", "calendarTodayButton");
        todayButton.setAttribute("type", "image");
        todayButton.setAttribute("src", "../img/calendar-icon.svg");
        actionButtons.appendChild(todayButton);

        //Bouton suivant :
        let nextButton = document.createElement("button");
        nextButton.setAttribute("id", "calendarNextButton");
        nextButton.className = "btn ml-2 py-0";
        nextButton.innerHTML = ">";
        actionButtons.appendChild(nextButton);

        //Ajout des éléments au bandeau :
        topBanner.appendChild(actualMonth);
        topBanner.appendChild(actionButtons);

        previousButton.addEventListener(
            "click",
            () => {
                this.componentMount("previous");
            },
            false
        );
        nextButton.addEventListener(
            "click",
            () => {
                this.componentMount("next");
            },
            false
        );
        todayButton.addEventListener(
            "click",
            () => {
                this.componentMount("today");
            },
            false
        );

        return topBanner;
    }

    daysOfMonthMount(month) {
        //Création du tableau des jours:
        let table = document.createElement("table");
        table.className = "table table-bordered";

        //Création du bandeau des jours :
        let daysOfWeek = document.createElement("thead");
        let rowDOW = document.createElement("tr");
        for (var i = 0; i < this.dayList.length; i++) {
            let day = document.createElement("th");
            day.setAttribute("scope", "col");
            day.innerHTML = this.dayList[i];
            rowDOW.appendChild(day);
        }
        daysOfWeek.appendChild(rowDOW);

        //Création des cases de jours :
        let daysOfMonth = document.createElement("tbody");
        let count = 1;
        for (let i = 0; i < 6; i++) {
            let rowDOM = document.createElement("tr");
            for (let j = 0; j < this.dayList.length; j++) {
                let dayBox = document.createElement("td");
                var dayButton = document.createElement("button");
                dayButton.className = "btn";
                dayButton.setAttribute("type", "button");
                if (
                    (i == 0 && j >= this.firstDayOfMonth.getDay()) ||
                    (i > 0 && count <= this.lastdayOfMonth.getDate())
                ) {
                    dayButton.innerHTML = count;
                    if (
                        count == this.today.getDate() &&
                        month == this.today.getMonth() &&
                        this.today.getFullYear()
                    ) {
                        dayBox.setAttribute("value", "filledTodayBox");
                    } else {
                        dayBox.setAttribute("value", "filledBox");
                    }
                    dayBox.appendChild(dayButton);
                    count++;
                } else {
                    dayBox.setAttribute("value", "emptyBox");
                }
                rowDOM.appendChild(dayBox);
            }
            daysOfMonth.appendChild(rowDOM);
        }

        //On enlève la colonne du dimanche :
        daysOfWeek.childNodes[0].removeChild(
            daysOfWeek.childNodes[0].firstChild
        );
        for (let i = 0; i < daysOfMonth.childNodes.length; i++) {
            daysOfMonth.childNodes[i].removeChild(
                daysOfMonth.childNodes[i].firstChild
            );
        }

        //Gestion des RDV :
        if (this.domElement.getAttribute("id") === "patientCalendar") {
            this.patientSetDate(daysOfMonth);
        } else if (this.domElement.getAttribute("id") === "doctorCalendar") {
            this.doctorSetDate(daysOfMonth);
        }

        //Ajout des élements a la page :
        table.appendChild(daysOfWeek);
        table.appendChild(daysOfMonth);

        return table;
    }

    patientSetDate(daysOfMonth) {
        //@TODO : Récupérer les données du serveur via une requête http : SQL => récupérer les jours du mois qui ont un rendez vous confirmé et ceux qui ont un rendez vous en attente
        var serverDataTest = {
            dateConfirmed: [2, 6],
            datePending: [2, 4],
        };

        //Définition des dayButton ayant des RDV :
        for (let i = 0; i < daysOfMonth.childNodes.length; i++) {
            let tableRow = daysOfMonth.childNodes[i];
            for (let j = 0; j < tableRow.childNodes.length; j++) {
                let htmlCell = tableRow.childNodes[j];
                if (htmlCell.getAttribute("value") === "filledBox") {
                    var htmlButton = htmlCell.childNodes[0];
                    if (
                        serverDataTest["dateConfirmed"].includes(
                            parseInt(htmlButton.innerHTML)
                        ) ||
                        serverDataTest["datePending"].includes(
                            parseInt(htmlButton.innerHTML)
                        )
                    ) {
                        htmlButton.setAttribute("data-toggle", "modal");
                        htmlButton.setAttribute(
                            "data-target",
                            "#consultationInformationModal"
                        );
                        htmlButton.setAttribute("data-backdrop", "static");
                        this.onPatientDayButtonClick(htmlButton);

                        if (
                            !serverDataTest["dateConfirmed"].includes(
                                parseInt(htmlButton.innerHTML)
                            )
                        ) {
                            htmlButton.setAttribute("value", "pendingDate");
                        } else if (
                            !serverDataTest["datePending"].includes(
                                parseInt(htmlButton.innerHTML)
                            )
                        ) {
                            htmlButton.setAttribute("value", "confirmedDate");
                        } else {
                            htmlButton.setAttribute(
                                "value",
                                "confirmedAndPendingDate"
                            );
                        }
                    }
                }
            }
        }
    }

    doctorSetDate(daysOfMonth) {
        //Récupération des créneaux disponibles :
        let fullSlotDays = [];
        if (this.doctorID) {
            let ajax = new XMLHttpRequest();
            ajax.open(
                "GET",
                "http://stethoscope/server/src/getFullSlotDay.php?doctorID=" +
                    this.doctorID +
                    "&month=" +
                    (this.lastdayOfMonth.getMonth() + 1) +
                    "&year=" +
                    this.lastdayOfMonth.getFullYear(),
                false
            );
            ajax.send();

            if (ajax.status === 200) {
                fullSlotDays = JSON.parse(ajax.response);
            } else {
                console.log(
                    "Erreur de récupération des données du serveur (getId = getFullSlotDay)"
                );
            }
        }

        //Définition des dayButton ayant des RDV :
        for (let i = 0; i < daysOfMonth.childNodes.length; i++) {
            let tableRow = daysOfMonth.childNodes[i];
            for (let j = 0; j < tableRow.childNodes.length; j++) {
                let htmlCell = tableRow.childNodes[j];
                if (htmlCell.getAttribute("value").includes("filled")) {
                    var htmlButton = htmlCell.childNodes[0];
                    if (fullSlotDays.includes(htmlButton.innerHTML)) {
                        htmlButton.setAttribute("value", "dateNotAvailable");
                        htmlButton.disabled = true;
                    } else {
                        htmlButton.setAttribute("value", "dateAvailable");
                        this.onDoctorDayButtonClick(htmlButton);
                    }
                }
            }
        }
    }

    modalConsultationWindowMount(modalWindowTitle) {
        //@TODO : Récupération des informations des consultations du jour. SQL => Pour chaque consultation du jours, récupérer les contenu dans la variable serverDataTest :
        var serverDatas = [
            {
                consultationID: 1,
                userType: "Patient",
                lastName: "ICOL",
                firstName: "Kevin",
                date: "11/07/2020",
                hour: 9,
                address: "3 rue de la liberté",
                city: "Lyon",
                postalCode: "69003",
                reason: "Bilan sanguin annuel",
                imagePath: "../img/user-image.jpg",
            },
            {
                consultationID: 2,
                userType: "Patient",
                lastName: "RUFFIER",
                firstName: "Lilou",
                date: "11/07/2020",
                hour: 14,
                address: "3 rue de la liberté",
                city: "Lyon",
                postalCode: "69003",
                reason: "Gynécologue",
                imagePath: "../img/user-image.jpg",
            },
        ];
        var modalSection = document.querySelector("#modalSection");

        //On ajoute la fenêtre modal au domElement :
        var modalWindow = new ConsultationModalWindow(
            modalSection,
            modalWindowTitle,
            serverDatas
        );
        modalWindow.componentMount();

        //Masquage de la calendarModalWindow :
        $("#calendarModal").modal("hide");
    }

    onPatientDayButtonClick(dayButton) {
        dayButton.addEventListener(
            "click",
            () => {
                this.modalConsultationWindowMount("RDV confirmés du jour");
            },
            false
        );
    }

    onDoctorDayButtonClick(dayButton) {
        dayButton.addEventListener(
            "click",
            () => {
                this.setMainPageDateValues(
                    this.monthList[this.firstDayOfMonth.getMonth()],
                    dayButton.innerHTML,
                    dayButton
                );
            },
            false
        );
    }

    setMainPageDateValues(month, day, dayButton = null) {
        //Récupération de la mainPage :
        let mainPageElement = document.querySelector("#mainPage");

        //On affecte le mois de RDV a la mainPage :
        mainPageElement.querySelector("#monthInput").value = month;

        //On affecte le jour de RDV a la mainPage :
        mainPageElement.querySelector("#dayInput").value = day;

        //On vide les heures de la mainPage :
        let hourList = mainPageElement.querySelector("#hourList");
        while (hourList.firstChild) {
            hourList.removeChild(hourList.lastChild);
        }

        //On affecte les heures de RDV a la mainPage (si month et day existe) :
        if (month && day) {
            //Récupération des slots times de disponible :
            let ajax = new AjaxCall("getAvailableSlots");
            ajax.getAvalaibleSlotAjaxOnload(hourList);
            ajax.sendAjax(
                "GET",
                "http://stethoscope/server/src/getAvailableSlots.php?doctorID=" +
                    this.doctorID +
                    "&day=" +
                    day +
                    "&month=" +
                    (this.lastdayOfMonth.getMonth() + 1) +
                    "&year=" +
                    this.lastdayOfMonth.getFullYear()
            );
        }

        //On affecte les couleurs par défaut des filledBox :
        let filledbox = mainPageElement.querySelectorAll(
            "[id^='calendar'] .table-bordered tbody td[value='filledBox'] button"
        );

        for (let i = 0; i < filledbox.length; i++) {
            filledbox[i].style.backgroundColor = "white";
            filledbox[i].style.color = "#20b2aa";
        }

        let filledTodayBox = mainPageElement.querySelector(
            "[id^='calendar'] .table-bordered tbody td[value='filledTodayBox'] button"
        );
        filledTodayBox.style.backgroundColor = "#2e2f32";
        filledTodayBox.style.color = "white";

        //On change la couleur du fillexBox sélectionné :
        if (dayButton) {
            dayButton.style.backgroundColor = "#20b2aa";
            dayButton.style.color = "white";
        }
    }

    captionCalendarMount() {
        //Création de légende du calendrier :
        let calendarCaption = document.createElement("div");
        calendarCaption.className = "row justify-content-center";

        //Bouton de RDV confirmés :
        let confirmedDateButton = document.createElement("button");
        confirmedDateButton.className = "btn mr-2";
        confirmedDateButton.setAttribute("id", "calendarConfirmedDateButton");
        confirmedDateButton.innerHTML = "RDV confirmés";
        confirmedDateButton.setAttribute("data-toggle", "modal");
        confirmedDateButton.setAttribute(
            "data-target",
            "#consultationInformationModal"
        );
        confirmedDateButton.setAttribute("data-backdrop", "static");

        //Bouton de RDV en attente :
        let pendingDateButton = document.createElement("button");
        pendingDateButton.className = "btn ml-2";
        pendingDateButton.setAttribute("id", "calendarPendingDateButton");
        pendingDateButton.innerHTML = "RDV en attente";
        pendingDateButton.setAttribute("data-toggle", "modal");
        pendingDateButton.setAttribute(
            "data-target",
            "#consultationInformationModal"
        );
        pendingDateButton.setAttribute("data-backdrop", "static");

        //Ajout des composants au calendrier :
        calendarCaption.appendChild(confirmedDateButton);
        calendarCaption.appendChild(pendingDateButton);

        //Gestionnaire d'évenement pour les boutons :
        confirmedDateButton.addEventListener("click", () => {
            this.modalConsultationWindowMount("RDV confirmés du mois");
        });
        pendingDateButton.addEventListener("click", () => {
            this.modalConsultationWindowMount("RDV en attente du mois");
        });

        return calendarCaption;
    }

    componentMount(action, calendarType) {
        //On redefine le premier et dernier jour du mois
        this.setFirstDayOfMonth(action);
        this.setLastDayOfMonth(action);
        var month = this.firstDayOfMonth.getMonth();

        //On détruit le composant si il existe déjà :
        this.componentUnmount();

        //Création des composants enfants en fonction du type du calendrier :
        let topBanner = this.topBannerMount(month); //Bandeau d'action
        this.domElement.appendChild(topBanner);

        let daysOfMonth = this.daysOfMonthMount(month); //Tableau des jours
        this.domElement.appendChild(daysOfMonth);

        //Calendrier du patient :
        if (this.domElement.getAttribute("id") === "patientCalendar") {
            let captionCalendar = this.captionCalendarMount(); //Légende du calendrier
            this.domElement.appendChild(captionCalendar);
            //Calendrier du docteur :
        } else if (
            this.domElement.getAttribute("id") === "doctorCalendar" &&
            document.querySelector("#mainPage")
        ) {
            if (action === "today") {
                this.setMainPageDateValues(
                    this.monthList[month],
                    this.today.getDate()
                );
            } else {
                this.setMainPageDateValues(this.monthList[month], "");
            }
        }
    }

    componentUnmount() {
        while (this.domElement.firstChild) {
            this.domElement.removeChild(this.domElement.lastChild);
        }
    }
}
