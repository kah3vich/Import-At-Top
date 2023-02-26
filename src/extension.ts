import * as vscode from 'vscode';
import { ImportAtTop } from './utils';
import { consoleLog } from './utils/other';

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const documentText = document.getText();
		const configExtension: any = vscode.workspace.getConfiguration('import-at-top').get('config');

		const formatterConfigExtension: any = vscode.workspace
			.getConfiguration('import-at-top')
			.get('formatter');

		try {
			const result = ImportAtTop(documentText, configExtension);

			vscode.window.showInformationMessage('✅ - Import At Top');
			consoleLog(`- Import At Top`, 'log');
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(document.positionAt(0), document.positionAt(documentText.length)),
					result,
				);
			});
		} catch (Error) {
			vscode.window.showInformationMessage(`❌ - Import At Top: ${Error}`);
			consoleLog(`- Import At Top   ${Error}`, 'err');
		}

		context.subscriptions.push(disposable);
	});
};

export const deactivate = () => {};
