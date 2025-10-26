import { useEffect, useState } from 'react';
import '../components/shared/styles.css';
import './PersistentTodo.css';

const PersistentTodo = () => {
  const initialTodos = [
    { id: 1, job: '장보기', state: '완료' },
    { id: 2, job: '산책하기', state: '미완료' },
    { id: 3, job: '책 읽기', state: '미완료' },
  ];

  // TODO: 1. localStorage에서 데이터 불러와 초기 상태 설정
  const [todoList, setTodoList] = useState(() => {
    return initialTodos;
  });

  // TODO: 2. todoList 변경시 localStorage에 저장
  useEffect(() => {}, [todoList]);

  // TODO: 3. 입력값, 필터, 수정 관련 state들 생성
  const [todoText, setTodoText] = useState('');

  // TODO: 4. 새로운 할 일 추가 함수 구현
  const addTodo = () => {};

  // TODO: 5. 완료/미완료 토글 함수 구현
  const toggleTodo = (id) => {};

  // TODO: 6. 할 일 삭제 함수 구현
  const deleteTodo = (id) => {};

  // TODO: 7. 할 일 수정 시작 함수 구현
  const startEdit = (id, currentText) => {};

  // TODO: 8. 수정 내용 저장 함수 구현
  const saveEdit = (id) => {};

  // TODO: 9. 수정 취소 함수 구현
  const cancelEdit = () => {};

  // TODO: 10. Enter 키로 할 일 추가하는 키보드 이벤트 함수 구현
  const handleKeyPress = (e) => {};

  // TODO: 11. 수정 모드에서 Enter/Escape 키 처리 함수 구현
  const handleEditKeyPress = (e, id) => {};

  // TODO: 12. 필터에 따라 할 일 목록 필터링
  const filteredTodos = null;

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 13. 할 일 입력 폼 구현 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
          />
          <button className="add-button">추가</button>
        </div>

        {/* TODO: 14. 필터 컴포넌트 연결 */}

        {/* TODO: 15. 할 일 목록 렌더링 */}
        <div className="todo-list">
          <div className="empty-state">
            <p className="empty-text">할 일이 없습니다</p>
            <p className="empty-subtext">새로운 할 일을 추가해보세요</p>
          </div>

          {/* TODO: 16. 할 일 아이템들 렌더링 */}
          <div className="todo-items">
            {/* TODO: 17. 체크박스로 완료 상태 토글 구현 */}
            {/* TODO: 18. 수정 모드와 일반 모드 조건부 렌더링 구현 */}
            {/* TODO: 19. 상태 표시 및 수정/삭제 버튼 구현 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentTodo;
