import { Image, StyleSheet, View } from "react-native";
import { useFragment, type FragmentType } from "../generated/gql";
import { RepositoryItemFragment } from "../graphql/fragments/RepositoryItem";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 16,
    padding: 16,
    backgroundColor: "white",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
  },
  topLeft: {
    width: 48,
    height: 48,
    borderRadius: 4,
    objectFit: "cover",
    display: "flex",
  },
  topRight: {
    display: "flex",
    rowGap: 8,
    flexGrow: 1,
    flexShrink: 1,
  },
  language: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stats: {
    display: "flex",
    alignItems: "center",
    rowGap: 4,
  },
});

interface RepositoryItemProps {
  item: FragmentType<typeof RepositoryItemFragment>;
}

const formatCount = (count: number): string => {
  return count.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
};

const RepositoryItem = (props: RepositoryItemProps): JSX.Element => {
  const item = useFragment(RepositoryItemFragment, props.item);

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.top}>
        <Image
          style={styles.topLeft}
          source={{
            uri: item.ownerAvatarUrl ?? undefined,
          }}
        />
        <View style={styles.topRight}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {item.stargazersCount != null
              ? formatCount(item.stargazersCount)
              : "-"}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">
            {item.forksCount != null ? formatCount(item.forksCount) : "-"}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{formatCount(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold">{formatCount(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
