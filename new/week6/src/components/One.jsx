import React, { useMemo, useState } from "react";

// use memo
const One = () => {
	const [X, setX] = useState(0);
	let val = useMemo(() => {
		let val = 0;
		val = X * 2;
		return val;
	}, [X]);

	// const addTodo = useCallback(() => {
	// 	setTodos((t) => [...t, "New Todo"]);
	//   }, [todos]);

	return (
		<div>
			{/* setX */}
			<button
				onClick={() => {
					setX(X + 1);
				}}
			>
				hjdfbsd+{val}
			</button>
		</div>
	);
};

export default One;
