// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 3, action: 'Multiply', expected: null },
  { a: 5, b: '3', action: Action.Subtract, expected: null }
];

describe('simpleCalculator', () => {
  test.each(testCases)('test simple calculator operations', (input) => {
    expect(simpleCalculator(input)).toBe(input.expected);
  });
});
