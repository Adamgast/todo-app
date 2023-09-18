import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
	state = {
		label: ''
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAdded(this.state.label);
		this.setState({ label: '' });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit} >
				<input onChange={this.onLabelChange} className="new-todo" placeholder="What needs to be done?" value={this.state.label} autoFocus />
			</form>
		);
	}
}