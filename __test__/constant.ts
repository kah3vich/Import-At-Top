/*

* 💡 ru:

* 💡 en:

*/

export const testComponentCodeStart = `import React, { useState, State, useEffect } from 'react';
import { TUser } from './types';
import * as validator from './ZipCodeValidator';
import { Svg as Component, Svgs as Svg } from '../../icon.svg';
import './styles.css';

export type TImportAtTopProps = {
	data: string,
};

const _ImportAtTop = ({ data }: TImportAtTopProps & TUser) => {
	useEffect(() => {
		console.log('✅ element    ', 000);
	}, []);

	const idName = useId();

	const [value, setChange] = useState(null);

	const sta = State || validator;

	return <Svg>{Component}</Svg>;
};

export const ImportAtTop = React.memo(_ImportAtTop);`;

export const testComponentCodeEnd = `import React, { useState, State, useEffect, useId } from 'react'
import { TUser } from './types'
import { Svg as Component, Svgs as Svg } from '../../icon.svg'

import * as validator from './ZipCodeValidator'

import './styles.css'

export type TImportAtTopProps = {
	data: string,
}

const _ImportAtTop = ({ data }: TImportAtTopProps & TUser) => {
	useEffect(() => {
		console.log('✅ element    ', 000)
	}, [])

	const idName = useId()

	const [value, setChange] = useState(null)

	const sta = State || validator

	return <Svg>{Component}</Svg>
}

export const ImportAtTop = React.memo(_ImportAtTop)`;
