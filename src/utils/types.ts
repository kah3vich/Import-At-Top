export type TConfigApp = {
	triggerDefault: string[];
	triggerExport: string[];
	package: string;
};

export type TFormatterApp = {
	printWidth: number;
	tabWidth: number;
	useTabs: boolean;
	semi: boolean;
	bracketSpacing: boolean;
	bracketSameLine: boolean;
	jsxBracketSameLine: boolean;
	singleQuote: boolean;
};

export type TFormattedCodeLinter = {
	code: string;
	type?: 'develop' | 'finally';
	config: TFormatterApp;
};
