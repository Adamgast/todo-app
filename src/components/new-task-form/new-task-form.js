import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
	static defaultProps = {
		onAdded: () => { },
	}
	static propTypes = {
		onAdded: PropTypes.func,
	}

	state = {
		label: ''
	};

	handleLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.label.trim()) {
			this.props.onAdded(this.state.label);
		}
		this.setState({ label: '' });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
				<input onChange={this.handleLabelChange} className="new-todo" placeholder="What needs to be done?" value={this.state.label} autoFocus />
			</form>
		);
	}
}