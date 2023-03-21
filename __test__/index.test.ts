import {
	arrOfSymbols,
	arrTriggerWordImport,
	arrTriggerWordOther,
	baseConfig,
} from '../src/utils/constant';
import {
	checkHaveImportInMainCode,
	checkTriggerImportConfigInMainCode,
	checkingPresenceElementInText,
	connectImportsFileWithConfigImports,
	convertImportInStringToObjectImports,
	convertImportsArrObjectToArrStringImport,
	copyArray,
	finallyCode,
	getPartCode,
	reductionCodeImport,
	removeDuplicates,
	removeEmptyAndStop,
	removeUnusedArray,
	sortImportsArray,
} from '../src/utils/function';
import { ImportAtTop } from '../src/utils/index';
import {
	testComponentCodeEnd,
	testComponentCodeImports,
	testComponentCodeMain,
	testComponentCodeStart,
} from './constant';

/* 

* 💡 ru: 

* 💡 en: 

*/

describe('Import At Top', () => {
	test('ImportAtTop - main function extension', () => {
		expect(ImportAtTop(testComponentCodeStart, baseConfig)).toBe(testComponentCodeEnd);
	});
});

describe('Function', () => {
	test('Copy- copy to avoid mutation', () => {
		expect(copyArray([1, '2', 3])).toEqual([1, '2', 3]);
	});

	test('GetPartCode - ', () => {
		expect(
			getPartCode({
				code: testComponentCodeStart,
				type: 'import',
				arrTriggerWordImport: arrTriggerWordImport,
				arrTriggerWordOther: arrTriggerWordOther,
			}),
		).toStrictEqual([]);
	});

	test('RemoveDuplicates - ', () => {
		expect(
			removeDuplicates(
				[{ package: 'react' }, { package: 'redux' }, { package: 'react' }],
				'package',
			),
		).toEqual([{ package: 'react' }, { package: 'redux' }]);
	});

	test('ConvertImportInStringToObjectImports -', () => {
		expect(
			convertImportInStringToObjectImports(
				testComponentCodeImports.split(';\n').filter((el: string) => el !== ''),
				arrOfSymbols,
			),
		).toEqual([
			{
				importAll: false,
				importAsAll: '',
				importDefault: ['React'],
				importExport: ['useState', 'State', 'useEffect'],
				importOnly: false,
				importType: [],
				package: 'react',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: ['TUser'],
				package: './types',
			},
			{
				importAll: false,
				importAsAll: '* as validator',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: [],
				package: './ZipCodeValidator',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: ['Svg as Component', 'Svgs as Svg'],
				importOnly: false,
				importType: [],
				package: '../../icon.svg',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: true,
				importType: [],
				package: './styles.css',
			},
		]);
	});

	test('CheckTriggerImportConfigInMainCode - ', () => {
		expect(
			checkTriggerImportConfigInMainCode(
				testComponentCodeImports.split(';\n').filter((el: string) => el !== ''),
				baseConfig,
			),
		).toEqual([
			{
				importDefault: [],
				importExport: [
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
		]);
	});

	test('ConnectImportsFileWithConfigImports - ', () => {
		expect(
			connectImportsFileWithConfigImports(
				testComponentCodeImports.split(';\n').filter((el: string) => el !== ''),
				[
					{
						importDefault: ['React'],
						importExport: ['useState', 'State', 'useEffect'],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: 'react',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: false,
						importType: ['TUser'],
						importAll: false,
						importAsAll: '',
						package: './types',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '* as validator',
						package: './ZipCodeValidator',
					},
					{
						importDefault: [],
						importExport: ['Svg as Component', 'Svgs as Svg'],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: '../../icon.svg',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: true,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: './styles.css',
					},
				],

				baseConfig,
			),
		).toEqual([
			{
				importAll: false,
				importAsAll: '',
				importDefault: ['React'],
				importExport: [
					'useState',
					'State',
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
				importOnly: false,
				importType: [],
				package: 'react',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: ['TUser'],
				package: './types',
			},
			{
				importAll: false,
				importAsAll: '* as validator',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: [],
				package: './ZipCodeValidator',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: ['Svg as Component', 'Svgs as Svg'],
				importOnly: false,
				importType: [],
				package: '../../icon.svg',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: true,
				importType: [],
				package: './styles.css',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: ['Get', 'Post'],
				importOnly: false,
				importType: [],
				package: '@nestjs/common',
			},
		]);
	});

	test('CheckingPresenceElementInText -', () => {
		expect(checkingPresenceElementInText(testComponentCodeMain, 'Component')).toBe('Component');
	});

	test('RemoveUnused-', () => {
		expect(
			removeUnusedArray(testComponentCodeMain, ['useState', 'Component', 'useEffects']),
		).toEqual(['useState', 'Component']);
	});

	test('CheckHaveImportInMainCode -', () => {
		expect(
			checkHaveImportInMainCode(testComponentCodeMain, [
				{
					importDefault: ['React'],
					importExport: ['useState', 'State', 'useEffect'],
					importOnly: false,
					importType: [],
					importAll: false,
					importAsAll: '',
					package: 'react',
				},
				{
					importDefault: [],
					importExport: [],
					importOnly: false,
					importType: ['TUser'],
					importAll: false,
					importAsAll: '',
					package: './types',
				},
				{
					importDefault: [],
					importExport: [],
					importOnly: false,
					importType: [],
					importAll: false,
					importAsAll: '* as validator',
					package: './ZipCodeValidator',
				},
				{
					importDefault: [],
					importExport: ['Svg as Component', 'Svgs as Svg'],
					importOnly: false,
					importType: [],
					importAll: false,
					importAsAll: '',
					package: '../../icon.svg',
				},
				{
					importDefault: [],
					importExport: [],
					importOnly: true,
					importType: [],
					importAll: false,
					importAsAll: '',
					package: './styles.css',
				},
			]),
		).toEqual([
			{
				importAll: false,
				importAsAll: '',
				importDefault: ['React'],
				importExport: ['useState', 'State', 'useEffect'],
				importOnly: false,
				importType: [],
				package: 'react',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: ['TUser'],
				package: './types',
			},
			{
				importAll: false,
				importAsAll: '* as validator',
				importDefault: [],
				importExport: [],
				importOnly: false,
				importType: [],
				package: './ZipCodeValidator',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: ['Svg as Component', 'Svgs as Svg'],
				importOnly: false,
				importType: [],
				package: '../../icon.svg',
			},
			{
				importAll: false,
				importAsAll: '',
				importDefault: [],
				importExport: [],
				importOnly: true,
				importType: [],
				package: './styles.css',
			},
		]);
	});

	test('ConvertImportsArrObjectToArrStringImport -', () => {
		expect(
			convertImportsArrObjectToArrStringImport([
				{
					importAll: false,
					importAsAll: '',
					importDefault: ['React'],
					importExport: ['useState', 'State', 'useEffect'],
					importOnly: false,
					importType: [],
					package: 'react',
				},
				{
					importAll: false,
					importAsAll: '',
					importDefault: [],
					importExport: [],
					importOnly: false,
					importType: ['TUser'],
					package: './types',
				},
				{
					importAll: false,
					importAsAll: '* as validator',
					importDefault: [],
					importExport: [],
					importOnly: false,
					importType: [],
					package: './ZipCodeValidator',
				},
				{
					importAll: false,
					importAsAll: '',
					importDefault: [],
					importExport: ['Svg as Component', 'Svgs as Svg'],
					importOnly: false,
					importType: [],
					package: '../../icon.svg',
				},
				{
					importAll: false,
					importAsAll: '',
					importDefault: [],
					importExport: [],
					importOnly: true,
					importType: [],
					package: './styles.css',
				},
			]),
		).toEqual([
			"import React, { useState, State, useEffect } from 'react'",
			"import type { TUser } from './types'",
			"import * as validator from './ZipCodeValidator'",
			"import { Svg as Component, Svgs as Svg } from '../../icon.svg'",
			"import './styles.css'",
		]);
	});

	test('SortImportsArray -', () => {
		expect(
			sortImportsArray([
				"import React, { useState, State, useEffect, useId } from 'react'",
				"import type { TUser } from './types'",
				"import * as validator from './ZipCodeValidator'",
				"import { Svg as Component, Svgs as Svg } from '../../icon.svg'",
				"import './styles.css'",
			]),
		).toEqual([
			"import React, { useState, State, useEffect, useId } from 'react'",
			"import { Svg as Component, Svgs as Svg } from '../../icon.svg'",
			'',
			"import type { TUser } from './types'",
			'',
			"import * as validator from './ZipCodeValidator'",
			'',
			"import './styles.css'",
			'',
		]);
	});

	test('ReductionCodeImport -', () => {
		expect(
			reductionCodeImport([
				"import { useState, State, useEffect, useId, useParams, useTest, useSpeed } from 'react'",
				"import { Svg as Component, Svgs as Svg } from '../../icon.svg'",
				'',
				"import type { TUser } from './types'",
				'',
				"import * as validator from './ZipCodeValidator'",
				'',
				"import './styles.css'",
				'',
			]),
		).toEqual([
			"import { useState, State, useEffect, useId, useParams, useTest, useSpeed } from 'react'",
			"import { Svg as Component, Svgs as Svg } from '../../icon.svg'",
			'',
			"import type { TUser } from './types'",
			'',
			"import * as validator from './ZipCodeValidator'",
			'',
			"import './styles.css'",
			'',
		]);
	});

	test('RemoveEmptyAndStop -', () => {
		expect(removeEmptyAndStop(['', '', 'A', ''])).toEqual(['A', '']);
	});

	test('FinallyCode -', () => {
		expect(
			finallyCode(
				[
					{
						importDefault: ['React'],
						importExport: ['useState', 'State', 'useEffect', 'useId'],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: 'react',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: false,
						importType: ['TUser'],
						importAll: false,
						importAsAll: '',
						package: './types',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '* as validator',
						package: './ZipCodeValidator',
					},
					{
						importDefault: [],
						importExport: ['Svg as Component', 'Svgs as Svg'],
						importOnly: false,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: '../../icon.svg',
					},
					{
						importDefault: [],
						importExport: [],
						importOnly: true,
						importType: [],
						importAll: false,
						importAsAll: '',
						package: './styles.css',
					},
				],
				testComponentCodeMain,
				["'use client'"]
			),
		).toBe(`import React, { useState, State, useEffect, useId } from 'react';
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

export const ImportAtTop = React.memo(_ImportAtTop);`);
	});
});
