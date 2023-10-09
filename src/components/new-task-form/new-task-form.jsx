import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  handleMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  handleSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  render() {
    const { onAdded } = this.props;
    const { label, min, sec } = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      if (label.trim()) {
        onAdded(label, min, sec);
      }
      this.setState({ label: '', min: '', sec: '' });
    };
    return (
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          onChange={this.handleLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
        />
        <input
          onChange={this.handleMinChange}
          value={min}
          type="number"
          max="59"
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          onChange={this.handleSecChange}
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
}
NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
