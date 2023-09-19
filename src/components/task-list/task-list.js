import Task from '../task/task';
import PropTypes from 'prop-types';
import './task-list.css';

function TaskList({ todos, onDeleted, onEdited, onToggleDone, onToggleEdit }) {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;
		let className = null;
		if (itemProps.done) {
			className = 'completed';
		}
		if (itemProps.edit) {
			className = "editing";
		}

		return (
			<li key={id} className={className}>
				<Task {...itemProps}
					onDeleted={() => onDeleted(id)}
					onEdited={(label) => onEdited(id, label)}
					onToggleEdit={() => onToggleEdit(id)}
					onToggleDone={() => onToggleDone(id)} />
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