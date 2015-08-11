/** @jsx html */

import { html } from '../../../snabbdom-jsx';
import Type from 'union-type';
import { bind, pipe, isBoolean }  from './helpers';

const KEY_ENTER = 13;

// model : {id: Number, title: String, done: Boolean, editing: Boolean, editingValue: String }
const Action = Type({
  SetTitle      : [String],
  Toggle        : [isBoolean],
  StartEdit     : [],
  CommitEdit    : [String],
  CancelEdit    : []
});

const targetChecked = e => e.target.checked;
const targetValue = e => e.target.value;

function onInput(handler, e) {
  if(e.keyCode === KEY_ENTER)
    handler(Action.CommitEdit(e.target.value))
}

const view = ({model, handler, onRemove}) =>
    <li
      key={model.id}
      class-completed={!!model.done && !model.editing}
      class-editing={model.editing}>
      
      <div classNames="view">
        <input 
          classNames="toggle"
          type="checkbox"
          checked={!!model.done}
          on-click={ pipe(targetChecked, Action.Toggle, handler) } />
          
        <label
          on-dblclick={ bind(handler, Action.StartEdit()) }>{model.title}</label>
          
        <button
          classNames="destroy"
          on-click={onRemove} />
      </div>
      
      <input
        classNames="edit"
        value={model.title}
        on-blur={ bind(handler, Action.CancelEdit()) }
        on-keydown={ bind(onInput, handler) } />
    </li>


function init(id, title) {
  return { id, title, done: false, editing: false, editingValue: '' };
}

function update(task, action) {
  return Action.case({
    Toggle      : done  => ({...task, done}),
    StartEdit   : () => ({...task, editing: true, editingValue: task.title}),
    CommitEdit  : title => ({...task, title, editing: false,  editingValue: ''}),
    CancelEdit  : title => ({...task, editing: false,  editingValue: ''})
  }, action);
}

export default { view, init, update, Action }
