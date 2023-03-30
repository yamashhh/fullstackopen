// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { IPerson } from '../models/person';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  friendOf: Array<User>;
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

export type Subscription = {
  __typename?: 'Subscription';
  personAdded: Person;
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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<IPerson>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<Omit<User, 'friends'> & { friends?: Maybe<Array<ResolversTypes['Person']>> }>;
  YesNo: YesNo;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars['String'];
  Mutation: {};
  Person: IPerson;
  ID: Scalars['ID'];
  Query: {};
  Int: Scalars['Int'];
  Subscription: {};
  Token: Token;
  User: Omit<User, 'friends'> & { friends?: Maybe<Array<ResolversParentTypes['Person']>> };
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAsFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddAsFriendArgs, 'name'>>;
  addPerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MutationAddPersonArgs, 'city' | 'name' | 'street'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username'>>;
  editNumber?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MutationEditNumberArgs, 'name' | 'phone'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  friendOf?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allPersons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, Partial<QueryAllPersonsArgs>>;
  findPerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryFindPersonArgs, 'name'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  personCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  personAdded?: SubscriptionResolver<ResolversTypes['Person'], "personAdded", ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  friends?: Resolver<Maybe<Array<ResolversTypes['Person']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';