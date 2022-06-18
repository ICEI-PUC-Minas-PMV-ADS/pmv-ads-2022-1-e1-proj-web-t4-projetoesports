import { USER_INFO } from "../framework/state";

/***
 * isUser
 */

export function isUser() {
  const userInfo = window.sessionStorage.getItem(USER_INFO);
  return userInfo !== undefined && userInfo !== null;
}

/***
 * getUser
 */

 export function getUser() {
  return JSON.parse(window.sessionStorage.getItem(USER_INFO));
}