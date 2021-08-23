#!/usr/bin/env node
export{}
// @ts-ignore
import { setSessionValues } from "../features/support"
import fs from 'fs-extra';
import path from 'path';
import {default as allureReporter} from '@wdio/allure-reporter'

console.log('first call =>')
setSessionValues.getRunTimeParametersAndSetDefaultValues();

console.log(`feature file path is ${setSessionValues.featureFilePath}`)
console.log(`browser is ${setSessionValues.webbrowser}`)

/** Retrieve file paths from a given folder and its subfolders. */
const getStepDefsPaths = (folderPath: string) => {
	const entryPaths = fs.readdirSync(folderPath).map((entry: any) => path.join(folderPath, entry));
	const filePaths = entryPaths.filter((entryPath: any) => fs.statSync(entryPath).isFile());
	const dirPaths = entryPaths.filter((entryPath: any) => !filePaths.includes(entryPath));
	const dirFiles:any = dirPaths.reduce((prev: any[], curr: string) => prev.concat(getStepDefsPaths(curr)), []);
	return [...filePaths, ...dirFiles];
};

const executeTags = setSessionValues.executionTags === '' ? 'not @manual and not @wip and not @inprogress' : `${setSessionValues.executionTags} \
and not @manual and not @wip and not @inprogress`;

// @ts-ignore
const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //

    browsername: setSessionValues.webbrowser,
    //
    specs: [
        setSessionValues.featureFilePath,
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    logLevel: 'error',
    bail: 0,
    baseUrl: setSessionValues.baseURL,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    framework: 'cucumber',
    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },

    },

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        requireModule: ['tsconfig-paths/register'],
        require: getStepDefsPaths('./tests/features/step-definitions/').concat(['tests/features/support/*.ts']),
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        // requireModule: ['@babel/register'],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        format: ['pretty'],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: executeTags,
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config: Object, capabilities:Array<Object>) {
        setSessionValues.getRunTimeParametersAndSetDefaultValues();
        fs.removeSync('allure-report/')
        //Remove the `.screenshots/` folder
        fs.removeSync('allure-results/')
        // Create the `.screenshots/` folder
        fs.ensureDir('tests/reports/cucumberjs-json-report/screenshots/', err => {
            console.log(err)
        })
    },

    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world  world object containing information on pickle and test step
     * @param {Object}                 result results object containing scenario results
     * @param {boolean}                result.passed   true if scenario has passed
     * @param {string}                 result.error    error stack if scenario failed
     * @param {number}                 result.duration duration of scenario in milliseconds
     */
    afterScenario: async function(world: any, result: any) {
        allureReporter.addArgument('timestamp', String(Date.now()));
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: async function() {
        // const reportError = new Error('Could not generate Allure report')
        // // @ts-ignore
        // const generation = allure(['generate', 'allure-results', '--clean'])
        //
        // await generation.on('exit', (exitCode: any) => {
        //     console.log('Generation is finished with code:', exitCode);
        //     if(exitCode==0)
        //         console.log('Allure report successfully generated')
        // });
    },

    beforeSession() {
        require('expect-webdriverio').setOptions({ wait: 5000 });
    },

    before: () => {
		browser.setWindowSize(1280, 800);
	},
    afterStep(
        uri: undefined,
        feature: undefined,
        scenario: { error: boolean },
    ) {
        if (scenario.error) {
            console.log('Step Failed..')
            browser.takeScreenshot();
        }
    }
}

exports.config = config;
