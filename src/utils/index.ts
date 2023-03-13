import type { TConfigParams } from './types';
import { baseConfig } from './constant';
import {
	copyArray,
	getPartCode,
	convertImportInStringToObjectImports,
	connectImportsFileWithConfigImports,
	checkHaveImportInMainCode,
	finallyCode,
} from './function';

/* 

* 💡 ru: Основная функцию для выполнение - Авто импорта

* 💡 en: 

*/

export const ImportAtTop = (code: string, configExtension: TConfigParams[]) => {
	//| ✅ Variable

	const configApp: TConfigParams[] = copyArray(configExtension) || copyArray(baseConfig);

	const codeImportsFile = getPartCode(code, 'import')
		.join('')
		.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
		.replace(/import/g, '; import')
		.split('; ')
		.filter((el: any) => el !== '');

	const codeMainFile = getPartCode(code, 'main');

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile);

	const allArrayImports = connectImportsFileWithConfigImports(
		codeImportsFile,
		arrImportsObject,
		configApp,
	);

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
