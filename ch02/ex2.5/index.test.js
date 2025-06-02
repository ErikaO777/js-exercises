import { Histogram, DefaultMap } from './index.js';

describe('DefaultMap', () => {
  test('returns set value for existing keys', () => {
    const map = new DefaultMap(0);
    map.set('a', 5);
    expect(map.get('a')).toBe(5);
  });
});

describe('Histogram', () => {
  test('counts character frequencies correctly', () => {
    const histogram = new Histogram();
    histogram.add('aabbcc');
    expect(histogram.letterCounts.get('A')).toBe(2);
    expect(histogram.letterCounts.get('B')).toBe(2);
    expect(histogram.letterCounts.get('C')).toBe(2);
  });
});
