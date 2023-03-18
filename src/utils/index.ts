import { arrOfSymbols, arrTriggerWordImport, arrTriggerWordOther, baseConfig } from './constant';
import {
	checkHaveImportInMainCode,
	connectImportsFileWithConfigImports,
	convertImportInStringToObjectImports,
	copyArray,
	finallyCode,
	getPartCode,
} from './function';

import type { TConfigParams } from './types';

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

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	// console.log('✅ arrImportsResult    ', arrImportsResult);

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
