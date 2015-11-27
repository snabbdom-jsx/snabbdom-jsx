/** @jsx html */

import { html } from '../../snabbdom-jsx';
import snabbdom from 'snabbdom';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);

const AnimeNode = ({animate}) => {
  let animNode;
  if(animate)
    animNode =
      <animateTransform
        attributeName="transform"
        begin="0s"
        dur="20s"
        type="rotate"
        from="0 60 60"
        to="360 60 60"
        repeatCount="indefinite"
      />;

  return (
    <svg>
      <rect x="10" y="10" height="110" width="110" style-stroke="#ff0000" style-fill="#0000ff" >
        {animNode}
      </rect>
    </svg>
  );
};

const view = animate =>
  <div>
    <AnimeNode animate={animate} />
    <button on-click={toggleAnimate}>
      { animate ? 'Stop animation' : 'Start animation' }
    </button>
  </div>;

var vnode = document.getElementById('placeholder');
var animate = false;
function toggleAnimate() {
  animate = !animate;
  vnode = patch(vnode, view(animate));
}

toggleAnimate();
