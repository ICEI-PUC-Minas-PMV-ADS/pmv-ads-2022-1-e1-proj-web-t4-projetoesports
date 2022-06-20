import { USER_INFO } from "../framework/state.js";

/***
 * isUser
 */

export function isUser() {
  const applicationState = JSON.parse(window.sessionStorage.getItem('_STATE_application'));
  const userInfo = applicationState[USER_INFO];
  return userInfo !== undefined && userInfo !== null;
}

/***
 * getUser
 */

export function getUser() {
  const applicationState = JSON.parse(window.sessionStorage.getItem('_STATE_application'));
  return applicationState[USER_INFO];
}