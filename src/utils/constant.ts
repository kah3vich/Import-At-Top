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

export const allVersionImports = `
import './styles.css';
import React from 'react';
import { useState } from 'react';
import React, { useState } from 'react';
import * as Babel from 'babe';
import { Svg as Component, Svgs as Svg } from 'svg';
import type { TUser } from './types';
`;
