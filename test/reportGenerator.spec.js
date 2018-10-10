const mockdata = require('./mockdata');
const ReportGenerator = require('../src/reportGenerator');

describe('reportGenerator', () => {
	describe('renderStructure', () => {
		it('should return a Latex output based on the given input data', () => {
			const mockedConfig = {
				getOutputFilepath: () => 'test-report.tex',
				getSort: () => 'default',
				getExecutionTimeWarningThreshold: () => 5,
			};
			const reportGenerator = new ReportGenerator(mockedConfig);

			return reportGenerator.renderStructure(mockdata.jestResponse.multipleTestResults)
				.then(output => expect(output).not.toBeNull());
		});

		it('should return reject the promise if no data was provided', () => {
			expect.assertions(1);
			const mockedConfig = {
				getOutputFilepath: () => 'test-report.tex',
				getSort: () => 'default',
				getExecutionTimeWarningThreshold: () => 5,
			};
			const reportGenerator = new ReportGenerator(mockedConfig);

			return expect(reportGenerator.renderStructure()).rejects
				.toHaveProperty('message', 'Test data missing or malformed');
		});
	});
});
