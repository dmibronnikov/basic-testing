// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let input = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(input)).toBe(3);
  });

  test('should subtract two numbers', () => {
    let input = { a: 5, b: 3, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(2);
  });

  test('should multiply two numbers', () => {
    let input = { a: 5, b: 3, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(15);
  });

  test('should divide two numbers', () => {
    let input = { a: 12, b: 3, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    let input = { a: 5, b: 3, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(125);
  });

  test('should return null for invalid action', () => {
    let input = { a: 5, b: 3, action: 'Multiply' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let input = { a: 5, b: '3', action: Action.Subtract };
    expect(simpleCalculator(input)).toBeNull();
  });
});
