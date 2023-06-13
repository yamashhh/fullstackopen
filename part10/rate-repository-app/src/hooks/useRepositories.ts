import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import {
  type Repository,
  type RepositoryConnection,
} from "../generated/gql/graphql";
const REST_URI = Constants.manifest?.extra?.restUri;

if (REST_URI == null) {
  throw new Error("Failed to load environment variable: restUri");
}

const useRepositories = (): {
  repositories: Repository[];
  loading: boolean;
  refetch: () => Promise<void>;
} => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = useCallback(async () => {
    setLoading(true);
    const data: RepositoryConnection = await (await fetch(REST_URI)).json();
    setRepositories(data.edges.map((edge) => edge.node));
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchRepositories();
  }, [fetchRepositories]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
