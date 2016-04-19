/** @jsx html */

import test from 'tape';
import { html, svg } from './snabbdom-react-jsx';

console.log(svg);

test('jsx -> html vnode', (assert) => {

  function callback() {};
  const style = { fontWeight: 'bold' };
  const div1 =
    <div classNames="c1 c2">
      <label aria-wot="hello" data-hook="wot" htmlFor="someid">label</label>
    </div>;

  assert.equal(div1.sel, 'div.c1.c2');
  assert.equal(div1.data.ns, undefined);
  assert.deepEqual(div1.children, [
    {
      sel: 'label',
      data: {
        ns: undefined,
        props: { htmlFor: 'someid' },
        attrs: { 'aria-wot': 'hello', 'data-hook': 'wot' }
      },
      children: [{ text: 'label'}],
      key: undefined
    }
  ]);

  const div2 =
    <div>
      <input
        data-id="1"
        aria-wot="2"
        type="text"
        key="key"
        style={style}
        style-color='red'
        class-cs-1={true}
        defaultValue='foo'
        autoFocus={true}
        onCut={callback}
        onCopy={callback}
        onPaste={callback}
        onKeyDown={callback}
        onKeyPress={callback}
        onKeyUp={callback}
        onFocus={callback}
        onBlur={callback}
        onChange={callback}
        onInput={callback}
        onSubmit={callback}
        onClick={callback}
        onContextMenu={callback}
        onDoubleClick={callback}
        onDrag={callback}
        onDragEnd={callback}
        onDragEnter={callback}
        onDragExit={callback}
        onDragLeave={callback}
        onDragOver={callback}
        onDragStart={callback}
        onDrop={callback}
        onMouseDown={callback}
        onMouseEnter={callback}
        onMouseLeave={callback}
        onMouseMove={callback}
        onMouseOut={callback}
        onMouseOver={callback}
        onMouseUp={callback}
        onSelect={callback}
        onTouchCancel={callback}
        onTouchEnd={callback}
        onTouchMove={callback}
        onTouchStart={callback}
        onScroll={callback}
        onWheel={callback}
        onAbort={callback}
        onCanPlay={callback}
        onCanPlayThrough={callback}
        onDurationChange={callback}
        onEmptied={callback}
        onEncrypted={callback}
        onEnded={callback}/>
    </div>;

  assert.deepEqual(div2.children[0], {
    sel: 'input',
    data: {
      ns: undefined,
      props: { type: 'text', value: 'foo', autofocus: true },
      attrs: {
        'data-id': '1',
        'aria-wot': '2'
      },
      on: {
        cut: callback,
        copy: callback,
        paste: callback,
        keydown: callback,
        keypress: callback,
        keyup: callback,
        focus: callback,
        blur: callback,
        change: callback,
        input: callback,
        submit: callback,
        click: callback,
        contextmenu: callback,
        dblclick: callback,
        drag: callback,
        dragend: callback,
        dragenter: callback,
        dragexit: callback,
        dragleave: callback,
        dragover: callback,
        dragstart: callback,
        drop: callback,
        mousedown: callback,
        mouseenter: callback,
        mouseleave: callback,
        mousemove: callback,
        mouseout: callback,
        mouseover: callback,
        mouseup: callback,
        select: callback,
        touchcancel: callback,
        touchend: callback,
        touchmove: callback,
        touchstart: callback,
        scroll: callback,
        wheel: callback,
        abort: callback,
        canplay: callback,
        canplaythrough: callback,
        durationchange: callback,
        emptied: callback,
        encrypted: callback,
        ended: callback
      },
      style: { fontWeight: 'bold', color: 'red' },
      class: { 'cs-1': true }
    },
    children: [],
    key: 'key'
  });

  const div3 = <div selector="#id.c1.c2"></div>;
  assert.deepEqual(div3, {
    sel: 'div#id.c1.c2',
    data: {
      ns: undefined
    },
    children: [],
    key: undefined
  });


  assert.end();
});

test('jsx components', (assert) => {

  const MyDiv = ({color, fontWeight}) =>
    <div
      style={ ({color, fontWeight}) }>
    </div>;

  const mydiv1 = <MyDiv key="key" color="red" fontWeight="bold" />;

  assert.deepEqual(mydiv1,
    {
      sel: 'div',
      data: {
        ns: undefined,
        style: { fontWeight: 'bold', color: 'red' }
      },
      children: [],
      key: 'key'
    }
  );


  assert.end();
});

test('svg components', (assert) => {

  const svgJsx = <svg>
    <rect x="10" y="10" height="100" width="100"
          style="stroke:#ff0000; fill: #0000ff"/>
  </svg>;

  const svgTest = svg('svg', null, [
    svg('rect', { x: "10", y: "10", height: "100", width: "100", style: 'stroke:#ff0000; fill: #0000ff' })
  ]);

  assert.deepEqual(svgJsx, svgTest);

  assert.end();
});
