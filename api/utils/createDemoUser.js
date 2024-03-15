import { positiveAdjectives, animalNouns } from "./demoUserAdjectivesNouns.js";
import crypto from "crypto";

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const createDemoUser = () => {
  const randomId = crypto.randomUUID();
  const firstName = getRandomElement(positiveAdjectives);
  const lastName = getRandomElement(animalNouns);
  const emailAddress = `${firstName}.${lastName}${randomId}@realestatehub.com`;
  const username = `${lastName}${randomId}`;
  const password = crypto.randomUUID();
  return {
    firstName,
    lastName,
    emailAddress,
    username,
    password,
    userType: "demo-user",
  };
};

export default createDemoUser;
