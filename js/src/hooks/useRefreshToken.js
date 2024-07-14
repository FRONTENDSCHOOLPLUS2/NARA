import useMutation from "@hooks/useMutation";
import { userState } from "@recoil/user/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const isTokenExpired = () => {
  const [user] = useRecoilState(userState);
  const expiration = user.tokenExpiration;
  if (!expiration) return true;
  return Date.now() > parseInt(expiration);
};

// FIXME: 리프레시 토큰의 조건을 어떻게 할 건지 좀 더 고민해보자
export const useRefreshToken = () => {
  const [user] = useRecoilState(userState);
  const setUser = useSetRecoilState(userState);
  const { send } = useMutation("/auth/refresh");
  const token = user?.token?.refreshToken;
  const navigate = useNavigate();

  const reissueToken = async () => {
    if (!isTokenExpired()) {
      return;
    }

    try {
      const res = await send({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const tokenExpirationTime = Date.now() + 24 * 60 * 60 * 1000;
      setUser({
        _id: res.item._id,
        name: res.item.name,
        profileImage: res.item.profileImage,
        token: res.item.token,
        tokenExpiration: tokenExpirationTime.toString(),
      });
    } catch (err) {
      alert(err.message);
      setUser(null);
      navigate("/login");
    }
  };
  return { reissueToken };
};
