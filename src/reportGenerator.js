const fs = require('fs');
const utils = require('./utils');
const sorting = require('./sorting');

class ReportGenerator {
	constructor(config) {
		this.config = config;
	}

	/**
	 * Generates and writes HTML report to a given path
	 * @param  {Object} data   Jest test information data
	 * @return {Promise}
	 */
	generate({
		data,
		ignoreConsole,
	}) {
		const fileDestination = this.config.getOutputFilepath();
		return this.renderStructure(data)
			.then(output => utils.writeFile({
				filePath: fileDestination,
				content: output,
			}))
			.then(() => utils.logMessage({
				type: 'success',
				msg: `Report generated (${fileDestination})`,
				ignoreConsole,
			}))
			.catch(error => utils.logMessage({
				type: 'error',
				msg: error,
				ignoreConsole,
			}));
	}

	/**
	 * Returns the stylesheet to be requireed in the test report.
	 * If styleOverridePath is not defined, it will return the defined theme file.
	 * @return {Promise}
	 */
	getStylesheetContent() {
		const pathToStylesheet = this.config.getStylesheetFilepath();
		return new Promise((resolve, reject) => {
			fs.readFile(pathToStylesheet, 'utf8', (err, content) => {
				if (err) {
					return reject(new Error(`Could not locate the stylesheet: '${pathToStylesheet}': ${err}`));
				}
				return resolve(content);
			});
		});
	}

	/**
	 * Returns a HTML containing the test report.
	 * @param  {String} stylesheet
	 * @param  {Object} data		The test result data
	 * @return {String} output
	 */
	renderStructure(data) {
		return new Promise((resolve, reject) => {
			// Make sure that test data was provided
			if (!data || !Array.isArray(data.testResults)) {
				return reject(new Error('Test data missing or malformed'));
			}

			// prelude
			let output = `\\documentclass[preview]{standalone}
\\begin{document}\n`;

			// Apply the configured sorting of test data
			const sortedTestData = sorting.sortSuiteResults({
				testData: data.testResults,
				sortMethod: this.config.getSort(),
			});

			// Test Suites
			sortedTestData.forEach((suite) => {
				if (!suite.testResults || suite.testResults.length <= 0) {
					return;
				}
				const suiteName = suite.testFilePath.replace(/^.*[\\\/]/, '');
				output += `\\subsection{${suiteName}}\n\\begin{itemize}\n`;

				// Test Results
				suite.testResults.forEach((test) => {
					output += `\\item ${test.title}\n`;
				});

				output += '\\end{itemize}\n';
			});

			output += '\\end{document}\n';
			// console.log(JSON.stringify(data, null, 4));
			return resolve(output);
		});
	}
}

module.exports = ReportGenerator;
