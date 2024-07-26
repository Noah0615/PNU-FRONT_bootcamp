//할 일(todo) 관련 화면을 라우팅하는 역할

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
//todo 와 관련된 화면을 routing 해주는 역할..
const TodoHome = ({ states, callbacks }) => {
    return (
        <Routes>
            <Route path="/"
                element={<TodoList states={states} callbacks={callbacks} />} />
            <Route path="add" element={<AddTodo callbacks={callbacks} />} />
            <Route path="edit/:id" element={<EditTodo callbacks={callbacks} states={states} />} />
        </Routes>
    )
}

export default TodoHome