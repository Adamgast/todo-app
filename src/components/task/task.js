/* eslint-disable jsx-a11y/control-has-associated-label */
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Component } from 'react';
import './task.css';

class Task extends Component {
  constructor(props) {
    super();
    this.label = props.todo.label;
    this.state = {
      labelState: this.label,
    };
  }

  handleChangeLabel = (e) => {
    this.setState({ labelState: e.target.value });
  };

  handleSubmit = (e) => {
    const { labelState } = this.state;
    const { onEdited, onDeleted } = this.props;
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      onDeleted();
    }
  };

  render() {
    const { todo, onDeleted, onToggleDone, onToggleEdit } = this.props;
    const { id, edit, done, label, date } = todo;
    const { labelState } = this.state;
    const formElement = (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChangeLabel} type="text" className="edit" value={labelState} />
      </form>
    );
    return (
      <div>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" type="button" />
              <button className="icon icon-pause" type="button" />
              12:25
            </span>
            <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          </label>
          <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? formElement : null}
      </div>
    );
  }
}

Task.defaultProps = {
  todo: {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    label: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
};

export default Task;
