import { arrImportToObjectImport } from '../src/utils/array';
import { consoleLog } from '../src/utils/other';

/* 

* 💡 ru: 

* 💡 en: 

*/

// describe('Import At Top', () => {
// 	test('Function - ImportAtTop', () => {
// 		expect(ImportAtTop(testComponentCodeStart, baseConfig, baseFormatter)).toBe(
// 			testComponentCodeEnd,
// 		);
// 	});
// });

/* 

* 💡 ru: 

* 💡 en: 

*/

describe('Utils - Other', () => {
	//|
	test('Function - consoleLog type: "Log"', () => {
		expect(consoleLog('Nano Snippets', 'log')).toBe('✅ Nano Snippets');
	});
	test('Function - consoleLog type: "Err"', () => {
		expect(consoleLog('Nano Snippets', 'err')).toBe('❌ Nano Snippets');
	});
});

/* 

* 💡 ru: 

* 💡 en: 

*/

describe('Utils - Array', () => {
	//|
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
