/* eslint-disable no-fallthrough */
import complicationsJSON from '../resources/complications.json';

/*
Add One Potential Complication
Add One Potential Complication
        You ain’t got time to bleed – You Gain 2 Vitality
Raise the difficulty of any Surgical Procedure by 1
Add one Potential Complication
        All Med Cards take 2x the printed time on you
        It’s only a Flesh Wound – You gain Feat Mastery Flesh Wounds until the end of the event
Add one Potential Complication
Raise the difficulty of any Surgical Procedure by 1
Add one Extra complication
        Any Failed Surgery Attempt is now fatal
*/

export default function addComplications(problems, surgeries) {
  let drawNumber = problems.length;
  let drawPool = [...problems];
  let complications = [...complicationsJSON];

  switch (surgeries) {
    case 10:
      // add complication
      drawPool.push(randompop(complications));
      drawNumber++;
    case 9:
      drawNumber++;
    case 8:
      // add complication
      drawPool.push(randompop(complications));
    case 7:
    case 6:
    case 5:
      // add complication
      drawPool.push(randompop(complications));
    case 4:
      drawNumber++;
    case 3:
    case 2:
      // add complication
      drawPool.push(randompop(complications));
    case 1:
      // add complication
      drawPool.push(randompop(complications));
    default:
      break;
  }

  // select drawNumber of cards from the drawPool
  let selectedProblems = [];
  for (let i = 0; i < drawNumber; i++) {
    selectedProblems.push(randompop(drawPool));
  }

  return selectedProblems;
}

export function randompop(somearray) {
  return somearray.pop(Math.floor(Math.random() * somearray.length));
}
