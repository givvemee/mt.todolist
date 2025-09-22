import "../components/shared/styles.css";

function TodoFilter({ currentFilter, onFilterChange }) {
  // TODO: 1. 필터 옵션들 정의
  const filters = [
    { key: "all", label: "전체", color: "#007bff" },
    { key: "completed", label: "완료", color: "#28a745" },
    { key: "incomplete", label: "미완료", color: "#ffc107" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginBottom: "16px",
      }}
    >
      {/* TODO: 2. filters 배열을 map으로 렌더링 */}
      {filters.map((filter) => {
        const { key, label, color } = filter;
        return (
          <FilterButton
            key={key}
            filterKey={key}
            label={label}
            color={color}
            onFilterChange={onFilterChange}
            currentFilter={currentFilter}
          />
        );
      })}
    </div>
  );
}

export const FilterButton = ({
  label,
  color,
  onFilterChange,
  currentFilter,
}) => {
  const handleFilterClick = () => {
    onFilterChange(label);
  };
  return (
    <button
      onClick={handleFilterClick}
      style={{
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: currentFilter === label ? color : "transparent",
        color: currentFilter === label ? color : "#000",
      }}
    >
      {label}
    </button>
  );
};

export default TodoFilter;
