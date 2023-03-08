<h1 align="center">
   <a href="https://marketplace.visualstudio.com/items?itemName=kah3vich.import-at-top">
        <br />
        <img src="https://raw.githubusercontent.com/kah3vich/Import-At-Top/master/assets/logo.png" alt="logo" width="256">
        <br />
        <br />
        Import At Top (React)
        <br />
        <br />
    </a>
</h1>

<br />

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

<br />

> ✅ **This extension is in beta testing. If you find a bug please report it - holdesher@ro.ru**

<h4 align="center">React an extension that adds imports to the source file from the specified options in the configuration file, and also sorts and removes unnecessary imports, which improves and speeds up the user experience.</h4>

<br />

<table align="center">
    <tr>
        <td align="center" width="96">
            <a href="#">
                <img src="https://raw.githubusercontent.com/kah3vich/kah3vich/main/assets/img/react.png" width="48" height="48" alt="React" />
            </a>
            <br />
            <p>React</p>
        </td>
        <td align="center" width="96">
            <a href="#">
                <img src="https://raw.githubusercontent.com/kah3vich/kah3vich/main/assets/img/javascript.png" width="48" height="48" alt="JavaScript" />
            </a>
            <br />
            <p>JavaScript</p>
        </td>
    </tr>
</table>

<br />

<img src="https://raw.githubusercontent.com/kah3vich/kah3vich/main/assets/gif/line.gif" height="20" width="100%" alt="https://i.imgur.com/dBaSKWF.gif">

<br />

## KeyBoard

<br />

### Win

```bash
Ctrl + Alt + S - import-at-top (command)
```

### MacOS & Linux

```bash
Command + Option + S - import-at-top (command)
```

<br />

<img src="https://raw.githubusercontent.com/kah3vich/kah3vich/main/assets/gif/line.gif" height="20" width="100%" alt="https://i.imgur.com/dBaSKWF.gif">

<br />

## Config

<br />

```bash

"import-at-top.config": [
	{
		"triggerDefault": ["React"],
		"triggerExport": ["useState", "useId", "useRef"],
		"package": "react"
	}
]
```

<br />

> ### <b>importDefault</b> - this is a list of words (for importing default values) that the extension will respond to when importing your dependencies: import React from 'react'.

<br />

> ### <b>importExport</b> - this is a list of words (for importing a named value) that the extension will respond to to import your dependencies: import { useState } from 'react'.

<br />

> ### <b>package</b> - the name of the path or package from which the import will go.

<br />
