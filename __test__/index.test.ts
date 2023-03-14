import {
	checkTriggerImportConfigInMainCode,
	connectImportsFileWithConfigImports,
	convertImportInStringToObjectImports,
	copyArray,
	getPartCode,
	removeDuplicates,
} from '../src/utils/function';
import {
	arrOfSymbols,
	arrTriggerWordImport,
	arrTriggerWordOther,
	baseConfig,
} from '../src/utils/constant';
import { ImportAtTop } from '../src/utils/index';
import {
	testComponentCodeStart,
	testComponentCodeEnd,
	testComponentCodeImports,
	testComponentCodeMain,
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
	test('CopyArray - copy array to avoid mutation', () => {
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
		).toStrictEqual(testComponentCodeImports.split(';\n').filter((el: string) => el !== ''));
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
});
