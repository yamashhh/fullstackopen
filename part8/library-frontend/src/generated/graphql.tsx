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
  author: Author;
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  published: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  createUser?: Maybe<User>;
  editAuthor?: Maybe<Author>;
  login?: Maybe<Token>;
};


export type MutationAddBookArgs = {
  author: Scalars['String'];
  genres: Array<Scalars['String']>;
  published: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  favouriteGenre: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEditAuthorArgs = {
  name: Scalars['String'];
  setBornTo: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allAuthors: Array<Author>;
  allBooks?: Maybe<Array<Book>>;
  allGenres?: Maybe<Array<Scalars['String']>>;
  authorCount: Scalars['Int'];
  bookCount: Scalars['Int'];
  me?: Maybe<User>;
};


export type QueryAllBooksArgs = {
  author?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  favouriteGenre: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type AddBookMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook?: { __typename?: 'Book', id: string, title: string, published: number, genres: Array<string>, author: { __typename?: 'Author', id: string, name: string, born?: number | null, bookCount: number } } | null };

export type EditAuthorMutationVariables = Exact<{
  name: Scalars['String'];
  setBornTo: Scalars['Int'];
}>;


export type EditAuthorMutation = { __typename?: 'Mutation', editAuthor?: { __typename?: 'Author', name: string, born?: number | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };

export type AllAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAuthorsQuery = { __typename?: 'Query', allAuthors: Array<{ __typename?: 'Author', id: string, name: string, born?: number | null, bookCount: number }> };

export type AllBooksQueryVariables = Exact<{
  author?: InputMaybe<Scalars['String']>;
  genre?: InputMaybe<Scalars['String']>;
}>;


export type AllBooksQuery = { __typename?: 'Query', allBooks?: Array<{ __typename?: 'Book', id: string, title: string, published: number, genres: Array<string>, author: { __typename?: 'Author', id: string, name: string, born?: number | null, bookCount: number } }> | null };

export type AllGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGenresQuery = { __typename?: 'Query', allGenres?: Array<string> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, favouriteGenre: string } | null };


export const AddBookDocument = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
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
export const EditAuthorDocument = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
    `;
export type EditAuthorMutationFn = Apollo.MutationFunction<EditAuthorMutation, EditAuthorMutationVariables>;

/**
 * __useEditAuthorMutation__
 *
 * To run a mutation, you first call `useEditAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAuthorMutation, { data, loading, error }] = useEditAuthorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      setBornTo: // value for 'setBornTo'
 *   },
 * });
 */
export function useEditAuthorMutation(baseOptions?: Apollo.MutationHookOptions<EditAuthorMutation, EditAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAuthorMutation, EditAuthorMutationVariables>(EditAuthorDocument, options);
      }
export type EditAuthorMutationHookResult = ReturnType<typeof useEditAuthorMutation>;
export type EditAuthorMutationResult = Apollo.MutationResult<EditAuthorMutation>;
export type EditAuthorMutationOptions = Apollo.BaseMutationOptions<EditAuthorMutation, EditAuthorMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
    query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
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
 *      author: // value for 'author'
 *      genre: // value for 'genre'
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
export const AllGenresDocument = gql`
    query AllGenres {
  allGenres
}
    `;

/**
 * __useAllGenresQuery__
 *
 * To run a query within a React component, call `useAllGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllGenresQuery(baseOptions?: Apollo.QueryHookOptions<AllGenresQuery, AllGenresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllGenresQuery, AllGenresQueryVariables>(AllGenresDocument, options);
      }
export function useAllGenresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllGenresQuery, AllGenresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllGenresQuery, AllGenresQueryVariables>(AllGenresDocument, options);
        }
export type AllGenresQueryHookResult = ReturnType<typeof useAllGenresQuery>;
export type AllGenresLazyQueryHookResult = ReturnType<typeof useAllGenresLazyQuery>;
export type AllGenresQueryResult = Apollo.QueryResult<AllGenresQuery, AllGenresQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    favouriteGenre
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    