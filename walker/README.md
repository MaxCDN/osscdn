# walker

This script walks through given directory, parses found package.json files and extracts certain information in output.

Usage:

```js
./index.js input > output.json
```

Optionally it is possible to pass a flag to determine that GitHub queries should be skipped. In this case use `./index.js input 1 > output.json`. This can be useful during testing.
