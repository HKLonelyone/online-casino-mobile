import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-box active">
      <div className="inputBox w-100">
        <div className="input-group">
          <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" className="form-control shadow-none" placeholder="請輸入遊戲名稱" />
          <span className="input-group-text"><i className="fa-regular fa-circle-xmark"></i></span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
