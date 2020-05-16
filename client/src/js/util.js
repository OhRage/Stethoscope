function getAge(dateString) {
    let birthDate = new Date(dateString);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getMonth(monthInput) {
    let month = monthInput.toLowerCase();

    let months = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "aout",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ];
    let indexOfMonth = (months.indexOf(month) + 1).toString();
    if (indexOfMonth.length === 1) {
        indexOfMonth = "0" + indexOfMonth;
    }

    return indexOfMonth;
}

function registerInputControl(form, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "hidden") {
            if (inputs[i].value === "") {
                //Les champs ne doivent pas être vide :
                inputs[i].setCustomValidity("Invalid field");
                let invalidFeedback = inputs[i].nextSibling;
                invalidFeedback.innerHTML = "Vous devez saisir une valeur.";
            } else {
                inputs[i].setCustomValidity("");

                //Contrôles supplémentaires
                let invalidFeedback;
                switch (inputs[i].getAttribute("id")) {
                    case "birthDate":
                        //L'utilisateur doit avoir plus de 18 ans :
                        let age = getAge(inputs[i].value);
                        if (age < 18) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Vous devez être majeur.";
                        }
                        break;

                    case "socialNumber":
                        //Le numéro de sécurité social doit avoir 13 chiffres et aucune lettre :
                        let socialNumber = inputs[i].value;
                        if (
                            isNaN(parseInt(socialNumber, 10)) ||
                            socialNumber.length !== 13
                        ) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Le numéro de sécurité social doit contenir 13 chiffres.";
                        }
                        break;

                    case "city":
                        //La ville doit contenir que des caractères :
                        let city = inputs[i].value;
                        if (city.match(/.*[0-9].*/gm)) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "La ville que vous avez renseignée est invalide.";
                        }
                        break;

                    case "postalCode":
                        //Le code postal doit contenir 5 chiffres :
                        let postalCode = inputs[i].value;
                        if (
                            isNaN(parseInt(postalCode, 10)) ||
                            postalCode.length !== 5
                        ) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Vous devez saisir un code postal valide (ex : 69000)";
                        }
                        break;

                    case "phoneNumber":
                        //Le numéro de téléphone doit contenir 10 chiffres :
                        let phoneNumber = inputs[i].value;
                        if (
                            isNaN(parseInt(phoneNumber, 10)) ||
                            phoneNumber.length !== 10 ||
                            phoneNumber.charAt(0) !== "0"
                        ) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Vous devez saisir un numéro de téléphone valide (ex : 0601020304)";
                        }
                        break;

                    case "emailAddress":
                        //L'adresse email doit avoir un format correct :
                        let email = inputs[i].value;
                        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Votre adresse email n'est pas au bon format (ex: jean.blanc@email.com).";
                        }
                        break;

                    case "password":
                        //Le mot de passe doit être fort :
                        let password = inputs[i].value;
                        if (
                            !password.match(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g
                            )
                        ) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Votre mot de passe doit contenir 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial (!@#$%^&*).";
                        }
                        break;

                    case "confirmEmailAddress":
                        //Les emails renseignés doivent être égaux :
                        let emailAddressValue = form.querySelector(
                            "#emailAddress"
                        ).value;
                        let confirmEmailAddress = inputs[i].value;
                        if (emailAddressValue !== confirmEmailAddress) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Les adresses emails doivent être identiques.";
                        }
                        break;

                    case "confirmPassword":
                        //Les mot de passes doivent être égaux :
                        let passwordValue = form.querySelector("#password")
                            .value;
                        let confirmPassword = inputs[i].value;
                        if (passwordValue !== confirmPassword) {
                            inputs[i].setCustomValidity("Invalid Field");
                            invalidFeedback = inputs[i].nextSibling;
                            invalidFeedback.innerHTML =
                                "Les mot de passe doivent être identiques.";
                        }
                        break;
                }
            }
        }
    }
}

function firstLetterUpperCase(firstName) {
    let firstNameUpperCase =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return firstNameUpperCase;
}

function getHourFromTimeSlot(timeSlot) {
    hourlist = [
        "8h-9h",
        "9h-10h",
        "10h-11h",
        "11h-12h",
        "14h-15h",
        "15h-16h",
        "16h-17h",
        "17h-18h",
    ];
    
    return hourlist[timeSlot-1];
}
