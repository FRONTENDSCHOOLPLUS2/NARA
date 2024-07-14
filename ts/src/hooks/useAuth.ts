import { userState } from "@recoil/user/atoms";
import { useRecoilState } from "recoil";

export const useAuthenticate = () => {
  const [user] = useRecoilState(userState);
  const isUserLoggedIn = !!user;

  return { isUserLoggedIn, user };
};

export const useAuthorize = () => {
  const { isUserLoggedIn, user } = useAuthenticate();

  if (!isUserLoggedIn || !user) {
    return false;
  }
  return true;
};
