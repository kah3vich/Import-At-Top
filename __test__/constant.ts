/*

* 💡 ru:

* 💡 en:

*/

export const testComponentCodeStart = `import { State as Components, State } from 'react';
import React from 'react';
import type { TUser, TAdmin } from './types';
import { useRef } from 'react';
import * as validator from "./ZipCodeValidator";
import { Svg as Component, Svgs as Svg, Old } from '../../icon.svg';
import './styles.css';
import { useEffect, useId } from 'react';
import React from 'react';

export type TImportAtTopProps = {
	data: string;
};

const _ImportAtTop = ({ data }: TImportAtTopProps & TUser) => {
	useEffect(() => {
		console.log('✅ element    ', 000);
	}, []);

	const [value, setChange] = useState(null);

	const sta = State || validator;

	return <Svg>{Component}</Svg>;
};

export const ImportAtTop = React.memo(_ImportAtTop);`;

export const testComponentCodeEnd = `import React, { useState, State, useEffect } from 'react';
import { TUser } from './types';
import * as validator from './ZipCodeValidator';
import { Svg as Component, Svgs as Svg } from '../../icon.svg';
import './styles.css'

export type TImportAtTopProps = {
	data: string;
};

const _ImportAtTop = ({ data }: TImportAtTopProps & TUser) => {
	useEffect(() => {
		console.log('✅ element    ', 000);
	}, []);

	const [value, setChange] = useState(null);

	const sta = State || validator;

	return <Svg>{Component}</Svg>;
};

// export const ImportAtTop = React.memo(_ImportAtTop);`;

// export const getPartCode = (code, type) => {
// 	const result = code.replace(/;/g, '').replace(/\n/g, ';').split(';').join(';');

// 	if (type === 'import') {
// 		return result;
// 	}
// 	return result;
// };

// export const ImportAtTop_ = (code: string): string => {
// 	let result = '';

// 	return result;
// };
