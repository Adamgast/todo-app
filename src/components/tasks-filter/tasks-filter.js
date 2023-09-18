import { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
	render() {
		const { filter } = this.props;
		return (
			<ul className="filters">
				<li>
					<button onClick={() => this.props.onChangeFilter('ALL')}
						className={filter === "ALL" ? 'selected' : null}>All</button>
				</li>
				<li>
					<button onClick={() => this.props.onChangeFilter('Active')}
						className={filter === "Active" ? 'selected' : null}>Active</button>
				</li>
				<li>
					<button onClick={() => this.props.onChangeFilter('Completed')}
						className={filter === "Completed" ? 'selected' : null}>Completed</button>
				</li>
			</ul>
		);
	}
}