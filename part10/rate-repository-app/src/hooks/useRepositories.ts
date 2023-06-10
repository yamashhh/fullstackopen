import { useCallback, useEffect, useState } from "react";
import {
  type Repository,
  type RepositoryConnection,
} from "../generated/gql/graphql";

const useRepositories = (): {
  repositories: Repository[];
  loading: boolean;
  refetch: () => Promise<void>;
} => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = useCallback(async () => {
    setLoading(true);
    const data: RepositoryConnection = await (
      await fetch("http://192.168.0.101:5001/api/repositories")
    ).json();
    setRepositories(data.edges.map((edge) => edge.node));
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchRepositories();
  }, [fetchRepositories]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
