const fetch = require('node-fetch');
const { getPeoplePromise, getPeople } = require('./asynchronous');

it('getPeoplePromise', () => {
  // below line is good practice for async calls to make sure they are tested and the test was not finished before asserting the result
  expect.assertions(1);
  // by returning we make sure the test result will be checked after the promise is done, if the promise is rejected test will still fail
  return getPeoplePromise(fetch).then((data) => {
    expect(data.count).toEqual(82);
  });
});

it('getPeople', () => {
  // with the below row we make sure how many assertions should run
  expect.assertions(2);
  return getPeople(fetch).then((data) => {
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

// we will mock our database call
it('getPeople returns count and results', () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 82,
          results: [0, 1, 2, 3, 4, 5],
        }),
    })
  );

  expect.assertions(3);
  return getPeoplePromise(mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
