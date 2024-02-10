import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    let snapshot = {
      next: {
        next: {
          next: {
            next: {
              next: {
                next: null,
                value: null,
              },
              value: 5,
            },
            value: 4,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    expect(generateLinkedList([1, 2, 3, 4, 5])).toStrictEqual(snapshot);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([2, 3, 4, 5, 6])).toMatchSnapshot();
  });
});
