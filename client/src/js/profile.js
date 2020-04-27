class ProfileInformations {
  constructor(
    domElement,
    userDatas,
    personnalInformationLabel,
    connexionInformationLabel
  ) {
    this.domElement = domElement;
    this.personnalInformationLabel = personnalInformationLabel;
    this.connexionInformationLabel = connexionInformationLabel;

    if (userDatas) {
      this.personnalInformationValues = userDatas["personnalDatas"];
      this.connexionInformationValues = userDatas["connexionDatas"];
    }
  }

  pannelInformationMount(
    mainContainerID,
    componentWindowTitle,
    componentLabel,
    componentValues
  ) {
    let mainContainer = document.createElement("div");
    mainContainer.className = "form-group p-4";
    mainContainer.setAttribute("id", mainContainerID);

    //Création du pannel d'information générale :
    let componentTitle = document.createElement("h1");
    componentTitle.className = "row h4 mb-3 border-bottom";
    componentTitle.innerHTML = componentWindowTitle;

    mainContainer.appendChild(componentTitle);

    //Construction des labels pannel d'informations :
    for (let i = 0; i < Object.keys(componentLabel).length / 2; i++) {
      let userInformationRow = document.createElement("div");
      userInformationRow.className = "row mt-3";

      let carriageReturn = document.createElement("div");
      carriageReturn.className = "w-100";

      for (let j = i * 2; j <= i * 2 + 1; j++) {
        let userInformationCol = document.createElement("div");
        userInformationCol.className = "col";

        let keyOfComponentLabels = Object.keys(componentLabel)[j];

        //Construction du label :
        let label = document.createElement("label");
        label.setAttribute("for", keyOfComponentLabels);
        label.innerHTML = componentLabel[keyOfComponentLabels];

        //Construction de l'input
        let inputValue = document.createElement("input");
        inputValue.className = "form-control";
        inputValue.setAttribute("type", "text");
        inputValue.setAttribute("id", keyOfComponentLabels);
        inputValue.setAttribute("name", keyOfComponentLabels);
        inputValue.required = true;

        if (componentValues) {
          let keyOfComponentValues = Object.keys(componentValues)[j];
          inputValue.setAttribute(
            "value",
            componentValues[keyOfComponentValues]
          );
          inputValue.disabled;
        }

        //Ajout des composants à la col :
        userInformationCol.appendChild(label);
        userInformationCol.appendChild(inputValue);

        //Ajout de la col a la row :
        userInformationRow.appendChild(userInformationCol);
      }

      //Ajout des éléments au contenu du composant :
      mainContainer.appendChild(carriageReturn);
      mainContainer.appendChild(userInformationRow);
    }

    return mainContainer;
  }

  componentMount() {
    //Formulaire principal :
    let mainForm = document.createElement("form");
    mainForm.className = "needs-validation";
    mainForm.setAttribute("method", "post");
    mainForm.setAttribute("name", "mainForm");
    mainForm.noValidate;

    //Création du pannel d'information personnel :
    let personalInformationPannel = this.pannelInformationMount(
      "personalInformationComponent",
      "Informations générales",
      this.personnalInformationLabel,
      this.personnalInformationValues
    );
    mainForm.appendChild(personalInformationPannel);

    //Création du pannel d'information de connexion :
    if (this.connexionInformationLabel) {
      let connexionInformationPannel = this.pannelInformationMount(
        "connexionInformationComponent",
        "Informations de connexion",
        this.connexionInformationLabel,
        this.connexionInformationValues
      );
      mainForm.appendChild(connexionInformationPannel);
    }

    this.domElement.appendChild(mainForm);
  }
}
