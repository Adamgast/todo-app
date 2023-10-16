import { Component } from 'react';

import Footer from '../footer/footer';
import TaskList from '../task-list/task-list';
import NewTaskForm from '../new-task-form/new-task-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  constructor() {
    super();
    this.state = {
      todoDate: [],
      filter: 'ALL',
    };
  }

  changeFilter = (filterName) => {
    this.setState({ filter: filterName });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoDate }) => ({
      todoDate: this.toggleProperty(todoDate, id, 'edit'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoDate }) => ({
      todoDate: this.toggleProperty(todoDate, id, 'done'),
    }));
  };

  uploadTimer = (id) => {
    this.setState(({ todoDate }) => {
      const index = this.searchIdxItem(todoDate, id);
      const oldItem = todoDate[index];
      const { min, sec } = oldItem;
      let newDate = [...todoDate.slice(0, index), { ...oldItem, min, sec: sec + 1 }, ...todoDate.slice(index + 1)];
      if (sec === 59) {
        newDate = [...todoDate.slice(0, index), { ...oldItem, min: min + 1, sec: 0 }, ...todoDate.slice(index + 1)];
      }
      return { todoDate: newDate };
    });
  };

  editTimerId = (id, timerId) => {
    this.setState(({ todoDate }) => {
      const index = this.searchIdxItem(todoDate, id);
      const oldItem = todoDate[index];
      const newDate = [...todoDate.slice(0, index), { ...oldItem, timerId }, ...todoDate.slice(index + 1)];
      return { todoDate: newDate };
    });
  };

  addItem = (label, min, sec) => {
    this.setState(({ todoDate }) => {
      const newDate = [...todoDate, this.createToDoItem(label, min, sec)];
      return { todoDate: newDate };
    });
  };

  editItem = (id, label) => {
    this.setState(({ todoDate }) => {
      const index = this.searchIdxItem(todoDate, id);
      const oldItem = todoDate[index];
      const newDate = [
        ...todoDate.slice(0, index),
        { ...oldItem, label, edit: !oldItem.edit },
        ...todoDate.slice(index + 1),
      ];
      return { todoDate: newDate };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoDate }) => {
      const index = this.searchIdxItem(todoDate, id);
      const newDate = [...todoDate.slice(0, index), ...todoDate.slice(index + 1)];
      return { todoDate: newDate };
    });
  };

  deleteCompleted = () => {
    this.setState(({ todoDate }) => {
      const activeItems = todoDate.filter((el) => el.done === false);
      return {
        todoDate: activeItems,
      };
    });
  };

  filteredDate = () => {
    const { todoDate, filter } = this.state;
    return todoDate.filter((item) => {
      if (filter === 'ALL') {
        return true;
      }
      if (filter === 'Completed') {
        return item.done === true;
      }
      return item.done === false;
    });
  };

  // eslint-disable-next-line class-methods-use-this
  searchIdxItem(arr, id) {
    return arr.findIndex((item) => item.id === id);
  }

  createToDoItem(label, min, sec) {
    return {
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      label,
      done: false,
      edit: false,
      date: new Date(),
      timerId: 0,
      min: Number(min),
      sec: Number(sec),
    };
  }

  toggleProperty(arr, id, propName) {
    const index = this.searchIdxItem(arr, id);
    const oldItem = arr[index];
    return [...arr.slice(0, index), { ...oldItem, [propName]: !oldItem[propName] }, ...arr.slice(index + 1)];
  }

  render() {
    const { todoDate, filter } = this.state;
    const todoCount = todoDate.filter((el) => el.done === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filteredDate()}
            onDeleted={this.deleteItem}
            onEdited={this.editItem}
            onToggleEdit={this.onToggleEdit}
            onToggleDone={this.onToggleDone}
            onUploadTimer={this.uploadTimer}
            onEditTimerId={this.editTimerId}
          />

          <Footer
            todoCount={todoCount}
            onClear={this.deleteCompleted}
            filter={filter}
            onChangeFilter={this.changeFilter}
          />
        </section>
      </section>
    );
  }
}
