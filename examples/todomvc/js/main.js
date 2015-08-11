import snabbdom from 'snabbdom';
import Todos from './todos';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
  require('./snabbdom-modules/window-events') // attaches event listeners to windows
]);




function main(initState, oldVnode, {view, update}) {
  const newVnode = view({
    model     : initState, 
    handler : e => {
      const newState = update(initState, e);
      main(newState, newVnode, {view, update});
    }
  });
  patch(oldVnode, newVnode);
}

main(
 Todos.init(), // the initial state 
  document.getElementById('todoapp'), 
  Todos
);