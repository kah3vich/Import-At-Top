import { baseConfig } from '../src/utils/constant';
import { ImportAtTop } from '../src/utils/index';
import { testComponentCodeStart, testComponentCodeEnd } from './constant';

/* 

* 💡 ru: 

* 💡 en: 

*/

describe('Import At Top', () => {
	test('Function - ImportAtTop', () => {
		expect(ImportAtTop(testComponentCodeStart, baseConfig)).toBe(testComponentCodeEnd);
	});
});
