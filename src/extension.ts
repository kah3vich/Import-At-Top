import * as vscode from 'vscode';
import { ImportAtTop } from './utils';

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('import-at-top', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const documentText = document.getText();
		const configExtension: any = vscode.workspace.getConfiguration('import-at-top').get('config');

		console.log('configExtension !!!    ', configExtension);

		const formatterExtension: any = vscode.workspace
			.getConfiguration('import-at-top')
			.get('formatter');

		try {
			const result = ImportAtTop(documentText, configExtension, formatterExtension);

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
