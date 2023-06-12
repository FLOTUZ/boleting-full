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
  sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateEventInput = {
  description: Scalars['String']['input'];
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  end_time: Scalars['String']['input'];
  event_banner_url: Scalars['String']['input'];
  event_location: Scalars['String']['input'];
  event_location_url: Scalars['String']['input'];
  event_logo_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  re_entry: Scalars['Boolean']['input'];
  start_date: Scalars['DateTime']['input'];
  start_time: Scalars['String']['input'];
  sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateEventSubCategoryInput = {
  createdAt: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parent_event_category?: InputMaybe<Array<Scalars['Int']['input']>>;
  parent_event_categoryId: Scalars['Int']['input'];
};

export type CreateOrganizationInput = {
  name: Scalars['String']['input'];
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
  createdBy?: Maybe<User>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['DateTime']['output']>;
  end_time?: Maybe<Scalars['String']['output']>;
  event_banner_url?: Maybe<Scalars['String']['output']>;
  event_key?: Maybe<Scalars['String']['output']>;
  event_location?: Maybe<Scalars['String']['output']>;
  event_location_url?: Maybe<Scalars['String']['output']>;
  event_logo_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['Int']['output']>;
  re_entry?: Maybe<Scalars['Boolean']['output']>;
  start_date?: Maybe<Scalars['DateTime']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  sub_categories?: Maybe<Array<EventSubCategory>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
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
  sub_categories?: Maybe<Array<Maybe<EventSubCategory>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EventSubCategory = {
  __typename?: 'EventSubCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Event>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parent_event_category?: Maybe<Array<EventCategory>>;
  parent_event_categoryId?: Maybe<Scalars['Int']['output']>;
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
  createEventSubCategories?: Maybe<EventSubCategory>;
  createOrganization?: Maybe<Organization>;
  createRole?: Maybe<Role>;
  createUser?: Maybe<User>;
  deleteEvent?: Maybe<Event>;
  deleteEventCategory?: Maybe<Event>;
  deleteEventSubCategories?: Maybe<EventSubCategory>;
  deleteOrganization?: Maybe<Organization>;
  deleteRole?: Maybe<Role>;
  deleteUser?: Maybe<User>;
  login: LoginResponse;
  updateEvent?: Maybe<Event>;
  updateEventCategory?: Maybe<Event>;
  updateEventSubCategories?: Maybe<EventSubCategory>;
  updateOrganization?: Maybe<Organization>;
  updateRole?: Maybe<Role>;
  updateUser?: Maybe<User>;
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateEventCategoryArgs = {
  input: CreateEventCategoryInput;
};


export type MutationCreateEventSubCategoriesArgs = {
  data: CreateEventSubCategoryInput;
};


export type MutationCreateOrganizationArgs = {
  data: CreateOrganizationInput;
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


export type MutationDeleteEventSubCategoriesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrganizationArgs = {
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
  data: UpdateEventInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateEventCategoryArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEventCategoryInput;
};


export type MutationUpdateEventSubCategoriesArgs = {
  data: UpdateEventSubCategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOrganizationArgs = {
  data: UpdateOrganizationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<Maybe<Event>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<User>>>;
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
  eventSubCategory?: Maybe<EventSubCategory>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsSubCategories?: Maybe<Array<Maybe<EventSubCategory>>>;
  filteredByParentsEventSubCategories?: Maybe<Array<Maybe<EventCategory>>>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
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


export type QueryEventSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryEventsSubCategoriesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryFilteredByParentsEventSubCategoriesArgs = {
  parentsIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrganizationsArgs = {
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
  sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  event_banner_url?: InputMaybe<Scalars['String']['input']>;
  event_location?: InputMaybe<Scalars['String']['input']>;
  event_location_url?: InputMaybe<Scalars['String']['input']>;
  event_logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  re_entry?: InputMaybe<Scalars['Boolean']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  sub_categories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateEventSubCategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_event_category?: InputMaybe<Array<Scalars['Int']['input']>>;
  parent_event_categoryId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrganizationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  events?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  organization?: Maybe<Organization>;
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


export type EventCategoriesQuery = { __typename?: 'Query', eventCategories?: Array<{ __typename?: 'EventCategory', id?: number | null, name?: string | null, description?: string | null, sub_categories?: Array<{ __typename?: 'EventSubCategory', id: string, name?: string | null, parent_event_categoryId?: number | null } | null> | null } | null> | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, start_date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, userId?: number | null, sub_categories?: Array<{ __typename?: 'EventSubCategory', id: string, name?: string | null }> | null } | null };

export type ShowEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, event_banner_url?: string | null, event_location_url?: string | null, start_date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, createdAt?: any | null, updatedAt?: any | null, deleted?: boolean | null, createdBy?: { __typename?: 'User', id: number, name?: string | null } | null, sub_categories?: Array<{ __typename?: 'EventSubCategory', id: string, name?: string | null }> | null } | null };

export type ShowEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id?: number | null, event_logo_url?: string | null, event_location?: string | null, event_key?: string | null, name?: string | null, description?: string | null, start_date?: any | null, deleted?: boolean | null, event_banner_url?: string | null, sub_categories?: Array<{ __typename?: 'EventSubCategory', id: string, name?: string | null }> | null } | null> | null };

export type UpdateEventMutationVariables = Exact<{
  updateEventId: Scalars['Int']['input'];
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', id?: number | null, event_key?: string | null, name?: string | null, description?: string | null, event_location?: string | null, event_logo_url?: string | null, start_date?: any | null, start_time?: string | null, end_time?: string | null, re_entry?: boolean | null, userId?: number | null, sub_categories?: Array<{ __typename?: 'EventSubCategory', name?: string | null }> | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  data: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'Organization', id: string, name?: string | null } | null };

export type DeleteOrganizationMutationVariables = Exact<{
  deleteOrganizationId: Scalars['Int']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: { __typename?: 'Organization', id: string, name?: string | null, deleted?: boolean | null, deletedAt?: any | null } | null };

export type EditOrganizationsMutationVariables = Exact<{
  updateOrganizationId: Scalars['Int']['input'];
  data: UpdateOrganizationInput;
}>;


export type EditOrganizationsMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'Organization', id: string, name?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type ShowOrganizationQueryVariables = Exact<{
  organizationId: Scalars['Int']['input'];
}>;


export type ShowOrganizationQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: string, name?: string | null, createdAt?: any | null, deleted?: boolean | null, deletedAt?: any | null } | null };

export type ShowOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowOrganizationsQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'Organization', id: string, name?: string | null, createdAt?: any | null, events?: Array<{ __typename?: 'Event', id?: number | null, name?: string | null } | null> | null, users?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null } | null> | null } | null> | null };

