import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = (): JSX.Element => <View style={styles.separator} />;

export default ItemSeparator;
