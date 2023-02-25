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
	'(',
	'enum ',
	'interface ',
	'class ',
	'return ',
	'true',
	'false',
	' = ',
	' == ',
	' != ',
	' === ',
	' !== ',
	...[
		...'abcdefghijklmnopqrstuvwxyz'
			.toLocaleLowerCase()
			.split('')
			.map(el => `type ${el}`),
		...'abcdefghijklmnopqrstuvwxyz'
			.toLocaleUpperCase()
			.split('')
			.map(el => `type ${el}`),
	],
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
		return arrCode.slice(activeId).filter(el => el !== '');
	}
	return new Error('code not n');
};

const code = `
import { toggleGift } from '../app';
import 'app'
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
import { route } from '../app/route';
import { Router } from '../app/route';
import '../js/plugins/device';

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

let confirmCreateNewOrder = true;
let tooltipsterReady = false;
let scrollListener = false;


`;

const removeDuplicates = (arr, key) => {
	let lookup = {};
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		if (!lookup[item[key]]) {
			result.push(item);
			lookup[item[key]] = true;
		}
	}
	return result;
};

const convertImportInStringToObjectImports = arrImport => {
	const result = [];
	const predResult = [];

	arrImport.forEach(elemImport => {
		predResult.push({
			importDefault: [],
			importExport: [],
			importOnly: false,
			importType: [],
			importAs: [],
			importAsAll: '',
			package: elemImport.replace('"', "'").match(/'(.*?)'/)[1],
		});
	});

	arrImport.forEach(elemImport => {
		removeDuplicates(predResult, 'package').forEach(elemObject => {
			if (elemImport.replace('"', "'").match(/'(.*?)'/)[1] === elemObject.package) {
				if (elemImport.includes('import') && !elemImport.includes('from')) {
					result.push({
						importDefault: elemObject.importDefault || [],
						importExport: elemObject.importExport || [],
						importOnly: elemObject.importOnly || false,
						importType: elemObject.importType || [],
						importAs: elemObject.importAs || [],
						importAsAll: elemObject.importAsAll || '',
						package: elemObject.package,
					});
				}

				if (elemImport.includes('import * as ') && elemImport.includes(' from ')) {
					result.push({
						importDefault: elemObject.importDefault || [],
						importExport: elemObject.importExport || [],
						importOnly: elemObject.importOnly || false,
						importType: elemObject.importType || [],
						importAs: elemObject.importAs || [],
						importAsAll: elemImport
							.replace('import * as ', '')
							.slice(0, elemImport.indexOf(' from ')),
						package: elemObject.package,
					});
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

console.log('✅ arrImportsObject    ', arrImportsObject);
