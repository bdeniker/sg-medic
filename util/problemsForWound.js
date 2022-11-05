export default function getProblemsForWoundCard(id) {
  console.log(`Get problems for wound #${id}`);
  if (id === undefined) {
    return [];
  }
  // TODO look up from wound card data
  return ['Gunshot Wound', 'Septic Shock', 'Respiratory Distress'];
}
