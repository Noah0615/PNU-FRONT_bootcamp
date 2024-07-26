//사용자가 할 일을 수정할 수 있는 폼을 제공하는 역할


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTodo = ({ callbacks, states }) => {
    // URL 파라미터에서 id 항목을 가져온다.
    let { id } = useParams();
    const navigate = useNavigate(); // 페이지 이동을 위해 사용
    //컴포넌트 상태 초기화
    const [todo, setTodo] = useState(''); //todo 항목의 제목
    const [desc, setDesc] = useState(''); //todo 항목의 설명
    const [done, setDone] = useState(false); //todo 항목의 완료상태

    //컴포넌트가 렌더링될 때 아이디와 상태에 따라 useEffect 혹이 실행된다.
    useEffect(() => {
        //states.todoList 에서 id 에 해당하는 todo 항목을 찾습니다.
        const todoItem = states.todoList.find(item => item.id === parseInt(id));
        //항목이 존재한다면 상태를 업데이트 합니다.
        if (todoItem) {
            setTodo(todoItem.todo);
            setDesc(todoItem.desc);
            setDone(todoItem.done);
        }
    }, [id, states.todoList]); // id와 states.todoList가 변경될 때마다 useEffect가 실행됩니다.

    //수정버튼 클릭시 호출되는 핸들러
    const updateTodoHandler = () => {
        //callbacks.updateTodo 함수를 호출하여 todo 항목을 수정합니다.
        //수정이 완료되면 todos로 리다이렉션합니다.
        callbacks.updateTodo(id, todo, desc, done, () => navigate('/todos'));
    };

    return (
        <>
            <div className="row">
                <div className="col p-3"><h2>할일 수정</h2></div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="todo">할일</label>
                        <input
                            type="text"
                            className="form-control"
                            id="todo"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">설명</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="done">완료 여부</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="done"
                            checked={done}
                            onChange={(e) => setDone(e.target.checked)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary m-1"
                            onClick={updateTodoHandler}>수정</button>
                        <button type="button" className="btn btn-secondary m-1"
                            onClick={() => navigate('/todos')}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;
