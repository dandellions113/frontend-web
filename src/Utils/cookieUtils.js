// cookieUtils.js
import Cookies from "js-cookie";

// Set a cookie with a given name, value, and optional options
export function setCookie(name, value, options = {}) {
  Cookies.set(name, value, options);
}

// Get the value of a cookie by name
export function getCookie(name) {
  return Cookies.get(name);
}

// Remove a cookie by name
export function removeCookie(name) {
  Cookies.remove(name);
}
