<h1 align="center">
   <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <br/>
        <img src="https://raw.githubusercontent.com/kah3vich/Import-At-Top/master/assets/logo.png" alt="logo" width="256">
        <br/>
        <br/>
        Import At Top (Beta)
        <br/>
        <br/>
    </a>
</h1>

<h4 align="center">An extension that adds imports to the source file from the specified options in the configuration file, and also sorts and removes unnecessary imports, which improves and speeds up the user experience.</h4>

<br/>

<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <img src="https://vsmarketplacebadges.dev/version-short/kah3vich.import-at-top.svg?style=for-the-badge&colorA=252526&colorB=43A047&label=VERSION" alt="Version">
    </a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <img src="https://vsmarketplacebadges.dev/rating-short/kah3vich.import-at-top.svg?style=for-the-badge&colorA=252526&colorB=43A047&label=Rating" alt="Rating">
    </a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <img src="https://vsmarketplacebadges.dev/installs-short/kah3vich.import-at-top.svg?style=for-the-badge&colorA=252526&colorB=43A047&label=Installs" alt="Installs">
    </a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <img src="https://vsmarketplacebadges.dev/downloads-short/kah3vich.import-at-top.svg?style=for-the-badge&colorA=252526&colorB=43A047&label=Downloads" alt="Downloads">
    </a>
</p>

<br/>

## KeyBoard

<br/>

### Win

```bash
Ctrl + Alt + S - import-at-top (command)
```

### MacOS & Linux

```bash
Command + Option + S - import-at-top (command)
```

<br/>

# Config

<br/>

```bash

"import-at-top.config": [
	{
		"triggerDefault": ["React"],
		"triggerExport": ["useState", "useId", "useRef"],
		"package": "react"
	}
]
```

### > triggerDefault -

### > triggerExport -

### > package -

<br/>

# Formatter

<br/>

```bash

"import-at-top.formatter": {
	"printWidth": 120,
	"tabWidth": 4,
	"useTabs": true,
	"semi": true,
	"bracketSpacing": true,
	"bracketSameLine": false,
	"jsxBracketSameLine": false,
	"singleQuote": true
}
```

### > printWidth -

### > tabWidth -

### > useTabs -

### > semi -

### > bracketSpacing -

### > bracketSameLine -

### > jsxBracketSameLine -

### > singleQuote -
