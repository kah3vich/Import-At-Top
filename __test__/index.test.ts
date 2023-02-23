import { arrImportToObjectImport } from '../src/utils/array';
import { consoleLog } from '../src/utils/other';

const componentCode = `
import { useState, State as Components } from 'react';
import React from 'react';
import type { TUser, TAdmin } from './types';
import { useRef } from 'react';
import { Svg as Component, Svgs as Component, Old } from '../../icon.svg';
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

	const sta = State;

	return <Svg>{data}</Svg>;
};

export const ImportAtTop = React.memo(_ImportAtTop);
`;

test('Console log works', () => {
	expect(consoleLog('Nano Snippets', 'log')).toBe('Nano Snippets');
});

describe('Utils - Array', () => {
	test('Function - arrImportToObjectImport', () => {
		expect(
			arrImportToObjectImport(
				[
					"import { useState, State as Components } from 'react'",
					"import React from 'react'",
					"import type { TUser, TAdmin } from './types'",
					"import { useRef } from 'react'",
					"import { Svg as Component, aSvg as Component } from '../../icon.svg'",
					"import './styles.css'",
					"import { useEffect, useId } from 'react'",
				],
				[
					{ triggerDefault: [], triggerExport: [], package: 'react' },
					{ triggerDefault: [], triggerExport: [], package: './types' },
					{ triggerDefault: [], triggerExport: [], package: '../../icon.svg' },
					{ triggerDefault: [], triggerExport: [], package: './styles.css' },
				],
			),
		).toStrictEqual([
			{
				triggerDefault: ['React'],
				triggerExport: ['useState', 'State as Components', 'useRef', 'useEffect', 'useId'],
				package: 'react',
			},
			{
				triggerDefault: [],
				triggerExport: ['TUser', 'TAdmin'],
				package: './types',
			},
			{
				triggerDefault: [],
				triggerExport: ['Svg as Component', 'aSvg as Component'],
				package: '../../icon.svg',
			},
			{ triggerDefault: [], triggerExport: [], package: './styles.css' },
		]);
	});
});
