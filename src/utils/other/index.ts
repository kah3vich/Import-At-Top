/* 

* 💡 ru: 

* 💡 en: 

*/

export const consoleLog = (str: string, type: 'log' | 'err') => {
	if (type === 'log') {
		console.log(`✅ ${str}`);
		return `✅ ${str}`;
	}
	console.error(`❌ ${str}`);
	return `❌ ${str}`;
};
