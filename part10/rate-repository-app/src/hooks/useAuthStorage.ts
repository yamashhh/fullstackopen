import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import type AuthStorage from "../utils/authStorage";

const useAuthStorage = (): AuthStorage | null => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
