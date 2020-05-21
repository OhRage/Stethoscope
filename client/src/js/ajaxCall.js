class AjaxCall {
    constructor(ajaxId) {
        this.ajax = new XMLHttpRequest();
        this.ajaxId = ajaxId;
    }

    sendAjax(method, url, postParameter = null) {
        this.ajax.open(method, url);
        this.ajax.send(postParameter);
    }

    sendJSONAjax(url, json) {
        this.ajax.open("POST", url);
        this.ajax.setRequestHeader("Content-Type", "application/json");
        this.ajax.send(json);
    }

    loginAjaxOnload() {
        if (this.ajaxId === "loginAjax") {
            this.ajax.onload = () => {
                let status = this.ajax.status;
                if (status === 200) {
                    //Connexion a la page d'accueil :
                    window.location.href =
                        "http://stethoscope/client/src/html/homepage.php";
                } else if (status === 403) {
                    //Informations de connexion invalides :
                    let connexionFeedback = document.querySelector(
                        "#connexionFeedback"
                    );
                    connexionFeedback.innerHTML =
                        "Les informations que vous avez saisies sont invalides.";
                    connexionFeedback.style.display = "block";
                    connexionFeedback.style.color = "red";
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    registerAjaxOnload() {
        if (
            this.ajaxId === "registerAjax" ||
            this.ajaxId === "setProfileAjax"
        ) {
            this.ajax.onload = () => {
                let status = this.ajax.status;
                let msg = JSON.parse(this.ajax.response)["message"];

                if (
                    status === 403 &&
                    msg === "L'email que vous avez saisie est déjà utilisé."
                ) {
                    //Information sur l'email déjà pris :
                    let emailAddressInvalidFeedback = document.querySelector(
                        "#emailAddress"
                    ).nextSibling;
                    emailAddressInvalidFeedback.className =
                        "invalid-feedback d-block";
                    emailAddressInvalidFeedback.innerHTML = msg;
                } else {
                    //Récupération du connexionFeedback :
                    let connexionFeedback = document.querySelector(
                        "#connexionFeedback"
                    );
                    connexionFeedback.innerHTML = msg;

                    if (this.ajaxId === "registerAjax") {
                        //Ferme la fenêtre modal :
                        document.querySelector("#closeButton").click();
                        connexionFeedback.style.display = "block";

                        if ((status = 200)) {
                            connexionFeedback.style.color = "green";
                        } else {
                            connexionFeedback.style.color = "red";
                        }
                    } else if (this.ajaxId === "setProfileAjax") {
                        if ((status = 200)) {
                            //Demande de reconnexion :
                            alert(msg);
                            let ajax = new AjaxCall("destroySessionAjax");
                            ajax.destroySessionOnload();
                            ajax.sendAjax(
                                "GET",
                                "http://stethoscope/server/src/destroyPhpSession.php"
                            );
                        } else {
                            connexionFeedback.style.display = "block";
                            connexionFeedback.style.color = "red";
                        }
                    }
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    getUsernameAjaxOnload() {
        if (this.ajaxId === "usernameAjax") {
            this.ajax.onload = () => {
                let userMenuDatas = {};
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);
                    userMenuDatas = {
                        firstName: firstLetterUpperCase(
                            datas["personnal_datas"]["first_name"]
                        ),
                        lastName: datas["personnal_datas"][
                            "last_name"
                        ].toUpperCase(),
                    };
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur"
                    );
                    userMenuDatas = {
                        firstName: undefined,
                        lastName: undefined,
                    };
                }

                //Création du composant userMenu :
                let domElement = document.getElementById("mainRow");
                const userMenu = new UserMenu(domElement, userMenuDatas);
                userMenu.componentMount();
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    getProfileAjaxOnload() {
        if (this.ajaxId === "getProfileAjax") {
            this.ajax.onload = () => {
                let profileDatas = {};
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);
                    let date = new Date(
                        datas["personnal_datas"]["birth_date"] * 1000 +
                            24 * 3600 * 1000 // Add one day to get GMT+1
                    );

                    profileDatas = {
                        personnalDatas: {
                            firstName: firstLetterUpperCase(
                                datas["personnal_datas"]["first_name"]
                            ),
                            lastName: datas["personnal_datas"][
                                "last_name"
                            ].toUpperCase(),
                            birthDate: date.toISOString().substring(0, 10),
                            socialNumber:
                                datas["personnal_datas"][
                                    "social_security_number"
                                ],
                            address: datas["personnal_datas"]["address"],
                            city: firstLetterUpperCase(
                                datas["personnal_datas"]["city"]
                            ),
                            postalCode: datas["personnal_datas"]["postal_code"],
                            phoneNumber:
                                datas["personnal_datas"]["phone_number"],
                        },
                        connexionDatas: {
                            emailAddress:
                                datas["connexion_datas"]["email_address"],
                            password: datas["connexion_datas"]["password"],
                        },
                    };

                    //On ajoute la fenêtre modal au domElement :
                    let modalSection = document.querySelector("#modalSection");
                    let profileModalWindow = new ProfileModalWindow(
                        modalSection,
                        profileDatas
                    );
                    profileModalWindow.componentMount();

                    //Link du button sur la fenêtre modal :
                    $("#personalInformationModal").modal();
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur"
                    );
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    setProfileAjaxOnload() {
        if (this.ajaxId === "registerAjax") {
            this.ajax.onload = () => {
                let status = this.ajax.status;
                let msg = JSON.parse(this.ajax.response)["message"];

                if (
                    status === 403 &&
                    msg === "L'email que vous avez saisie est déjà utilisé."
                ) {
                    //Information sur l'email déjà pris :
                    let emailAddressInvalidFeedback = document.querySelector(
                        "#emailAddress"
                    ).nextSibling;
                    emailAddressInvalidFeedback.className =
                        "invalid-feedback d-block";
                    emailAddressInvalidFeedback.innerHTML = msg;
                } else {
                    //Ferme la fenêtre modal :
                    document.querySelector("#closeButton").click();

                    //Récupération du connexionFeedback :
                    let connexionFeedback = document.querySelector(
                        "#connexionFeedback"
                    );
                    connexionFeedback.innerHTML = msg;
                    connexionFeedback.style.display = "block";

                    if (status === 200) {
                        //Information sur la connexion OK :
                        connexionFeedback.style.color = "green";
                    } else {
                        connexionFeedback.style.color = "red";
                    }
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    getDoctorsForMainPageAjaxOnload() {
        if (this.ajaxId === "getDoctorAjax") {
            this.ajax.onload = () => {
                let doctorDatas = [];
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);

                    for (let key in datas) {
                        if (datas.hasOwnProperty(key)) {
                            doctorDatas.push({
                                doctorID: datas[key]["ID_Doctor"],
                                firstName: firstLetterUpperCase(
                                    datas[key]["first_name"]
                                ),
                                lastName: datas[key]["last_name"].toUpperCase(),
                                medicalType: datas[key]["medical_type"].split(
                                    "&"
                                ),
                                address: datas[key]["address"],
                                city: datas[key]["city"],
                                postalCode: datas[key]["postal_code"],
                            });
                        }
                    }

                    //Création du composant userMenu :
                    let domElement = document.getElementById("mainRow");
                    const mainPage = new DateReservation(
                        domElement,
                        doctorDatas
                    );
                    mainPage.componentMount();
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur"
                    );
                    return doctorDatas;
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    getDoctorsForDoctorModalWindowAjaxOnload(doctorsDatas, doctorOptionList) {
        if (this.ajaxId === "getDoctorsMWAjax") {
            this.ajax.onload = () => {
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);

                    for (let key in datas) {
                        if (datas.hasOwnProperty(key)) {
                            doctorsDatas.push({
                                doctorID: datas[key]["ID_Doctor"],
                                firstName: firstLetterUpperCase(
                                    datas[key]["first_name"]
                                ),
                                lastName: datas[key]["last_name"].toUpperCase(),
                                medicalType: datas[key]["medical_type"].split(
                                    "&"
                                ).slice(1).join(" et "),
                                phoneNumber: datas[key]["phone_number"],
                                imagePath: datas[key]["image_path"],
                                age: getAge(
                                    parseInt(datas[key]["birth_date"]) * 1000
                                ),
                                sexe:
                                    datas[key]["sexe"] === "1"
                                        ? "Homme"
                                        : "Femme",
                            });

                            let option = document.createElement("option");
                            option.setAttribute(
                                "value",
                                datas[key]["ID_Doctor"]
                            );
                            option.innerHTML =
                                firstLetterUpperCase(datas[key]["first_name"]) +
                                " " +
                                datas[key]["last_name"].toUpperCase();
                            doctorOptionList.appendChild(option);
                        }
                    }
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur"
                    );
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    getAvalaibleSlotAjaxOnload(selectDay, hourList) {
        if (this.ajaxId === "getAvailableSlots") {
            this.ajax.onload = () => {
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);
                    let hour = new Date().getHours();
                    let todayTs = new Date().setHours(0, 0, 0, 0);
                    let selectDayTs = selectDay.getTime();

                    for (let key in datas) {
                        if (datas.hasOwnProperty(key)) {
                            let consultationHour = parseInt(
                                getHourFromTimeSlot(parseInt(datas[key]))
                                    .split("-")[0]
                                    .split("h")[0]
                            );

                            if (
                                selectDayTs > todayTs ||
                                (selectDayTs === todayTs &&
                                    consultationHour > hour)
                            ) {
                                let option = document.createElement("option");
                                option.setAttribute("value", datas[key]);
                                option.innerHTML = getHourFromTimeSlot(
                                    parseInt(datas[key])
                                );
                                hourList.appendChild(option);
                            }
                        }
                    }
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    setConsultationAjaxOnload(modalCancelButton) {
        if (this.ajaxId === "setConsultationAjax") {
            this.ajax.onload = () => {
                let status = this.ajax.status;
                let msg = JSON.parse(this.ajax.response)["message"];
                alert(msg);

                if (status === 200) {
                    //Vide les champs :
                    modalCancelButton.click();
                }
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    removeConsultationAjaxOnload() {
        if (this.ajaxId === "removeConsultationAjax") {
            this.ajax.onload = () => {
                let msg = JSON.parse(this.ajax.response)["message"];
                alert(msg);
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }

    destroySessionOnload() {
        if (this.ajaxId === "destroySessionAjax") {
            this.ajax.onload = () => {
                let status = this.ajax.status;

                if (status === 200) {
                    console.log("Destruction de session terminée.");
                } else {
                    console.log("Erreur lors de la destruction de session.");
                }
                window.location = "../../../index.php";
            };
        } else {
            console.log("Wrong ajax call method. ajaxID : " + this.ajaxId);
        }
    }
}
