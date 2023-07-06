import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet } from "react-native";
import { MyReviewsDocument } from "../graphql/queries/MyReviews";
import theme from "../theme";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

const MyReviews = (): JSX.Element => {
  const { data } = useQuery(MyReviewsDocument);

  return (
    <FlatList
      style={styles.list}
      data={data?.me?.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
