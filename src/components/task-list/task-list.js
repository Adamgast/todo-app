import Task from '../task/task';
import PropTypes from 'prop-types';
import './task-list.css';

function TaskList({ todos, onDeleted, onToggleEdit, onToggleDone }) {
	const elements = todos.map((item) => {
		const { id, done, edit, ...itemProps } = item;
		let className = null;
		if (done) {
			className = 'completed';
		}
		if (edit) {
			className = "editing";
		}

		return (
			<li key={id} className={className}>
				<Task {...itemProps} checked={done}
					onDeleted={() => onDeleted(id)}
					onToggleEdit={() => onToggleEdit(id)}
					onToggleDone={() => onToggleDone(id)} />
				{edit ? <input type="text" className="edit" /> : null}
			</li>
		);
	});

	return (
		<ul className="todo-list">
			{elements}
		</ul>
	);
}

TaskList.defaultProps = {
	onDeleted: () => { },
	onToggleEdit: () => { },
	onToggleDone: () => { },
	todos: []
}
TaskList.propTypes = {
	onDeleted: PropTypes.func,
	onToggleEdit: PropTypes.func,
	onToggleDone: PropTypes.func,
	todos: PropTypes.arrayOf(PropTypes.object)
}

export default TaskList;