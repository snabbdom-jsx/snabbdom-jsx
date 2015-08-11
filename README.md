Write [Snabbdom](https://github.com/paldepind/snabbdom) views with [Babel's JSX](http://babeljs.io/docs/advanced/transformers/other/react/).

Features:

- Transform Babel JSX templates to Snabbdom virtual nodes
- Straightforward mapping from JSX attributes to Snabbdom data attributes using namespaces 
- JSX Components are simples functions `(attributes, children) => vnode`. No more messy classes.

Usage
======

installation

```
npm install snabbdom-jsx
```

Hello example

```js
/** @jsx html */

import { html } from 'snabbdom-jsx';

const patch = snabbdom.init([...]);

const mydiv = <div>Hello JSX</div>

patch(document.getElementById('placeholder'), vnode);
```

The `/** @jsx html */` pragma at the top tells Babel to use the `html` function instead of the React.createElement default. The `html` function takes arguments passed from Babel and generate virtual nodes as expected by Snabbdom's `patch` function.

Mapping JSX attributes
=======================

A quick remainder: In snabbdom, most of the functionalities like toggling classes, styles and setting properties on DOM elements are delegated to separate modules.

For example

```js
const myInput = h('input', { 
  props: { type: 'text' }       // handled by the props module
  on: { change: someCallback }, // handled by the eventlisteners module
  class: { class1: isEnabled }  // handled by the class module
  ...
})
```

Each module handles a portion of the data attributes (the object in the parameter to `h`). And each portion is stored inside a **namespace**, for example, event attributes are placed inside the `on` namespace, class attributes inside the `class` namespace and so on.


By default all attributes listed in the JSX element are placed inside the `props` namespace.


```js
<input type="text" />
```
Is equivalent to

```js
h('input', { props: { type: 'text' } })
```

To attach event listeners, we use the `on-` prefix

```js
<button on-click={ callback } />

// is equivalent to

h('button', { on: { click: callback } })
```


This a generic rule: to map a JSX attribute to a specific module, you need to prefix the attribute with `pref-` where `pref` is the namespace used by the module in Snabbdom. As in the example above, all attributes with the `on-` prefix will be placed inside the the `on` namespace.

Another example using the `class` namespace


```js
<div
  class-visible={isVisible}
  class-enabled={isEnabled}>
  
  ...
</div>

// is equivalent to

h('div', { 
  class: { visible: isVisible, enabled: isEnabled } 
}, [...])
```

But you can also specifies an unique object the same way as in the `h` function, this is useful when you have a dynamic object 

```js
<div
  style={ ({fontWeight: 'bold', color: 'red'}) }>
  
  ...
</div>

// is equivalent to

h('div', { 
  style: {fontWeight: 'bold', color: 'red'} 
}, [...])
```

You can mix both styles, the result will be a merge of all attributes


```js
<div
  class={ ({visible: isVisible}) }
  class-enabled={isEnabled}>
  
  ...
</div>
```


JSX Components
===============

In React/JSX you can create components and use them inside other components

```js
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage name="John" />, mountNode);
```

Instead of classes, Snabbdom-jsx components are simple functions of type  `(attributes, children) => vnode`.

```js
//HelloMessage : (attrs, body) -> vnode
const HelloMessage = ({name}) =>
  <div on-click={ _ => alert('Hi ' + name) }>
    {name}
  </div>;


var vnode = <HelloMessage name="Yassine" />
```

If you're wondering how Components would fit in a large application, you can look into the [todomvc example](https://github.com/yelouafi/snabbdom-jsx/tree/master/examples/todomvc). The application is implemented using the Elm architecture. For more information see [React-less Virtual DOM with Snabbdom : functions everywhere!](https://medium.com/@yelouafi/react-less-virtual-dom-with-snabbdom-functions-everywhere-53b672cb2fe3)