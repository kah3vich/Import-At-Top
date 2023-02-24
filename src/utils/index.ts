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

	* 💡 ru: Переменная для хранение объектов с данными из импортов - конфига и файла.

	* 💡 en: 

	*/

	let configDataFile = [];

	/* 

	* 💡 ru: Переменная для хранение исключительно импортов файла.

	* 💡 en: 

	*/

	let codeTextImport = ``;

	/* 

	* 💡 ru: Переменная для хранение исключительно основного кода файла.

	* 💡 en: 

	*/

	let codeTextMain = ``;

	//| ✅ Formatted

	/* 

	* 💡 ru: Функция форматирование кода.
	* code - Код, которые нужно отформатировать через prettier и eslint.
	* type - Тип форматирование, в типе - finally, использует настройки для форматирование из formatterApp.

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

	* 💡 ru: Переменная, в которой получается отформатированый код и переделанный в одну строку без '\n'.
	* formattedCodeLinter - форматирование кода.
	* removeNewLines - переделывает в одну строку без '\n'.

	* 💡 en: 

	*/

	const formattedCodeText = removeNewLines(formattedCodeLinter({ code: text }));

	/* 

	* 💡 ru: Получение только текст с импортами из файлов.
	* getCodeImportText - получение импортов из текста файла.

	* 💡 en: 

	*/

	codeTextImport = getCodeImportText(formattedCodeText);

	/* 

	* 💡 ru: Получение основного кода из текста файла - отформатированный и в одну строку.
	* getCodeMainText - получение основного кода.
	* formattedCodeLinter - форматирование кода.
	* removeNewLines - преобразовывает в одну строку, удаляя '\n'.

	* 💡 en: 

	*/

	codeTextMain = removeNewLines(
		formattedCodeLinter({ code: getCodeMainText(formattedCodeText) as string }),
	);

	/* 

	* 💡 ru: Переменная хранит массив с пакетами из импортов файла.
	* getArrayImportPackages - перебирает и возвращает массив с пакетами импорта из файла.

	* 💡 en: 

	*/

	const arrayImportsStr = getArrayImportPackages(codeTextImport);

	/* 

	* 💡 ru: Удаление из массива с пакетами импортов дубликаты и передача в основную переменную с импортами.
	* baseSchemaArrayConfigLocal - удаление дубликатов из массива.

	* 💡 en: 

	*/

	configDataFile = baseSchemaArrayConfigLocal(arrayImportsStr);

	/* 

	* 💡 ru: Преобразование текста с импортами в массив с данными об импортах.
	* gettingOnlyStringImports - возвращает массив из строк импорта.
	* stringCodeToObject - преобразовывает строки импортов в объект с данными об импорте.

	* 💡 en: 

	*/

	configDataFile = arrImportToObjectImport(
		gettingOnlyStringImports(codeTextImport),
		configDataFile,
	);

	/* 

	* 💡 ru: Перебор значений в массиве конфигурационных данных из основной части кода, на наличия элементов в массиве импортов.
	* removeUnusedArray - проверяет, если ли в текст нужное слово

	* 💡 en: 

	*/

	configApp.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	/* 

	* 💡 ru: Перебор значений в массиве импортов файла из основной части кода, на наличия элементов в массиве импортов.
	* removeUnusedArray - проверяет, если ли в текст нужное слово

	* 💡 en: 

	*/
	console.log('✅ configDataFile 1   ', configDataFile);

	configDataFile.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	console.log('✅ configDataFile 2   ', configDataFile);

	/* 

	* 💡 ru: Соединение массивов конфига и файла.
	* joinArraysByPackage - используя массивы сравнивание и соединяет массивы ( массив конфига и массив полученный из файла )

	* 💡 en: 

	*/

	configDataFile = joinArraysConfigAndImportFile(configApp, configDataFile);

	console.log('✅ configDataFile 3   ', configDataFile);

	/* 

	* 💡 ru: Переменная с конвертированными импортами в строку.
	* convertCode - преобразование импортов из массива в строку.

	* 💡 en: 

	*/

	const result = convertCode(configDataFile);

	/* 

	* 💡 ru: Финальный результат 
	* result - переменная с итоговыми импортами 
	* formattingMainCode - получение основного кода из файла пользователя.
	* formattedCodeLinter - форматирование кода с финальным типом ( дополнительные параметры для форматирование )

	* 💡 en: 

	*/

	return `${result}\n\n${formattedCodeLinter({ code: formattingMainCode(text), type: 'finally' })}`;
};

//| Export

export * from './array';
export * from './other';
export * from './text';
export * from './constant';
export * from './types';
