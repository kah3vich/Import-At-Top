import { sortArrayByField } from '../array';

/* 

* 💡 ru: 

* 💡 en: 

*/

export const formattingMainCode = (code: string) => {
	const arrWord = ['import ', 'from "', "from '"];
	let id: number = 0;
	let result = '';
	const codeArr = code.split('\n');

	codeArr.forEach((el, i) => {
		arrWord.forEach(word => {
			if (el.includes(word)) {
				id = i;
			}
		});
	});

	result = codeArr.slice(id + 1).join('\n');

	return result;
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const getCodeImportText = (str: string) => {
	const fromIndex = str.lastIndexOf('import');
	let lastPart = str.substring(fromIndex);
	const firstQuoteIndex = lastPart.indexOf("'");
	const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
	lastPart = lastPart.substring(0, secondQuoteIndex + 1);
	return str.slice(0, fromIndex) + lastPart;
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const getCodeMainText = (str: string) => {
	const fromIndex = str.lastIndexOf('import');
	let lastPart = str.substring(fromIndex);
	const firstQuoteIndex = lastPart.indexOf("'");
	const secondQuoteIndex = lastPart.indexOf("'", firstQuoteIndex + 1);
	lastPart = lastPart.substring(0, secondQuoteIndex + 1);

	// if (`${str.split(lastPart).pop()}`.split('')[0] === ';') {
	// 	return `${str.split(lastPart).pop()}`.split('').slice(1).join('');
	// } else {
	return str.split(lastPart).pop();
	// }
};

/* 

* 💡 ru: 

* 💡 en: 

*/

export const convertCode = (arr: any[]) => {
	const str: any[] = [];
	const sortedArray = sortArrayByField(arr, 'package');

	sortedArray.forEach(el => {
		const arrDefault = el.triggerDefault.length
			? `${
					el.triggerDefault.length > 2
						? `${el.triggerDefault.join(', ')}`
						: el.triggerExport.length
						? `${el.triggerDefault[0]},`
						: el.triggerDefault[0]
			  } `
			: '';
		const arrExport = el.triggerExport.length ? `{ ${el.triggerExport.join(', ')} } ` : '';
		if (arrExport || arrDefault) {
			str.push(
				`import ${arrDefault}${arrExport}${arrDefault.length || arrExport.length ? 'from ' : ''}'${
					el.package
				}'`,
			);
		}
		if (arrExport === '' && arrDefault === '') {
			str.push(`import '${el.package}'`);
		}
	});

	return str.join(';\n');
};
