import * as vscode from 'vscode';

const importTop = (text: any, arr: any) => {
	let result = text;

	const insertAt = (str: any, sub: any, pos: any) =>
		`${str.slice(0, pos)}, ${sub}${str.slice(pos)}`;

	if (arr.length) {
		arr.map((el: any) => {
			if (result.search(el.trigger) > 0) {
				if (result.search(` } from '${el.packeg}'`) > 0) {
					result = insertAt(result, el.trigger, result.search(` } from '${el.packeg}'`));
				} else {
					result = `import { ${el.trigger} } from '${el.packeg}'\n` + result;
				}
			}

			result = [...new Set(result.split(`${el.trigger}, `))].join('');
		});
		vscode.window.showInformationMessage('Import At Top - ✅');
	} else {
		vscode.window.showInformationMessage('*Import At Top* - ❌ \n Config empty');
	}

	return result;
};

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('import-at-top', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const oldText = editor.document.getText();

		const greeting = vscode.workspace.getConfiguration('import-at-top').get('config');

		const newText = importTop(oldText, greeting);

		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(0, 0, editor.document.lineCount, 0), newText);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
