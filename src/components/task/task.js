import './task.css';

function Task(props) {
	const { checked, label, onDeleted, onToggleEdit, onToggleDone } = props;
	return (
		<div className="view">
			<input className="toggle" type="checkbox" checked={checked} onChange={onToggleDone} />
			<label>
				<span className="description">{label}</span>
				<span className="created">created 17 seconds ago</span>
			</label>
			<button className="icon icon-edit" onClick={onToggleEdit}></button>
			<button className="icon icon-destroy" onClick={onDeleted}></button>
		</div>
	);
}

export default Task;