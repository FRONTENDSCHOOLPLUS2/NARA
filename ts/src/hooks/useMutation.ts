import { userState } from "@recoil/user/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const API_SERVER = "https://api.fesp.shop";

interface UseMutationOptions extends RequestInit {
  skipToken?: boolean;
}

const useMutation = (url: string, options: UseMutationOptions = {}) => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expiration = user?.tokenExpiration;
    if (!expiration) return true;
    return Date.now() > parseInt(expiration);
  };

  const refreshToken = async () => {
    if (!isTokenExpired()) {
      return;
    }

    try {
      const response = await fetch(API_SERVER + "/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token?.refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "토큰 재발급 중에 문제가 발생했습니다. 다시 로그인해주시기 바랍니다."
        );
      }

      const res = await response.json();

      const tokenExpirationTime = Date.now() + 24 * 60 * 60 * 1000;
      setUser({
        _id: res.item._id,
        name: res.item.name,
        profileImage: res.item.profileImage,
        token: res.item.token,
        tokenExpiration: tokenExpirationTime.toString(),
      });
    } catch (error) {
      setUser(null);
      navigate("/login");
      throw new Error(
        "예기치 못한 에러가 발생했습니다. 다시 로그인해주시기 바랍니다."
      );
    }
  };

  const send = async <T>(addOptions: UseMutationOptions = {}): Promise<T> => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    const finalOptions = { ...options, ...addOptions };

    if (!finalOptions.skipToken && isTokenExpired()) {
      await refreshToken();
    }

    const accessToken = user?.token?.accessToken;

    if (!finalOptions.skipToken) {
      finalOptions.headers = {
        ...finalOptions.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      finalOptions.headers = {
        ...finalOptions.headers,
        "Content-Type": "application/json",
      };
    }

    try {
      const response = await fetch(url, finalOptions);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || `2xx 이외의 응답: ${response.status}`);
      }

      const result: T = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { send };
};

export default useMutation;
