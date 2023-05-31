import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateEventCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateEventInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  end_time: Scalars['String']['input'];
  event_banner_url: Scalars['String']['input'];
  event_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  event_location: Scalars['String']['input'];
  event_location_url: Scalars['String']['input'];
  event_logo_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  re_entry: Scalars['Boolean']['input'];
  start_time: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_time?: Maybe<Scalars['String']['output']>;
  event_banner_url?: Maybe<Scalars['String']['output']>;
  event_categories?: Maybe<Array<Maybe<EventCategory>>>;
  event_key?: Maybe<Scalars['String']['output']>;
  event_location?: Maybe<Scalars['String']['output']>;
  event_location_url?: Maybe<Scalars['String']['output']>;
  event_logo_url?: Maybe<Scalars['String']['output']>;
  host?: Maybe<User>;
  hostId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  re_entry?: Maybe<Scalars['Boolean']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Maybe<Event>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  createEventCategory?: Maybe<Event>;
  createRole?: Maybe<Role>;
  createUser?: Maybe<User>;
  deleteEvent?: Maybe<Event>;
  deleteEventCategory?: Maybe<Event>;
  deleteRole?: Maybe<Role>;
  deleteUser?: Maybe<User>;
  login: LoginResponse;
  updateEvent?: Maybe<Event>;
  updateEventCategory?: Maybe<Event>;
  updateRole?: Maybe<Role>;
  updateUser?: Maybe<User>;
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateEventCategoryArgs = {
  input: CreateEventCategoryInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEventCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEventInput;
};


export type MutationUpdateEventCategoryArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEventCategoryInput;
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int']['input'];
};

export type Pagination = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  event?: Maybe<Event>;
  eventCategories?: Maybe<Array<Maybe<EventCategory>>>;
  eventCategory?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventCategoriesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryEventCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UpdateEventCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  event_banner_url?: InputMaybe<Scalars['String']['input']>;
  event_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  event_location?: InputMaybe<Scalars['String']['input']>;
  event_location_url?: InputMaybe<Scalars['String']['input']>;
  event_logo_url?: InputMaybe<Scalars['String']['input']>;
  hostId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  re_entry?: InputMaybe<Scalars['Boolean']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken?: string | null, user?: { __typename?: 'User', id: number, name?: string | null, email?: string | null, last_name?: string | null } | null } };

export type WhoAMiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAMiQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name?: string | null }> | null } | null };

export type EventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventCategoriesQuery = { __typename?: 'Query', eventCategories?: Array<{ __typename?: 'EventCategory', id?: number | null, name?: string | null, description?: string | null } | null> | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, hostId?: number | null, event_categories?: Array<{ __typename?: 'EventCategory', id?: number | null, name?: string | null } | null> | null } | null };

export type ShowEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, hostId?: number | null } | null };

export type ShowEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id?: number | null, event_logo_url?: string | null, event_location?: string | null, event_key?: string | null, name?: string | null, description?: string | null, date?: any | null, deleted?: boolean | null, event_banner_url?: string | null, event_categories?: Array<{ __typename?: 'EventCategory', id?: number | null, name?: string | null } | null> | null } | null> | null };

export type UpdateEventMutationVariables = Exact<{
  updateEventId: Scalars['Int']['input'];
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, hostId?: number | null } | null };

export type RolesListQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesListQuery = { __typename?: 'Query', roles?: Array<{ __typename?: 'Role', id: number, name?: string | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, createdAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name?: string | null }> | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: number, name?: string | null } | null> | null };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      name
      email
      last_name
    }
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
 *      data: // value for 'data'
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
export const WhoAMiDocument = gql`
    query WhoAMi {
  currentUser {
    id
    name
    last_name
    email
    roles {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useWhoAMiQuery__
 *
 * To run a query within a React component, call `useWhoAMiQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAMiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAMiQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAMiQuery(baseOptions?: Apollo.QueryHookOptions<WhoAMiQuery, WhoAMiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAMiQuery, WhoAMiQueryVariables>(WhoAMiDocument, options);
      }
export function useWhoAMiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAMiQuery, WhoAMiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAMiQuery, WhoAMiQueryVariables>(WhoAMiDocument, options);
        }
export type WhoAMiQueryHookResult = ReturnType<typeof useWhoAMiQuery>;
export type WhoAMiLazyQueryHookResult = ReturnType<typeof useWhoAMiLazyQuery>;
export type WhoAMiQueryResult = Apollo.QueryResult<WhoAMiQuery, WhoAMiQueryVariables>;
export const EventCategoriesDocument = gql`
    query EventCategories {
  eventCategories {
    id
    name
    description
  }
}
    `;

