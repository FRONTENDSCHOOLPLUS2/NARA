import Submit from "@components/Submit";
import { useState } from "react";

function Search({ onClick }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  console.log(keyword);

  return (
    <form>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        value={keyword}
        onChange={handleChange}
      />
      <Submit
        className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        onClick={(e) => {
          e.preventDefault();
          onClick(keyword);
        }}
      >
        검색
      </Submit>
    </form>
  );
}

export default Search;
