import * as prettier from 'prettier';
import * as eslint from 'eslint';
import { TFormattedCodeLinter } from '../types';

export const formattingMainCode = (code: string) => {
	const arrWord: string[] = ['import', 'from'];
	let id: number = 0;
	let result: string = '';
	const codeArr: string[] = code.split('\n');

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

export const formattedCodeLinter = ({ code, type = 'finally', config }: TFormattedCodeLinter) => {
	if (type === 'develop') {
		// Use prettier - Develop
		const formattedCode = prettier.format(code, {
			semi: true,
			singleQuote: true,
			trailingComma: 'es5',
			arrowParens: 'always',
			parser: 'babel',
		});

		// Use eslint - Develop
		const linter = new eslint.Linter();
		const lintingErrors = linter.verifyAndFix(formattedCode, {
			parserOptions: {
				ecmaVersion: 6,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			rules: {
				'no-unused-vars': 2,
			},
		});

		return lintingErrors.output;
	}

	// Use prettier - Finally
	const formattedCode = prettier.format(code, {
		semi: config.semi,
		printWidth: config.printWidth,
		tabWidth: config.tabWidth,
		useTabs: config.useTabs,
		bracketSpacing: config.bracketSpacing,
		bracketSameLine: config.bracketSameLine,
		jsxBracketSameLine: config.jsxBracketSameLine,
		singleQuote: config.singleQuote,
		trailingComma: 'es5',
		arrowParens: 'always',
		parser: 'babel',
	});

	// Use eslint - Finally
	const linter = new eslint.Linter();
	const lintingErrors = linter.verifyAndFix(formattedCode, {
		parserOptions: {
			ecmaVersion: 6,
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
			},
		},
		rules: {
			'no-unused-vars': 2,
		},
	});

	return lintingErrors.output;
};
