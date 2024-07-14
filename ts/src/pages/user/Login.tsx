import { LoginResponse } from "#types/user";
import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import { userState } from "@recoil/user/atoms";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface ILogin {
  email: string;
  password: string;
}

const UserDefault: ILogin = {
  email: "u1@market.com",
  password: "11111111",
};

// FIXME: 왜 언컨트롤드 인풋이 뜰까ㅠ
function Login() {
  const { send } = useMutation("/users/login", { skipToken: true });
  // const [email, setEmail] = useState(UserDefault.email);
  // const [password, setPassword] = useState(UserDefault.password);
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  const [input, setInput] = useState({
    email: UserDefault.email,
    password: UserDefault.password,
  });
  const { email, password } = input;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await send<LoginResponse>({
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(res);
      const tokenExpirationTime = Date.now() + 24 * 60 * 60 * 1000;

      setUser({
        _id: res.item._id,
        name: res.item.name,
        profileImage: res.item.profileImage,
        token: res.item.token,
        tokenExpiration: tokenExpirationTime.toString(),
      });
      console.log(res);
      alert("로그인되었습니다.");
      navigate("/");
    } catch (err) {
      if (err instanceof TypeError) {
        alert(err.message);
        console.log(err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  const handleSubmitValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const emailValue = target.email.value;
    const passwordValue = target.password.value;

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
    if (email.trim() && password.trim()) {
      handleLogin();
    }
  };

  console.log(input);

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmitValidation}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={email}
              name="email"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }

              // onChange={handleChangeInput}
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
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={password}
              name="password"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              // onChange={handleChangeInput}
            />
            {/* 입력값 검증 에러 출력 */}
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {passwordError}
            </p>
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              // onClick={handleLogin}
            >
              로그인
            </Submit>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
