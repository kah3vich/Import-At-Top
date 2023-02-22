import { arrayOfLetters } from '../constant';

export const flattenArray = (arr: any[]) => {
	return arr.reduce((acc, val) => {
		if (val !== null) {
			acc.push(val[0]);
		}
		return acc;
	}, []);
};

export const cleaningUpExtraQuotes = (arr: any[]) => {
	const packages: any[] = [];

	arr.forEach(el => {
		packages.push(el.match(/'[^']*'|"[^"]*"/g));
	});

	return [...new Set(packages)];
};

export const getArrayImportPackages = (importsCode: any) => {
	const arrImportsString = gettingOnlyStringImports(importsCode);

	return flattenArray(cleaningUpExtraQuotes(arrImportsString)).map((el: any) =>
		el.replace(/['"]+/g, ''),
	);
};

export const baseSchemaArrayConfigLocal = (arr: any[]) => {
	const result: any[] = [];
	const _arr = [...new Set(arr)].forEach(el => {
		result.push({
			triggerDefault: [],
			triggerExport: [],
			package: el,
		});
	});

	return result;
};

export const gettingOnlyStringImports = (arr: any) => {
	const result: any[] = [];
	[
		...new Set(
			arr
				.replace(/import/g, ';import')
				.split(';')
				.map((el: string) => el.replace(/^\s+|\s+$/g, '')),
		),
	]
		.filter(el => el !== '')
		.forEach((el: any) => {
			if (el.startsWith('import')) {
				result.push(el);
			}
		});

	return result;
};

export const stringCodeToObject = (arrImport: any[], arrPackages: any[]) => {
	arrImport.forEach(imp => {
		arrPackages.forEach(el => {
			if (imp.match(/'(.*?)'/)[1] === el.package) {
				let exportsArr: any[] = [];
				let defaultsArr: any[] = [];
				let checkWord: boolean = true;
				let checkDefault: boolean = true;
				let wordTrigger: any[] = [];

				imp
					.split('')
					.splice(6)
					.forEach((el: any) => {
						if (el === '{') {
							checkDefault = false;
						}
						if (el === '}') {
							if (wordTrigger.length) {
								if (checkDefault) {
									defaultsArr.push(wordTrigger.join(''));
								} else {
									exportsArr.push(wordTrigger.join(''));
								}
							}
							wordTrigger = [];
							checkWord = false;
							checkDefault = true;
						}

						if (wordTrigger.join('') == 'type') {
							wordTrigger = [];
							checkWord = false;
						}

						if (wordTrigger.join('') == 'from') {
							wordTrigger = [];
							checkWord = false;
						}
						if (el === ' ' || el === ',') {
							if (wordTrigger.length) {
								if (checkDefault) {
									defaultsArr.push(wordTrigger.join(''));
								} else {
									exportsArr.push(wordTrigger.join(''));
								}
							}
							wordTrigger = [];
							checkWord = false;
						}
						arrayOfLetters.forEach(word => {
							if (el === word) {
								wordTrigger.push(el);
								checkWord = true;
							}
						});
					});

				el.triggerDefault = [...new Set([...el.triggerDefault, ...defaultsArr])];
				el.triggerExport = [...new Set([...el.triggerExport, ...exportsArr])];
			}
		});
	});
};

export const removeUnusedArray = (text: any, triggerArr: any[]) => {
	return triggerArr && triggerArr.length
		? triggerArr.filter(word => text.includes(word))
		: triggerArr;
};

export const sortArrayByField = (array: any[], field: string) => {
	return array.sort(function (a, b) {
		if (a[field] < b[field]) {
			return 0;
		}
		if (a[field] > b[field]) {
			return 1;
		}
		return -1;
	});
};

export const joinArraysByPackage = (config: any, packageResult: any) => {
	const result: any[] = [];

	config.forEach((conf: any) => {
		const matchingResult = packageResult.find(
			(packageData: any) => packageData.package === conf.package,
		);
		if (matchingResult) {
			result.push({
				triggerDefault: [...new Set([...conf.triggerDefault, ...matchingResult.triggerDefault])],
				triggerExport: [...new Set([...conf.triggerExport, ...matchingResult.triggerExport])],
				package: conf.package,
			});
			packageResult.splice(packageResult.indexOf(matchingResult), 1);
		} else {
			result.push({
				triggerDefault: [...new Set(conf.triggerDefault)],
				triggerExport: [...new Set(conf.triggerExport)],
				package: conf.package,
			});
		}
	});

	return result;
};
