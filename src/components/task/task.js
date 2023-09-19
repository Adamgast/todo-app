import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

function Task(props) {
	const { checked, label, date, onDeleted, onToggleEdit, onToggleDone } = props;
	return (
		<div className="view">
			<input className="toggle" type="checkbox" checked={checked} onChange={onToggleDone} />
			<label>
				<span className="description">{label}</span>
				<span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
			</label>
			<button className="icon icon-edit" onClick={onToggleEdit}></button>
			<button className="icon icon-destroy" onClick={onDeleted}></button>
		</div>
	);
}

Task.propTypes = {
	checked: PropTypes.bool,
	label: PropTypes.string,
	date: PropTypes.instanceOf(Date),
}

export default Task;