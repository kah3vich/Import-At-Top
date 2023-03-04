import { ImportAtTop } from './utils';
import { consoleLog } from './utils/other';

import * as vscode from 'vscode';

let statusBar: vscode.StatusBarItem;

export const activate = (context: vscode.ExtensionContext) => {
	// const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

	statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -1000);
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

		const document = editor.document;
		const documentText = document.getText();
		const configExtension: any = vscode.workspace.getConfiguration('import-at-top').get('config');

		try {
			const result = ImportAtTop(documentText, configExtension);

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
