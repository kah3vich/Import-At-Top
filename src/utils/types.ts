export type TConfigParams = {
	importDefault: string[];
	importExport: string[];
	package: string;
};

export type TImportElement = {
	importDefault: string[];
	importExport: string[];
	importOnly: boolean;
	importType: string[];
	importAll: boolean;
	importAsAll: string;
	package: string;
};
