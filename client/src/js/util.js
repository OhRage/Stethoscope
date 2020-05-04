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

function setCookie(name, value, expires = "") {
  document.cookie =
    name +
    "" +
    encodeURIComponent(value) +
    (expires == "" ? "" : ";expires=" + expires.toUTCString());
}

function getCookie(name) {
  let cookies = allCokies();
  if (cookies[name]) {
    return decodeURIComponent(cookies[name]);
  } else {
    return null;
  }
}
