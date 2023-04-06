import { TConsoleLogProps } from './types';

/* 

* 💡 ru: Вывод данные - обычный и консольный со стилизацией.

* 💡 en: Data output - normal and console styled.

*/

export const consoleLog = ({ text, type }: TConsoleLogProps) => {
	if (type === 'log') {
		console.log(`✅ ${text}`);
		return `✅ ${text}`;
	}

	if (type === 'err') {
		console.error(`❌ ${text}`);
		return `❌ ${text}`;
	}

	console.log(text);
	return text;
};
