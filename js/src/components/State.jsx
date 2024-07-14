import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function State() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const updateOffset = (index) => {
    // FIXME: 나중에 환경 변수로 빼놓기
    const limit = 10;
    const offset = 20 * index;
    const queryString = `?limit={limit}&offset=${offset}`;
    navigate(queryString);
  };

  return (
    <div>
      <button updateOffset={updateOffset}>{number}</button>
    </div>
  );
}

export function ButtonOffset({ updateOffset }) {
  return (
    <div>
      <button></button>
    </div>
  );
}
