import { Component } from 'react';
import Footer from '../footer/footer';
import TaskList from '../task-list/task-list';
import NewTaskForm from '../new-task-form/new-task-form';

import './app.css';

export default class App extends Component {
	maxId = 100;
	state = {
		todoDate: [],
		filter: 'ALL'
	};

	toggleProperty(arr, id, propName) {
		const index = arr.findIndex((item) => item.id === id);
		const oldItem = arr[index];
		return [
			...arr.slice(0, index),
			{ ...oldItem, [propName]: !oldItem[propName] },
			...arr.slice(index + 1)
		];
	}

	createToDoItem(label) {
		return {
			id: this.maxId++,
			label,
			done: false,
			edit: false,
			date: new Date(),
		}
	}

	onToggleEdit = (id) => {
		this.setState(({ todoDate }) => {
			return {
				todoDate: this.toggleProperty(todoDate, id, 'edit')
			}
		})
	}

	onToggleDone = (id) => {
		this.setState(({ todoDate }) => {
			return {
				todoDate: this.toggleProperty(todoDate, id, 'done')
			}
		})
	}

	addItem = (label) => {
		this.setState(({ todoDate }) => {
			const newDate = [...todoDate, this.createToDoItem(label)];
			return { todoDate: newDate }
		})
	}

	deleteItem = (id) => {
		this.setState(({ todoDate }) => {
			const index = todoDate.findIndex((item) => item.id === id);
			const newDate = [
				...todoDate.slice(0, index),
				...todoDate.slice(index + 1)
			];
			return { todoDate: newDate }
		})
	};

	deleteCompleted = () => {
		this.setState(({ todoDate }) => {
			const activeItems = todoDate.filter(el => el.done === false);
			return {
				todoDate: activeItems
			}
		});
	};

	filteredDate = () => {
		const { todoDate, filter } = this.state;
		return todoDate.filter((item) => {
			if (filter === "ALL") {
				return true;
			}
			else if (filter === "Completed") {
				return item.done === true;
			}
			else {
				return item.done === false;
			}
		})
	}

	changeFilter = (filterName) => {
		this.setState({ filter: filterName });
	}

	render() {
		const todoCount = this.state.todoDate.filter(el => el.done === false).length;

		return (
			<section className="todoapp">
				<header className="header">
					<h1>Todos</h1>
					<NewTaskForm onAdded={this.addItem} />
				</header>
				<section className="main">
					<TaskList todos={this.filteredDate()}
						onDeleted={this.deleteItem}
						onToggleEdit={this.onToggleEdit}
						onToggleDone={this.onToggleDone} />

					<Footer todoCount={todoCount}
						onClear={this.deleteCompleted}
						filter={this.state.filter}
						onChangeFilter={this.changeFilter}
					/>
				</section>
			</section>
		);
	}
}