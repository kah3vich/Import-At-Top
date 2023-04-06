import { ImportAtTop } from './utils';
import {
	checkArrayConfig,
	checkFormatFile,
	statusBarAccept,
	statusBarError,
	statusBarInit,
	statusBarPending,
} from './utils/function';
import { TConfigParams } from './utils/types';

import * as vscode from 'vscode';

/* 
* 💡 ru: Активация расширения.

* 💡 en: Extension activation.
*/

export const activate = (context: vscode.ExtensionContext) => {
	/* 
	* 💡 ru: Создание статус бара для нижней панели.

	* 💡 en: Creating a status bar for the bottom bar.
	*/

	const statusBar: vscode.StatusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		-8,
	);

	/* 
	* 💡 ru: Инициализация статус бара.

	* 💡 en: Initialization of the bar status.
	*/

	statusBarInit({
		context,
		statusBar,
	});

	/* 
	* 💡 ru: Регистрация основной команды для расширение и внутрение флоу самого расширения.

	* 💡 en: Registration of the main command for the extension and the internal flow of the extension itself.
	*/

	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		/* 
		* 💡 ru: Проверка на активацию редактора.

		* 💡 en: Checking for editor activation.
		*/

		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		/* 
		* 💡 ru: Получение содержание текущего файла.

		* 💡 en: Get the contents of the current file.
		*/

		const document = editor.document;
		const documentText = document.getText();

		/* 
		* 💡 ru: Получение конфига от пользователя из setting.json.

		* 💡 en: Getting config from user from setting.json.
		*/

		const configExtension: TConfigParams[] | undefined = vscode.workspace
			.getConfiguration('import-at-top')
			.get('config');

		/* 
		* 💡 ru: Проверка валидности пользовательского конфига для расширения.

		* 💡 en: Checking the validity of the user config for the extension.
		*/

		if (!checkArrayConfig(configExtension || [])) {
			statusBarError({
				vscode,
				statusBar,
				message: 'The config user has a syntax error (importDefault|importExport|package).',
			});

			statusBarPending({ statusBar });

			return;
		}

		/* 
		* 💡 ru: Проверка текущего файла на валидность.

		* 💡 en: Checking the current file for validity.
		*/

		if (!checkFormatFile(vscode)) {
			statusBarError({
				vscode,
				statusBar,
				message: 'The file format is not suitable for the given extension (js|ts|jsx|tsx).',
			});

			statusBarPending({ statusBar });

			return;
		}

		/* 
		* 💡 ru: Вызов главной функции для обработки всего кода из файла.

		* 💡 en: Calling the main function to process all the code in the file.
		*/

		try {
			const result = ImportAtTop(documentText, configExtension || []);
			statusBarAccept({ statusBar });

			statusBarPending({ statusBar });

			/* 
			* 💡 ru: Возвращение полученного результата из функции в текущей файл.

			* 💡 en: Returning the result from the function to the current file.
			*/

			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(document.positionAt(0), document.positionAt(documentText.length)),
					result,
				);
			});
		} catch (Error) {
			statusBarError({ vscode, statusBar, message: `${Error}` });

			statusBarPending({ statusBar });
		}

		context.subscriptions.push(disposable);
	});
};

/* 
* 💡 ru: Деактивация расширения.

* 💡 en: Deactivate the extension.
*/

export const deactivate = () => {
	console.log('🌠 deactivate');
};
