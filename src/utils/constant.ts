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
			'useImperativeHandle',
			'useLayoutEffect',
			'useDebugValue',
		],
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

export const arrayOfLetters: string[] = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleLowerCase().split(''),
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'*',
];
