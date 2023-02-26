import type { TConfigApp, TFormatterApp } from './types';

/* 

* 💡 ru: 

* 💡 en: 

*/

export const baseConfig: TConfigApp[] = [
	{
		importDefault: ['React'],
		importExport: ['useState', 'useId', 'useRef'],
		package: 'react',
	},
	{
		importDefault: ['Redux'],
		importExport: ['createStore'],
		package: 'redux',
	},
];

/* 

* 💡 ru: 

* 💡 en: 

*/

export const baseFormatter: TFormatterApp = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	bracketSpacing: true,
	bracketSameLine: false,
	jsxBracketSameLine: false,
	singleQuote: true,
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const arrayOfLetters: string[] = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'*',
];
