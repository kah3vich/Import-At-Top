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
* 💡 ru: 

* 💡 en:  
*/

export const activate = (context: vscode.ExtensionContext) => {
	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const statusBar: vscode.StatusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		-8,
	);

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	statusBarInit({
		context,
		statusBar,
	});

	/* 
	* 💡 ru: 

	* 💡 en:  
	*/

	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		/* 
		* 💡 ru: 

		* 💡 en:  
		*/
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			return;
		}

		/* 
		* 💡 ru: 

		* 💡 en:  
		*/

		const document = editor.document;
		const documentText = document.getText();

		/* 
		* 💡 ru: 

		* 💡 en:  
		*/

		const configExtension: TConfigParams[] | undefined = vscode.workspace
			.getConfiguration('import-at-top')
			.get('config');

		/* 
		* 💡 ru: 

		* 💡 en:  
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
		* 💡 ru: 

		* 💡 en:  
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
		* 💡 ru: 

		* 💡 en:  
		*/

		try {
			const result = ImportAtTop(documentText, configExtension || []);
			statusBarAccept({ statusBar });

			statusBarPending({ statusBar });

			/* 
			* 💡 ru: 

			* 💡 en:  
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
* 💡 ru: 

* 💡 en:  
*/

export const deactivate = () => {
	console.log('🌠 deactivate');
};
