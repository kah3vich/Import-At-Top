import { consoleLog } from 'src/console';
import * as vscode from 'vscode';
import * as prettier from 'prettier';
import * as eslint from 'eslint';

type ConfigItem = {
	trigger: string;
	packet: string;
	defaultType: boolean;
};

const handlerDefaultType = (type: boolean, direction: 'left' | 'right') => {
	if (!type) {
		if (direction === 'left') {
			return '{ ';
		}
		return ' }';
	}

	return '';
};

const importTop = (text: string, arr: ConfigItem[]) => {
	let result = text;

	// const insertAt = (str: string, sub: string, pos: number) =>
	// 	`${str.slice(0, pos)}, ${sub}${str.slice(pos)}`;

	if (arr.length) {
		arr.forEach(el => {
			if (result.search(el.trigger) > 0) {
				// if (
				// 	result.search(`${handlerDefaultType(el.defaultType, 'right')} from '${el.packet}'`) > 0
				// ) {
				// 	result = insertAt(
				// 		result,
				// 		el.trigger,
				// 		result.search(`${handlerDefaultType(el.defaultType, 'right')} from '${el.packet}'`),
				// 	);
				// } else {
				result =
					`import ${handlerDefaultType(el.defaultType, 'left')}${el.trigger}${handlerDefaultType(
						el.defaultType,
						'right',
					)} from '${el.packet}'\n` + result;
				// }
			}

			result = [...new Set(result.split(`${el.trigger}, `))].join('');
		});
		vscode.window.showInformationMessage('Import At Top - ✅');
	} else {
		vscode.window.showInformationMessage('Import At Top - ❌');
	}

	return result;
};

