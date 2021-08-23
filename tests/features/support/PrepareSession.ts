const {argv} = require('yargs');
const data = require('../../testdata/data');

class prepareSession{

	webbrowser: string | undefined
	runVisualTest: boolean | undefined
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
		console.log('a browser ::  is => ', argv.webbrowser)
		this.ff = argv.ff || '**';
		this.featureFilePath = `tests/features/featurefiles/${this.ff}.feature`;
		console.log('new ff path is => ', this.featureFilePath)
		this.executionTags = argv.executionTags || '';
		this.baseURL = argv.baseURL || data.baseUrl;
	}
}

export const setSessionValues =  new prepareSession();
