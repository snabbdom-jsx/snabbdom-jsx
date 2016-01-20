"use strict";

var SVGNS = 'http://www.w3.org/2000/svg';    
var modulesNS = ['hook', 'on', 'style', 'class', 'props', 'attrs'];
var slice = Array.prototype.slice;

var events = [
  'cut', 'copy', 'paste',
  'keydown', 'keypress', 'keyup',
  'focus', 'blur', 'change', 'input', 'submit',
  'click', 'contextmenu', 'dblclick',
  'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop',
  'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'select',
  'touchcancel', 'touchend', 'touchmove', 'touchstart',
  'scroll', 'wheel',
  'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended'
];

var propMap = {
  defaultValue: 'value'
};

function isNativeEvent(key) {
  return events.indexOf(toNativeEvent(key)) > -1;
}

function toNativeEvent(key) {
  return key.slice(2).replace(/ouble/, 'bl').toLowerCase();
}

function assign(obj, ext) {
  for (var prop in ext) {
    obj[prop] = (obj.hasOwnProperty(prop)) ? obj[prop] : ext[prop];
  }
  return obj;
}

function isPrimitive(val) {
  return  typeof val === 'string'   ||
          typeof val === 'number'   ||
          typeof val === 'boolean'  ||
          typeof val === 'symbol'   ||
          val === null              ||
          val === undefined;
}

function normalizeAttrs(attrs, nsURI, defNS, modules) {
  var map = { ns: nsURI };
  for (var i = 0, len = modules.length; i < len; i++) {
    var mod = modules[i];
    if(attrs[mod])
      map[mod] = attrs[mod];
  }
  for(var key in attrs) {
    if(key !== 'key' && key !== 'classNames' && key !== 'selector') {
      var idx = key.indexOf('-');
      if(idx > 0)
        addAttr(key.slice(0, idx), key.slice(idx+1), attrs[key]);
      else if(isNativeEvent(key))
        addAttr('on', toNativeEvent(key), attrs[key]);
      else if(key in propMap)
        addAttr(defNS, propMap[key], attrs[key]);
      else if(!map[key])
        addAttr(defNS, key, attrs[key]);
    }
  }
  return map;

  function addAttr(namespace, key, val) {
    var ns = map[namespace] || (map[namespace] = {});
    ns[key] = val;
  }
}

function buildFromStringTag(nsURI, defNS, modules, tag, attrs, children) {

  if(attrs.selector) {
    tag = tag + attrs.selector;
  }
  if(attrs.classNames) {
    var cns = attrs.classNames;
    tag = tag + '.' + (
      Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.')
    );
  }

  return {
    sel       : tag,
    data      : normalizeAttrs(attrs, nsURI, defNS, modules),
    children  : children.map( function(c) {
      return isPrimitive(c) ? {text: c} : c;
    }),
    key: attrs.key
  };
}

function buildFromComponent(nsURI, defNS, modules, tag, attrs, children) {
  var res;
  if(typeof tag === 'function')
    res = tag(assign(attrs, { children: children }));
  else if(tag && typeof tag.view === 'function')
    res = tag.view(assign(attrs, { children: children }));
  else if(tag && typeof tag.render === 'function')
    res = tag.render(assign(attrs, { children: children }));
  else
    throw "JSX tag must be either a string, a function or an object with 'view' or 'render' methods";
  res.key = attrs.key;
  return res;
}

function buildVnode(nsURI, defNS, modules, tag, attrs, children) {
  attrs = attrs || {};
  if(typeof tag === 'string') {
    return buildFromStringTag(nsURI, defNS, modules, tag, attrs, children)
  } else {
    return buildFromComponent(nsURI, defNS, modules, tag, attrs, children)
  }
}

function JSX(nsURI, defNS, modules) {
  return function jsxWithCustomNS(tag, attrs, children) {
    if(arguments.length > 3 || !Array.isArray(children))
      children = slice.call(arguments, 2);
    return buildVnode(nsURI, defNS || 'props', modules || modulesNS, tag, attrs, children);
  };
}

module.exports = {
  html: JSX(undefined),
  svg: JSX(SVGNS, 'attrs'),
  JSX: JSX
};
