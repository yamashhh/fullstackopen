/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment PageInfo on PageInfo {\n    endCursor\n    hasNextPage\n    hasPreviousPage\n    startCursor\n  }\n":
    types.PageInfoFragmentDoc,
  "\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n":
    types.RepositoryItemFragmentDoc,
  "\n  fragment ReviewItem on Review {\n    createdAt\n    id\n    rating\n    text\n    user {\n      id\n      username\n    }\n    repository {\n      id\n      fullName\n    }\n  }\n":
    types.ReviewItemFragmentDoc,
  "\n  mutation Authenticate($credentials: AuthenticateInput) {\n    authenticate(credentials: $credentials) {\n      accessToken\n    }\n  }\n":
    types.AuthenticateDocument,
  "\n  mutation CreateReview($review: CreateReviewInput) {\n    createReview(review: $review) {\n      id\n      repositoryId\n    }\n  }\n":
    types.CreateReviewDocument,
  "\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      id\n    }\n  }\n":
    types.CreateUserDocument,
  "\n  mutation DeleteReview($deleteReviewId: ID!) {\n    deleteReview(id: $deleteReviewId)\n  }\n":
    types.DeleteReviewDocument,
  "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n":
    types.MeDocument,
  "\n  query MyReviews {\n    me {\n      id\n      reviews {\n        totalCount\n        pageInfo {\n          ...PageInfo\n        }\n        edges {\n          cursor\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n":
    types.MyReviewsDocument,
  "\n  query PaginatedRepositories(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: AllRepositoriesOrderBy\n    $searchKeyword: String\n  ) {\n    repositories(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      searchKeyword: $searchKeyword\n    ) {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfo\n      }\n      totalCount\n    }\n  }\n":
    types.PaginatedRepositoriesDocument,
  "\n  query Repository($repositoryId: ID!) {\n    repository(id: $repositoryId) {\n      ...RepositoryItem\n      reviews {\n        edges {\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n":
    types.RepositoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment PageInfo on PageInfo {\n    endCursor\n    hasNextPage\n    hasPreviousPage\n    startCursor\n  }\n"
): (typeof documents)["\n  fragment PageInfo on PageInfo {\n    endCursor\n    hasNextPage\n    hasPreviousPage\n    startCursor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"
): (typeof documents)["\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ReviewItem on Review {\n    createdAt\n    id\n    rating\n    text\n    user {\n      id\n      username\n    }\n    repository {\n      id\n      fullName\n    }\n  }\n"
): (typeof documents)["\n  fragment ReviewItem on Review {\n    createdAt\n    id\n    rating\n    text\n    user {\n      id\n      username\n    }\n    repository {\n      id\n      fullName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Authenticate($credentials: AuthenticateInput) {\n    authenticate(credentials: $credentials) {\n      accessToken\n    }\n  }\n"
): (typeof documents)["\n  mutation Authenticate($credentials: AuthenticateInput) {\n    authenticate(credentials: $credentials) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateReview($review: CreateReviewInput) {\n    createReview(review: $review) {\n      id\n      repositoryId\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateReview($review: CreateReviewInput) {\n    createReview(review: $review) {\n      id\n      repositoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteReview($deleteReviewId: ID!) {\n    deleteReview(id: $deleteReviewId)\n  }\n"
): (typeof documents)["\n  mutation DeleteReview($deleteReviewId: ID!) {\n    deleteReview(id: $deleteReviewId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"
): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MyReviews {\n    me {\n      id\n      reviews {\n        totalCount\n        pageInfo {\n          ...PageInfo\n        }\n        edges {\n          cursor\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MyReviews {\n    me {\n      id\n      reviews {\n        totalCount\n        pageInfo {\n          ...PageInfo\n        }\n        edges {\n          cursor\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PaginatedRepositories(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: AllRepositoriesOrderBy\n    $searchKeyword: String\n  ) {\n    repositories(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      searchKeyword: $searchKeyword\n    ) {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfo\n      }\n      totalCount\n    }\n  }\n"
): (typeof documents)["\n  query PaginatedRepositories(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: AllRepositoriesOrderBy\n    $searchKeyword: String\n  ) {\n    repositories(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      searchKeyword: $searchKeyword\n    ) {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfo\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Repository($repositoryId: ID!) {\n    repository(id: $repositoryId) {\n      ...RepositoryItem\n      reviews {\n        edges {\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Repository($repositoryId: ID!) {\n    repository(id: $repositoryId) {\n      ...RepositoryItem\n      reviews {\n        edges {\n          node {\n            ...ReviewItem\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
