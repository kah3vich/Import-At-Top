const copyArray = arr => {
	return JSON.parse(JSON.stringify(arr));
};

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

const getPartCode = (code, type) => {
	if (code.includes('\n')) {
		const arrCode = code.replace(/;/g, '').replace(/\n/g, ';').split(';');
		let activeImport = true;
		let activeId = 0;

		copyArray(arrCode).map((el, idArr) => {
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
			return arrCode.slice(0, activeId).filter(el => el !== '');
		}
		return arrCode.slice(activeId).join('\n');
	}
	return new Error('code not n');
};

const code = `
import { toggleGift } from '../app';
import 'app'
import React, { React as NotReact, Old } from 'react'
import {
  getLocalStorage,
  getQueryParameter,
  getWordEnd,
  priceFormat,
  updateCartValue,
  renderMenuHamburgerEvents,
  addScrollListener,
  addNewProduct,
  deleteUserData,
  hiddenUserInterface,
  geMobileType,
  renderPasswordRecoveryModal,
  renderModal,
  closeModal,
  stopListNotification,
  isMobileScreenSize
} from './functions';
import { USER, CART, MENU, DADATA } from './variable';
import notification from './notification';
import type { route } from '../app/route';
import  { Router } from '../app/route';
import '../js/plugins/device';
import * from './hello'
import {
  STORAGE_CART,
  STORAGE_COUPONS,
  STORAGE_NEW_ORDER,
  STORAGE_USER_BONUSES,
  STORAGE_USER_LEVEL,
  STORAGE_USER_NAME
} from '../lib/storage';
import * as react from 'react'
import { Calculate } from './events';
import homeIcon from '../images/menu/home.png';
import { canMakePaymentGooglePay } from './googlePay';

let confirmCreateNewOrder = Old;
let tooltipsterReady = NotReact;
let scrollListener = route;


`;

const configExtension = [
	{
		importDefault: ['React'],
		importExport: ['useState'],
		package: 'react',
	},
	{
		importDefault: [],
		importExport: ['createStory'],
		package: 'redux',
	},
];

const removeDuplicates = (arr, key) => {
	const seen = {};
	return arr.filter(item => {
		const k = item[key];
		return seen.hasOwnProperty(k) ? false : (seen[k] = true);
	});
};

const arrayOfLetters = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'*$'.split(''),
];

const convertImportInStringToObjectImports = arrImport => {
	const predResult = [];

	const arrImport_ = copyArray(arrImport);

	arrImport_.forEach(elemImport => {
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

	arrImport_.forEach(elemImport => {
		result.forEach(elemObject => {
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
					let exportsArr = [];
					let defaultsArr = [];
					let wordTrigger = [];

					let checkWord = true;
					let checkDefault = true;
					let activeWordAs = false;

					elemImport
						.replace('import type ', '')
						.slice(0, elemImport.indexOf(' from ') - 7)
						.replace(" from '", '')
						.split('')
						.forEach(el => {
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
					let exportsArr = [];
					let defaultsArr = [];
					let wordTrigger = [];

					let checkWord = true;
					let checkDefault = true;
					let activeWordAs = false;

					elemImport
						.replace('import ', '')
						.slice(0, elemImport.indexOf(' from ') - 7)
						.replace(" from '", '')
						.split('')
						.forEach(el => {
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
	.filter(el => el !== '');

const codeMainFile = getPartCode(code, 'main');

const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile);

const connectImportsFileWithConfigImports = (arrImports, arrConfig) => {
	const arrImports_ = copyArray(arrImports);
	const arrConfig_ = copyArray(arrConfig);

	arrImports_.forEach(elemImport => {
		arrConfig_.forEach(elemConfig => {
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

const allArrayImports = connectImportsFileWithConfigImports(arrImportsObject, configExtension);

const removeUnusedArray = (text, triggerArr) => {
	if (triggerArr.length) {
		return triggerArr.filter(word => {
			if (word.includes(' as ')) {
				return text.includes(word.split(' as ')[1]);
			}
			return text.includes(word);
		});
	}
	return triggerArr;
};

const checkHaveImportInMainCode = (codeMain, arrImports) => {
	const arrImports_ = copyArray(arrImports);

	if (arrImports_.length) {
		arrImports_.forEach(elemImport => {
			elemImport.importExport = removeUnusedArray(codeMain, elemImport.importExport);
			elemImport.importDefault = removeUnusedArray(codeMain, elemImport.importDefault);
			elemImport.importType = removeUnusedArray(codeMain, elemImport.importType);
		});
	}

	return arrImports_.filter(elemImport => {
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

const convertImportsArrObjectToArrStringImport = arrImports => {
	const result = [];
	const arrImports_ = copyArray(arrImports);

	arrImports_.forEach(elemImport => {
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
			result.push(`import { ${elemImport.importExport.join(', ')} } from '${elemImport.package}'`);
		}
	});

	return result;
};

const sortImportsArray = arrImports => {
	const result = [];
	copyArray(arrImports).forEach(elemImport => {
		if (
			elemImport.includes('import ') &&
			elemImport.includes(' from ') &&
			!elemImport.includes('import type ') &&
			!elemImport.includes('import * as ') &&
			!elemImport.includes('import * ')
		) {
			result.push(elemImport);
		}
	});

	result.push('');

	copyArray(arrImports).forEach(elemImport => {
		if (elemImport.includes('import type ')) {
			result.push(elemImport);
		}
	});

	result.push('');

	copyArray(arrImports).forEach(elemImport => {
		if (elemImport.includes('import * from ')) {
			result.push(elemImport);
		}
	});

	result.push('');

	copyArray(arrImports).forEach(elemImport => {
		if (elemImport.includes('import * as ')) {
			result.push(elemImport);
		}
	});

	result.push('');

	copyArray(arrImports).forEach(elemImport => {
		if (
			elemImport.includes('import ') &&
			!elemImport.includes(' from ') &&
			!elemImport.includes('import type ') &&
			!elemImport.includes('import * as ') &&
			!elemImport.includes('import * ')
		) {
			result.push(elemImport);
		}
	});

	return result;
};

const finallyCode = (arrImports, codeMain) => {
	const result = sortImportsArray(convertImportsArrObjectToArrStringImport(copyArray(arrImports)));

	return `${result.join('\n')}\n\n${codeMain}`;
};

const result = finallyCode(arrImportsResult, codeMainFile);

console.log('✅ result    ', result);
