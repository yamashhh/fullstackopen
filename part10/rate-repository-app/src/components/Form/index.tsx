import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface Props {
  onSubmit: (values: { username: string; password: string }) => void;
}

const Form = ({ onSubmit }: Props): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (): void => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
          placeholder="Username"
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
        />
      </View>
      <View>
        <Pressable onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Form;
