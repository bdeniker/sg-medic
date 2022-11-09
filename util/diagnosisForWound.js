import wounds from '../resources/wounds.js';

export default function getDiagnosisForWound(id) {
  console.log(`Get diagnosis for wound #${id}`);
  if (id === undefined || isNaN(id) || wounds[id] === undefined) {
    return null;
  }
  return {
    name: wounds[id].diagnosticTitle
      ? wounds[id].diagnosticTitle
      : wounds[id].name,
    diagnosis: wounds[id].diagnosis,
    mechanics: wounds[id].mechanics,
    cards: wounds[id].cards,
    category: wounds[id].category,
    specialisation: wounds[id].specialisation,
    failure: wounds[id].failure,
  };
}
