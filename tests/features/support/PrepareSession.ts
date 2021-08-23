const {argv} = require('yargs');
const data = require('../../testdata/data');

class prepareSession{

	webbrowser: string | undefined
	runTests: string | undefined
	ff: string	| undefined
	executionTags: string	| undefined
	baseURL: string	| undefined
	featureFilePath: string	|	undefined


	addVRTServiceInConfig(service: string) {
		return service === 'local' ? ['selenium-standalone'] : ['browserstack'];
	}

	getRunTimeParametersAndSetDefaultValues(){
		const configFile = `${process.env.npm_package_config_config}`?? 'local';
		this.webbrowser = argv.webbrowser || 'chrome';
		this.ff = argv.ff || '**';
		this.featureFilePath = `tests/features/featurefiles/${this.ff}.feature`;
		this.executionTags = argv.executionTags || '';
		this.baseURL = argv.baseURL || data.baseUrl;
	}
}

export const setSessionValues =  new prepareSession();
