/* eslint-disable */
// @ts-nocheck
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
};

export enum AllRepositoriesOrderBy {
  CreatedAt = "CREATED_AT",
  RatingAverage = "RATING_AVERAGE",
}

export type AuthenticateInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type AuthenticatePayload = {
  __typename?: "AuthenticatePayload";
  accessToken: Scalars["String"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  user: User;
};

export type CreateReviewInput = {
  ownerName: Scalars["String"]["input"];
  rating: Scalars["Int"]["input"];
  repositoryName: Scalars["String"]["input"];
  text?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Generates a new access token, if provided credentials (username and password) match any registered user. */
  authenticate?: Maybe<AuthenticatePayload>;
  /** Creates a review for the given repository defined by repositoryName and ownerName. */
  createReview?: Maybe<Review>;
  /** Creates a new user, if the provided username does not already exist. */
  createUser?: Maybe<User>;
  /** Deletes the review which has the given id, if it is created by the authorized user. */
  deleteReview?: Maybe<Scalars["Boolean"]["output"]>;
  root?: Maybe<Scalars["String"]["output"]>;
};

export type MutationAuthenticateArgs = {
  credentials?: InputMaybe<AuthenticateInput>;
};

export type MutationCreateReviewArgs = {
  review?: InputMaybe<CreateReviewInput>;
};

export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteReviewArgs = {
  id: Scalars["ID"]["input"];
};

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  /** Returns the authenticated user. */
  me?: Maybe<User>;
  /** Returns paginated repositories. */
  repositories: RepositoryConnection;
  /** Returns repository by an id. */
  repository?: Maybe<Repository>;
  root?: Maybe<Scalars["String"]["output"]>;
  /** Returns paginated users. */
  users: UserConnection;
};

export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AllRepositoriesOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  ownerName?: InputMaybe<Scalars["String"]["input"]>;
  searchKeyword?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRepositoryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Repository = {
  __typename?: "Repository";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  forksCount?: Maybe<Scalars["Int"]["output"]>;
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  openIssuesCount?: Maybe<Scalars["Int"]["output"]>;
  ownerAvatarUrl?: Maybe<Scalars["String"]["output"]>;
  ownerName: Scalars["String"]["output"];
  ratingAverage: Scalars["Int"]["output"];
  reviewCount: Scalars["Int"]["output"];
  reviews: ReviewConnection;
  stargazersCount?: Maybe<Scalars["Int"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  user: User;
  userHasReviewed?: Maybe<Scalars["Boolean"]["output"]>;
  watchersCount?: Maybe<Scalars["Int"]["output"]>;
};

export type RepositoryReviewsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RepositoryConnection = {
  __typename?: "RepositoryConnection";
  edges: Array<RepositoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type RepositoryEdge = {
  __typename?: "RepositoryEdge";
  cursor: Scalars["String"]["output"];
  node: Repository;
};

export type Review = {
  __typename?: "Review";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  rating: Scalars["Int"]["output"];
  repository: Repository;
  repositoryId: Scalars["String"]["output"];
  text?: Maybe<Scalars["String"]["output"]>;
  user: User;
  userId: Scalars["String"]["output"];
};

export type ReviewConnection = {
  __typename?: "ReviewConnection";
  edges: Array<ReviewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ReviewEdge = {
  __typename?: "ReviewEdge";
  cursor: Scalars["String"]["output"];
  node: Review;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  reviewCount: Scalars["Int"]["output"];
  reviews: ReviewConnection;
  username: Scalars["String"]["output"];
};

export type UserReviewsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: Scalars["String"]["output"];
  node: User;
};

export type PageInfoFragment = {
  __typename?: "PageInfo";
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
} & { " $fragmentName"?: "PageInfoFragment" };

export type RepositoryItemFragment = {
  __typename?: "Repository";
  id: string;
  fullName: string;
  description?: string | null;
  language?: string | null;
  forksCount?: number | null;
  stargazersCount?: number | null;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl?: string | null;
} & { " $fragmentName"?: "RepositoryItemFragment" };

export type AuthenticateMutationVariables = Exact<{
  credentials?: InputMaybe<AuthenticateInput>;
}>;

export type AuthenticateMutation = {
  __typename?: "Mutation";
  authenticate?: {
    __typename?: "AuthenticatePayload";
    accessToken: string;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; id: string; username: string } | null;
};

export type PaginatedRepositoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type PaginatedRepositoriesQuery = {
  __typename?: "Query";
  repositories: {
    __typename?: "RepositoryConnection";
    totalCount: number;
    edges: Array<{
      __typename?: "RepositoryEdge";
      cursor: string;
      node: { __typename?: "Repository" } & {
        " $fragmentRefs"?: { RepositoryItemFragment: RepositoryItemFragment };
      };
    }>;
    pageInfo: { __typename?: "PageInfo" } & {
      " $fragmentRefs"?: { PageInfoFragment: PageInfoFragment };
    };
  };
};

export const PageInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PageInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PageInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "endCursor" } },
          { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
          { kind: "Field", name: { kind: "Name", value: "hasPreviousPage" } },
          { kind: "Field", name: { kind: "Name", value: "startCursor" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PageInfoFragment, unknown>;
export const RepositoryItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RepositoryItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Repository" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "fullName" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "language" } },
          { kind: "Field", name: { kind: "Name", value: "forksCount" } },
          { kind: "Field", name: { kind: "Name", value: "stargazersCount" } },
          { kind: "Field", name: { kind: "Name", value: "ratingAverage" } },
          { kind: "Field", name: { kind: "Name", value: "reviewCount" } },
          { kind: "Field", name: { kind: "Name", value: "ownerAvatarUrl" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RepositoryItemFragment, unknown>;
export const AuthenticateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Authenticate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "credentials" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AuthenticateInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authenticate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "credentials" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "credentials" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthenticateMutation,
  AuthenticateMutationVariables
>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const PaginatedRepositoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PaginatedRepositories" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderDirection" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderDirection" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "repositories" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderDirection" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "RepositoryItem" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cursor" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PageInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RepositoryItem" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Repository" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "fullName" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "language" } },
          { kind: "Field", name: { kind: "Name", value: "forksCount" } },
          { kind: "Field", name: { kind: "Name", value: "stargazersCount" } },
          { kind: "Field", name: { kind: "Name", value: "ratingAverage" } },
          { kind: "Field", name: { kind: "Name", value: "reviewCount" } },
          { kind: "Field", name: { kind: "Name", value: "ownerAvatarUrl" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PageInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PageInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "endCursor" } },
          { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
          { kind: "Field", name: { kind: "Name", value: "hasPreviousPage" } },
          { kind: "Field", name: { kind: "Name", value: "startCursor" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaginatedRepositoriesQuery,
  PaginatedRepositoriesQueryVariables
>;
