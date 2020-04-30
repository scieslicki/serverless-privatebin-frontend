import * as uuid from "uuid";
// import { Auth } from "aws-amplify";

export function readUserId (isAuthenticated = false) {
  let storedUserId;

  // if (isAuthenticated) {
  //   // const userInfo = await Auth.currentUserInfo();
  //   const userInfo = await Auth.currentAuthenticatedUser();
  //
  //   console.log(userInfo.username);
  //
  //   return userInfo.username;
  // }

  if (localStorage.getItem('userId')) {
    storedUserId = localStorage.getItem('userId');
  } else {
    storedUserId = uuid.v1();
    localStorage.setItem('userId', storedUserId);
  }

  return storedUserId;
}

export function saveUserId(userId) {
  localStorage.setItem('userId', userId);
}


export function createUserId() {
  let storedUserId = uuid.v1();
  localStorage.setItem('userId', storedUserId);

  return storedUserId;
}