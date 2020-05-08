class AjaxCall {
    constructor(ajaxId) {
        this.ajax = new XMLHttpRequest();
        this.ajaxId = ajaxId;
    }

    sendAjax(method, url, postParameter = null) {
        this.ajax.open(method, url);
        this.ajax.send(postParameter);
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

    getUsernameAjaxOnload() {
        if (this.ajaxId === "usernameAjax") {
            this.ajax.onload = () => {
                let userMenuDatas = {};
                if (this.ajax.status == 200) {
                    let datas = JSON.parse(this.ajax.response);
                    userMenuDatas = {
                        firstName:
                            datas["first_name"].charAt(0).toUpperCase() +
                            datas["first_name"].slice(1),
                        lastName: datas["last_name"].toUpperCase(),
                    };
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur (getId = get_user_datas)"
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

                    // profileDatas = {
                    //     personnalDatas: {
                    //         firstName:
                    //             datas["first_name"].charAt(0).toUpperCase() +
                    //             datas["first_name"].slice(1),
                    //         lastName: datas["last_name"].toUpperCase(),
                    //         birthDate: ,
                    //         socialNumber: ,
                    //         address: ,
                    //         city: ,
                    //         postalCode: ,
                    //         phoneNumber: ,
                    //     },
                    //     connexionDatas: {
                    //         emailAddress: ,
                    //         password: ,
                    //     },
                    // };
                } else {
                    console.log(
                        "Erreur de récupération des données du serveur (getId = get_user_datas)"
                    );

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
}
