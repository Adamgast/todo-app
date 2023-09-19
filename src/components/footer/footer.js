import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css';
function Footer({ todoCount, onClear, filter, onChangeFilter }) {
	return (
		<footer className="footer">
			<span className="todo-count">{todoCount} items left</span>
			<TasksFilter filter={filter} onChangeFilter={onChangeFilter} />
			<button onClick={onClear} className="clear-completed">Clear completed</button>
		</footer>
	);
}
Footer.defaulProps = {
	todoCount: 0,
	onClear: () => { },
	onChangeFilter: () => { },
}
export default Footer;