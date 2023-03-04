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
	...'*_1234567890',
];
