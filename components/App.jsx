// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateNewTaskText, addTask, removeTask } from '../actions/index.js';

// BEGIN (write your solution here)

const mapStateToProps = (state) => {
  const props = {
    tasks: state.tasks,
    text: state.text,
  };
  return props;
};

class App extends React.Component {
  handleChangeText = (e) => {
    e.preventDefault();
    const { dispatch } = this.props; // создаем переменную диспач в пропсе...
    dispatch(updateNewTaskText(e.target.value)); // с помощью диспача передаем наш экшен в редъюсер
  }

  handleAddTask = (e) => {
    e.preventDefault();
    const { dispatch, text } = this.props;
    const task = { text, id: _.uniqueId() }; // сама таска с текстом и id
    dispatch(addTask(task));
  }

  handleRemoveTask = (id) => {
    const { dispatch } = this.props;
    dispatch(removeTask(id));
  }

  render() {
    const { tasks, text } = this.props;
    const listTasksItems = tasks.map((task) => (
      <li className="list-group-item d-flex" key={task.id}>
        <span className="mr-auto">{ task.text }</span>
        <button type="button" className="close" onClick={() => this.handleRemoveTask(task.id)}>
          <span>&times;</span>
        </button>
      </li>
    ));

    const listTasks = (
      <div className="mt-3">
        <ul className="list-group">{listTasksItems}</ul>
      </div>
    );

    return (
      <div className="col-5">
        <form action="" className="form-inline" onSubmit={this.handleAddTask}>
          <div className="form-group mx-sm-3">
            <input type="text" required value={text} onChange={this.handleChangeText} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Add</button>
        </form>
        {tasks.length > 0 ? listTasks : null}
      </div>
    );
  }
}
export default connect(mapStateToProps)(App);
// END
