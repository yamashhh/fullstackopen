import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  type Repository,
  type RepositoryConnection,
} from "../generated/graphql";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = (): JSX.Element => <View style={styles.separator} />;

const RepositoryList = (): JSX.Element => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetchRepositories = useCallback(async () => {
    const data: RepositoryConnection = await (
      await fetch("http://192.168.0.104:5001/api/repositories")
    ).json();
    setRepositories(data.edges.map((edge) => edge.node));
  }, []);

  useEffect(() => {
    void fetchRepositories();
  }, [fetchRepositories]);

  return (
    <FlatList
      style={styles.list}
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
