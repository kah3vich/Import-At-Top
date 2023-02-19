import { consoleLog } from '../src/utils/console';

test('Console log works', () => {
	expect(consoleLog('Nano Snippets')).toBe('Nano Snippets');
});
