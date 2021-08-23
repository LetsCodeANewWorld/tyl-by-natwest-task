import { setSessionValues } from '../features/support';
const baseconfig = require('./wdio.base.config');

const config = Object.assign(baseconfig.config, {
	runner: 'local',
	services: setSessionValues.addVRTServiceInConfig('local'),
	reporters: ['spec',
		['allure', {
			outputDir: 'allure-results',
			disableWebdriverStepsReporting: true,
			disableWebdriverScreenshotsReporting: false,
			useCucumberStepReporter: true
		}]
	],
	capabilities: [
		{
			browserName: baseconfig.config.browsername,
			acceptInsecureCerts: true
		}
	],
});
exports.config = config;
