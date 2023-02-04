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

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  street: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAsFriend?: Maybe<User>;
  addPerson?: Maybe<Person>;
  createUser?: Maybe<User>;
  editNumber?: Maybe<Person>;
  login?: Maybe<Token>;
};


export type MutationAddAsFriendArgs = {
  name: Scalars['String'];
};


export type MutationAddPersonArgs = {
  city: Scalars['String'];
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  street: Scalars['String'];
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
};


export type MutationEditNumberArgs = {
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  address: Address;
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allPersons: Array<Person>;
  findPerson?: Maybe<Person>;
  me?: Maybe<User>;
  personCount: Scalars['Int'];
};


export type QueryAllPersonsArgs = {
  phone?: InputMaybe<YesNo>;
};


export type QueryFindPersonArgs = {
  name: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  friends?: Maybe<Array<Person>>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export enum YesNo {
  No = 'NO',
  Yes = 'YES'
}

export type AllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPersonsQuery = { __typename?: 'Query', allPersons: Array<{ __typename?: 'Person', name: string, phone?: string | null, id: string, address: { __typename?: 'Address', street: string, city: string } }> };

export type CreatePersonMutationVariables = Exact<{
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', addPerson?: { __typename?: 'Person', name: string, phone?: string | null, id: string, address: { __typename?: 'Address', street: string, city: string } } | null };

export type EditNumberMutationVariables = Exact<{
  name: Scalars['String'];
  phone: Scalars['String'];
}>;


export type EditNumberMutation = { __typename?: 'Mutation', editNumber?: { __typename?: 'Person', name: string, phone?: string | null, id: string, address: { __typename?: 'Address', street: string, city: string } } | null };

export type FindPersonByNameQueryVariables = Exact<{
  nameToSearch: Scalars['String'];
}>;


export type FindPersonByNameQuery = { __typename?: 'Query', findPerson?: { __typename?: 'Person', name: string, phone?: string | null, address: { __typename?: 'Address', street: string, city: string } } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };


export const AllPersonsDocument = gql`
    query allPersons {
  allPersons {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
    `;

/**
 * __useAllPersonsQuery__
 *
 * To run a query within a React component, call `useAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPersonsQuery(baseOptions?: Apollo.QueryHookOptions<AllPersonsQuery, AllPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPersonsQuery, AllPersonsQueryVariables>(AllPersonsDocument, options);
      }
export function useAllPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPersonsQuery, AllPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPersonsQuery, AllPersonsQueryVariables>(AllPersonsDocument, options);
        }
export type AllPersonsQueryHookResult = ReturnType<typeof useAllPersonsQuery>;
export type AllPersonsLazyQueryHookResult = ReturnType<typeof useAllPersonsLazyQuery>;
export type AllPersonsQueryResult = Apollo.QueryResult<AllPersonsQuery, AllPersonsQueryVariables>;
export const CreatePersonDocument = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(name: $name, street: $street, city: $city, phone: $phone) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
    `;
export type CreatePersonMutationFn = Apollo.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *      street: // value for 'street'
 *      city: // value for 'city'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, options);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const EditNumberDocument = gql`
    mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
    `;
export type EditNumberMutationFn = Apollo.MutationFunction<EditNumberMutation, EditNumberMutationVariables>;

/**
 * __useEditNumberMutation__
 *
 * To run a mutation, you first call `useEditNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editNumberMutation, { data, loading, error }] = useEditNumberMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useEditNumberMutation(baseOptions?: Apollo.MutationHookOptions<EditNumberMutation, EditNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditNumberMutation, EditNumberMutationVariables>(EditNumberDocument, options);
      }
export type EditNumberMutationHookResult = ReturnType<typeof useEditNumberMutation>;
export type EditNumberMutationResult = Apollo.MutationResult<EditNumberMutation>;
export type EditNumberMutationOptions = Apollo.BaseMutationOptions<EditNumberMutation, EditNumberMutationVariables>;
export const FindPersonByNameDocument = gql`
    query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    address {
      street
      city
    }
  }
}
    `;

/**
 * __useFindPersonByNameQuery__
 *
 * To run a query within a React component, call `useFindPersonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonByNameQuery({
 *   variables: {
 *      nameToSearch: // value for 'nameToSearch'
 *   },
 * });
 */
export function useFindPersonByNameQuery(baseOptions: Apollo.QueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, options);
      }
export function useFindPersonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPersonByNameQuery, FindPersonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(FindPersonByNameDocument, options);
        }
export type FindPersonByNameQueryHookResult = ReturnType<typeof useFindPersonByNameQuery>;
export type FindPersonByNameLazyQueryHookResult = ReturnType<typeof useFindPersonByNameLazyQuery>;
export type FindPersonByNameQueryResult = Apollo.QueryResult<FindPersonByNameQuery, FindPersonByNameQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    