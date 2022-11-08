import woundsJSON from './wounds.json';

const wounds = [];
woundsJSON.forEach(wound => {
  wounds[wound.id] = wound;
});

export default wounds;
