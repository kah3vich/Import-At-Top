import { consoleLog } from '../src/console';

test('Console log works', () => {
	expect(consoleLog('Nano Snippets')).toBe('Nano Snippets');
});
