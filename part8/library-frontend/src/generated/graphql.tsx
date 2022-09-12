import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  bookCount: Scalars['Int'];
  born?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String'];
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  published: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  editAuthor?: Maybe<Author>;
};


export type MutationAddBookArgs = {
  author: Scalars['String'];
  genres: Array<Scalars['String']>;
  published: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationEditAuthorArgs = {
  name: Scalars['String'];
  setBornTo: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allAuthors: Array<Author>;
  allBooks?: Maybe<Array<Book>>;
  authorCount: Scalars['Int'];
  bookCount: Scalars['Int'];
};


export type QueryAllBooksArgs = {
  author?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
};

export type AddBookMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook?: { __typename?: 'Book', id: string, title: string, author: string, published: number, genres: Array<string> } | null };

export type AllAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAuthorsQuery = { __typename?: 'Query', allAuthors: Array<{ __typename?: 'Author', id: string, name: string, born?: number | null, bookCount: number }> };

export type AllBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBooksQuery = { __typename?: 'Query', allBooks?: Array<{ __typename?: 'Book', id: string, title: string, author: string, published: number }> | null };


export const AddBookDocument = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    id
    title
    author
    published
    genres
  }
}
    `;
export type AddBookMutationFn = Apollo.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      published: // value for 'published'
 *      genres: // value for 'genres'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = Apollo.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const AllAuthorsDocument = gql`
    query AllAuthors {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
    `;

/**
 * __useAllAuthorsQuery__
 *
 * To run a query within a React component, call `useAllAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<AllAuthorsQuery, AllAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAuthorsQuery, AllAuthorsQueryVariables>(AllAuthorsDocument, options);
      }
export function useAllAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAuthorsQuery, AllAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAuthorsQuery, AllAuthorsQueryVariables>(AllAuthorsDocument, options);
        }
export type AllAuthorsQueryHookResult = ReturnType<typeof useAllAuthorsQuery>;
export type AllAuthorsLazyQueryHookResult = ReturnType<typeof useAllAuthorsLazyQuery>;
export type AllAuthorsQueryResult = Apollo.QueryResult<AllAuthorsQuery, AllAuthorsQueryVariables>;
export const AllBooksDocument = gql`
    query AllBooks {
  allBooks {
    id
    title
    author
    published
  }
}
    `;

/**
 * __useAllBooksQuery__
 *
 * To run a query within a React component, call `useAllBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBooksQuery(baseOptions?: Apollo.QueryHookOptions<AllBooksQuery, AllBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, options);
      }
export function useAllBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBooksQuery, AllBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBooksQuery, AllBooksQueryVariables>(AllBooksDocument, options);
        }
export type AllBooksQueryHookResult = ReturnType<typeof useAllBooksQuery>;
export type AllBooksLazyQueryHookResult = ReturnType<typeof useAllBooksLazyQuery>;
export type AllBooksQueryResult = Apollo.QueryResult<AllBooksQuery, AllBooksQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    