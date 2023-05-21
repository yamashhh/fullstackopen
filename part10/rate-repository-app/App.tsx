import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";

export default function App(): JSX.Element {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
