import { render, screen } from "@testing-library/react-native";
// eslint-disable-next-line import/order
import PureRepositoryList from ".";
import { makeFragmentData } from "../../../generated/gql";
import { type PaginatedRepositoriesQuery } from "../../../generated/gql/graphql";
import { PageInfoFragment } from "../../../graphql/fragments/PageInfo";
import { RepositoryItemFragment } from "../../../graphql/fragments/RepositoryItem";
import { formatCount, TEST_IDS } from "../../RepositoryItem";

const FIRST_REPOSITORY_ITEM = {
  id: "jaredpalmer.formik",
  fullName: "jaredpalmer/formik",
  description: "Build forms in React, without the tears",
  language: "TypeScript",
  forksCount: 1619,
  stargazersCount: 21856,
  ratingAverage: 88,
  reviewCount: 3,
  ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
} as const;

const SECOND_REPOSITORY_ITEM = {
  id: "async-library.react-async",
  fullName: "async-library/react-async",
  description: "Flexible promise-based React data loader",
  language: "JavaScript",
  forksCount: 69,
  stargazersCount: 1760,
  ratingAverage: 72,
  reviewCount: 3,
  ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
} as const;

const MOCK_DATA: PaginatedRepositoriesQuery = {
  repositories: {
    edges: [
      {
        node: makeFragmentData(FIRST_REPOSITORY_ITEM, RepositoryItemFragment),
        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      {
        node: makeFragmentData(SECOND_REPOSITORY_ITEM, RepositoryItemFragment),
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

describe("PureRepositoryList", () => {
  describe("renders repository information correctly", () => {
    test("name", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryName, secondRepositoryName] = screen.getAllByTestId(
        TEST_IDS.NAME
      );
      expect(firstRepositoryName).toHaveTextContent(
        FIRST_REPOSITORY_ITEM.fullName
      );
      expect(secondRepositoryName).toHaveTextContent(
        SECOND_REPOSITORY_ITEM.fullName
      );
    });

    test("description", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryDescription, secondRepositoryDescription] =
        screen.getAllByTestId(TEST_IDS.DESCRIPTION);
      expect(firstRepositoryDescription).toHaveTextContent(
        FIRST_REPOSITORY_ITEM.description
      );
      expect(secondRepositoryDescription).toHaveTextContent(
        SECOND_REPOSITORY_ITEM.description
      );
    });

    test("language", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryLanguage, secondRepositoryLanguage] =
        screen.getAllByTestId(TEST_IDS.LANGUAGE);
      expect(firstRepositoryLanguage).toHaveTextContent(
        FIRST_REPOSITORY_ITEM.language
      );
      expect(secondRepositoryLanguage).toHaveTextContent(
        SECOND_REPOSITORY_ITEM.language
      );
    });

    test("forks count", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryForksCount, secondRepositoryForksCount] =
        screen.getAllByTestId(TEST_IDS.FORKS);
      expect(firstRepositoryForksCount).toHaveTextContent(
        formatCount(FIRST_REPOSITORY_ITEM.forksCount)
      );
      expect(secondRepositoryForksCount).toHaveTextContent(
        formatCount(SECOND_REPOSITORY_ITEM.forksCount)
      );
    });

    test("stargazers count", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryStargazersCount, secondRepositoryStargazersCount] =
        screen.getAllByTestId(TEST_IDS.STARS);
      expect(firstRepositoryStargazersCount).toHaveTextContent(
        formatCount(FIRST_REPOSITORY_ITEM.stargazersCount)
      );
      expect(secondRepositoryStargazersCount).toHaveTextContent(
        formatCount(SECOND_REPOSITORY_ITEM.stargazersCount)
      );
    });

    test("rating average", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryRatingAverage, secondRepositoryRatingAverage] =
        screen.getAllByTestId(TEST_IDS.RATING);
      expect(firstRepositoryRatingAverage).toHaveTextContent(
        formatCount(FIRST_REPOSITORY_ITEM.ratingAverage)
      );
      expect(secondRepositoryRatingAverage).toHaveTextContent(
        formatCount(SECOND_REPOSITORY_ITEM.ratingAverage)
      );
    });

    test("review count", () => {
      render(<PureRepositoryList data={MOCK_DATA} />);
      const [firstRepositoryReviewCount, secondRepositoryReviewCount] =
        screen.getAllByTestId(TEST_IDS.REVIEWS);
      expect(firstRepositoryReviewCount).toHaveTextContent(
        formatCount(FIRST_REPOSITORY_ITEM.reviewCount)
      );
      expect(secondRepositoryReviewCount).toHaveTextContent(
        formatCount(SECOND_REPOSITORY_ITEM.reviewCount)
      );
    });
  });
});
