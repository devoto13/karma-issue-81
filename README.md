# Reproduction

This is small reproduction for [karma-webpack#81](https://github.com/webpack-contrib/karma-webpack/issues/81).

# Steps

    $ npm install
    $ npm run karma:start
    
    ... in another terminal
    
    $ npm run karma:run && sed -i 's/42/43/' src/app.ts && npm run karma:run
    
It basically applies edit to the file and triggers new test run right after. So far it all works correctly. Maybe it's a WebStorm issue?

One note is that WebStorm does not automatically saves current file, when Rerun tests is triggered by a shortcut. But it is not the problem for the issue as even if I click save and than shortcut for Rerun tests it serves stale code.
