import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (user || hasFetched.current) return;

    hasFetched.current = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        clearUser();
        navigate("/login", { replace: true });
      }
    };

    fetchUserInfo();
  }, [user, navigate, updateUser, clearUser]);
};
