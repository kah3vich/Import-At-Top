import { consoleLog } from '../src/utils/other';

test('Console log works', () => {
	expect(consoleLog('Nano Snippets', 'log')).toBe('Nano Snippets');
});
