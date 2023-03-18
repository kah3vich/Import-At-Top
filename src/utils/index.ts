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
* 💡 ru: 

* 💡 en:  
*/

export const ImportAtTop = (code: string, configExtension: TConfigParams[]) => {
	//| ✅ Variable

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const configApp: TConfigParams[] = copyArray(configExtension) || copyArray(baseConfig);

	/* 
	* 💡 ru: 

	* 💡 en:  
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
	* 💡 ru: 

	* 💡 en:  
	*/

	const codeMainFile = getPartCode({
		code: code,
		type: 'main',
		arrTriggerWordImport: arrTriggerWordImport,
		arrTriggerWordOther: arrTriggerWordOther,
	});

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile, arrOfSymbols);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const allArrayImports = connectImportsFileWithConfigImports(
		codeImportsFile,
		arrImportsObject,
		configApp,
	);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const result = finallyCode(arrImportsResult, codeMainFile);

	return result;
};
