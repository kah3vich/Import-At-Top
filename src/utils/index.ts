import * as prettier from 'prettier';
import * as eslint from 'eslint';
import type { TConfigApp, TFormattedCodeLinter, TFormatterApp } from './types';
import { baseConfig, baseFormatter } from './constant';
import {
	getArrayImportPackages,
	baseSchemaArrayConfigLocal,
	stringCodeToObject,
	gettingOnlyStringImports,
	removeUnusedArray,
	joinArraysByPackage,
} from './array';
import { copyArray, removeNewLines } from './other';
import { getCodeImportText, getCodeMainText, convertCode, formattingMainCode } from './text';

/* 

* 💡 ru: Основная функцию для выполнение - Авто импорта

* 💡 en: 

*/

export const ImportAtTop = (
	text: string,
	configExtension: TConfigApp[],
	formatterExtension: TFormatterApp,
) => {
	//| ✅ Variable

	/* 

	* 💡 ru: Переменная для хранения конфигураций импортов - пользовательские конфигурации или базовый конфигурация расширения:
	* configExtension - пользовательские конфигурации.
	* baseConfig - базовый конфигурация расширения.

	* 💡 en: 

	*/

	const configApp: TConfigApp[] = copyArray(configExtension) || copyArray(baseConfig);

	/* 

	* 💡 ru: Переменная для хранения параметров финального форматирование импортов - пользовательские параметры или базовый параметры расширения:
	* formatterExtension - пользовательские параметры.
	* baseFormatter - базовый параметры расширения.

	* 💡 en: 

	*/

	const formatterApp = formatterExtension || baseFormatter;

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	const configDataFile = [];

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	let codeTextImport = ``;

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	let codeTextMain = ``;

	//| ✅ Formatted

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	const formattedCodeLinter = ({ code, type = 'finally' }: TFormattedCodeLinter) => {
		if (type === 'develop') {
			// Use prettier - Develop
			const formattedCode = prettier.format(code, {
				semi: true,
				singleQuote: true,
				trailingComma: 'es5',
				arrowParens: 'always',
				parser: 'babel',
			});

			// Use eslint - Develop
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
		}

		// Use prettier - Finally
		const formattedCode = prettier.format(code, {
			semi: formatterApp.semi,
			printWidth: formatterApp.printWidth,
			tabWidth: formatterApp.tabWidth,
			useTabs: formatterApp.useTabs,
			bracketSpacing: formatterApp.bracketSpacing,
			bracketSameLine: formatterApp.bracketSameLine,
			jsxBracketSameLine: formatterApp.jsxBracketSameLine,
			singleQuote: formatterApp.singleQuote,
			trailingComma: 'es5',
			arrowParens: 'always',
			parser: 'babel',
		});

		// Use eslint - Finally
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

	//| ✅ Main Process

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Formatted code
	const formattedCodeText = removeNewLines(formattedCodeLinter({ code: text }));

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Get code imports text
	codeTextImport = getCodeImportText(formattedCodeText);

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Get code main text
	codeTextMain = removeNewLines(
		formattedCodeLinter({ code: getCodeMainText(formattedCodeText) as string }),
	);

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Array Imports
	const arrayImportsStr = getArrayImportPackages(codeTextImport);

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Local Config for package
	configDataFile.push(...baseSchemaArrayConfigLocal(arrayImportsStr));

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Result Local Config
	stringCodeToObject(gettingOnlyStringImports(codeTextImport), configDataFile);

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	configApp.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	configDataFile.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Finally config
	configDataFile.push(...joinArraysByPackage(configApp, configDataFile));

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	//! Result
	const result = convertCode(configDataFile);

	/* 

	* 💡 ru: 

	* 💡 en: 

	*/

	return `${result}\n\n${formattedCodeLinter({ code: formattingMainCode(text), type: 'finally' })}`;
};
