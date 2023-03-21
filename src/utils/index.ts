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

	console.log('✅ configApp    ', configApp);

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

	console.log('✅ codeImportsFile    ', codeImportsFile);

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

	console.log('✅ codeMainFile    ', codeMainFile);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const preCodeFile = getPartCode({
		code: code,
		type: 'precode',
		arrTriggerWordImport: arrTriggerWordImport,
		arrTriggerWordOther: arrTriggerWordOther,
	}) || []

	console.log('✅ preCodeFile    ', preCodeFile     
);
	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const arrImportsObject = convertImportInStringToObjectImports(codeImportsFile, arrOfSymbols);

	console.log('✅ arrImportsObject    ', arrImportsObject);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const allArrayImports = connectImportsFileWithConfigImports(
		codeImportsFile,
		arrImportsObject,
		configApp,
	);

	console.log('✅ allArrayImports    ', allArrayImports);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const arrImportsResult = checkHaveImportInMainCode(codeMainFile, allArrayImports);

	console.log('✅ arrImportsResult    ', arrImportsResult);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const result = finallyCode(arrImportsResult, codeMainFile, preCodeFile);

	console.log('✅ result    ', result);

	return result;
};
