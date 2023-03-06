import { ImportAtTop } from './utils';
import { consoleLog } from './utils/other';

import * as vscode from 'vscode';

let statusBar: vscode.StatusBarItem;

export const activate = (context: vscode.ExtensionContext) => {
	// const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

	statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -8);
	statusBar.command = 'import-at-top';
	statusBar.name = '⌛ Import At Top';
	statusBar.text = '⌛ Import At Top';
	context.subscriptions.push(statusBar);
	statusBar.show();

	// statusBar.text = '⌛ Import At Top';
	// statusBar.show();

	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const currentlyOpenTabfilePath = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.document.fileName
			: '';

		// const checkedFormatFile = (str: string) => {
		// 	const arrFormat = ['js', 'ts', 'tsx', 'jsx'];
		// 	let check = false;

		// 	arrFormat.forEach(format => {
		// 		if (str.split('.')[1] === format) {
		// 			check = true;
		// 		}
		// 	});

		// 	return check;
		// };

		// if (!checkedFormatFile(currentlyOpenTabfilePath)) {
		// 	return new Error('Error format file');
		// }

		console.log('✅ currentlyOpenTabfilePath    ', currentlyOpenTabfilePath);

		const document = editor.document;
		const documentText = document.getText();
		const configExtension: any = vscode.workspace.getConfiguration('import-at-top').get('config');

		function checkArrayConfig(arr: any[]) {
			const expectedKeys: any = ['importDefault', 'importExport', 'package'];
			let check = true;
			for (const obj of arr) {
				for (const key in obj) {
					if (!expectedKeys.includes(key)) {
						check = false;
					}
					if (key === 'importDefault' || key === 'importExport') {
						if (!Array.isArray(obj[key])) {
							check = false;
						}
						for (const item of obj[key]) {
							if (typeof item !== 'string') {
								check = false;
							}
						}
					}
					if (key === 'package') {
						if (typeof obj[key] !== 'string') {
							check = false;
						}
					}
				}
			}
			return check;
		}

		if (!checkArrayConfig(configExtension)) {
			vscode.window.showInformationMessage(`❌ Import At Top: ${'Config err'}`);

			statusBar.text = '❌ Import At Top';
			setTimeout(() => {
				statusBar.text = '⌛ Import At Top';
			}, 1000);
			consoleLog(`- Import At Top ${'Config err'}`, 'err');
			return;
		}

		try {
			const result = ImportAtTop(documentText, configExtension);
			// const result = documentText;

			statusBar.text = '✅ Import At Top';
			setTimeout(() => {
				statusBar.text = '⌛ Import At Top';
			}, 1000);

			// showNotification('✅ - Import At Top');

			// vscode.window.showInformationMessage('✅ - Import At Top');
			consoleLog(`- Import At Top`, 'log');
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(document.positionAt(0), document.positionAt(documentText.length)),
					result,
				);
			});
		} catch (Error) {
			vscode.window.showInformationMessage(`❌ Import At Top: ${Error}`);

			statusBar.text = '❌ Import At Top';
			setTimeout(() => {
				statusBar.text = '⌛ Import At Top';
			}, 1000);
			consoleLog(`- Import At Top ${Error}`, 'err');
		}
		context.subscriptions.push(disposable);
	});
};

export const deactivate = () => {};
