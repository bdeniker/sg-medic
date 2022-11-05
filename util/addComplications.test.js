import addComplications, {randompop} from './addComplications';
import complications from '../resources/complications.json';

describe('randompop', () => {
  const base = [1, 2, 3, 4];
  test('removes an element from the original array', () => {
    const testArray = [...base];
    randompop(testArray);
    expect(testArray.length).toBe(3);
  });

  test('returns the removed element', () => {
    const testArray = [...base];
    const popped = randompop(testArray);
    expect(base).toContain(popped);
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

  test('zero hand 5 surgeries', () => {
    const processedProblem = addComplications([], 5);

    expect(processedProblem.length).toBe(1);
  });
});
