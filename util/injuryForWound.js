import wounds from '../resources/wounds.js';

export default function injuryForWound(id) {
  console.log(`Get symptoms for wound #${id}`);
  if (id === undefined || isNaN(id) || wounds[id] === undefined) {
    return null;
  }
  return {
    name: wounds[id].name,
    isRed: wounds[id].isRed,
    symptoms: wounds[id].symptoms,
    untilTreated: wounds[id].untilTreated,
  };
}
