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

function allCookies() {
  let cookiesTab = document.cookie.split(";");
  let cookies = [];
  for (let i = 0; i < cookiesTab.length; i++) {
    let name = cookiesTab[i].substring(0, cookiesTab[i].indexOf("="));
    let value = cookiesTab[i].substring(cookiesTab[i].indexOf("=") + 1);
    cookies[name] = value;
  }
  return cookies;
}

function setCookie(name, value, expires = "") {
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    (expires == "" ? "" : ";expires=" + expires.toUTCString());
}

function getCookie(name) {
  let cookies = allCookies();
  if (cookies[name]) {
    return decodeURIComponent(cookies[name]);
  } else {
    return null;
  }
}
