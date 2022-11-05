import addComplications, {randompop} from './addComplications';
import complications from '../resources/complications.json';

describe('randompop', () => {
  test('removes an element from the original array', () => {
    const testArray = [1, 2, 3, 4];
    randompop(testArray);
    expect(testArray.length).toBe(3);
  });

  test('returns the removed element', () => {
    const testArray = [1, 2, 3, 4];
    const arrayCopy = testArray.filter(() => true);
    const popped = randompop(testArray);
    expect(arrayCopy).toContain(popped);
    expect(testArray).not.toContain(popped);
  });
});

describe('addComplications', () => {
  const startingProblem = [
    'Gunshot Wound',
    'Septic Shock',
    'Respiratory Distress',
  ];

  test.each([
    [0, 3, 0],
    [1, 3, 1],
    [2, 3, 2],
    [3, 3, 2],
    [4, 4, 2],
    [5, 4, 3],
    [6, 4, 3],
    [7, 4, 3],
    [8, 4, 4],
    [9, 5, 4],
    [10, 6, 5],
  ])(
    'number of cards & complications for %i surgeries',
    (surgeries, problemCount, complicationCount) => {
      const processedProblem = addComplications(startingProblem, surgeries);
      const numberOfComplications = processedProblem.reduce((acc, current) => {
        if (current in complications) {
          acc++;
        }
        return acc;
      }, 0);

      expect(processedProblem.length).toBe(problemCount);
      expect(numberOfComplications).toBeLessThanOrEqual(complicationCount);
    },
  );
});
