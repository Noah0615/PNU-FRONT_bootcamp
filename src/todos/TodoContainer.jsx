// 할 일(todo) 관련 데이터와 관련된 상태 관리 및 API 요청을 처리

import { useEffect, useState } from "react";
import TodoHome from "./TodoHome";
import { produce } from 'immer'
import axios from 'axios'

const BASEURL = 'http://localhost:8000/todolist/gdhong'

const TodoContainer = () => {
    let [todoList, setTodoList] = useState([])

    //async, await - 비동기 (js core)
    //이 함수를 선언한 곳이 비동기로 호출.. 
    const fetchTodoList = async () => {
        setTodoList([])
        try {
            //정상처리 업무.. 
            //서버연동.. 데이터 획득.. 
            const response = await axios.get(BASEURL)
            setTodoList(response.data)
        } catch (e) {
            //try 영역에 에러 발생시 실행.. 
            if (e instanceof Error) alert('조회실패 : ' + e.message)
            else alert('조회실패 : ' + e)
        }
    }

    //최초에 서버 데이터 획득. fetchTodoList 호출.. 
    //class component 로 만들었다면.. lifecycle 함수를 이용.. 
    //함수형 컴포넌트에서도 일정정도 라이프사이클 사용 가능.. 
    useEffect(() => {
        fetchTodoList()
    }, [])//[] 부분이 변경될때마다 함수 호출.. 
    //[] 로 비워두면 최초 한번.. 

    //신규 항목 추가.. 
    const addTodo = async (todo, desc, callback) => {
        try {
            const response = await axios.post(BASEURL, { todo, desc })
            if (response.data.status === 'success') {
                //상태를 변경해야 한다. 신규 추가해서..
                //변경되지 않은 객체는 그대로 사용하기 위해서 .. 객체가 변경된
                //것인지를 검사한다.. 그때 유용한 패키지가 immer
                //immer 객체 변경된 것인지 판단..
                //immer 는 얕은 비교. 객체의 메모리 주소만 비교.. 
                let newTodoList = produce(todoList, (draft) => {
                    draft.push({ ...response.data.item, cone: false })
                })
                setTodoList(newTodoList)
                callback()
            } else {
                alert('추가실패 : ' + response.data.message)
            }
        } catch (e) {
            if (e instanceof Error) alert('등록실패 : ' + e.message)
            else alert('등록실패 : ' + e)
        }
    }

    const updateTodo = async (id, todo, desc, done, callback) => {
        try {
            const response = await axios.put(`${BASEURL}/${id}`, { todo, desc, done })
            if (response.data.status === 'success') {
                //수정한 데이터가 몇번째 index인지 확인
                let index = todoList.findIndex((todo) => todo.id === id)
                //상태 변경을 위한 list 만든다.. 얕은 비교해서..
                let newTodoList = produce(todoList, (draft) => {
                    draft[index] = { ...draft[index], todo, desc, done }
                })
                setTodoList(newTodoList)
                fetchTodoList(); // 데이터 자동 업데이트
                callback(); // 리디렉션
            } else {
                alert('수정실패 : ' + response.data.message)
            }
        } catch (e) {
            if (e instanceof Error) alert('수정실패 : ' + e.message)
            else alert('수정실패 : ' + e)
        }
    }

    const toggleDone = async (id) => {
        try {
            let todoItem = todoList.find((todo) => todo.id === id)
            // 해당 todo 항목의 done 상태를 반전시켜 서버에 PUT 요청을 보냅니다.
            const response = await axios.put(`${BASEURL}/${id}`, { ...todoItem, done: !todoItem.done })
            if (response.data.status === 'success') {
                let index = todoList.findIndex((todo) => todo.id === id)
                //immer 의 produce 함수를 사용하여 상태를 업데이트 한다.
                let newTodoList = produce(todoList, (draft) => {
                    draft[index].done = !draft[index].done // 완료 상태를 반전시킨다.
                })
                //상태를 새로운 todoList로 설정한다.
                setTodoList(newTodoList)
            } else {
                alert('상태변경실패 : ' + response.data.message);
            }
        } catch (e) {
            if (e instanceof Error) alert('상태변경실패 : ' + e.message);
            else alert('상태변경실패 : ' + e);
        }
    }

    const deleteTodo = async (id) => {
        try {
            //주어진 id 를 사용해서 서버에 delete 명령어 요청을 보냅니다.
            const response = await axios.delete(`${BASEURL}/${id}`)
            //서버의 응답이 성공적이라면
            if (response.data.status === 'success') {
                //삭제할 index를 찾고
                let index = todoList.findIndex((todo) => todo.id === id)
                //immer 의 produce 함수를 사용해서 상태를 안전하게 업데이트.
                let newTodoList = produce(todoList, (draft) => {
                    //삭제.
                    draft.splice(index, 1)
                })
                setTodoList(newTodoList)
            } else {
                alert('삭제실패 : ' + response.data.message);
            }
        } catch (e) {
            if (e instanceof Error) alert('삭제실패 : ' + e.message);
            else alert('삭제실패 : ' + e);
        }
    }

    //아래의 함수는 누가 호출하는가? 하위 컴포넌트가.. 하위에 props 로 전달
    const callbacks = { addTodo, updateTodo, toggleDone, deleteTodo }
    const states = { todoList }

    return <TodoHome callbacks={callbacks} states={states} />
}
export default TodoContainer

