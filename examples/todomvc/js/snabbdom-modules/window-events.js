import eventlisteners from 'snabbdom/modules/eventlisteners';

function updateWindowEvents(oldVnode, vnode) {
  eventlisteners.update(
    { elm: window, data: { on: oldVnode.data.windowOn} },
    { elm: window, data: { on: vnode.data.windowOn} }
  );
}


export default {create: updateWindowEvents, update: updateWindowEvents};