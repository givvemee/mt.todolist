import { useState } from "react";
import TodoItem from "./TodoItem";
import "./BasicTodo.css";
import "../components/shared/styles.css";

const BasicTodo = () => {
  const [todoList, setTodoList] = useState([
    { job: "장보기", state: "완료" }, // 0 키 (필드) - 밸류 쌍
    { job: "산책하기", state: "미완료" }, // 1
  ]);
  // TODO: 1. 할 일 입력을 위한 state 생성
  const [inputValue, setInputValue] = useState(""); // string

  // TODO: 2. 할 일 추가 함수 구현
  const addTodo = () => {
    if (inputValue === "") return; // early return
    const newTodo = {job: inputValue, state: '미완료'}
    setTodoList([ ... todoList, newTodo]);
    setInputValue("")

    // TODO: 9. 한국어를 입력했을 때 뒷 글자가 잘려서 새로운 투두로 입력되는 것 방지하기
  };

  // TODO: 3. 완료/미완료 토글 함수 구현
  const toggleTodoState = (index) => {  
    // 불변성 지켜줘야 해요 
    const newTodoList = [ ... todoList];
    newTodoList[index].state = newTodoList[index].state === '완료' ? '미완료' : '완료'
    setTodoList(newTodoList)
  };
  

  // TODO: 4. 할 일 삭제 함수 구현
  const deleteTodo = (index) => {  
    // 함수 실행 이후에 새로운 값을 반환하는 자바스크립트 함수들 : filter, map ..  
    const newTodoList = todoList.filter((item, i) => { i !== index });
    setTodoList(newTodoList)
  };

  // TODO: 5. Enter 키 처리 함수 (한국어 입력 고려)
  const handleKeyDown = (e) => { 
    console.log('e 가 무엇일까?', e);
    if (e.key === 'Enter') {
      addTodo();
    }

    // if (e.key !== 'Enter') return; //early return 
    // addTodo();
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 6. 입력 폼 구현 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
            /* TODO: 7. input 값 채우기 */
            value={inputValue} // 1번의 state 적용
            onChange={(e) => { // 입력 값이 변경될 때마다 state 업데이트
              const result = e.target.value
              setInputValue(result);
            }} // 1번의 setState 적용
            onKeyDown={handleKeyDown}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>

        {/* TODO: 8. 할 일 목록 렌더링 */}
        <div className="todo-list">
          {todoList.length === 0 ? (
            <div className="empty-state">
              <p className="empty-text">할 일이 없습니다</p>
              <p className="empty-subtext">새로운 할 일을 추가해보세요</p>
            </div>
          ) : (
            <div className="todo-items">
              {todoList.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  index={index}
                  toggleTodoState={toggleTodoState}
                  deleteTodo={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicTodo;
