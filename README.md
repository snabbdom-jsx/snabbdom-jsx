# A fork of [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx) to facilitate the use of React-style JSX syntax with snabbdom.

Many thanks to [Yassine Elouafi](https://github.com/yelouafi) for the brilliant [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx).

`npm install snabbdom-react-jsx`

One of the sticking points a colleague and I have been having with using snabbdom is the difference in notation between itself and React JSX. We wanted to be able to prove to the client that the pure components we were writing work the same as React. So this package blurs the lines between the two in the following ways:

- Rather than kebab-case event property names, use React-style camel-case
- Map React-specific properties, ie. `defaultValue`, back to a snabbdom equivalent
- Pass children as a prop instead of the second argument

This has allowed us to implement snabbdom for the build output, but also test our components with React tools such as [enzyme](https://github.com/airbnb/enzyme), by only changing the JSX pragma between environments.

### Downsides

To keep the lines between snabbdom and React JSX blurred, we unfortunately lose some of the niceties that snabbdom has to offer, such as the `class` module, which itself can be mitigated by the use of [classnames](https://github.com/JedWatson/classnames).

### Components

Components are pure functions in the form `({ children, ...props }) => vnode`.

### Supported React event names

```
onCut onCopy onPaste
onKeyDown onKeyPress onKeyUp
onFocus onBlur onChange onInput onSubmit
onClick onContextMenu onDoubleClick
onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop
onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp
onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart
onScroll onWheel
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded 
```

For more in-depth documentation, please check out [snabbdom-jsx](https://github.com/yelouafi/snabbdom-jsx).
