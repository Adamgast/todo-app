import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Component } from 'react';
import './task.css';

class Task extends Component {
	state = {
		label: this.props.label
	};

	handleChangeLabel = (e) => {
		this.setState({ label: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.label !== '') {
			this.props.onEdited(this.state.label);
		} else {
			this.props.onDeleted();
		}
	};

	render() {
		const { edit, done, label, date, onDeleted, onToggleDone, onToggleEdit } = this.props;
		const formElement = (
			<form onSubmit={this.handleSubmit}>
				<input onChange={this.handleChangeLabel} type="text" className="edit" value={this.state.label} autoFocus />
			</form>
		);
		return (
			<div>
				<div className="view">
					<input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
					<label>
						<span className="description">{label}</span>
						<span className="created">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
					</label>
					<button className="icon icon-edit" onClick={onToggleEdit}></button>
					<button className="icon icon-destroy" onClick={onDeleted}></button>
				</div>
				{edit ? formElement : null}
			</div>
		);
	}
}

Task.propTypes = {
	done: PropTypes.bool,
	edit: PropTypes.bool,
	label: PropTypes.string,
	date: PropTypes.instanceOf(Date),
}

export default Task;