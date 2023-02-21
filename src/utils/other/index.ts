export const consoleLog = (str: string) => {
	console.log(str);

	return str;
};

export const removeNewLines = (str: string) => {
	return str.replace(/\n/g, '');
};

export const copyArray = (arr: any[]) => {
	return JSON.parse(JSON.stringify(arr));
};
