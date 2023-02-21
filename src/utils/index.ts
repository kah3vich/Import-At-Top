import type { TConfigApp, TFormatterApp } from './types';
import { baseConfig, baseFormatter } from './constant';
import { formattedCodeLinter, formattingMainCode } from './formatting';
import { copyArray, removeNewLines } from './other';
import {
	baseSchemaArrayConfigLocal,
	getArrayImportPackages,
	getCodeImportText,
	getCodeMainText,
	gettingOnlyStringImports,
	joinArraysByPackage,
	removeUnusedArray,
	stringCodeToObject,
} from './array';
import { convertCode } from './text';

export const ImportAtTop = (
	text: string,
	configExtension: TConfigApp[],
	formatterExtension: TFormatterApp,
) => {
	//| Variable

	/*

	Переменная для конфигуруциоранных данных:

	- configExtension - пользовательские данные.
	- baseConfig - базовые данные расширения.

	*/

	const configApp: TConfigApp[] = copyArray(configExtension) || copyArray(baseConfig);

	/*

	Переменная для параметров форматирование финального кода:

	- formatterExtension - пользовательские параметры.
	- baseFormatter - базовые параметры расширения.

	*/

	const formatterApp: TFormatterApp = formatterExtension || baseFormatter;

	/*

	Переменная ( массив ) для хранение данных по полученных импортах.

	*/

	const configDataFile: TConfigApp[] = [];

	/*

	Переменная для временного хранение импорта файла.

	*/

	let codeTextImport: string = ``;

	/*

	Переменная для временного хранение основного кода.

	*/

	let codeTextMain: string = ``;

	//| Main

	/*

	Код в одну строчку и отформатированный:
	- formattedCodeLinter - форматирование кода.
	- removeNewLines - удаление из когда переноса на новую строку '\n'.

	*/
	const formattedCodeText = removeNewLines(
		formattedCodeLinter({ code: text, config: formatterApp }),
	);

	/*

	Часть кода, в которой содержаться только элементы импорта
	- getCodeImportText - отделяет основной код от импортов и возвращает только импорты.

	*/
	codeTextImport = getCodeImportText(formattedCodeText);

	/*

	Часть кода, в которой содержаться только основной код:
	- getCodeMainText - отделяет основной код от импортов и возвращает только основной код.

	*/
	codeTextMain = getCodeMainText(formattedCodeText, formatterApp);

	/*

	Получает массив из пакетов импортов файла:
	- getArrayImportPackages из строки с импортами, преобразовывает её в массив с пакетами импортов.
	{
		triggerDefault: [], 
		triggerExport: [], 
		package: 'react' 
	}

	*/
	const arrayImportsStr = getArrayImportPackages(codeTextImport);

	/*

	Удаление дубликатов в массиве в возврат в переменную с уникальными значениями:
	- baseSchemaArrayConfigLocal - удаляет возможные дублика из массива импортов, который содержит только наименование пакетов импортов файла.

	*/
	configDataFile.push(...baseSchemaArrayConfigLocal(arrayImportsStr));

	//! Result Local Config
	stringCodeToObject(gettingOnlyStringImports(codeTextImport), configDataFile);

	configApp.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	configDataFile.forEach(el => {
		el.triggerExport = removeUnusedArray(codeTextMain, el.triggerExport);
		el.triggerDefault = removeUnusedArray(codeTextMain, el.triggerDefault);
	});

	//! Finally config
	configDataFile.push(...joinArraysByPackage(configApp, configDataFile));

	//! Result
	const result = convertCode(configDataFile);

	return `${result}\n\n${formattedCodeLinter({
		code: formattingMainCode(text),
		type: 'finally',
		config: formatterApp,
	})}`;
};
