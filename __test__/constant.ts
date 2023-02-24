/* 

* 💡 ru: 

* 💡 en: 

*/

export const testComponentCodeStart = `import { State as Components, State } from 'react';
import React from 'react';
import type { TUser, TAdmin } from './types';
import { useRef } from 'react';
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

	const sta = State;

	return <Svg>{Component}</Svg>;
};

export const ImportAtTop = React.memo(_ImportAtTop);`;

export const testComponentCodeEnd = `import React, { useState, State, useEffect } from 'react';
import { TUser } from './types';
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

	const sta = State;

	return <Svg>{Component}</Svg>;
};

export const ImportAtTop = React.memo(_ImportAtTop);`;
