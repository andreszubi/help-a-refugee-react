const Search = ({ query, setQuery }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  return (
    <>
      <div>Search</div>
      <label>Search</label>
      <input value={query} type="text" onChange={handleChange} />
    </>
  );
};

export default Search;
