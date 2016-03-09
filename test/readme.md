# Tests

For better performance and efficient developing, we integrate unit test with Karma. Karma.config.js will call tes.webpack.js to run all the js files that end with 'Spec', such as ModelSpec.js, which is the convention we name our test files. Karma will run tests on Chrome.

## Unit tests with Karma

You do not need to start up a server before running the unit tests. Simply run:

npm install

after installing all the modules, then run

npm run unit-tests or karma start
