/** @jsx html */

import test from 'tape';
import { html } from './snabbdom-jsx';

const SVGNS = 'http://www.w3.org/2000/svg';

test('jsx -> html vnode', (assert) => {

  function callback() {};
  const style = { fontWeight: 'bold' };
  const div1 =
    <div classNames="c1 c2">
      <label htmlFor="someid">label</label>
    </div>;

  assert.deepEqual(div1, {
    sel: 'div.c1.c2',
    key: undefined,
    data: {
      ns: undefined
    },
    children:[{
      sel: 'label',
      key: undefined,
      data: {
        ns: undefined,
        props: { htmlFor: 'someid' }
      },
      children: [{ text: 'label'}]
    }]
  });

  const div2 =
    <div>
      <input
        type="text"
        key="key"
        style={style}
        style-color='red'
        class-cs-1={true}
        on-click={callback}/>
    </div>;

  assert.deepEqual(div2.children[0], {
    sel: 'input',
    key: 'key',
    data: {
      ns: undefined,
      props: { type: 'text' },
      on: { click: callback },
      style: { fontWeight: 'bold', color: 'red' },
      class: { 'cs-1': true }
    },
    children: []
  });

  const div3 = <div selector="#id.c1.c2"></div>;
  assert.deepEqual(div3, {
    sel: 'div#id.c1.c2',
    key: undefined,
    data: {
      ns: undefined
    },
    children: []
  });


  assert.end();
});

test('svg node generation', (assert) => {

  const vnode =
    <div>
      <svg width="100" height="100">
        <circle cx="50" cy="50" />
      </svg>
    </div>

  assert.equal(vnode.data.ns, undefined);

  assert.deepEqual(vnode.children[0], {
    sel: 'svg',
    key: undefined,
    data: {
      ns: SVGNS,
      attrs: { width: '100', height: '100' }
    },
    children: [{
      sel: 'circle',
      key: undefined,
      data: {
        ns: SVGNS,
        attrs: {cx: '50', cy: "50"}
      },
      children: []
    }]
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
