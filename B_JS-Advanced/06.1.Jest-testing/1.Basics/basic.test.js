const googleSearch = require('./basic');

const dbMock = [
  'dog.com',
  'disney.com',
  'airlines.com',
  'bags.com',
  'shoes.bg',
];

describe('googleSearch', () => {
  it('should search google', () => {
    expect(googleSearch('dog', dbMock)).toEqual(['dog.com']);
  });

  it('should be empty array for not exisitng value', () => {
    expect(googleSearch('mars', dbMock)).toEqual([]);
  });

  it('should be empty array for undefined', () => {
    expect(googleSearch(undefined, dbMock)).toEqual([]);
  });

  it('should be at most 3 matches', () => {
    expect(googleSearch('.com', dbMock).length).toEqual(3);
  });
});
