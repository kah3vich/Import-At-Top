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
* 💡 ru: Основная функция расширение.

* 💡 en: Main function extension.
*/

export const ImportAtTop = (code: string, configExtension: TConfigParams[]) => {
	//| ✅ Variable

	/* 
	* 💡 ru: Переменная для конфига от пользователя или базовый расширения.

	* 💡 en: Variable for config from user or base extension.
	*/

	const configApp: TConfigParams[] = copyArray(configExtension || baseConfig);

	//| ✅ Main

	/* 
	* 💡 ru: Получаем часть кода, которая содержит только импорты.

	* 💡 en: We get a part of the code that contains only imports.
	*/

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
		.filter((el: string) => el !== '');

	/* 
	* 💡 ru: Получаем часть кода, которая содержит только основу.

	* 💡 en: We get a part of the code that contains only the base.
	*/

	const codeMainFile = getPartCode({
		code: code,
		type: 'main',
		arrTriggerWordImport: arrTriggerWordImport,
		arrTriggerWordOther: arrTriggerWordOther,
	});

	/* 
	* 💡 ru: Получение массива с данными из импортов - их тип и пакет.

	* 💡 en: Getting an array with data from imports - their type and package.
	*/

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile, arrOfSymbols);

	/* 
	* 💡 ru: Соединение массива с данными об импортах из файла, с кофигом.

	* 💡 en: Connecting an array with data about imports from a file, with a config.
	*/

	const allArrayImports = connectImportsFileWithConfigImports(
		codeImportsFile,
		arrImportsObject,
		configApp,
	);

	/* 
	* 💡 ru: Проверка на валидность импортов в массиве по отношение к основному коду файла.

	* 💡 en: Checking the validity of imports in the array in relation to the main code of the file.
	*/

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	/* 
	* 💡 ru: Финальная сборка кода, в котором соединяют полученные импорты и основной код.

	* 💡 en: The final assembly of the code, in which the received imports and the main code are connected.
	*/

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
