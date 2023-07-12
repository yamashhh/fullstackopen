import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet } from "react-native";
import { MyReviewsQueryDocument } from "../../graphql/queries/MyReviews";
import theme from "../../theme";
import ItemSeparator from "../ItemSeparator";
import MyReview from "./MyReview";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

const MyReviews = (): JSX.Element => {
  const { data } = useQuery(MyReviewsQueryDocument, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <FlatList
      style={styles.list}
      data={data?.me?.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <MyReview review={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
