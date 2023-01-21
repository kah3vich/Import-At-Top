import * as vscode from 'vscode';

type ConfigItem = {
	trigger: string;
	packet: string;
	defaultType: boolean;
};

const handlerDefaultType = (type: boolean, direction: 'left' | 'right') => {
	if (!type) {
		if (direction === 'left') {
			return '{ ';
		}
		return ' }';
	}

	return '';
};

const importTop = (text: string, arr: ConfigItem[]) => {
	let result = text;

	// const insertAt = (str: string, sub: string, pos: number) =>
	// 	`${str.slice(0, pos)}, ${sub}${str.slice(pos)}`;

	if (arr.length) {
		arr.forEach(el => {
			if (result.search(el.trigger) > 0) {
				// if (
				// 	result.search(`${handlerDefaultType(el.defaultType, 'right')} from '${el.packet}'`) > 0
				// ) {
				// 	result = insertAt(
				// 		result,
				// 		el.trigger,
				// 		result.search(`${handlerDefaultType(el.defaultType, 'right')} from '${el.packet}'`),
				// 	);
				// } else {
				result =
					`import ${handlerDefaultType(el.defaultType, 'left')}${el.trigger}${handlerDefaultType(
						el.defaultType,
						'right',
					)} from '${el.packet}'\n` + result;
				// }
			}

			result = [...new Set(result.split(`${el.trigger}, `))].join('');
		});
		vscode.window.showInformationMessage('Import At Top - ✅');
	} else {
		vscode.window.showInformationMessage('Import At Top - ❌');
	}

	return result;
};

export const activate = (context: vscode.ExtensionContext) => {
	const disposable = vscode.commands.registerCommand('import-at-top', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const oldText = editor.document.getText();

		const greeting = vscode.workspace.getConfiguration('import-at-top').get('config');

		const newText = importTop(oldText, greeting as ConfigItem[]);

		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(0, 0, editor.document.lineCount, 0), newText);
		});
	});

	context.subscriptions.push(disposable);
};

export const deactivate = () => {};