/**
 * __useEventCategoriesQuery__
 *
 * To run a query within a React component, call `useEventCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<EventCategoriesQuery, EventCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventCategoriesQuery, EventCategoriesQueryVariables>(EventCategoriesDocument, options);
      }
export function useEventCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventCategoriesQuery, EventCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventCategoriesQuery, EventCategoriesQueryVariables>(EventCategoriesDocument, options);
        }
export type EventCategoriesQueryHookResult = ReturnType<typeof useEventCategoriesQuery>;
export type EventCategoriesLazyQueryHookResult = ReturnType<typeof useEventCategoriesLazyQuery>;
export type EventCategoriesQueryResult = Apollo.QueryResult<EventCategoriesQuery, EventCategoriesQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: CreateEventInput!) {
  createEvent(data: $input) {
    id
    event_key
    name
    description
    event_location
    event_logo_url
    date
    start_time
    end_time
    re_entry
    event_logo_url
    hostId
    event_categories {
      id
      name
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const ShowEventDocument = gql`
    query ShowEvent($eventId: Int!) {
  event(id: $eventId) {
    id
    event_key
    name
    description
    event_location
    event_logo_url
    date
    start_time
    end_time
    re_entry
    event_logo_url
    hostId
  }
}
    `;

/**
 * __useShowEventQuery__
 *
 * To run a query within a React component, call `useShowEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useShowEventQuery(baseOptions: Apollo.QueryHookOptions<ShowEventQuery, ShowEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventQuery, ShowEventQueryVariables>(ShowEventDocument, options);
      }
export function useShowEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventQuery, ShowEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventQuery, ShowEventQueryVariables>(ShowEventDocument, options);
        }
export type ShowEventQueryHookResult = ReturnType<typeof useShowEventQuery>;
export type ShowEventLazyQueryHookResult = ReturnType<typeof useShowEventLazyQuery>;
export type ShowEventQueryResult = Apollo.QueryResult<ShowEventQuery, ShowEventQueryVariables>;
export const ShowEventsDocument = gql`
    query ShowEvents {
  events {
    id
    event_logo_url
    event_location
    event_key
    name
    description
    date
    deleted
    event_banner_url
    event_categories {
      id
      name
    }
  }
}
    `;

/**
 * __useShowEventsQuery__
 *
 * To run a query within a React component, call `useShowEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowEventsQuery(baseOptions?: Apollo.QueryHookOptions<ShowEventsQuery, ShowEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventsQuery, ShowEventsQueryVariables>(ShowEventsDocument, options);
      }
export function useShowEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventsQuery, ShowEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventsQuery, ShowEventsQueryVariables>(ShowEventsDocument, options);
        }
export type ShowEventsQueryHookResult = ReturnType<typeof useShowEventsQuery>;
export type ShowEventsLazyQueryHookResult = ReturnType<typeof useShowEventsLazyQuery>;
export type ShowEventsQueryResult = Apollo.QueryResult<ShowEventsQuery, ShowEventsQueryVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($updateEventId: Int!, $input: UpdateEventInput!) {
  updateEvent(id: $updateEventId, input: $input) {
    id
    event_key
    name
    description
    event_location
    event_logo_url
    date
    start_time
    end_time
    re_entry
    event_logo_url
    hostId
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      updateEventId: // value for 'updateEventId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const RolesListDocument = gql`
    query RolesList {
  roles {
    id
    name
    description
    createdAt
    updatedAt
    deletedAt
  }
}
    `;

/**
 * __useRolesListQuery__
 *
 * To run a query within a React component, call `useRolesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesListQuery(baseOptions?: Apollo.QueryHookOptions<RolesListQuery, RolesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesListQuery, RolesListQueryVariables>(RolesListDocument, options);
      }
export function useRolesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesListQuery, RolesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesListQuery, RolesListQueryVariables>(RolesListDocument, options);
        }
export type RolesListQueryHookResult = ReturnType<typeof useRolesListQuery>;
export type RolesListLazyQueryHookResult = ReturnType<typeof useRolesListLazyQuery>;
export type RolesListQueryResult = Apollo.QueryResult<RolesListQuery, RolesListQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
    name
    last_name
    createdAt
    roles {
      id
      name
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  users {
    id
    name
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;