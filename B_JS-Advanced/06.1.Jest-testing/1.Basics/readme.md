## general info

- **Mock** - mocking is good to use for example for async calls, because if we have 1000 tests and for each we call database it will be very slow

## jest info

- **describe** - not necessary to use, but it is good practice to use, because we can make groupd of test, for example one group testing some specifics and another group testing something else

## package.json setup

This command will use jest for running tests.

```
"test": "jest"
```

With this command our tests will run on saving the file.

```
"test": "jest --watchAll *.js"
```
