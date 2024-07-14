import { LoginResponse } from "#types/user";
import { userState } from "@recoil/user/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const API_SERVER = "https://api.fesp.shop";

export const useRefreshToken = () => {
  const [user, setUser] = useRecoilState(userState);
  const token = user?.token?.refreshToken;
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const [user] = useRecoilState(userState);
    const expiration = user.tokenExpiration;
    if (!expiration) return true;
    return Date.now() > parseInt(expiration);
  };

  const reissueToken = async () => {
    if (!isTokenExpired()) {
      return;
    }

    try {
      const response = await fetch(`${API_SERVER}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res: LoginResponse = await response.json();

      const tokenExpirationTime = Date.now() + 24 * 60 * 60 * 1000;
      setUser({
        _id: res.item._id,
        name: res.item.name,
        profileImage: res.item.profileImage,
        token: res.item.token,
        tokenExpiration: tokenExpirationTime.toString(),
      });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("예기치 못한 에러가 발생했습니다.");
      }
      setUser(null);
      navigate("/login");
    }
  };
  return { reissueToken };
};
