import { StyleSheet, View } from "react-native";
import { useFragment, type FragmentType } from "../generated/gql";
import { ReviewItemFragment } from "../graphql/fragments/Review";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
  },
  rating: {
    width: 48,
    height: 48,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 48 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    rowGap: 4,
    flexShrink: 1,
  },
});

interface Props {
  review: FragmentType<typeof ReviewItemFragment>;
}

const ReviewItem = (props: Props): JSX.Element => {
  const reviewItem = useFragment(ReviewItemFragment, props.review);

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontSize="heading" fontWeight="bold">
          {reviewItem.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontSize="heading" fontWeight="bold">
          {reviewItem.user.username}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          {new Date(reviewItem.createdAt)
            .toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
            .replaceAll("/", ".")}
        </Text>
        <Text>{reviewItem.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
