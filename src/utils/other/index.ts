/* 

* 💡 ru: 

* 💡 en: 

*/

export const removeNewLines = (str: string) => {
	return str.replace(/\n/g, '');
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const copyArray = (arr: any[]) => {
	return JSON.parse(JSON.stringify(arr));
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const consoleLog = (str: string, type: 'log' | 'err') => {
	if (type === 'log') {
		console.log(str);
	} else {
		console.error(str);
	}

	return str;
};
