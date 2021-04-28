import React from "react";

function SearchForm() {
  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={input}
          name="ticker"
          type="text"
          placeholder="Stock ticker, e.g. MSFT"
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
