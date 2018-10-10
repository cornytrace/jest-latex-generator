## Installation
```shell
npm install jest-latex-generator --save-dev
```

## Usage
Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):
```JSON
"reporters": [
	"default",
	["./node_modules/jest-latex-generator", {
		"pageTitle": "Test Report"
	}]
]
```
As you run Jest from within the terminal, a file called *test-report.tex* will be created within your root folder containing information about your tests.

### Alternative Usage as a Test Results Processor
To run the reporter as a test results processor (after Jest is complete instead of running in parallel), add the following entry to the Jest config (jest.config.json):
```JSON
{
	"testResultsProcessor": "./node_modules/jest-latex-generator"
}
``` 

**Note:** When running as a testResultsProcessor, the configuration needs be placed  within a new file named `jesthtmlreporter.config.json` residing in the root folder.
More information about this can be found in the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/configuration).


## Node Compatibility
This plugin is compatible with Node version `^4.8.3`

---

## Configuration
Please note that all configuration properties are optional.

| Property | Type | Description | Default
|--|--|--|--|
| `pageTitle` | `STRING` | The title of the document. This string will also be outputted on the top of the page. | `"Test Suite"`
| `outputPath` | `STRING` | The path to where the plugin will output the HTML report. The path must include the filename and end with .html | `"./test-report.html"`
| `includeFailureMsg` | `BOOLEAN` | If this setting is set to true, this will output the detailed failure message for each failed test. | `false`
| `includeConsoleLog` | `BOOLEAN` | If set to true, this will output all triggered console logs for each test suite. | `false`
| `styleOverridePath` | `STRING` | The path to a file containing CSS styles that should override the default styling.* | `null`
| `customScriptPath` | `STRING` | Path to a javascript file that should be injected into the test report | `null`
| `theme` | `STRING` | The name of the reporter themes to use when rendering the report. You can find the available themes in the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/Test-Report-Themes) | `"defaultTheme"`
| `logo` | `STRING` | Path to a logo that will be included in the header of the report | `null`
| `executionTimeWarningThreshold` | `NUMBER` | The threshold for test execution time (in seconds) in each test suite that will render a warning on the report page. 5 seconds is the default timeout in Jest. | `5`
| `dateFormat` | `STRING` | The format in which date/time should be formatted in the test report. Have a look in the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/Date-Format) for the available date format variables. | `"yyyy-mm-dd HH:MM:ss"`
| `sort` | `STRING` | Sorts the test results using the given method. Available sorting methods can be found in the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/Sorting-Methods). | `"default"`

> *The plugin will search for the *styleOverridePath* from the root directory, therefore there is no need to prepend the string with `./` or `../` - You can read more about the themes in the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/Test-Report-Themes).

---

## Continuous Integration

Configuration may also be performed with environment variables for dynamic file saving paths in different environments. ***NOTE:** Environment variables will take precedence over configurations set in jesthtmlreporter.config.json and package.json*

### Example
Here is an example of dynamically naming your output file and test report title to match your current branch that one might see in a automated deployment pipeline before running their tests.

```bash
export BRANCH_NAME=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
export JEST_HTML_REPORTER_OUTPUT_PATH=/home/username/jest-test-output/test-reports/"$BRANCH_NAME".html
export JEST_HTML_REPORTER_PAGE_TITLE="$BRANCH_NAME"\ Test\ Report
```

### Configuration Environment Variables
The environment variables reflect the configuration options available in JSON format. Please read the [documentation](https://github.com/cornytrace/jest-latex-generator/wiki/configuration#configuration-environment-variables) for more information on these variables.

