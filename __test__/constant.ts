/* 
* 💡 ru: 

* 💡 en:  
*/

export const testComponentCodeStart: string = `import React, { useState, State, useEffect } from 'react';
import type { TUser } from './types';
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

/* 
* 💡 ru: 

* 💡 en:  
*/

export const testComponentCodeEnd: string = `import React, { useState, State, useEffect, useId } from 'react';
import { Svg as Component, Svgs as Svg } from '../../icon.svg';

import type { TUser } from './types';

import * as validator from './ZipCodeValidator';

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

/* 
* 💡 ru: 

* 💡 en:  
*/

export const testComponentCodeImports: string = `import React, { useState, State, useEffect } from 'react';
import type { TUser } from './types';
import * as validator from './ZipCodeValidator';
import { Svg as Component, Svgs as Svg } from '../../icon.svg';
import './styles.css';
`;

/* 
* 💡 ru: 

* 💡 en:  
*/

export const testComponentCodeMain: string = `export type TImportAtTopProps = {
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

/* 
* 💡 ru: 

* 💡 en:  
*/

export const codeMain: string = `

import React from 'react';
import ReactBase, { useStateBase } from 'reactAndState';
import { useState } from 'state';

import ModuleReact from '@moduleReact';
import ReactModule, { ModuleuseState } from '@moduleReactAndState';
import { useStateModule } from '@moduleState';

import ReactTilda from '~moduleReact';
import TildaReact, { TildauseState } from '~moduleReactAndState';
import { useStateTilda } from '~moduleState';

import ReactSlish from './react';
import SlishReact, { SlishuseState } from './reactAndState';
import { useStateSlish } from './state';

import * as Babel from 'babel';

import * as BabelDog from '@babel';

import * as BabelTilda from '~babel';

import * as BabelSlish from './babel';

import { Svg as Component, Svgs as Svg } from 'svg';

import { Svg as ComponentDog, Svgs as SvgDog } from '@svg';

import { Svg as ComponentTilda, Svgs as SvgTilda } from '~svg';

import { Svg as ComponentSlish, Svgs as SvgSlish } from './svg';

import type { TUser } from 'types';

import type { TUserDog } from '@types';

import type { TUserTilda } from '~types';

import type { TUserSlish } from './types';

import 'styles.css';

import '@styles.css';

import '~styles.css';

import './styles.css';

const _TestComponent = () => {
	const importsWord = [useState, ReactBase, useStateBase];

	const importsDog = [ModuleReact, useStateModule, ReactModule, ModuleuseState];

	const importsTilda = [ReactTilda, useStateTilda, TildaReact, TildauseState];

	const importsSlish = [ReactSlish, useStateSlish, SlishReact, SlishuseState];

	// -

	const importsAAll = Babel;

	const importAsAllDog = BabelDog;

	const importAsAllTilda = BabelTilda;

	const importAsAllSlish = BabelSlish;

	//-

	const importsAs = [Component, Svg];

	const importsAsDog = [ComponentDog, SvgDog];

	const importsAsTilda = [ComponentTilda, SvgTilda];

	const importsAsSlish = [ComponentSlish, SvgSlish];

	//-

	const importsType = [TUser];

	const importsTypeDog = [TUserDog];

	const importsTypeTilda = [TUserTilda];

	const importsTypeSlish = [TUserSlish];
};

export const TestComponent = React.memo(_TestComponent);


`;
