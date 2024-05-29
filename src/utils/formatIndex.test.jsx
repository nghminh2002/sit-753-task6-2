// eslint-disable-next-line @typescript-eslint/no-var-requires
const { formatIndex } = require('./format-text');

describe('formatIndex', () => {
  it('formats single-digit numbers with leading zero', () => {
    expect(formatIndex(1, null)).toBe('02');
    expect(formatIndex(9, null)).toBe('9');
  });

  it('formats double-digit numbers without leading zero', () => {
    expect(formatIndex(10, null)).toBe('10');
    expect(formatIndex(99, null)).toBe('99');
  });

  it('handles null or undefined inputs', () => {
    expect(formatIndex(null, null)).toBe('01');
    expect(formatIndex(undefined, null)).toBe('01');
    expect(formatIndex(null, 5)).toBe('05');
    expect(formatIndex(undefined, 5)).toBe('05');
  });
});
