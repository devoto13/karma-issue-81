# Reproduction

This is small reproduction for [karma-webpack#81](https://github.com/webpack-contrib/karma-webpack/issues/81).

# Steps

    $ npm install
    $ npm run karma:start
    
    ... in another terminal
    
    $ npm run karma:run && sed -i 's/42/43/' src/app.ts && npm run karma:run
    $ npm run karma:run
    
It basically applies edit to the file and triggers new tests run right after. Than I wait couple of seconds and run test once again.

Expected results:

- 1 run - success
- 2 run - failure
- 3 run - failure

And it all works correctly. Although similar sequence done from WebStorm UI results in the below results:

UI results:

- 1 run - success
- 2 run - **success** (should be failure)
- 3 run - failure

Maybe it's a WebStorm issue?

Now I can confirm that issue is caused by by WebStorm's adjustments to the config file. I made same experiment using WebStorm adjustments to Karma and can reproduce behavior from the UI.

Here is the sequence of the commands (sorry for absolute paths...):

    $ /Users/devoto13/.nvm/versions/node/v8.1.2/bin/node "/Users/devoto13/Library/Application Support/JetBrains/Toolbox/apps/Web/172.3317.48/WebStorm.app/Contents/plugins/js-karma/js_reporter/karma-intellij/lib/intellijServer.js" --karmaPackageDir=/Users/devoto13/Projects/karma-issue-81/node_modules/karma --configFile=/Users/devoto13/Projects/karma-issue-81/karma.conf.js
    
    $ /Users/devoto13/.nvm/versions/node/v8.1.2/bin/node "/Users/devoto13/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-1/172.3317.48/WebStorm.app/Contents/plugins/js-karma/js_reporter/karma-intellij/lib/intellijRunner.js" --karmaPackageDir=/Users/devoto13/Projects/karma-issue-81/node_modules/karma --configFile=/Users/devoto13/Projects/karma-issue-81/karma.conf.js --serverPort=9876 && gsed -i 's/42/43/' src/app.ts && /Users/devoto13/.nvm/versions/node/v8.1.2/bin/node "/Users/devoto13/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-1/172.3317.48/WebStorm.app/Contents/plugins/js-karma/js_reporter/karma-intellij/lib/intellijRunner.js" --karmaPackageDir=/Users/devoto13/Projects/karma-issue-81/node_modules/karma --configFile=/Users/devoto13/Projects/karma-issue-81/karma.conf.js --serverPort=9876
    
    $ /Users/devoto13/.nvm/versions/node/v8.1.2/bin/node "/Users/devoto13/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-1/172.3317.48/WebStorm.app/Contents/plugins/js-karma/js_reporter/karma-intellij/lib/intellijRunner.js" --karmaPackageDir=/Users/devoto13/Projects/karma-issue-81/node_modules/karma --configFile=/Users/devoto13/Projects/karma-issue-81/karma.conf.js --serverPort=9876


WebStorm in the CLI results:

- 1 run - success
- 2 run - **success** (should be failure)
- 3 run - failure

Will investigate what exactly WebStorm is doing to break it.

PS WebStorm does not automatically save current file, when Rerun tests is triggered by a shortcut. But it is separate issue. For the testing I explicitly save files before triggering tests.
