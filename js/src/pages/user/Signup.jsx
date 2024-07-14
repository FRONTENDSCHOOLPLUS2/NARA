import Button from "@components/Button";
import Submit from "@components/Submit";
import useFileUpload from "@hooks/useFileUpload";
import useMutation from "@hooks/useMutation";
import { useState } from "react";

function Signup() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { send } = useMutation("/users");
  const { postSingleFile } = useFileUpload();

  const { name, email, password } = input;
  console.log(input);

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if (profileImage) {
      try {
        const fileRes = await postSingleFile(profileImage);
        console.log(fileRes);
        profileImageUrl = fileRes.item[0].path;
      } catch (err) {
        alert(err.message);
        return;
      }
    }

    try {
      const response = await send({
        method: "POST",
        body: JSON.stringify({
          type: "user",
          name: input.name,
          email: input.email,
          password: input.password,
          profileImage: profileImageUrl,
        }),
      });
      console.log(response);
      alert("회원가입되었습니다!");
      history.back();
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleSubmitValidation = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });

    const nameValue = e.target.name.value;
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;

    if (!nameValue.trim()) {
      setNameError("내용을 입력해주시기 바랍니다.");
    } else {
      setNameError("");
    }
    if (!emailValue.trim()) {
      setEmailError("내용을 입력해주시기 바랍니다.");
    } else {
      setEmailError("");
    }
    if (!passwordValue.trim()) {
      setPasswordError("내용을 입력해주시기 바랍니다.");
    } else {
      setPasswordError("");
    }
  };

  console.log(emailError);

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmitValidation}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              value={name}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {nameError}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              value={email}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {emailError}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              value={password}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {passwordError}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handleSignup}
            >
              회원가입
            </Submit>
            <Button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => {
                history.back();
              }}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
