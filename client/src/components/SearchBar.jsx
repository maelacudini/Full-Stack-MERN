import style from "../css/app.module.css";

const SearchBar = ({ handleSearch }) => {
  return (
    <article className={style.searchBar}>
      <h3 className="mb-3">Looking for a profile?</h3>
      <div className="input-group">
        <input
          type="text"
          className={`form-control p-2 border-0`}
          placeholder="Search here 🔍"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={handleSearch}
        />
      </div>
    </article>
  );
};

export default SearchBar;
