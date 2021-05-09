# firestore-cms-iframe

> A Content Management System for  an authenticated Firestore user who modifies their website from an external iframe 

[![NPM](https://img.shields.io/npm/v/firestore-cms-iframe.svg)](https://www.npmjs.com/package/firestore-cms-iframe) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is to be used to listen to a parent iframe, then trigger editable components and return them to the parent to be saved.

## Install

```bash
npm install --save firestore-cms-iframe
```

## Live Demo
https://gieoon.github.io/firestore-cms-iframe/

## Usage

```jsx
import React, { Component } from 'react'

import CMS from 'firestore-cms-iframe'

// Add to your App.js.
class Example extends Component {
  render() {
    return <MyWebsite>
      <CMS allowedOrigin="<my-example-domain.com>" templates={{}} />
    </ MyWebsite>
  }
}
```

## License

MIT © [gieoon](https://github.com/gieoon)
