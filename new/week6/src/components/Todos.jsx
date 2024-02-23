import React, { useState } from "react";

let todos = [
	{ id: 1, title: "titlefdgf1", desc: "desacascjkaskjf1" },
	{ id: 2, title: "titlefdgf1", desc: "desacascjkaskjf1" },
	{ id: 3, title: "titlefdgf1", desc: "desacascjkaskjf1" },
];
let nextid = 4;

const Todos = () => {
	const [Todos, setTodos] = useState(todos);

	const addTodo = () => {
		setTodos([
			...Todos,
			{
				id: nextid++,
				title: Math.random(),
				desc: Math.random(),
			},
		]);
		console.log(nextid, Todos);
	};
	return (
		<div>
			<button onClick={addTodo}>add todo</button>

			<br />
			{Todos.map((i) => {
				return (
					<TodoWrapper>
						<Todo key={i.id} title={i.title} desc={i.desc} />
					</TodoWrapper>
				);
			})}
		</div>
	);
};

const Todo = ({ title, desc }) => {
	return (
		<div>
			<h1>{title}</h1>
			<h2>{desc}</h2>
		</div>
	);
};
const TodoWrapper = React.memo(({ children }) => {
	return (
		<div
			style={{
				margin: "0.3rem",
				padding: "0.8rem",
				fontSize: "1rem",
				backgroundColor: "yellow",
			}}
		>
			{children}
		</div>
	);
});

export default Todos;
