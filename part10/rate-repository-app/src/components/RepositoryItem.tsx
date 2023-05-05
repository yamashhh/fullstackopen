import { Text, View } from "react-native";
import { type Repository } from "./RepositoryList";

interface RepositoryItemProps {
  item: Repository;
}

const RepositoryItem = ({ item }: RepositoryItemProps): JSX.Element => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
