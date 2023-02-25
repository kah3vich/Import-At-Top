import type { TConfigApp, TFormatterApp } from './types';

/* 

* 💡 ru: 

* 💡 en: 

*/

export const baseConfig: TConfigApp[] = [
	{
		triggerDefault: ['React'],
		triggerExport: ['useState', 'useId', 'useRef'],
		package: 'react',
	},
	{
		triggerDefault: [],
		triggerExport: ['createStore'],
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
