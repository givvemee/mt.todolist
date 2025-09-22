import "./TodoActions.css";

function TodoActions({
  todoList,
  onSelectAll,
  onDeselectAll,
  onDeleteCompleted,
  allSelected,
}) {
  // TODO: 1. 통계 계산
  // 완료된 할 일의 개수
  const completedCount = todoList.filter(
    (todo) => todo.state === "완료"
  ).length;
  // 전체 할 일의 개수
  const totalCount = todoList.length;
  // 진행률
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "16px",
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      {/* TODO: 2. 전체 선택/해제 버튼 */}
      <button
        onClick={allSelected ? onDeselectAll : onSelectAll}
        style={{
          padding: "6px 12px",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {/* 버튼 텍스트 */}
        {allSelected ? "전체 해제" : "전체 선택"}
      </button>

      {/* TODO: 3. 완료 항목 삭제 버튼 */}
      <button
        onClick={onDeleteCompleted}
        disabled={completedCount === 0}
        style={{
          padding: "6px 12px",
          backgroundColor: completedCount > 0 ? "#dc3545" : "#71717a",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {/* 버튼 텍스트 */}
        완료 항목 삭제 ({completedCount})
      </button>

      {/* TODO: 4. 진행률 표시 */}
      <div
        style={{
          padding: "6px 12px",
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#495057",
        }}
      >
        {/* 진행률 표시 */}
        진행률 : {progressPercentage}%
      </div>
    </div>
  );
}

export default TodoActions;

/*
🎯 학습 포인트:
1. 복잡한 props 구조분해할당
2. 계산된 값 (completedCount, totalCount)
3. 조건부 렌더링과 스타일링
4. disabled 속성 활용
5. Math.round()를 이용한 백분율 계산

💡 힌트:
- filter().length로 조건에 맞는 개수 계산
- 삼항연산자로 조건부 텍스트와 스타일 적용
- disabled 상태에서는 cursor와 opacity 조정
- 0으로 나누기 방지를 위한 조건 체크
*/
