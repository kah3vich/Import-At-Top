import { sortArrayByField } from '../array';
import { TConfigApp } from '../types';

export const convertCode = (arr: TConfigApp[]) => {
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
	});
	return str.join(';\n');
};
