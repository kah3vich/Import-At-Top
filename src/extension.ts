import * as vscode from 'vscode';
import { ImportAtTop } from './utils';

export type TConfigApp = {
	triggerDefault: string[];
	triggerExport: string[];
	package: string;
};

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const documentText = document.getText();
		const configExtension = vscode.workspace.getConfiguration('import-at-top').get('config');

		try {
			const result = ImportAtTop(documentText);
			console.log('result    ', result);
			console.log('configExtension    ', configExtension);

			vscode.window.showInformationMessage('✅ - Import At Top');
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(document.positionAt(0), document.positionAt(documentText.length)),
					result,
				);
			});
		} catch (Error) {
			vscode.window.showInformationMessage(`❌ - Import At Top: ${Error}`);
			console.error('❌ - Import At Top   ', Error);
		}

		context.subscriptions.push(disposable);
	});
};

export const deactivate = () => {};
