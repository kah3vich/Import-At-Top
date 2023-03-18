import type { TConfigParams } from './types';

/* 
* 💡 ru: 

* 💡 en:  
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
* 💡 ru: 

* 💡 en:  
*/

export const arrOfSymbols: string[] = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'*$_1234567890'.split(''),
];

/* 
* 💡 ru: 

* 💡 en:  
*/

export const arrTriggerWordImport: string[] = ['import ', ' from '];

/* 
* 💡 ru: 

* 💡 en:  
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
	'@',
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
