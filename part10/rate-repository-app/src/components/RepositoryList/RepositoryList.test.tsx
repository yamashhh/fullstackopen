import { render, screen } from "@testing-library/react-native";
import { makeFragmentData } from "../../generated/gql";
import { type PaginatedRepositoriesQuery } from "../../generated/gql/graphql";
import { PageInfoFragment } from "../../graphql/fragments/PageInfo";
import { RepositoryItemFragment } from "../../graphql/fragments/RepositoryItem";
import PureRepositoryList from "./PureRepositoryList";

const MOCK_DATA: PaginatedRepositoriesQuery = {
  repositories: {
    edges: [
      {
        node: makeFragmentData(
          {
            id: "jaredpalmer.formik",
            fullName: "jaredpalmer/formik",
            description: "Build forms in React, without the tears",
            language: "TypeScript",
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              "https://avatars2.githubusercontent.com/u/4060187?v=4",
          },
          RepositoryItemFragment
        ),
        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      {
        node: makeFragmentData(
          {
            id: "async-library.react-async",
            fullName: "async-library/react-async",
            description: "Flexible promise-based React data loader",
            language: "JavaScript",
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              "https://avatars1.githubusercontent.com/u/54310907?v=4",
          },
          RepositoryItemFragment
        ),
        cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
      },
    ],
    pageInfo: makeFragmentData(
      {
        endCursor:
          "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      PageInfoFragment
    ),
    totalCount: 8,
  },
};

describe("RepositoryList", () => {
  it("renders without error", async () => {
    render(<PureRepositoryList data={MOCK_DATA} />);
    screen.debug();
  });
});
