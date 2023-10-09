import PropTypes from 'prop-types';

import Task from '../task/task';
import './task-list.css';

function TaskList({ todos, onDeleted, onEdited, onToggleDone, onToggleEdit, onUploadTimer }) {
  const elements = todos.map((item) => {
    const { id } = item;
    let className = null;
    if (item.done) {
      className = 'completed';
    }
    if (item.edit) {
      className = 'editing';
    }

    return (
      <li key={id} className={className}>
        <Task
          todo={item}
          onDeleted={() => onDeleted(id)}
          onEdited={(label) => onEdited(id, label)}
          onToggleEdit={() => onToggleEdit(id)}
          onToggleDone={() => onToggleDone(id)}
          onUploadTimer={(min, sec) => onUploadTimer(id, min, sec)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleDone: () => {},
  todos: [],
};
TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
};

export default TaskList;