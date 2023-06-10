/* eslint-disable */
// @ts-nocheck
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
