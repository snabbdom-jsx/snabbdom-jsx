/** @jsx html */

import { html } from '../../../snabbdom-jsx';
import Type from 'union-type';
import { bind, pipe, isBoolean }  from './helpers';
import Task from './task';

const KEY_ENTER = 13;

// model : { nextID: Number, editingTitle: String, tasks: [task.model], filter: String }
const Action = Type({
  Add           : [String],
  Remove        : [Number],
  Archive       : [],
  ToggleAll     : [isBoolean],
  Filter        : [String],
  Modify        : [Number, Task.Action]
});

const targetChecked = e => e.target.checked;
const targetValue = e => e.target.value;

function onInput(handler, e) {
  if(e.keyCode === KEY_ENTER) {
    handler(Action.Add(e.target.value));
  }
    
}

function view({model, handler}) {
  
  const remaining = remainingTodos(model.tasks);
  const filtered  = filteredTodos(model.tasks, model.filter);
  
  return  <section 
            classNames="todoapp" 
            windowOn-hashchange={ _ => handler(Action.Filter(window.location.hash.substr(2) || 'all')) }>
            
            <header classNames="header" >
              <h1>todos</h1>
              <input
                classNames="new-todo"
                placeholder="What needs to be done?"
                value={model.editingTitle}
                on-keydown={ bind(onInput, handler) } />
            </header>
            
            <section
              classNames="main"
              style-display={ model.tasks.length ? 'block' : 'none' }>
              
              <input
                classNames="toggle-all"
                type="checkbox"
                checked={ remaining === 0 }
                on-click={ pipe(targetChecked, Action.ToggleAll, handler) } />
                
              <ul classNames="todo-list">
                { filtered.map( task => <TodoItem item={task} handler={handler} /> ) }
              </ul>
            </section>
              
            <footer
              classNames="footer"
              style-display={ model.tasks.length ? 'block' : 'none' }>
              
              <span classNames="todo-count">
                <strong>{remaining}</strong> item{remaining === 1 ? '' : 's'} left
              </span>
              <ul classNames="filters">
                <li><a href="#/" class-selected={model.filter === 'all'}>All</a></li>
                <li><a href="#/active" class-selected={model.filter === 'active'}>Active</a></li>
                <li><a href="#/completed" class-selected={model.filter === 'completed'}>Completed</a></li>
              </ul>
              <button
                classNames="clear-completed"
                on-click={ bind(handler, Action.Archive()) }>Clear completed</button>
            </footer>
            
          </section>
  
}

const TodoItem = ({item, handler}) =>
  <Task
    model={item}
    handler={ action => handler(Action.Modify(item.id, action)) }
    onRemove={ bind(handler, Action.Remove(item.id)) } />


function init(tasks=[]) {
  return { 
    nextID: tasks.reduce((acc, task) => Math.max(acc, task.id), 0) + 1, 
    tasks, 
    editingTitle: '', 
    filter: 'all' 
  }
}

function remainingTodos(tasks) {
  return tasks.reduce( (acc, task) => !task.done ? acc+1 : acc, 0);
}

function filteredTodos(tasks, filter) {
  return   filter === 'completed' ? tasks.filter( todo => todo.done )
         : filter === 'active'    ? tasks.filter( todo => !todo.done )
                                  : tasks;
}

function addTodo(model, title) {
  return {...model,
    tasks         : [ ...model.tasks, 
                    Task.init(model.nextID, title)],
    editingTitle  : '',
    nextID        : model.nextID + 1
  }
}

function removeTodo(model, id) {
  return {...model,
    tasks : model.tasks.filter( taskModel => taskModel.id !== id )
  };
}

function archiveTodos(model, id) {
  return {...model,
    tasks : model.tasks.filter( taskModel => !taskModel.done )
  };
}

function toggleAll(model, done) {
  return {...model,
    tasks : model.tasks.map( taskModel => Task.update(taskModel, task.Action.Toggle(done))  )
  };
}


function modifyTodo(model ,id, action) {
  return {...model,
    tasks : model.tasks.map( taskModel => taskModel.id !== id ? taskModel : Task.update(taskModel, action)  )
  };
}



function update(model, action) {
  return Action.case({
    Add       : title => addTodo(model, title),
    Remove    : id => removeTodo(model, id),
    Archive   : () => archiveTodos(model),
    ToggleAll : done => toggleAll(model, done),
    Filter    : filter => ({...model, filter }),
    Modify    : (id, action) => modifyTodo(model, id, action)
  }, action);
}

export default { view, init, update, Action }