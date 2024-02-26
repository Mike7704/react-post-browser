function CategorySelect({ value, onChange, showAllOption }) {
  return (
    <select value={value} onChange={onChange}>
      {showAllOption && <option value="All">All</option>}
      <option value="Food">Food</option>
      <option value="Gaming">Gaming</option>
      <option value="Movie">Movie</option>
      <option value="Music">Music</option>
      <option value="Science">Science</option>
      <option value="Technology">Technology</option>
      <option value="Work">Work</option>
      <option value="Other">Other</option>
    </select>
  );
}

export default CategorySelect;
