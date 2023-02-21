import type { TConfigApp, TFormatterApp } from './types';

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

Переменная ( массив ) для хранение алфавита в верхнем и нижнем регистре.

*/

export const arrayOfLetters: string[] = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
];