export type RolesListQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesListQuery = { __typename?: 'Query', roles?: Array<{ __typename?: 'Role', id: number, name?: string | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null };

export type ShowEventTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventTicketsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id?: number | null, name?: string | null, start_date?: any | null, event_logo_url?: string | null, event_location?: string | null, event_key?: string | null, description?: string | null } | null> | null };

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
    sub_categories {
      id
      name
      parent_event_categoryId
    }
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
    start_date
    start_time
    end_time
    re_entry
    event_logo_url
    userId
    sub_categories {
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
    event_banner_url
    event_location_url
    start_date
    start_time
    end_time
    re_entry
    event_logo_url
    createdAt
    updatedAt
    deleted
    createdBy {
      id
      name
    }
    sub_categories {
      id
      name
    }
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
    start_date
    deleted
    event_banner_url
    sub_categories {
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
  updateEvent(id: $updateEventId, data: $input) {
    id
    event_key
    name
    description
    event_location
    event_logo_url
    start_date
    start_time
    end_time
    re_entry
    event_logo_url
    userId
    sub_categories {
      name
    }
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
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($data: CreateOrganizationInput!) {
  createOrganization(data: $data) {
    id
    name
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($deleteOrganizationId: Int!) {
  deleteOrganization(id: $deleteOrganizationId) {
    id
    name
    deleted
    deletedAt
  }
}
    `;
export type DeleteOrganizationMutationFn = Apollo.MutationFunction<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *      deleteOrganizationId: // value for 'deleteOrganizationId'
 *   },
 * });
 */
export function useDeleteOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, options);
      }
export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>;
export type DeleteOrganizationMutationResult = Apollo.MutationResult<DeleteOrganizationMutation>;
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const EditOrganizationsDocument = gql`
    mutation EditOrganizations($updateOrganizationId: Int!, $data: UpdateOrganizationInput!) {
  updateOrganization(id: $updateOrganizationId, data: $data) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type EditOrganizationsMutationFn = Apollo.MutationFunction<EditOrganizationsMutation, EditOrganizationsMutationVariables>;

/**
 * __useEditOrganizationsMutation__
 *
 * To run a mutation, you first call `useEditOrganizationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrganizationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrganizationsMutation, { data, loading, error }] = useEditOrganizationsMutation({
 *   variables: {
 *      updateOrganizationId: // value for 'updateOrganizationId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditOrganizationsMutation(baseOptions?: Apollo.MutationHookOptions<EditOrganizationsMutation, EditOrganizationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrganizationsMutation, EditOrganizationsMutationVariables>(EditOrganizationsDocument, options);
      }
export type EditOrganizationsMutationHookResult = ReturnType<typeof useEditOrganizationsMutation>;
export type EditOrganizationsMutationResult = Apollo.MutationResult<EditOrganizationsMutation>;
export type EditOrganizationsMutationOptions = Apollo.BaseMutationOptions<EditOrganizationsMutation, EditOrganizationsMutationVariables>;
export const ShowOrganizationDocument = gql`
    query ShowOrganization($organizationId: Int!) {
  organization(id: $organizationId) {
    id
    name
    createdAt
    deleted
    deletedAt
  }
}
    `;

/**
 * __useShowOrganizationQuery__
 *
 * To run a query within a React component, call `useShowOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowOrganizationQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useShowOrganizationQuery(baseOptions: Apollo.QueryHookOptions<ShowOrganizationQuery, ShowOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowOrganizationQuery, ShowOrganizationQueryVariables>(ShowOrganizationDocument, options);
      }
export function useShowOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowOrganizationQuery, ShowOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowOrganizationQuery, ShowOrganizationQueryVariables>(ShowOrganizationDocument, options);
        }
export type ShowOrganizationQueryHookResult = ReturnType<typeof useShowOrganizationQuery>;
export type ShowOrganizationLazyQueryHookResult = ReturnType<typeof useShowOrganizationLazyQuery>;
export type ShowOrganizationQueryResult = Apollo.QueryResult<ShowOrganizationQuery, ShowOrganizationQueryVariables>;
export const ShowOrganizationsDocument = gql`
    query ShowOrganizations {
  organizations {
    id
    name
    createdAt
    events {
      id
      name
    }
    users {
      id
      name
      last_name
    }
  }
}
    `;

/**
 * __useShowOrganizationsQuery__
 *
 * To run a query within a React component, call `useShowOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<ShowOrganizationsQuery, ShowOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowOrganizationsQuery, ShowOrganizationsQueryVariables>(ShowOrganizationsDocument, options);
      }
export function useShowOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowOrganizationsQuery, ShowOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowOrganizationsQuery, ShowOrganizationsQueryVariables>(ShowOrganizationsDocument, options);
        }
export type ShowOrganizationsQueryHookResult = ReturnType<typeof useShowOrganizationsQuery>;
export type ShowOrganizationsLazyQueryHookResult = ReturnType<typeof useShowOrganizationsLazyQuery>;
export type ShowOrganizationsQueryResult = Apollo.QueryResult<ShowOrganizationsQuery, ShowOrganizationsQueryVariables>;
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
export const ShowEventTicketsDocument = gql`
    query ShowEventTickets {
  events {
    id
    name
    start_date
    event_logo_url
    event_location
    event_key
    description
  }
}
    `;

/**
 * __useShowEventTicketsQuery__
 *
 * To run a query within a React component, call `useShowEventTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowEventTicketsQuery(baseOptions?: Apollo.QueryHookOptions<ShowEventTicketsQuery, ShowEventTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventTicketsQuery, ShowEventTicketsQueryVariables>(ShowEventTicketsDocument, options);
      }
export function useShowEventTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventTicketsQuery, ShowEventTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventTicketsQuery, ShowEventTicketsQueryVariables>(ShowEventTicketsDocument, options);
        }
export type ShowEventTicketsQueryHookResult = ReturnType<typeof useShowEventTicketsQuery>;
export type ShowEventTicketsLazyQueryHookResult = ReturnType<typeof useShowEventTicketsLazyQuery>;
export type ShowEventTicketsQueryResult = Apollo.QueryResult<ShowEventTicketsQuery, ShowEventTicketsQueryVariables>;
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