import * as vscode from 'vscode';

export type TStatusBarInitProps = {
	context: vscode.ExtensionContext;
	statusBar: vscode.StatusBarItem;
};

export type TStatusBarErrorProps = {
	vscode: any;
	statusBar: vscode.StatusBarItem;
	message: string;
};

export type TStatusBarAcceptProps = {
	statusBar: vscode.StatusBarItem;
};

export type TStatusBarPendingProps = {
	statusBar: vscode.StatusBarItem;
};

export type TGetPartCodeProps = {
	code: string;
	type: 'import' | 'main';
	arrTriggerWordImport: string[];
	arrTriggerWordOther: string[];
};
