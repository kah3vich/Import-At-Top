import * as vscode from 'vscode';

const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
};

interface ITheme {
	id: string;
	label: string;
	[key: string]: string;
	uiTheme: string;
}

const importTop = (text: any, arr: any) => {
	let result = text;

	const insertAt = (str: any, sub: any, pos: any) =>
		`${str.slice(0, pos)}, ${sub}${str.slice(pos)}`;

	// console.log(insertAt('I want apple', ' an', 6)) // logs 'I want an apple'

	// if (arr.import) {
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
	// }

	return result;
};

export function activate(context: vscode.ExtensionContext) {
	const themes = vscode.extensions.all
		.filter(ext => ext.packageJSON.contributes?.themes)
		.reduce((acc, theme) => {
			const themesInfo: ITheme[] = theme.packageJSON.contributes.themes;

			return acc.concat(themesInfo.map(theme => theme.id || theme.label));
		}, [] as string[]);

	const disposable = vscode.commands.registerCommand('import-at-top', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const importStatement = `import { useState } from 'react'\n`;
		const oldText = editor.document.getText();
		console.log('oldText    ', oldText);
		console.log('oldText    ', oldText.split(','));

		const greeting = vscode.workspace.getConfiguration('import-at-top').get('config');
		vscode.window.showInformationMessage('Import At Top - ✅');

		// const newText = importStatement + oldText;

		const newText = importTop(oldText, greeting);

		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(0, 0, editor.document.lineCount, 0), newText);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

// ---

// const vscode = require('vscode');

// function addImport() {
// 	const editor = vscode.window.activeTextEditor;
// 	if (!editor) {
// 		return;
// 	}
// 	const importStatement = `import { myModule } from './myModule';\n`;
// 	const oldText = editor.document.getText();
// 	const newText = importStatement + oldText;
// 	editor.edit(editBuilder => {
// 		editBuilder.replace(new vscode.Range(0, 0, editor.document.lineCount, 0), newText);
// 	});
// }

// module.exports = {
// 	addImport,
// };
