import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const { onAdded } = this.props;
    const { label } = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      if (label.trim()) {
        onAdded(label);
      }
      this.setState({ label: '' });
    };
    return (
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          onChange={this.handleLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
        />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
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
