import type { TConfigParams } from './types';

/* 
* 💡 ru: Базовый конфиг для расширения.

* 💡 en: Base config for extension.
*/

export const baseConfig: TConfigParams[] = [
	{
		importDefault: ['React'],
		importExport: [
			'useState',
			'useEffect',
			'useContext',
			'useReducer',
			'useCallback',
			'useMemo',
			'useRef',
			'useId',
			'useImperativeHandle',
			'useLayoutEffect',
			'useDebugValue',
		],
		package: 'react',
	},
	{
		importDefault: [],
		importExport: ['Get', 'Post'],
		package: '@nestjs/common',
	},
];

/* 
* 💡 ru: Массив с символами для проверки комбинаций ключевых слов.

* 💡 en: Array with characters to test combinations of keywords.
*/

export const arrOfSymbols: string[] = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'*$_1234567890'.split(''),
];

/* 
* 💡 ru: Массив для триггерных слов для определения части импорта.

* 💡 en: An array for trigger words to define the part of the import.
*/

export const arrTriggerWordImport: string[] = ['import ', ' from '];

/* 
* 💡 ru: Массив для триггерных слов для определения основную.

* 💡 en: An array for trigger words to define the main one.
*/

export const arrTriggerWordOther: string[] = [
	'export ',
	'const ',
	'let ',
	'var ',
	'function ',
	'switch ',
	'(',
	' () ',
	'enum ',
	'interface ',
	'new ',
	'class ',
	'return ',
	'true',
	'false',
	' = ',
	' => ',
	' == ',
	' != ',
	' === ',
	' !== ',
	...'abcdefghijklmnopqrstuvwxyz'
		.toLocaleLowerCase()
		.split('')
		.map(el => `type ${el}`),
	...'abcdefghijklmnopqrstuvwxyz'
		.toLocaleUpperCase()
		.split('')
		.map(el => `type ${el}`),
];
