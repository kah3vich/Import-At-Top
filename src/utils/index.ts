import * as prettier from 'prettier';
import * as eslint from 'eslint';
import type { TConfigApp, TFormattedCodeLinter, TFormatterApp } from './types';
import { baseConfig, baseFormatter } from './constant';

export const ImportAtTop = (
	text: string,
	configExtension: TConfigApp[],
	formatterExtension: TFormatterApp,
) => {
	//| variable

	const configApp: TConfigApp[] =
		JSON.parse(JSON.stringify(configExtension)) || JSON.parse(JSON.stringify(baseConfig));

	const formatterApp = formatterExtension || baseFormatter;
	const configDataFile = [];
	let codeTextImport = ``;
	let codeTextMain = ``;
	const arrayOfLetters = [
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	];

	//| function

	const removeNewLines = (str: string) => {
		return str.replace(/\n/g, '');
	};

	const formattingMainCode = (code: string) => {
		const arrWord = ['import', 'from'];
		let id: number = 0;
		let result = '';
		const codeArr = code.split('\n');

		codeArr.forEach((el, i) => {
			arrWord.forEach(word => {
				if (el.includes(word)) {
					id = i;
				}
			});
		});

		result = codeArr.slice(id + 1).join('\n');

		return result;
	};

	const formattedCodeLinter = ({ code, type = 'finally' }: TFormattedCodeLinter) => {
		if (type === 'develop') {
			// Use prettier - Develop
			const formattedCode = prettier.format(code, {
				semi: true,
				singleQuote: true,
				trailingComma: 'es5',
				arrowParens: 'always',
				parser: 'babel',
			});

			// Use eslint - Develop
			const linter = new eslint.Linter();
			const lintingErrors = linter.verifyAndFix(formattedCode, {
				parserOptions: {
					ecmaVersion: 6,
					sourceType: 'module',
					ecmaFeatures: {
						jsx: true,
					},
				},
				rules: {
					'no-unused-vars': 2,
				},
			});

			return lintingErrors.output;
		}

		// Use prettier - Finally
		const formattedCode = prettier.format(code, {
			semi: formatterApp.semi,
			printWidth: formatterApp.printWidth,
			tabWidth: formatterApp.tabWidth,
			useTabs: formatterApp.useTabs,
			bracketSpacing: formatterApp.bracketSpacing,
			bracketSameLine: formatterApp.bracketSameLine,
			jsxBracketSameLine: formatterApp.jsxBracketSameLine,
			singleQuote: formatterApp.singleQuote,
			trailingComma: 'es5',
			arrowParens: 'always',
			parser: 'babel',
		});

		// Use eslint - Finally
		const linter = new eslint.Linter();
		const lintingErrors = linter.verifyAndFix(formattedCode, {
			parserOptions: {
				ecmaVersion: 6,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			rules: {
				'no-unused-vars': 2,
			},
		});

		return lintingErrors.output;
	};

	const getCodeImportText = (str: string) => {
		const fromIndex = str.lastIndexOf('import');
		let lastPart = str.substring(fromIndex);
		const firstQuoteIndex = lastPart.indexOf("'");
		const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
		lastPart = lastPart.substring(0, secondQuoteIndex + 1);
		return str.slice(0, fromIndex) + lastPart;
	};

	const getCodeMainText = (str: string) => {
		const fromIndex = str.lastIndexOf('import');
		let lastPart = str.substring(fromIndex);
		const firstQuoteIndex = lastPart.indexOf("'");
		const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
		lastPart = lastPart.substring(0, secondQuoteIndex + 1);
		return removeNewLines(formattedCodeLinter({ code: str.split(lastPart).pop() as string }));
	};

	const flattenArray = (arr: any[]) => {
		return arr.reduce((acc, val) => {
			if (val !== null) {
				acc.push(val[0]);
			}
			return acc;
		}, []);
	};

	const cleaningUpExtraQuotes = (arr: any[]) => {
		const packages: any[] = [];

		arr.forEach(el => {
			packages.push(el.match(/'[^']*'|"[^"]*"/g));
		});

		return [...new Set(packages)];
	};

	const gettingOnlyStringImports = (arr: any) => {
		const result: any[] = [];
		[
			...new Set(
				arr
					.replace(/import/g, ';import')
					.split(';')
					.map((el: string) => el.replace(/^\s+|\s+$/g, '')),
			),
		]
			.filter(el => el !== '')
			.forEach((el: any) => {
				if (el.startsWith('import')) {
					result.push(el);
				}
			});

		return result;
	};

	const getArrayImportPackages = (importsCode: any) => {
		const arrImportsString = gettingOnlyStringImports(importsCode);

		return flattenArray(cleaningUpExtraQuotes(arrImportsString)).map((el: any) =>
			el.replace(/['"]+/g, ''),
		);
	};

	const baseSchemaArrayConfigLocal = (arr: any[]) => {
		const result: any[] = [];
		const _arr = [...new Set(arr)].forEach(el => {
			result.push({
				triggerDefault: [],
				triggerExport: [],
				package: el,
			});
		});

		return result;
	};

	const stringCodeToObject = (arrImport: any[], arrPackages: any[]) => {
		arrImport.forEach(imp => {
			arrPackages.forEach(el => {
				if (imp.match(/'(.*?)'/)[1] === el.package) {
					let exportsArr: any[] = [];
					let defaultsArr: any[] = [];
					let checkWord: boolean = true;
					let checkDefault: boolean = true;
					let wordTrigger: any[] = [];

					imp
						.split('')
						.splice(6)
						.forEach((el: any) => {
							if (el === '{') {
								checkDefault = false;
							}
							if (el === '}') {
								if (wordTrigger.length) {
									if (checkDefault) {
										defaultsArr.push(wordTrigger.join(''));
									} else {
										exportsArr.push(wordTrigger.join(''));
									}
								}
								wordTrigger = [];
								checkWord = false;
								checkDefault = true;
							}

							if (wordTrigger.join('') == 'type') {
								wordTrigger = [];
								checkWord = false;
							}

							if (wordTrigger.join('') == 'from') {
								wordTrigger = [];
								checkWord = false;
							}
							if (el === ' ' || el === ',') {
								if (wordTrigger.length) {
									if (checkDefault) {
										defaultsArr.push(wordTrigger.join(''));
									} else {
										exportsArr.push(wordTrigger.join(''));
									}
								}
								wordTrigger = [];
								checkWord = false;
							}
							arrayOfLetters.forEach(word => {
								if (el === word) {
									wordTrigger.push(el);
									checkWord = true;
								}
							});
						});

					el.triggerDefault = [...new Set([...el.triggerDefault, ...defaultsArr])];
					el.triggerExport = [...new Set([...el.triggerExport, ...exportsArr])];
				}
			});
		});
	};

	const removeUnusedArray = (text: any, triggerArr: any[]) => {
		return triggerArr && triggerArr.length
			? triggerArr.filter(word => text.includes(word))
			: triggerArr;
	};

	const sortArrayByField = (array: any[], field: string) => {
		return array.sort(function (a, b) {
			if (a[field] < b[field]) {
				return 0;
			}
			if (a[field] > b[field]) {
				return 1;
			}
			return -1;
		});
	};

	const joinArraysByPackage = (config: any, packageResult: any) => {
		const result: any[] = [];

		config.forEach((conf: any) => {
			const matchingResult = packageResult.find(
				(packageData: any) => packageData.package === conf.package,
			);
			if (matchingResult) {
				result.push({
					triggerDefault: [...new Set([...conf.triggerDefault, ...matchingResult.triggerDefault])],
					triggerExport: [...new Set([...conf.triggerExport, ...matchingResult.triggerExport])],
					package: conf.package,
				});
				packageResult.splice(packageResult.indexOf(matchingResult), 1);
			} else {
				result.push({
					triggerDefault: [...new Set(conf.triggerDefault)],
					triggerExport: [...new Set(conf.triggerExport)],
					package: conf.package,
				});
			}
		});

		return result;
	};

	const convertCode = (arr: any[]) => {
		const str: any[] = [];
		const sortedArray = sortArrayByField(arr, 'package');

		sortedArray.forEach(el => {
			const arrDefault = el.triggerDefault.length
				? `${
						el.triggerDefault.length > 2
							? `${el.triggerDefault.join(', ')}`
							: el.triggerExport.length
							? `${el.triggerDefault[0]},`
							: el.triggerDefault[0]
				  } `
				: '';
			const arrExport = el.triggerExport.length ? `{ ${el.triggerExport.join(', ')} } ` : '';
			if (arrExport || arrDefault) {
				str.push(
					`import ${arrDefault}${arrExport}${
						arrDefault.length || arrExport.length ? 'from ' : ''
					}'${el.package}'`,
				);
			}
		});
		return str.join(';\n');
	};

	//| result

	//! Formatted code
	const formattedCodeText = removeNewLines(formattedCodeLinter({ code: text }));

	//! Get code imports text
	codeTextImport = getCodeImportText(formattedCodeText);

	//! Get code main text
	codeTextMain = getCodeMainText(formattedCodeText);

	//! Array Imports
	const arrayImportsStr = getArrayImportPackages(codeTextImport);

	//! Local Config for package
	configDataFile.push(...baseSchemaArrayConfigLocal(arrayImportsStr));

	//! Result Local Config
	stringCodeToObject(gettingOnlyStringImports(codeTextImport), configDataFile);

	configApp.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	configDataFile.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	//! Finally config
	configDataFile.push(...joinArraysByPackage(configApp, configDataFile));

	//! Result
	const result = convertCode(configDataFile);

	return `${result}\n\n${formattedCodeLinter({ code: formattingMainCode(text), type: 'finally' })}`;
};
