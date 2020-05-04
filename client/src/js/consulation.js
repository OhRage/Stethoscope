class Consultation {
  constructor(domElement, consultationDatas) {
    this.domElement = domElement;
    this.imagePath = consultationDatas["imagePath"];
    this.consultationID = consultationDatas["consultationID"];

    this.informationLabels = {
      usernameLabel: consultationDatas["userType"] + " :",
      dateLabel: "Date : ",
      addressLabel: "Adresse du cabinet : ",
      reasonLabel: "Motif : ",
    };

    this.informationValues = {
      usernameValue:
        consultationDatas["firstName"] + " " + consultationDatas["lastName"],
      dateValue:
        "le " +
        consultationDatas["date"] +
        " à " +
        consultationDatas["hour"] +
        " heure",
      addressValue:
        consultationDatas["address"] +
        " - " +
        consultationDatas["postalCode"] +
        " - " +
        consultationDatas["city"],
      reasonValue: consultationDatas["reason"],
    };
  }

  componentMount() {
    let mainContainer = document.createElement("div");
    mainContainer.className = "row m-3";
    mainContainer.setAttribute(
      "id",
      "consultationComponent" + this.consultationID
    );

    //Création de la photo :
    let displayPhoto = this.userPhotoMount();

    //Création du pannel d'information :
    let displayInformations = this.pannelInformationMount();

    //Ajout du bouton d'annulation de la consultation :
    let displayCancelButton = this.cancelButtonMount();

    //Ajout des composants a homepage
    mainContainer.appendChild(displayPhoto);
    mainContainer.appendChild(displayInformations);
    mainContainer.appendChild(displayCancelButton);
    this.domElement.appendChild(mainContainer);
  }

  componentUnmount() {
    let childToRemove = this.domElement.querySelector(
      "#consultationComponent" + this.consultationID
    );
    this.domElement.removeChild(childToRemove);
  }

  userPhotoMount() {
    let displayPhoto = document.createElement("div");
    displayPhoto.className =
      "row col-3 my-2 justify-content-center align-items-center";
    let doctorPhoto = document.createElement("img");
    doctorPhoto.className = "img-fluid";
    doctorPhoto.setAttribute("src", this.imagePath);
    doctorPhoto.setAttribute("alt", "");
    displayPhoto.appendChild(doctorPhoto);

    return displayPhoto;
  }

  pannelInformationMount() {
    let displayInformations = document.createElement("div");
    displayInformations.className = "col-8 my-2";

    //Construction des labels pannel d'informations :
    for (let i = 0; i < Object.keys(this.informationLabels).length; i++) {
      let userInformation = document.createElement("div");
      userInformation.className = "row";

      //Construction du label :
      let label = document.createElement("p");
      label.className = "label";
      label.innerHTML = this.informationLabels[
        Object.keys(this.informationLabels)[i]
      ];

      //Ajout du label
      userInformation.appendChild(label);

      //Construction du paragraphe pour la valeur :
      let value = document.createElement("p");
      value.innerHTML = this.informationValues[
        Object.keys(this.informationValues)[i]
      ];

      //Ajout du du paragraphe :
      userInformation.appendChild(value);

      //Ajout des éléments au contenu du composant :
      displayInformations.appendChild(userInformation);
    }
    return displayInformations;
  }

  cancelButtonMount() {
    let displayButton = document.createElement("div");
    displayButton.className = "row col-1 align-items-center";

    let cancelButton = document.createElement("input");
    cancelButton.setAttribute("id", "cancelConsultationButton");
    cancelButton.setAttribute("type", "image");
    cancelButton.setAttribute("src", "../img/cancel-consultation-icon.svg");
    displayButton.appendChild(cancelButton);

    cancelButton.addEventListener("click", () => {
      this.cancelConsultation();
    });

    return displayButton;
  }

  cancelConsultation() {
    //Fenêtre de confirmation a l'utilisateur :
    let output = confirm("Voulez vous annuler ce rendez-vous?");
    if (output) {
      //@TODO : Mise a jour des données de la BDD => la consultation n'est plus reservée.

      //Destruction du composant courant :
      this.componentUnmount();
    }
  }
}
