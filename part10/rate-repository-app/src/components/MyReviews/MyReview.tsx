import { useMutation } from "@apollo/client";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { FragmentType, useFragment } from "../../generated/gql";
import { ReviewItemFragment } from "../../graphql/fragments/ReviewItem";
import { DeleteReviewMutationDocument } from "../../graphql/mutations/DeleteReview";
import { MyReviewsQueryDocument } from "../../graphql/queries/MyReviews";
import theme from "../../theme";
import AppButton from "../AppButton";
import ReviewItem from "../ReviewItem";

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.white,
  },
  button: {
    flexGrow: 1,
  },
  red: {
    backgroundColor: theme.colors.red,
  },
});

interface Props {
  review: FragmentType<typeof ReviewItemFragment>;
}

const MyReview = (props: Props): JSX.Element => {
  const review = useFragment(ReviewItemFragment, props.review);
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DeleteReviewMutationDocument, {
    refetchQueries: [MyReviewsQueryDocument],
  });

  return (
    <>
      <ReviewItem review={props.review} />
      <View style={styles.buttons}>
        <AppButton
          style={styles.button}
          onPress={() => navigate(`/repository/${review.repository.id}`)}
        >
          View repository
        </AppButton>
        <AppButton
          style={[styles.button, styles.red]}
          onPress={() =>
            Alert.alert(
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  async onPress() {
                    await deleteReview({
                      variables: { deleteReviewId: review.id },
                    });
                  },
                },
              ]
            )
          }
        >
          Delete review
        </AppButton>
      </View>
    </>
  );
};

export default MyReview;
