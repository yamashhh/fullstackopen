import { Text, View } from "react-native";

interface Props {
  name: string;
}

const Greeting = ({ name }: Props): JSX.Element => {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  );
};

export default Greeting;
