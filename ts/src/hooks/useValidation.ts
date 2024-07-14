import { useState } from "react";

// FIXME: 마지막에 적용할 방법을 고려
const useValidation = () => {
  const [, setInputValue] = useState("");
  const [, setError] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(value);

    if (!value.trim()) {
      setError("내용을 입력해주시기 바랍니다.");
    } else {
      setError("");
    }
  };

  return { handleChangeInput };
};

export default useValidation;
