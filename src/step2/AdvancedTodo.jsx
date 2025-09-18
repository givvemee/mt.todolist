import { useState } from 'react';
import '../components/shared/styles.css';
import './AdvancedTodo.css';

function AdvancedTodo() {
  const [todoList, setTodoList] = useState([
    { id: 1, job: '장보기', state: '완료' },
    { id: 2, job: '산책하기', state: '미완료' },
    { id: 3, job: '책 읽기', state: '미완료' },
  ]);
  // TODO: 1. 사용자 입력값을 저장할 state, 현재 필터 상태를 저장할 state, 수정 중인 할 일의 ID와 수정 중인 텍스트를 저장할 state들 생성

  // TODO: 2. 새로운 할 일을 목록에 추가하는 함수 구현
  const addTodo = () => {};

  // TODO: 3. 할 일의 완료/미완료 상태를 전환하는 함수 구현 (특정 id를 받아서 처리)
  const toggleTodoState = (id) => {};

  // TODO: 4. 특정 할 일을 목록에서 제거하는 함수 구현 (특정 id를 받아서 삭제)
  const deleteTodo = (id) => {};

  // TODO: 5. 할 일 텍스트 수정을 시작하는 함수 구현
  const startEdit = (id, currentText) => {};

  // TODO: 6. 수정된 할 일 텍스트를 저장하는 함수 구현
  const saveEdit = (id) => {};

  // TODO: 7. 할 일 수정을 취소하고 원래 상태로 돌리는 함수 구현
  const cancelEdit = () => {};

  // TODO: 8. 엔터키를 눌렀을 때 할 일을 추가하는 키보드 이벤트 함수 구현
  const handleKeyPress = (e) => {};

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 9. 입력 필드와 사용자 입력값을 연결 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
            // value={} // 현재 입력된 텍스트 표시
            onChange={(e) => {}} // 입력값이 변경될 때마다 상태 업데이트
            onKeyDown={handleKeyPress}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>

        {/* TODO: 10. 필터링 기능을 위한 TodoFilter 컴포넌트 import*/}

        {/* TODO: 11. 전체 선택/삭제 기능을 위한 TodoActions 컴포넌트 import */}

        {/* TODO: 12. 필터링된 할 일 목록을 화면에 표시 */}
        <div className="todo-list">
          <div className="todo-items">
            {todoList.map((todo) => (
              <div key={todo.id} className="advanced-todo-item">
                {/* TODO: 13. 할 일 완료 상태를 체크박스에 연결 */}
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  // checked={} // 할 일의 완료 상태 확인
                  onChange={() => toggleTodoState(todo.id)}
                />

                <div className="todo-content">
                  <p
                    className={`todo-text ${
                      todo.state === '완료' ? 'completed' : ''
                    }`}
                    onDoubleClick={() => startEdit(todo.id, todo.job)}
                    style={{ cursor: 'pointer' }}
                  >
                    {todo.job}
                  </p>
                </div>

                {/* TODO: 14. 할 일의 상태 표시와 수정/삭제 버튼 구현 */}
                <div className="todo-actions">
                  <span
                    className={`todo-badge ${
                      todo.state === '완료' ? 'completed' : ''
                    }`}
                  >
                    {todo.state === '완료' ? '완료' : '진행중'}
                  </span>

                  <div className="edit-actions">
                    <button
                      className="edit-button"
                      onClick={() => startEdit(todo.id, todo.job)}
                    >
                      ✎
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTodo;
