import * as uuid from "uuid";

export function readUserId () {
  let storedUserId;

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