const Results = (text: string) => {
	//| import
	//| variable
	const code = `

import { HeaderLocationIcon, HeaderSearchIcon } from '@/components/Header/styles';
import { URL_HOST } from '@/config/constants';
import { colors } from '@/helpers/styleColors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CloseSearch from '../../assets/icons/header/close-search.svg';
import { BurgerMenu } from '../BurgerMenu/index';
import { HeaderModalCall } from '../modals/HeaderModal/HeaderModalCall';
import { ModalService } from '../modals/ModalService';
import Overflow from '../Overflow';
import { Typography } from '../Typography/styled';
import { HeaderCountry } from './HeaderCountry';
import { HeaderSearchComponent } from './HeaderSearchComponent';
import { HeaderSelect } from './HeaderSelect';
import {
    ArrowSelectIcon, BurgerMenuIcon, HeaderBtnService, HeaderButton, HeaderCall,
    HeaderCallBlock, HeaderList, HeaderLogo,
    HeaderLogoWrap, HeaderMenu,
    HeaderSearch, HeaderSelectButton, HeaderSelectContainers,
    HeaderSelectWrap, HeaderStyles,
    HeaderWrapper, LocationTitle, LocationTitleBlock
} from './styles';

const _Header: React.FC = () => { useEffect(); const ttt=useControl() };


`;
	const configApp = [
		{
			triggerDefault: ['React'],
			triggerExport: ['useState', 'useId', 'useRef'],
			package: 'react',
		},
		{
			triggerDefault: ['Store'],
			triggerExport: ['useControl'],
			package: 'redux',
		},
	];
	const configDataFile = [];
	let codeTextImport = ``;
	let codeTextMain = ``;
	const arrayOfLetters = [
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	];
	//| function
	//@ts-ignore
	const removeNewLines = str => {
		return str.replace(/\n/g, '');
	};
	//@ts-ignore
	const formattedCodeLinter = code => {
		// Use prettier
		const formattedCode = prettier.format(code, {
			parser: 'babel',
			singleQuote: true,
		});
		// Use eslint
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
	//@ts-ignore
	const getCodeImportText = str => {
		const fromIndex = str.lastIndexOf('import');
		let lastPart = str.substring(fromIndex);
		const firstQuoteIndex = lastPart.indexOf("'");
		const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
		lastPart = lastPart.substring(0, secondQuoteIndex + 1);
		return str.slice(0, fromIndex) + lastPart;
	};
	//@ts-ignore
	const getCodeMainText = str => {
		const fromIndex = str.lastIndexOf('import');
		let lastPart = str.substring(fromIndex);
		const firstQuoteIndex = lastPart.indexOf("'");
		const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
		lastPart = lastPart.substring(0, secondQuoteIndex + 1);
		return removeNewLines(formattedCodeLinter(str.split(lastPart).pop()));
	};
	//@ts-ignore
	const flattenArray = arr => {
		//@ts-ignore
		return arr.reduce((acc, val) => {
			if (val !== null) {
				acc.push(val[0]);
			}
			return acc;
		}, []);
	};
	//@ts-ignore
	const cleaningUpExtraQuotes = arr => {
		//@ts-ignore
		const packages = [];
		//@ts-ignore
		arr.forEach(el => {
			packages.push(el.match(/'[^']*'|"[^"]*"/g));
		});
		//@ts-ignore
		return [...new Set(packages)];
	};
	//@ts-ignore
	const gettingOnlyStringImports = arr => {
		//@ts-ignore
		const result = [];
		[
			...new Set(
				arr
					.replace(/import/g, ';import')
					.split(';') //@ts-ignore
					.map(el => el.replace(/^\s+|\s+$/g, '')),
			),
		]
			.filter(el => el !== '')
			.forEach(el => {
				//@ts-ignore
				if (el.startsWith('import')) {
					result.push(el);
				}
			});
		//@ts-ignore
		return result;
	};
	//@ts-ignore
	const getArrayImportPackages = importsCode => {
		const arrImportsString = gettingOnlyStringImports(importsCode);
		//@ts-ignore
		return flattenArray(cleaningUpExtraQuotes(arrImportsString)).map(el =>
			el.replace(/['"]+/g, ''),
		);
	};
	//@ts-ignore
	const baseSchemaArrayConfigLocal = arr => {
		//@ts-ignore
		const result = [];
		const _arr = [...new Set(arr)].forEach(el => {
			result.push({
				triggerDefault: [],
				triggerExport: [],
				package: el,
			});
		});
		//@ts-ignore
		return result;
	};
	//@ts-ignore
	const stringCodeToObject = (arrImport, arrPackages) => {
		//@ts-ignore
		arrImport.forEach(imp => {
			//@ts-ignore
			arrPackages.forEach(el => {
				if (imp.match(/'(.*?)'/)[1] === el.package) {
					//@ts-ignore
					let exportsArr = []; //@ts-ignore
					let defaultsArr = [];
					let checkWord = true;
					let checkDefault = true;
					//@ts-ignore
					let wordTrigger = [];
					imp
						.split('')
						.splice(6) //@ts-ignore
						.forEach(el => {
							if (el === '{') {
								checkDefault = false;
							}
							if (el === '}') {
								if (wordTrigger.length) {
									if (checkDefault) {
										//@ts-ignore
										defaultsArr.push(wordTrigger.join(''));
									} else {
										//@ts-ignore
										exportsArr.push(wordTrigger.join(''));
									}
								}
								wordTrigger = [];
								checkWord = false;
								checkDefault = true;
							}
							//@ts-ignore
							if (wordTrigger.join('') == 'type') {
								wordTrigger = [];
								checkWord = false;
							}
							//@ts-ignore
							if (wordTrigger.join('') == 'from') {
								wordTrigger = [];
								checkWord = false;
							}
							if (el === ' ' || el === ',') {
								if (wordTrigger.length) {
									if (checkDefault) {
										//@ts-ignore
										defaultsArr.push(wordTrigger.join(''));
									} else {
										//@ts-ignore
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
					//@ts-ignore
					el.triggerDefault = [...new Set([...el.triggerDefault, ...defaultsArr])]; //@ts-ignore
					el.triggerExport = [...new Set([...el.triggerExport, ...exportsArr])];
				}
			});
		});
	};
	//@ts-ignore
	const removeUnusedArray = (text, triggerArr) => {
		return triggerArr && triggerArr.length
			? //@ts-ignore
			  triggerArr.filter(word => text.includes(word))
			: triggerArr;
	};
	//@ts-ignore
	const sortArrayByField = (array, field) => {
		//@ts-ignore
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
	//@ts-ignore
	const joinArraysByPackage = (configApp, packageResult) => {
		//@ts-ignore
		const result = [];
		//@ts-ignore
		configApp.forEach(config => {
			//@ts-ignore
			const matchingResult = packageResult.find(
				//@ts-ignore
				packageData => packageData.package === config.package,
			);
			if (matchingResult) {
				result.push({
					triggerDefault: [
						...new Set([...config.triggerDefault, ...matchingResult.triggerDefault]),
					],
					triggerExport: [...new Set([...config.triggerExport, ...matchingResult.triggerExport])],
					package: config.package,
				});
				packageResult.splice(packageResult.indexOf(matchingResult), 1);
			} else {
				result.push({
					triggerDefault: [...new Set(config.triggerDefault)],
					triggerExport: [...new Set(config.triggerExport)],
					package: config.package,
				});
			}
		});
		// if (packageResult.length) {
		// 	result.push(...packageResult);
		// }
		//@ts-ignore
		return result;
	};
	//@ts-ignore
	const convertCode = arr => {
		//@ts-ignore
		const str = [];
		const sortedArray = sortArrayByField(arr, 'package');
		//@ts-ignore
		sortedArray.forEach(el => {
			const arrDefault = el.triggerDefault.length
				? `${
						el.triggerDefault.length > 2 ? el.triggerDefault.join(', ') : `${el.triggerDefault[0]},`
				  } `
				: '';
			const arrExport = el.triggerExport.length ? `{ ${el.triggerExport.join(', ')} }` : '';
			if (arrExport || arrDefault) {
				str.push(
					`import ${arrDefault}${arrExport}${
						arrDefault.length || arrExport.length ? ' from ' : ''
					}'${el.package}'`,
				);
			}
		});
		// return formattedCodeLinter(str.join(';\n'));
		//@ts-ignore
		return str.join(';\n');
	};
	//| result
	// Formatted code
	const formattedCodeText = removeNewLines(formattedCodeLinter(text));
	// Get code imports text
	codeTextImport = getCodeImportText(formattedCodeText);
	// Get code main text
	codeTextMain = getCodeMainText(formattedCodeText);
	// Array Imports
	const arrayImportsStr = getArrayImportPackages(codeTextImport);
	// Local Config for package
	configDataFile.push(...baseSchemaArrayConfigLocal(arrayImportsStr));
	// Result Local Config
	stringCodeToObject(gettingOnlyStringImports(codeTextImport), configDataFile);
	configApp.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	console.log('configApp    ', configApp);

	configDataFile.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	console.log('configDataFile    ', configDataFile);

	// Finally config
	configDataFile.push(...joinArraysByPackage(configApp, configDataFile));
	// Result

	console.log('configDataFile    ', configDataFile);

	const result = convertCode(configDataFile);
	return `${result}\n\n${formattedCodeLinter(codeTextMain)}`;
	// 	vscode.window.showInformationMessage('Import At Top - âœ…');
	// } else {
	// 	vscode.window.showInformationMessage('Import At Top - â Œ');
	// }
	// return result;
};

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('import-at-top', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const documentText = document.getText();
		console.log('documentText    ', documentText);
		consoleLog('Nano Snippets');
		const result = documentText;

		// const formattedText = prettier.format(documentText, {
		// 	parser: 'babel',
		// 	tabWidth: 2,
		// 	singleQuote: true,
		// 	trailingComma: 'es5',
		// });

		editor.edit(editBuilder => {
			editBuilder.replace(
				new vscode.Range(document.positionAt(0), document.positionAt(documentText.length)),
				result,
			);
		});

		context.subscriptions.push(disposable);
	});
};

export const deactivate = () => {};
export { consoleLog };
