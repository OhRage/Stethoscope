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
        labelValue: "Mon médecin",
      },
      {
        modalWindowID: "#calendarModal",
        iconPath: "../img/calendar2-icon.svg",
        labelValue: "Mon planning",
      },
      {
        modalWindowID: "#historyMenu",
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
    if (this.userDatas["imagePath"]) {
      displayPhoto.setAttribute("id", "userPhoto");
      let photo = document.createElement("img");
      photo.className = "fluid";
      photo.setAttribute("src", this.userDatas["imagePath"]);
      photo.setAttribute("alt", "photo");
      displayPhoto.appendChild(photo);
    } else {
      //Image par défaut de l'utilisateur :
      displayPhoto.setAttribute("id", "userImage");
      let defaultImage = document.createElement("div");
      defaultImage.setAttribute("id", "userDefaultImage");
      defaultImage.innerHTML =
        this.userDatas["firstName"].charAt(0) +
        this.userDatas["lastName"].charAt(0);
      displayPhoto.appendChild(defaultImage);
    }
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
        this.modalWindowMount(this.menuInformations[subMenu].modalWindowID);
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
        //@TODO : Cas du bouton "Mon profil" => Récupération des informations de l'utilisateur. SQL => Pour la session courante, récupéré les infos ci-dessous (attention masquer le password)
        serverDatas = {
          personnalDatas: {
            firstName: "Kevin",
            lastName: "ICOL",
            birthDate: "24/05/1990",
            socialNumber: "19005730011",
            address: "16 rue George Sand",
            city: "Villeurbanne",
            postalCode: "69100",
            phoneNumber: "0608137982",
          },
          connexionDatas: {
            emailAddress: "kevin.icol@hotmail.fr",
            password: "Jupiter2020!",
          },
        };

        //On ajoute la fenêtre modal au domElement :
        let profileModalWindow = new ProfileModalWindow(
          modalSection,
          serverDatas
        );
        profileModalWindow.componentMount();

        break;
      case "#doctorInformationModal":
        //@TODO : Cas du bouton "Mon médecin" => récupération des informations du médecin traitant du patient (cf info ci-dessous):
        serverDatas = {
          personnalDatas: {
            firstName: "Gregory",
            lastName: "HOUSE",
            birthDate: "12/06/1968",
            conventionArea: "Secteur 1",
            address: "1er rue de la liberté",
            city: "Lyon",
            postalCode: "69003",
            phoneNumber: "0612345678",
            emailAddress: "gregory.house@gmail.com",
          },
        };

        //On ajoute la fenêtre modal au domElement :
        let doctorModalWindow = new DoctorModalWindow(
          modalSection,
          serverDatas
        );
        doctorModalWindow.componentMount();

        break;
      case "#calendarModal":
        //@TODO : Cas du bouton "Mon planning" => Récupération des informations du planning de l'utilisateur.
        //On ajoute la fenêtre modal au domElement :
        let calendarModalWindow = new CalendarModalWindow(
          modalSection,
          serverDatas
        );
        calendarModalWindow.componentMount();
        break;
      case "#historyMenu":
        break;
      case "#logoutButton":
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
    for (let subMenu = 0; subMenu < this.menuInformations.length; subMenu++) {
      let displaySubMenu = this.subMenuMount(subMenu);
      mainContainer.appendChild(displaySubMenu);
    }

    //Ajout des composant au DOM :
    this.domElement.prepend(mainContainer);
  }
}

//Gestionnnaire d'évenement du document :
document.addEventListener("readystatechange", () => {
  loadUserMenu();
});
function loadUserMenu() {
  if (document.readyState === "complete") {
    //Récupération des infos de l'utilisateur sur le serveur :
    let ajax = new XMLHttpRequest();

    ajax.onload = () => {
      if (ajax.status == 200) {
        let datas = JSON.parse(ajax.response);
        let userMenuDatas = {
          firstName:
            datas["first_name"].charAt(0).toUpperCase() +
            datas["first_name"].slice(1),
          lastName: datas["last_name"].toUpperCase(),
        };

        //Création du composant userMenu :
        let domElement = document.getElementById("mainRow");
        const userMenu = new UserMenu(domElement, userMenuDatas);
        userMenu.componentMount();
      } else {
        console.log(
          "Erreur de récupération des données du serveur (getId = get_user_datas)"
        );
        let userMenuDatas = {
          firstName: undefined,
          lastName: undefined,
        };
      }
    };

    ajax.open(
      "GET",
      "http://stethoscope/server/src/httpRequests.php?getId=get_user_datas&login=" +
        sessionLogin
    );
    ajax.send();
  }
}
