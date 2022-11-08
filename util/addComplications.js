/* eslint-disable no-fallthrough */
import _ from 'lodash';
import complicationsJSON from '../resources/complications.json';

/*
Add One Potential Complication
Add One Potential Complication
        You ain’t got time to bleed – You Gain 2 Vitality
Raise the difficulty of any Surgical Procedure by 1
Add one Potential Complication
        TODO All Med Cards take 2x the printed time on you
        It’s only a Flesh Wound – You gain Feat Mastery Flesh Wounds until the end of the event
Add one Potential Complication
Raise the difficulty of any Surgical Procedure by 1
Add one Extra complication
        Any Failed Surgery Attempt is now fatal
*/

export default function addComplications(problems, complications, surgeries) {
  let drawNumber = problems.length;
  let randomComplications = 0;
  let complicationsList = [...complicationsJSON];
  let drawPool = [
    ...problems,
    ...complications.filter(c => {
      if (c in complicationsList) {
        _.remove(complications, cl => cl === c);
        return true;
      }
      randomComplications++;
      return false;
    }),
  ];

  // add randomComplications number of random complications to draw pool
  _.times(randomComplications, () =>
    drawPool.push(randompop(complicationsList)),
  );

  switch (surgeries) {
    case 10:
      // add complication
      drawPool.push(randompop(complicationsList));
      drawNumber++;
    case 9:
      drawNumber++;
    case 8:
      // add complication
      drawPool.push(randompop(complicationsList));
    case 7:
    case 6:
    case 5:
      // add complication
      drawPool.push(randompop(complicationsList));
    case 4:
      drawNumber++;
    case 3:
    case 2:
      // add complication
      drawPool.push(randompop(complicationsList));
    case 1:
      // add complication
      drawPool.push(randompop(complicationsList));
    default:
      break;
  }

  // select drawNumber of cards from the drawPool
  let selectedProblems = [];
  _.times(drawNumber, () => selectedProblems.push(randompop(drawPool)));

  return selectedProblems;
}

export function randompop(somearray) {
  return somearray.splice(Math.floor(Math.random() * somearray.length), 1)[0];
}
