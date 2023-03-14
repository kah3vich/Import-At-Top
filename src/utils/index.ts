import type { TConfigParams, TImportElement } from './types';
import { arrOfSymbols, arrTriggerWordImport, arrTriggerWordOther, baseConfig } from './constant';
import {
	checkTriggerImportConfigInMainCode,
	connectImportsFileWithConfigImports,
	convertImportInStringToObjectImports,
	copyArray,
	getPartCode,
	removeDuplicates,
} from './function';

/*
 * 💡 ru: Основная функцию для выполнение - Авто импорта
 * 💡 en:
 */

export const ImportAtTop = (code: string, configExtension: TConfigParams[]) => {
	//| ✅ Variable

	const configApp: TConfigParams[] = copyArray(configExtension) || copyArray(baseConfig);

	const codeImportsFile = getPartCode({
		code: code,
		type: 'import',
		arrTriggerWordImport: arrTriggerWordImport,
		arrTriggerWordOther: arrTriggerWordOther,
	})
		.join('')
		.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
		.replace(/import/g, '; import')
		.split('; ')
		.filter((el: any) => el !== '');

	const codeMainFile = getPartCode({
		code: code,
		type: 'main',
		arrTriggerWordImport: arrTriggerWordImport,
		arrTriggerWordOther: arrTriggerWordOther,
	});

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile, arrOfSymbols);

	const allArrayImports = connectImportsFileWithConfigImports(
		codeImportsFile,
		arrImportsObject,
		configApp,
	);

	const checkingPresenceElementInText = (text: any, word: any) => {
		//! fix

		const arrRight = [
			...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
			...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
			...'1234567890_$@~'.split(''),
		];

		const arrLeft = ['.'];

		let result: boolean = false;

		const test = (elem: any, _word: string) => {
			let active = true;
			const arrLeft_ = [...arrRight, ...arrLeft];

			arrLeft_.forEach(el => {
				if (elem.includes(`${el}${_word}`)) {
					active = false;
				}
			});

			arrRight.forEach(el => {
				if (elem.includes(`${_word}${el}`)) {
					active = false;
				}
			});

			return active;
		};

		text.split('\n').forEach((el: any) => {
			if (el.includes(word.replace('* as ', ''))) {
				if (test(el, word.replace('* as ', ''))) {
					result = true;
				}
			}
		});

		return result ? word : '';
	};

	const removeUnusedArray = (text: any, triggerArr: any) => {
		const result: any = [];

		//! fix

		const arrRight = [
			...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
			...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
			...'1234567890_$@~'.split(''),
		];

		const arrLeft = ['.'];

		const test = (elem: any, _word: string) => {
			let active = true;
			const arrLeft_ = [...arrRight, ...arrLeft];

			arrLeft_.forEach(el => {
				// console.log('✅ `${el}${_word}`    ', `${el}${_word}`);
				// console.log('✅ result.includes(`${el}${_word}`)    ', elem.includes(`${el}${_word}`));

				if (elem.includes(`${el}${_word}`)) {
					active = false;
				}
			});

			arrRight.forEach(el => {
				if (elem.includes(`${_word}${el}`)) {
					active = false;
				}
			});

			return active;
		};

		triggerArr.forEach((word: any) => {
			if (word.includes(' as ')) {
				const word_ = word.split(' as ')[1];
				text.split('\n').forEach((el: any) => {
					if (el.includes(word_)) {
						if (test(el, word_)) {
							result.push(word);
						}
					}
				});
			} else {
				text.split('\n').forEach((el: any) => {
					if (el.includes(word)) {
						if (test(el, word)) {
							result.push(word);
						}
					}
				});
			}
		});

		return [...new Set(result)];
	};

	const checkHaveImportInMainCode = (codeMain: any, arrImports: any) => {
		const arrImports_ = copyArray(arrImports);

		if (arrImports_.length) {
			arrImports_.forEach((elemImport: any) => {
				elemImport.importExport = removeUnusedArray(codeMain, elemImport.importExport);
				elemImport.importDefault = removeUnusedArray(codeMain, elemImport.importDefault);
				elemImport.importType = removeUnusedArray(codeMain, elemImport.importType);
				elemImport.importAsAll = checkingPresenceElementInText(codeMain, elemImport.importAsAll);
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

		if (count) {
			result.push('');
			count = 0;
		}

		return result;
	};

	const reductionCodeImport = (text: any) => {
		const result = [];

		if (
			!(
				text.includes('{') &&
				text.includes('}') &&
				text.slice(text.indexOf('{') + 1, text.indexOf('}')).length > 50
			)
		) {
			return text;
		}

		result.push(text.slice(0, text.indexOf('{') + 1).trim());

		result.push(
			...text
				.slice(text.indexOf('{') + 1, text.indexOf('}') - 1)
				.trim()
				.split(', ')
				.map((el: any) => `    ${el},`),
		);
		result.push(text.slice(text.indexOf('}') - 1).trim());

		return result;
	};

	function removeEmptyAndStop(array: any) {
		let result = [];
		let checked = false;
		for (let i = 0; i < array.length; i++) {
			if ((array[i] === '' || array[i] === '\r') && !checked) {
				continue;
			} else {
				checked = true;
				result.push(array[i]);
			}
		}
		return result;
	}

	const finallyCode = (arrImports: any, codeMain: any) => {
		const result: any = sortImportsArray(
			convertImportsArrObjectToArrStringImport(copyArray(arrImports)),
		);

		result.forEach((el: any, i: any) => {
			if (
				el.includes('{') &&
				el.includes('}') &&
				el.slice(el.indexOf('{') + 1, el.indexOf('}')).length > 50
			) {
				result[i] = [...reductionCodeImport(el)] as any;
			}
		});

		return `${[]
			.concat(...result)
			.map((el: any) => (el.includes(' from ') || el.includes("import '") ? `${el};` : el))
			.join('\n')}\n${removeEmptyAndStop(codeMain.split('\n')).join('\n')}`;
	};

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
