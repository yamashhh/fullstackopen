import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { number, object, string } from "yup";
import { type CreateReviewInput } from "../generated/gql/graphql";
import { CreateReviewMutationDocument } from "../graphql/mutations/CreateReview";
import AppButton from "./AppButton";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  form: {
    display: "flex",
    rowGap: 12,
    padding: 16,
  },
});

interface CreateReviewForm extends Omit<CreateReviewInput, "rating"> {
  rating: string;
}

const createReviewSchema = object({
  ownerName: string().required("Repository owner name is required"),
  repositoryName: string().required("Repository name is required"),
  rating: number()
    .required("Rating is required")
    .positive()
    .integer()
    .min(0)
    .max(100),
  text: string().optional(),
});

const CreateReview = (): JSX.Element => {
  const initialValues: CreateReviewForm = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };
  const [mutate, { loading }] = useMutation(CreateReviewMutationDocument);
  const navigate = useNavigate();

  const createReview = async (value: CreateReviewForm): Promise<void> => {
    const ratingAsNumber = Number(value.rating);
    try {
      if (Number.isNaN(ratingAsNumber)) {
        throw new Error("Rating must be a number");
      }
      const { data } = await mutate({
        variables: {
          review: {
            ...value,
            rating: ratingAsNumber,
          },
        },
      });
      const repositoryId = data?.createReview?.repositoryId;
      if (repositoryId == null) {
        throw new Error("Could not retrieve repository ID from review");
      }
      navigate(`/repository/${repositoryId}`);
    } catch (error) {
      Alert.alert(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while creating a review"
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={createReview}
      validationSchema={createReviewSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput<keyof CreateReviewForm>
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput<keyof CreateReviewForm>
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput<keyof CreateReviewForm>
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            maxLength={3}
          />
          <FormikTextInput<keyof CreateReviewForm>
            name="text"
            placeholder="Review"
            multiline
          />
          <AppButton
            // HACK:
            // https://github.com/jaredpalmer/formik/issues/376
            onPress={(event) => {
              handleSubmit(event as any);
            }}
            disabled={loading}
          >
            Create a review
          </AppButton>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
