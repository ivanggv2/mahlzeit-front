import { useAppDispatch } from "../app/hooks";
import axios, { AxiosResponse } from "axios";
import { loginUserActionCreator } from "../store/user/userSlice";
import { TokenResponse, User, UserLoged, UserLogin } from "../types/interfaces";
import decodeToken from "../utils/authorization";
import { useNavigate } from "react-router-dom";

const useUsers = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const sendUserToAPI = async (user: User, apiUrl: string) => {
    let response: Response;
    try {
      response = await axios.post(`${apiUrl}/users/register`, user);

      if (response.status !== 201) {
        throw new Error();
      }
    } catch (error) {
      return 400;
    }

    navigator("/login");

    return response.status;
  };

  const loginUser = async (user: UserLogin, apiUrl: string) => {
    try {
      const response: AxiosResponse<TokenResponse> = await axios.post(
        `${apiUrl}/users/login`,
        user
      );

      if (response.status !== 200) {
        throw new Error();
      }

      const {
        data: { token },
      } = response;

      const userLogged: UserLoged = decodeToken(token);

      dispatch(loginUserActionCreator(userLogged));

      localStorage.setItem("token", userLogged.token);

      navigator("/");
    } catch (error) {
      return 400;
    }
  };

  return { sendUserToAPI, loginUser };
};

export default useUsers;
