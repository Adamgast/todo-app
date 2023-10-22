import PropTypes from 'prop-types';
import './new-task-form.css';
import { useState } from 'react';

function NewTaskForm({ onAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleMinChange = (e) => {
    setMin(e.target.value);
  };

  const handleSecChange = (e) => {
    setSec(e.target.value);
  };

  const handleSubmit = (e) => {
    if (label.trim() && (min.trim() || sec.trim())) {
      onAdded(label, min, sec);
    }
    setLabel('');
    setMin('');
    setSec('');
    e.preventDefault();
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input onChange={handleLabelChange} className="new-todo" placeholder="What needs to be done?" value={label} />
      <input
        onChange={handleMinChange}
        value={min}
        type="number"
        max="59"
        className="new-todo-form__timer"
        placeholder="Min"
      />
      <input
        onChange={handleSecChange}
        value={sec}
        type="number"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
      />
      <button aria-label="submit button" className="hidden" type="submit" />
    </form>
  );
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};

export default NewTaskForm;
