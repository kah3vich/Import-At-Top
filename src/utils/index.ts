import * as prettier from 'prettier';
import * as eslint from 'eslint';
import type { TConfigApp, TFormattedCodeLinter, TFormatterApp } from './types';
import { baseConfig, baseFormatter } from './constant';
import {
	getArrayImportPackages,
	baseSchemaArrayConfigLocal,
	arrImportToObjectImport,
	gettingOnlyStringImports,
	removeUnusedArray,
	joinArraysConfigAndImportFile,
} from './array';
import { copyArray, removeNewLines } from './other';
import { getCodeImportText, getCodeMainText, convertCode, formattingMainCode } from './text';

/* 

* 💡 ru: Основная функцию для выполнение - Авто импорта

* 💡 en: 

*/

export const ImportAtTop = (code: string, configExtension: TConfigApp[]) => {
	//| ✅ Variable

	const copyArray = (arr: any[]) => {
		return JSON.parse(JSON.stringify(arr));
	};

	// const configApp: TConfigApp[] = copyArray(configExtension) || copyArray(baseConfig);
	const configApp: TConfigApp[] = copyArray(baseConfig);

	const arrTriggerWordImport = ['import ', ' from '];
	const arrTriggerWordOther = [
		'export ',
		'const ',
		'let ',
		'var ',
		'function ',
		'switch ',
		'(',
		' () ',
		'enum ',
		'interface ',
		'new ',
		'class ',
		'return ',
		'true',
		'false',
		' = ',
		' => ',
		' == ',
		' != ',
		' === ',
		' !== ',
		...'abcdefghijklmnopqrstuvwxyz'
			.toLocaleLowerCase()
			.split('')
			.map(el => `type ${el}`),
		...'abcdefghijklmnopqrstuvwxyz'
			.toLocaleUpperCase()
			.split('')
			.map(el => `type ${el}`),
	];

	const getPartCode = (code: any, type: any) => {
		if (code.includes('\n')) {
			const arrCode = code.replace(/;/g, '').replace(/\n/g, ';').split(';');
			let activeImport = true;
			let activeId = 0;

			copyArray(arrCode).map((el: any, idArr: any) => {
				arrTriggerWordImport.forEach(wordImport => {
					arrTriggerWordOther.forEach(wordOther => {
						if (activeImport && el.includes(wordImport)) {
							activeId = idArr + 1;
							activeImport = true;
						}
						if (el.includes(wordOther)) {
							activeImport = false;
						}
					});
				});
			});

			if (type === 'import') {
				return arrCode.slice(0, activeId).filter((el: any) => el !== '');
			}
			return arrCode.slice(activeId).join('\n');
		}
		return new Error('code not n');
	};

	// const configExtension = [
	// 	{
	// 		importDefault: ['React'],
	// 		importExport: ['useState'],
	// 		package: 'react',
	// 	},
	// 	{
	// 		importDefault: [],
	// 		importExport: ['createStory'],
	// 		package: 'redux',
	// 	},
	// ];

	const removeDuplicates = (arr: any, key: any) => {
		const seen: any = {};
		return arr.filter((item: any) => {
			const k = item[key];
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		});
	};

	const arrayOfLetters = [
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
		...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
		...'*$'.split(''),
	];

	const convertImportInStringToObjectImports = (arrImport: any) => {
		const predResult: any[] = [];

		const arrImport_ = copyArray(arrImport);

		arrImport_.forEach((elemImport: any) => {
			predResult.push({
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: [],
				importAll: false,
				importAsAll: '',
				package: elemImport.replace('"', "'").match(/'(.*?)'/)[1],
			});
		});

		const result = copyArray(removeDuplicates(predResult, 'package'));

		arrImport_.forEach((elemImport: any) => {
			result.forEach((elemObject: any) => {
				if (elemImport.replace('"', "'").match(/'(.*?)'/)[1] === elemObject.package) {
					if (elemImport.includes('import * from ')) {
						elemObject.importAll = true;
					}

					if (elemImport.includes('import * as ') && elemImport.includes(' from ')) {
						elemObject.importAsAll = elemImport
							.replace('import ', '')
							.slice(0, elemImport.indexOf(' from ') - 7);
					}

					if (
						elemImport.includes('import type ') &&
						elemImport.includes(' from ') &&
						!elemImport.includes('import * ') &&
						!elemImport.includes('import * as ')
					) {
						let exportsArr: any = [];
						let defaultsArr: any = [];
						let wordTrigger: any = [];

						let checkWord = true;
						let checkDefault = true;
						let activeWordAs = false;

						elemImport
							.replace('import type ', '')
							.slice(0, elemImport.indexOf(' from ') - 7)
							.replace(" from '", '')
							.split('')
							.forEach((el: any) => {
								if (el === '{') {
									checkDefault = false;
									activeWordAs = true;
								}
								if (el === '}') {
									if (wordTrigger.length) {
										if (checkDefault) {
											defaultsArr.push(wordTrigger.join('').trim());
										} else {
											exportsArr.push(wordTrigger.join('').trim());
										}
									}
									wordTrigger = [];
									checkWord = false;
									checkDefault = true;
								}

								if (wordTrigger.join('') == 'from') {
									wordTrigger = [];
									checkWord = false;
								}

								if (el === ' ') {
									if (activeWordAs) {
										wordTrigger.push(el);
										checkWord = true;
									} else {
										if (wordTrigger.length) {
											if (checkDefault) {
												defaultsArr.push(wordTrigger.join('').trim());
											} else {
												exportsArr.push(wordTrigger.join('').trim());
											}
										}
										wordTrigger = [];
										checkWord = false;
									}
								}
								if (el === ',') {
									if (wordTrigger.length) {
										if (checkDefault) {
											defaultsArr.push(wordTrigger.join('').trim());
										} else {
											exportsArr.push(wordTrigger.join('').trim());
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
						elemObject.importType = exportsArr;
					}

					if (
						elemImport.includes('import ') &&
						elemImport.includes(' from ') &&
						!elemImport.includes('import type ') &&
						!elemImport.includes('import * as ')
					) {
						let exportsArr: any = [];
						let defaultsArr: any = [];
						let wordTrigger: any = [];

						let checkWord = true;
						let checkDefault = true;
						let activeWordAs = false;

						elemImport
							.replace('import ', '')
							.slice(0, elemImport.indexOf(' from ') - 7)
							.replace(" from '", '')
							.split('')
							.forEach((el: any) => {
								if (el === '{') {
									checkDefault = false;
									activeWordAs = true;
								}
								if (el === '}') {
									if (wordTrigger.length) {
										if (checkDefault) {
											defaultsArr.push(wordTrigger.join('').trim());
										} else {
											exportsArr.push(wordTrigger.join('').trim());
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

								if (el === ' ') {
									if (activeWordAs) {
										wordTrigger.push(el);
										checkWord = true;
									} else {
										if (wordTrigger.length) {
											if (checkDefault) {
												defaultsArr.push(wordTrigger.join('').trim());
											} else {
												exportsArr.push(wordTrigger.join('').trim());
											}
										}
										wordTrigger = [];
										checkWord = false;
									}
								}
								if (el === ',') {
									if (wordTrigger.length) {
										if (checkDefault) {
											defaultsArr.push(wordTrigger.join('').trim());
										} else {
											exportsArr.push(wordTrigger.join('').trim());
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
						elemObject.importDefault = defaultsArr;
						elemObject.importExport = exportsArr;
					}

					if (
						elemImport.includes('import ') &&
						!elemImport.includes(' from ') &&
						!elemImport.includes('import type ')
					) {
						elemObject.importOnly = true;
					}
				}
			});
		});

		return result;
	};

	const codeImportsFile = getPartCode(code, 'import')
		.join('')
		.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
		.replace(/import/g, '; import')
		.split('; ')
		.filter((el: any) => el !== '');

	const codeMainFile = getPartCode(code, 'main');

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile);

	const connectImportsFileWithConfigImports = (arrImports: any, arrConfig: any) => {
		const arrImports_ = copyArray(arrImports);
		const arrConfig_ = copyArray(arrConfig);

		arrImports_.forEach((elemImport: any) => {
			arrConfig_.forEach((elemConfig: any) => {
				if (elemImport.package === elemConfig.package) {
					elemImport.importDefault = [
						...new Set([...elemImport.importDefault, ...elemConfig.importDefault]),
					];
					elemImport.importExport = [
						...new Set([...elemImport.importExport, ...elemConfig.importExport]),
					];
				} else {
					arrImports_.push({
						importDefault: elemConfig.importDefault || [],
						importExport: elemConfig.importExport || [],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: elemConfig.package,
					});
				}
			});
		});

		return removeDuplicates(arrImports_, 'package');
	};

	const allArrayImports = connectImportsFileWithConfigImports(arrImportsObject, configApp);

	const removeUnusedArray = (text: any, triggerArr: any) => {
		if (triggerArr.length) {
			return triggerArr.filter((word: any) => {
				if (word.includes(' as ')) {
					return text.includes(word.split(' as ')[1]);
				}
				return text.includes(word);
			});
		}
		return triggerArr;
	};

	const checkHaveImportInMainCode = (codeMain: any, arrImports: any) => {
		const arrImports_ = copyArray(arrImports);

		if (arrImports_.length) {
			arrImports_.forEach((elemImport: any) => {
				elemImport.importExport = removeUnusedArray(codeMain, elemImport.importExport);
				elemImport.importDefault = removeUnusedArray(codeMain, elemImport.importDefault);
				elemImport.importType = removeUnusedArray(codeMain, elemImport.importType);
			});
		}

		return arrImports_.filter((elemImport: any) => {
			if (
				!(
					elemImport.importDefault.length === 0 &&
					elemImport.importExport.length === 0 &&
					elemImport.importOnly === false &&
					elemImport.importType.length === 0 &&
					elemImport.importAll === false &&
					elemImport.importAsAll === ''
				)
			) {
				return elemImport;
			}
		});
	};

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	const convertImportsArrObjectToArrStringImport = (arrImports: any[]) => {
		const result: any[] = [];
		const arrImports_ = copyArray(arrImports);

		arrImports_.forEach((elemImport: any) => {
			if (elemImport.importOnly) {
				result.push(`import '${elemImport.package}'`);
			}
			if (elemImport.importAll) {
				result.push(`import * from '${elemImport.package}'`);
			}
			if (elemImport.importAsAll) {
				result.push(`import ${elemImport.importAsAll} from '${elemImport.package}'`);
			}
			if (elemImport.importType.length) {
				result.push(
					`import type { ${elemImport.importType.join(', ')} } from '${elemImport.package}'`,
				);
			}
			if (elemImport.importDefault.length && elemImport.importExport.length) {
				result.push(
					`import ${
						elemImport.importDefault.length < 1
							? elemImport.importDefault.join(', ')
							: `${elemImport.importDefault[0]}, `
					}{ ${elemImport.importExport.join(', ')} } from '${elemImport.package}'`,
				);
			} else if (elemImport.importDefault.length) {
				result.push(`import ${elemImport.importDefault.join(', ')} from '${elemImport.package}'`);
			} else if (elemImport.importExport.length) {
				result.push(
					`import { ${elemImport.importExport.join(', ')} } from '${elemImport.package}'`,
				);
			}
		});

		return result;
	};

	const sortImportsArray = (arrImports: any) => {
		const result = [];
		let count = 0;
		copyArray(arrImports).forEach((elemImport: any) => {
			if (
				elemImport.includes('import ') &&
				elemImport.includes(' from ') &&
				!elemImport.includes('import type ') &&
				!elemImport.includes('import * as ') &&
				!elemImport.includes('import * ')
			) {
				result.push(elemImport);
				count += 1;
			}
		});

		if (count) {
			result.push('');
			count = 0;
		}

		copyArray(arrImports).forEach((elemImport: any) => {
			if (elemImport.includes('import type ')) {
				result.push(elemImport);
				count += 1;
			}
		});

		if (count) {
			result.push('');
			count = 0;
		}

		copyArray(arrImports).forEach((elemImport: any) => {
			if (elemImport.includes('import * from ')) {
				result.push(elemImport);
				count += 1;
			}
		});

		if (count) {
			result.push('');
			count = 0;
		}

		copyArray(arrImports).forEach((elemImport: any) => {
			if (elemImport.includes('import * as ')) {
				result.push(elemImport);
				count += 1;
			}
		});

		if (count) {
			result.push('');
			count = 0;
		}

		copyArray(arrImports).forEach((elemImport: any) => {
			if (
				elemImport.includes('import ') &&
				!elemImport.includes(' from ') &&
				!elemImport.includes('import type ') &&
				!elemImport.includes('import * as ') &&
				!elemImport.includes('import * ')
			) {
				result.push(elemImport);
				count += 1;
			}
		});

		return result;
	};

	const finallyCode = (arrImports: any, codeMain: any) => {
		const result = sortImportsArray(
			convertImportsArrObjectToArrStringImport(copyArray(arrImports)),
		);

		return `${result.join('\n')}${codeMain.split('\n')[0] === '' ? '\n' : ''}${codeMain}`;
	};

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
