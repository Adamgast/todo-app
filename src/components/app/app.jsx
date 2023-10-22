import { useState } from 'react';

import Footer from '../footer/footer';
import TaskList from '../task-list/task-list';
import NewTaskForm from '../new-task-form/new-task-form';

import './app.css';

function App() {
  const [todoDate, setTodoDate] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const changeFilter = (filterName) => setFilter(filterName);

  const searchIdxItem = (arr, id) => arr.findIndex((item) => item.id === id);

  const toggleProperty = (arr, id, propName) => {
    const index = searchIdxItem(arr, id);
    const oldItem = arr[index];
    return [...arr.slice(0, index), { ...oldItem, [propName]: !oldItem[propName] }, ...arr.slice(index + 1)];
  };

  const onToggleEdit = (id) => {
    setTodoDate((prevTodoDate) => toggleProperty(prevTodoDate, id, 'edit'));
  };

  const onToggleDone = (id) => {
    setTodoDate((prevTodoDate) => toggleProperty(prevTodoDate, id, 'done'));
  };

  const uploadTimer = (id) => {
    setTodoDate((prevTodoDate) => {
      const index = searchIdxItem(prevTodoDate, id);
      const oldItem = prevTodoDate[index];
      let { min, sec } = oldItem;
      sec -= 1;
      if (sec < 0) {
        if (min <= 0) {
          sec = 0;
          min = 0;
        } else {
          sec = 59;
          min -= 1;
        }
      }
      const newDate = [...prevTodoDate.slice(0, index), { ...oldItem, min, sec }, ...prevTodoDate.slice(index + 1)];
      return newDate;
    });
  };

  const editTimerId = (id, timerId) => {
    setTodoDate((prevTodoDate) => {
      const index = searchIdxItem(prevTodoDate, id);
      const oldItem = prevTodoDate[index];
      const newDate = [...prevTodoDate.slice(0, index), { ...oldItem, timerId }, ...prevTodoDate.slice(index + 1)];
      return newDate;
    });
  };

  const getId = () => {
    const date = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const newId = parseInt(`${date}${random}`, 10);
    return newId;
  };

  const addItem = (label, min, sec) => {
    const newItem = {
      id: getId(),
      label,
      done: false,
      edit: false,
      date: new Date(),
      timerId: 0,
      min: Number(min),
      sec: Number(sec),
    };
    setTodoDate((prevTodoDate) => {
      const newDate = [...prevTodoDate, newItem];
      return newDate;
    });
  };

  const editItem = (id, label) => {
    setTodoDate((prevTodoDate) => {
      const index = searchIdxItem(prevTodoDate, id);
      const oldItem = prevTodoDate[index];
      const newDate = [
        ...prevTodoDate.slice(0, index),
        { ...oldItem, label, edit: !oldItem.edit },
        ...prevTodoDate.slice(index + 1),
      ];
      return newDate;
    });
  };

  const deleteItem = (id) => {
    setTodoDate((prevTodoDate) => {
      const index = searchIdxItem(prevTodoDate, id);
      const newDate = [...prevTodoDate.slice(0, index), ...prevTodoDate.slice(index + 1)];
      return newDate;
    });
  };

  const deleteCompleted = () => {
    setTodoDate((prevTodoDate) => {
      const activeItems = prevTodoDate.filter((el) => el.done === false);
      return activeItems;
    });
  };

  const filteredDate = () =>
    todoDate.filter((item) => {
      if (filter === 'ALL') {
        return true;
      }
      if (filter === 'Completed') {
        return item.done === true;
      }
      return item.done === false;
    });

  const todoCount = todoDate.filter((el) => el.done === false).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredDate()}
          onDeleted={deleteItem}
          onEdited={editItem}
          onToggleEdit={onToggleEdit}
          onToggleDone={onToggleDone}
          onUploadTimer={uploadTimer}
          onEditTimerId={editTimerId}
        />

        <Footer todoCount={todoCount} onClear={deleteCompleted} filter={filter} onChangeFilter={changeFilter} />
      </section>
    </section>
  );
}

export default App;
