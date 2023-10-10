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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type Ability = {
  __typename?: 'Ability';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AccessType = {
  __typename?: 'AccessType';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enter_and_exit_option: Scalars['Boolean']['output'];
  event: Event;
  eventId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  tickets: Array<Ticket>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  application?: Maybe<Application>;
  applicationId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  tittle: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  useful_link?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
  user_client?: Maybe<UserClient>;
  user_clientId?: Maybe<Scalars['Int']['output']>;
};

export type Application = {
  __typename?: 'Application';
  application_logs: Array<ActivityLog>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expires_in?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role: Role;
  roleId: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BuyCart = {
  __typename?: 'BuyCart';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  is_paid: Scalars['Boolean']['output'];
  payment_method: PaymentMethod;
  payment_methodId: Scalars['Int']['output'];
  recibed_payment: PaymentRecibed;
  recibed_paymentId: Scalars['Int']['output'];
  selled_tickets?: Maybe<Array<Ticket>>;
  total_price: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_client: UserClient;
  user_clientId: Scalars['Int']['output'];
};

export type CreateAbilityInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateAccessTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enter_and_exit_option?: InputMaybe<Scalars['Boolean']['input']>;
  eventId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
};

export type CreateActivityLogInput = {
  applicationId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tittle: Scalars['String']['input'];
  type: Scalars['String']['input'];
  useful_link?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateApplicationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expires_in?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};

export type CreateBuyCartInput = {
  payment_methodId: Scalars['Int']['input'];
  selled_tickets: Array<Scalars['Int']['input']>;
  user_clientId: Scalars['Int']['input'];
};

export type CreateCourtessyTicketInput = {
  access_typeId?: InputMaybe<Scalars['Int']['input']>;
  eventId: Scalars['Int']['input'];
  is_paid: Scalars['Boolean']['input'];
  note: Scalars['String']['input'];
  owner_typeId?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Decimal']['input'];
};

export type CreateEventCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  event_sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateEventInput = {
  description: Scalars['String']['input'];
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  end_time: Scalars['String']['input'];
  event_banner_url: Scalars['String']['input'];
  event_location: Scalars['String']['input'];
  event_location_url: Scalars['String']['input'];
  event_logo_url: Scalars['String']['input'];
  event_sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
  price_from?: InputMaybe<Scalars['Decimal']['input']>;
  price_to?: InputMaybe<Scalars['Decimal']['input']>;
  re_entry: Scalars['Boolean']['input'];
  start_date: Scalars['DateTime']['input'];
  start_time: Scalars['String']['input'];
};

export type CreateEventSubCategoryInput = {
  createdAt: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  event_categoryId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateMailInput = {
  body: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateNotificationInput = {
  description: Scalars['String']['input'];
  is_read: Scalars['Boolean']['input'];
  redirect_url: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateOrganizationInput = {
  name: Scalars['String']['input'];
};

export type CreateOwnerTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreatePaymentCardInput = {
  card_number: Scalars['String']['input'];
  country: Scalars['String']['input'];
  expiration_date: Scalars['DateTime']['input'];
  is_credit_card: Scalars['Boolean']['input'];
  is_default: Scalars['Boolean']['input'];
  nick_name: Scalars['String']['input'];
  owner_name: Scalars['String']['input'];
  payment_methodId: Scalars['Int']['input'];
  user_clientId: Scalars['Int']['input'];
};

export type CreatePaymentMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  payment_reference?: InputMaybe<Scalars['String']['input']>;
  payment_type: Scalars['String']['input'];
};

export type CreatePaymentRecibedInput = {
  authorized_dealerId?: InputMaybe<Scalars['Int']['input']>;
  is_confirmed: Scalars['Boolean']['input'];
  is_refunded: Scalars['Boolean']['input'];
  payment_amount: Scalars['Decimal']['input'];
  payment_date: Scalars['DateTime']['input'];
};

export type CreateRoleInput = {
  abilities: Array<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTicketInput = {
  access_typeId?: InputMaybe<Scalars['Int']['input']>;
  buy_cartId?: InputMaybe<Scalars['Int']['input']>;
  eventId: Scalars['Int']['input'];
  is_paid: Scalars['Boolean']['input'];
  is_used?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  owner_typeId?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Decimal']['input'];
  serial_number: Scalars['String']['input'];
  service_charge: Scalars['Decimal']['input'];
};

export type CreateUserClientInput = {
  email: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
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
  access_types?: Maybe<Array<AccessType>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['DateTime']['output']>;
  end_time?: Maybe<Scalars['String']['output']>;
  event_banner_url?: Maybe<Scalars['String']['output']>;
  event_key?: Maybe<Scalars['String']['output']>;
  event_location: Scalars['String']['output'];
  event_location_url: Scalars['String']['output'];
  event_logo_url?: Maybe<Scalars['String']['output']>;
  event_sub_categories?: Maybe<Array<EventSubCategory>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['Int']['output'];
  owner_types?: Maybe<Array<OwnerType>>;
  price_from?: Maybe<Scalars['Decimal']['output']>;
  price_to?: Maybe<Scalars['Decimal']['output']>;
  re_entry: Scalars['Boolean']['output'];
  selled_tickets?: Maybe<Array<Ticket>>;
  staff?: Maybe<Array<User>>;
  start_date: Scalars['DateTime']['output'];
  start_time?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type EventCategory = {
  __typename?: 'EventCategory';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  event_sub_categories?: Maybe<Array<EventSubCategory>>;
  event_sub_categories_count: Scalars['Int']['output'];
  events?: Maybe<Array<Event>>;
  events_count: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EventSubCategory = {
  __typename?: 'EventSubCategory';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  event_category: EventCategory;
  event_categoryId: Scalars['Int']['output'];
  events?: Maybe<Array<Event>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mail = {
  __typename?: 'Mail';
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  from: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  subject: Scalars['String']['output'];
  to: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
  user_client?: Maybe<UserClient>;
  user_clientId?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignManyStaff?: Maybe<Array<Maybe<User>>>;
  assignStaff?: Maybe<User>;
  clearNotifications: Scalars['Boolean']['output'];
  createAbility: Ability;
  createAccessType: AccessType;
  createActivityLog: ActivityLog;
  createApplication: Application;
  createBuyCart: BuyCart;
  createCourtesyTicket?: Maybe<Ticket>;
  createEvent?: Maybe<Event>;
  createEventCategory?: Maybe<EventCategory>;
  createEventSubCategory: EventSubCategory;
  createMail: Mail;
  createNotification: Notification;
  createOrganization?: Maybe<Organization>;
  createOwnerType: OwnerType;
  createPaymentCard: PaymentCard;
  createPaymentMethod: PaymentMethod;
  createPaymentRecibed: PaymentRecibed;
  createRole?: Maybe<Role>;
  createTicket?: Maybe<Ticket>;
  createUser?: Maybe<User>;
  createUserClient: UserClient;
  deleteAbility: Ability;
  deleteAccessType: AccessType;
  deleteActivityLog: ActivityLog;
  deleteApplication: Application;
  deleteBuyCart?: Maybe<BuyCart>;
  deleteEvent?: Maybe<Event>;
  deleteEventCategory?: Maybe<EventCategory>;
  deleteEventSubCategory?: Maybe<EventSubCategory>;
  deleteMail: Mail;
  deleteNotification: Notification;
  deleteOrganization?: Maybe<Organization>;
  deleteOwnerType?: Maybe<OwnerType>;
  deletePaymentCard: PaymentCard;
  deletePaymentMethod: PaymentMethod;
  deletePaymentRecibed: PaymentRecibed;
  deleteRole?: Maybe<Role>;
  deleteTicket?: Maybe<Ticket>;
  deleteUser?: Maybe<User>;
  deleteUserClient: UserClient;
  removeUsersFromRole?: Maybe<Role>;
  unassignManyStaff?: Maybe<Array<Maybe<User>>>;
  unassignStaff?: Maybe<User>;
  updateAbility: Ability;
  updateAccessType: AccessType;
  updateActivityLog: ActivityLog;
  updateApplication: Application;
  updateBuyCart?: Maybe<BuyCart>;
  updateEvent?: Maybe<Event>;
  updateEventCategory?: Maybe<EventCategory>;
  updateEventSubCategory?: Maybe<EventSubCategory>;
  updateMail: Mail;
  updateNotification: Notification;
  updateOrganization?: Maybe<Organization>;
  updateOwnerType?: Maybe<OwnerType>;
  updatePaymentCard: PaymentCard;
  updatePaymentMethod: PaymentMethod;
  updatePaymentRecibed: PaymentRecibed;
  updateRole?: Maybe<Role>;
  updateTicket?: Maybe<Ticket>;
  updateUser?: Maybe<User>;
  updateUserClient: UserClient;
};


export type MutationAssignManyStaffArgs = {
  eventId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignStaffArgs = {
  eventId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationClearNotificationsArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateAbilityArgs = {
  data: CreateAbilityInput;
};


export type MutationCreateAccessTypeArgs = {
  data: CreateAccessTypeInput;
};


export type MutationCreateActivityLogArgs = {
  data: CreateActivityLogInput;
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationInput;
};


export type MutationCreateBuyCartArgs = {
  data: CreateBuyCartInput;
};


export type MutationCreateCourtesyTicketArgs = {
  data: CreateCourtessyTicketInput;
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateEventCategoryArgs = {
  data: CreateEventCategoryInput;
};


export type MutationCreateEventSubCategoryArgs = {
  data: CreateEventSubCategoryInput;
};


export type MutationCreateMailArgs = {
  data: CreateMailInput;
};


export type MutationCreateNotificationArgs = {
  data: CreateNotificationInput;
};


export type MutationCreateOrganizationArgs = {
  data: CreateOrganizationInput;
};


export type MutationCreateOwnerTypeArgs = {
  data: CreateOwnerTypeInput;
};


export type MutationCreatePaymentCardArgs = {
  data: CreatePaymentCardInput;
};


export type MutationCreatePaymentMethodArgs = {
  data: CreatePaymentMethodInput;
};


export type MutationCreatePaymentRecibedArgs = {
  data: CreatePaymentRecibedInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateTicketArgs = {
  input: CreateTicketInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateUserClientArgs = {
  data: CreateUserClientInput;
};


export type MutationDeleteAbilityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteAccessTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteActivityLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBuyCartArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEventCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEventSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMailArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOwnerTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePaymentCardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePaymentMethodArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePaymentRecibedArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTicketArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUsersFromRoleArgs = {
  id: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationUnassignManyStaffArgs = {
  eventId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationUnassignStaffArgs = {
  eventId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateAbilityArgs = {
  data: UpdateAbilityInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateAccessTypeArgs = {
  data: UpdateAccessTypeInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateActivityLogArgs = {
  data: UpdateActivityLogInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateApplicationArgs = {
  data: UpdateApplicationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateBuyCartArgs = {
  data: UpdateBuyCartInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventArgs = {
  data: UpdateEventInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateEventCategoryArgs = {
  data: UpdateEventCategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateEventSubCategoryArgs = {
  data: UpdateEventSubCategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateMailArgs = {
  data: UpdateMailInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateNotificationArgs = {
  data: UpdateNotificationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOrganizationArgs = {
  data: UpdateOrganizationInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateOwnerTypeArgs = {
  data: UpdateOwnerTypeInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePaymentCardArgs = {
  data: UpdatePaymentCardInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePaymentMethodArgs = {
  data: UpdatePaymentMethodInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePaymentRecibedArgs = {
  data: UpdatePaymentRecibedInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTicketArgs = {
  data: UpdateTicketInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserClientArgs = {
  data: UpdateUserClientInput;
  id: Scalars['Int']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_read: Scalars['Boolean']['output'];
  redirect_url?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
  user_client?: Maybe<UserClient>;
  user_clientId?: Maybe<Scalars['Int']['output']>;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  events?: Maybe<Array<Event>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type OwnerType = {
  __typename?: 'OwnerType';
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  event: Event;
  eventId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  tickets?: Maybe<Array<Ticket>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaginatedRole = {
  __typename?: 'PaginatedRole';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<Role>>;
  pagination?: Maybe<PaginationResponse>;
};

export type Pagination = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  nextPage?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  prevPage?: Maybe<Scalars['Int']['output']>;
  skip: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
};

export type PaymentCard = {
  __typename?: 'PaymentCard';
  card_number: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expiration_date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  is_credit_card: Scalars['Boolean']['output'];
  is_default: Scalars['Boolean']['output'];
  nick_name: Scalars['String']['output'];
  owner_name: Scalars['String']['output'];
  payment_method?: Maybe<PaymentMethod>;
  payment_methodId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_client?: Maybe<UserClient>;
  user_clientId: Scalars['Int']['output'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  buy_cart?: Maybe<Array<BuyCart>>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  payment_card?: Maybe<PaymentCard>;
  payment_reference?: Maybe<Scalars['String']['output']>;
  payment_type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentRecibed = {
  __typename?: 'PaymentRecibed';
  authorized_dealer?: Maybe<UserClient>;
  authorized_dealerId?: Maybe<Scalars['Int']['output']>;
  buy_cart?: Maybe<Array<BuyCart>>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  is_confirmed: Scalars['Boolean']['output'];
  is_refunded: Scalars['Boolean']['output'];
  payment_amount: Scalars['Decimal']['output'];
  payment_date: Scalars['DateTime']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  ability: Ability;
  abilitys: Array<Ability>;
  accessType: AccessType;
  accessTypes: Array<AccessType>;
  accessTypesByEventId: Array<AccessType>;
  activityLog: ActivityLog;
  activityLogs: Array<ActivityLog>;
  application: Application;
  applications: Array<Application>;
  availableStaff?: Maybe<Array<Maybe<User>>>;
  buyCart?: Maybe<BuyCart>;
  buyCarts: Array<BuyCart>;
  courtecy_tickets?: Maybe<Array<Ticket>>;
  currentUser?: Maybe<User>;
  event?: Maybe<Event>;
  eventCategories?: Maybe<Array<EventCategory>>;
  eventCategory: EventCategory;
  eventSubCategories?: Maybe<Array<EventSubCategory>>;
  eventSubCategoriesByCategory?: Maybe<Array<EventSubCategory>>;
  eventSubCategory?: Maybe<EventSubCategory>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsByCategory?: Maybe<Array<Maybe<Event>>>;
  filteredByParentsEventSubCategories?: Maybe<Array<EventCategory>>;
  mail: Mail;
  mails: Array<Mail>;
  notification: Notification;
  notifications: Array<Notification>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  ownerType?: Maybe<OwnerType>;
  ownerTypeByEvent: Array<OwnerType>;
  ownerTypes: Array<OwnerType>;
  paymentCard: PaymentCard;
  paymentCards: Array<PaymentCard>;
  paymentMethod: PaymentMethod;
  paymentMethods: Array<PaymentMethod>;
  paymentRecibed: PaymentRecibed;
  paymentRecibeds: Array<PaymentRecibed>;
  role?: Maybe<Role>;
  roles?: Maybe<PaginatedRole>;
  selled_tickets_by_event?: Maybe<Array<Ticket>>;
  ticket?: Maybe<Ticket>;
  tickets?: Maybe<Array<Ticket>>;
  user?: Maybe<User>;
  userClient: UserClient;
  userClients: Array<UserClient>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryAbilityArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAbilitysArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAccessTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAccessTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAccessTypesByEventIdArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryActivityLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryActivityLogsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryApplicationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryApplicationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryAvailableStaffArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryBuyCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBuyCartsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryCourtecy_TicketsArgs = {
  eventId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
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


export type QueryEventSubCategoriesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryEventSubCategoriesByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryEventSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryEventsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryFilteredByParentsEventSubCategoriesArgs = {
  parentsIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryMailArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMailsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrganizationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryOwnerTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOwnerTypeByEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueryOwnerTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPaymentCardArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentCardsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPaymentMethodArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentMethodsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPaymentRecibedArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentRecibedsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySelled_Tickets_By_EventArgs = {
  event_id: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryTicketArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTicketsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserClientArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserClientsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type Role = {
  __typename?: 'Role';
  abilities?: Maybe<Array<Ability>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  access_type?: Maybe<AccessType>;
  access_typeId?: Maybe<Scalars['Int']['output']>;
  buy_cart?: Maybe<BuyCart>;
  buy_cartId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  event: Event;
  eventId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  is_courtesy: Scalars['Boolean']['output'];
  is_paid: Scalars['Boolean']['output'];
  is_used: Scalars['Boolean']['output'];
  note?: Maybe<Scalars['String']['output']>;
  owner_typeId?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Decimal']['output'];
  serial_number: Scalars['String']['output'];
  service_charge: Scalars['Decimal']['output'];
  ticket_type?: Maybe<OwnerType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateAbilityInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAccessTypeInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enter_and_exit_option?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateActivityLogInput = {
  applicationId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tittle?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  useful_link?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateApplicationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  expires_in?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBuyCartInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  is_paid?: InputMaybe<Scalars['Boolean']['input']>;
  payment_methodId?: InputMaybe<Scalars['Int']['input']>;
  selled_tickets?: InputMaybe<Array<Scalars['Int']['input']>>;
  total_price?: InputMaybe<Scalars['Decimal']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateEventCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  event_sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  end_time?: InputMaybe<Scalars['String']['input']>;
  event_banner_url?: InputMaybe<Scalars['String']['input']>;
  event_location?: InputMaybe<Scalars['String']['input']>;
  event_location_url?: InputMaybe<Scalars['String']['input']>;
  event_logo_url?: InputMaybe<Scalars['String']['input']>;
  event_sub_categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price_from?: InputMaybe<Scalars['Decimal']['input']>;
  price_to?: InputMaybe<Scalars['Decimal']['input']>;
  re_entry?: InputMaybe<Scalars['Boolean']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventSubCategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  event_categoryId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMailInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateNotificationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  redirect_url?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateOwnerTypeInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentCardInput = {
  card_number?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  expiration_date?: InputMaybe<Scalars['DateTime']['input']>;
  is_credit_card?: InputMaybe<Scalars['Boolean']['input']>;
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  nick_name?: InputMaybe<Scalars['String']['input']>;
  owner_name?: InputMaybe<Scalars['String']['input']>;
  payment_methodId?: InputMaybe<Scalars['Int']['input']>;
  user_clientId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePaymentMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  payment_reference?: InputMaybe<Scalars['String']['input']>;
  payment_type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentRecibedInput = {
  authorized_dealerId?: InputMaybe<Scalars['Int']['input']>;
  is_confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  is_refunded?: InputMaybe<Scalars['Boolean']['input']>;
  payment_amount?: InputMaybe<Scalars['Decimal']['input']>;
  payment_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateRoleInput = {
  abilities?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTicketInput = {
  access_typeId?: InputMaybe<Scalars['Int']['input']>;
  buy_cartId?: InputMaybe<Scalars['Int']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  is_paid?: InputMaybe<Scalars['Boolean']['input']>;
  is_used?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  owner_typeId?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  serial_number?: InputMaybe<Scalars['String']['input']>;
  service_charge?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateUserClientInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
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

export type UserClient = {
  __typename?: 'UserClient';
  atendee_of_events?: Maybe<Array<Event>>;
  buy_carts?: Maybe<Array<BuyCart>>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  mails?: Maybe<Array<Mail>>;
  name: Scalars['String']['output'];
  notifications?: Maybe<Array<Notification>>;
  password: Scalars['String']['output'];
  payment_cards?: Maybe<Array<PaymentCard>>;
  role: Role;
  roleId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_client_activity?: Maybe<Array<ActivityLog>>;
};

export type ShowAbilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowAbilitiesQuery = { __typename?: 'Query', abilitys: Array<{ __typename?: 'Ability', id: number, name: string, description?: string | null, createdAt: any, updatedAt?: any | null }> };

export type ShowAccessTypeQueryVariables = Exact<{
  accessTypeId: Scalars['Int']['input'];
}>;


export type ShowAccessTypeQuery = { __typename?: 'Query', accessType: { __typename?: 'AccessType', id: number, name: string, description?: string | null, enter_and_exit_option: boolean, price: any, createdAt: any, updatedAt: any, deleted: boolean, deletedAt?: any | null } };

export type AccessTypesByEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type AccessTypesByEventQuery = { __typename?: 'Query', accessTypesByEventId: Array<{ __typename?: 'AccessType', id: number, name: string, description?: string | null, enter_and_exit_option: boolean, createdAt: any, updatedAt: any }> };

export type CreateAccessTypeMutationVariables = Exact<{
  data: CreateAccessTypeInput;
}>;


export type CreateAccessTypeMutation = { __typename?: 'Mutation', createAccessType: { __typename?: 'AccessType', id: number, name: string, description?: string | null, enter_and_exit_option: boolean, price: any, createdAt: any, updatedAt: any } };

export type EditAccessTypeMutationVariables = Exact<{
  updateAccessTypeId: Scalars['Int']['input'];
  data: UpdateAccessTypeInput;
}>;


export type EditAccessTypeMutation = { __typename?: 'Mutation', updateAccessType: { __typename?: 'AccessType', id: number, description?: string | null, enter_and_exit_option: boolean, price: any } };

export type WhoAMiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAMiQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type CreateEventCategoryViewQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateEventCategoryViewQuery = { __typename?: 'Query', eventSubCategories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null };

export type CreateEventCategoryMutationVariables = Exact<{
  data: CreateEventCategoryInput;
}>;


export type CreateEventCategoryMutation = { __typename?: 'Mutation', createEventCategory?: { __typename?: 'EventCategory', id: number, name: string, description?: string | null, createdAt: any, updatedAt?: any | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', name: string, description?: string | null }> | null } | null };

export type EditEventCategoryQueryVariables = Exact<{
  eventCategoryId: Scalars['Int']['input'];
}>;


export type EditEventCategoryQuery = { __typename?: 'Query', eventCategory: { __typename?: 'EventCategory', id: number, name: string, description?: string | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, description?: string | null }> | null }, eventSubCategories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, createdAt: any, updatedAt?: any | null }> | null };

export type EventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventCategoriesQuery = { __typename?: 'Query', eventCategories?: Array<{ __typename?: 'EventCategory', id: number, name: string, description?: string | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, event_categoryId: number }> | null }> | null, eventSubCategories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, event_categoryId: number }> | null };

export type ModifyEventCategoryMutationVariables = Exact<{
  updateEventCategoryId: Scalars['Int']['input'];
  data: UpdateEventCategoryInput;
}>;


export type ModifyEventCategoryMutation = { __typename?: 'Mutation', updateEventCategory?: { __typename?: 'EventCategory', id: number, name: string, description?: string | null, updatedAt?: any | null, createdAt: any, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null } | null };

export type ShowEventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventCategoriesQuery = { __typename?: 'Query', eventCategories?: Array<{ __typename?: 'EventCategory', id: number, name: string, description?: string | null, events_count: number, event_sub_categories_count: number, createdAt: any, updatedAt?: any | null }> | null };

export type ShowEventCategoryQueryVariables = Exact<{
  eventCategoryId: Scalars['Int']['input'];
}>;


export type ShowEventCategoryQuery = { __typename?: 'Query', eventCategory: { __typename?: 'EventCategory', id: number, name: string, description?: string | null, events_count: number, event_sub_categories_count: number, createdAt: any, updatedAt?: any | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, description?: string | null, createdAt: any, updatedAt?: any | null }> | null } };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id: number, event_key?: string | null, name: string, description?: string | null, event_location: string, event_logo_url?: string | null, start_date: any, start_time?: string | null, end_time?: string | null, re_entry: boolean, userId: number, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null } | null };

export type EditEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type EditEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, name: string, description?: string | null, event_location: string, event_location_url: string, start_date: any, end_date?: any | null, start_time?: string | null, end_time?: string | null, re_entry: boolean, event_logo_url?: string | null, event_banner_url?: string | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null } | null, eventSubCategories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null };

export type ShowEventStaffQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowEventStaffQuery = { __typename?: 'Query', event?: { __typename?: 'Event', staff?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, createdAt?: any | null, roles?: Array<{ __typename?: 'Role', name: string }> | null }> | null } | null };

export type ShowEventTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventTicketsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: number, name: string, start_date: any, event_logo_url?: string | null, event_location: string, event_key?: string | null, description?: string | null } | null> | null };

export type ShowEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, event_key?: string | null, name: string, description?: string | null, event_location: string, event_logo_url?: string | null, event_banner_url?: string | null, event_location_url: string, start_date: any, start_time?: string | null, end_time?: string | null, re_entry: boolean, createdAt: any, updatedAt: any, deleted: boolean, createdBy: { __typename?: 'User', id: number, name?: string | null }, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string, event_category: { __typename?: 'EventCategory', id: number, name: string } }> | null } | null, selled_tickets_by_event?: Array<{ __typename?: 'Ticket', id: number, createdAt: any, serial_number: string, service_charge: any, is_paid: boolean, is_used: boolean, note?: string | null, price: any }> | null };

export type ShowEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: number, event_logo_url?: string | null, event_location: string, event_key?: string | null, name: string, description?: string | null, start_date: any, deleted: boolean, event_banner_url?: string | null, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null } | null> | null };

export type UpdateEventMutationVariables = Exact<{
  updateEventId: Scalars['Int']['input'];
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', id: number, event_key?: string | null, name: string, description?: string | null, event_location: string, event_logo_url?: string | null, start_date: any, start_time?: string | null, end_time?: string | null, re_entry: boolean, userId: number, event_sub_categories?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null } | null };

export type ClearnotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearnotificationsMutation = { __typename?: 'Mutation', clearNotifications: boolean };

export type DeleteNotificationMutationVariables = Exact<{
  deleteNotificationId: Scalars['Int']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: { __typename?: 'Notification', id: number, title: string } };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: number, title: string, description?: string | null, createdAt: any, user?: { __typename?: 'User', id: number, name?: string | null } | null }> };

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


export type ShowOrganizationQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: string, name?: string | null, createdAt?: any | null, deleted?: boolean | null, deletedAt?: any | null, events?: Array<{ __typename?: 'Event', id: number, name: string, description?: string | null, event_location: string, start_date: any, end_date?: any | null }> | null } | null };

export type ShowOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowOrganizationsQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'Organization', id: string, name?: string | null, createdAt?: any | null, events?: Array<{ __typename?: 'Event', id: number, name: string }> | null, users?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null }> | null } | null> | null };

export type OwnerTypeByEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type OwnerTypeByEventQuery = { __typename?: 'Query', ownerTypeByEvent: Array<{ __typename?: 'OwnerType', id: string, name: string, createdAt: any, updatedAt?: any | null, event: { __typename?: 'Event', id: number, name: string } }> };

export type ShowOwnerTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowOwnerTypesQuery = { __typename?: 'Query', ownerTypes: Array<{ __typename?: 'OwnerType', id: string, name: string, createdAt: any, updatedAt?: any | null, event: { __typename?: 'Event', id: number, name: string } }> };

export type CreateRoleMutationVariables = Exact<{
  data: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole?: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string }> | null } | null };

export type EditRoleMutationVariables = Exact<{
  updateRoleId: Scalars['Int']['input'];
  data: UpdateRoleInput;
}>;


export type EditRoleMutation = { __typename?: 'Mutation', updateRole?: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string }> | null } | null };

export type ShowRoleForEditQueryVariables = Exact<{
  roleId: Scalars['Int']['input'];
}>;


export type ShowRoleForEditQuery = { __typename?: 'Query', role?: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string, description?: string | null }> | null } | null, abilitys: Array<{ __typename?: 'Ability', id: number, name: string }> };

export type RemoveUsersFromRoleMutationVariables = Exact<{
  roleId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RemoveUsersFromRoleMutation = { __typename?: 'Mutation', removeUsersFromRole?: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string }> | null, users?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null }> | null } | null };

export type RolesListQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type RolesListQuery = { __typename?: 'Query', roles?: { __typename?: 'PaginatedRole', count: number, pagination?: { __typename?: 'PaginationResponse', take: number, skip: number, pages?: number | null, currentPage?: number | null, nextPage?: number | null } | null, data?: Array<{ __typename?: 'Role', id: number, name: string, description?: string | null, usersCount?: number | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string }> | null }> | null } | null };

export type ShowRoleQueryVariables = Exact<{
  roleId: Scalars['Int']['input'];
}>;


export type ShowRoleQuery = { __typename?: 'Query', role?: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, abilities?: Array<{ __typename?: 'Ability', id: number, name: string }> | null, users?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null }> | null } | null };

export type SearchEventsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type SearchEventsByCategoryQuery = { __typename?: 'Query', eventCategory: { __typename?: 'EventCategory', id: number, name: string }, eventSubCategoriesByCategory?: Array<{ __typename?: 'EventSubCategory', id: number, name: string }> | null, eventsByCategory?: Array<{ __typename?: 'Event', id: number, name: string, start_date: any, end_date?: any | null, price_from?: any | null, price_to?: any | null, start_time?: string | null, end_time?: string | null, event_location: string } | null> | null };

export type AssignManyStaffMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignManyStaffMutation = { __typename?: 'Mutation', assignManyStaff?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null> | null };

export type AssignStaffMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
}>;


export type AssignStaffMutation = { __typename?: 'Mutation', assignStaff?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type ShowAvailableEventStaffQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowAvailableEventStaffQuery = { __typename?: 'Query', availableStaff?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null> | null };

export type UnassignManyStaffMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UnassignManyStaffMutation = { __typename?: 'Mutation', unassignManyStaff?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null> | null };

export type UnassignStaffMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
}>;


export type UnassignStaffMutation = { __typename?: 'Mutation', unassignStaff?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type CreateCourtesyMutationVariables = Exact<{
  data: CreateCourtessyTicketInput;
}>;


export type CreateCourtesyMutation = { __typename?: 'Mutation', createCourtesyTicket?: { __typename?: 'Ticket', id: number, note?: string | null, service_charge: any, createdAt: any, access_type?: { __typename?: 'AccessType', id: number, name: string } | null } | null };

export type EditTicketMutationVariables = Exact<{
  updateTicketId: Scalars['Int']['input'];
  data: UpdateTicketInput;
}>;


export type EditTicketMutation = { __typename?: 'Mutation', updateTicket?: { __typename?: 'Ticket', id: number, note?: string | null, is_used: boolean, price: any, service_charge: any, access_typeId?: number | null, owner_typeId?: number | null, createdAt: any, updatedAt?: any | null, access_type?: { __typename?: 'AccessType', id: number, name: string } | null, ticket_type?: { __typename?: 'OwnerType', id: string, name: string } | null, event: { __typename?: 'Event', id: number, name: string } } | null };

export type ShowCourtesyTicketsQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type ShowCourtesyTicketsQuery = { __typename?: 'Query', courtecy_tickets?: Array<{ __typename?: 'Ticket', id: number, note?: string | null, access_typeId?: number | null, price: any, service_charge: any, is_used: boolean, createdAt: any, ticket_type?: { __typename?: 'OwnerType', id: string, name: string } | null, access_type?: { __typename?: 'AccessType', id: number, name: string } | null }> | null };

export type ShowCourtesyTicketQueryVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type ShowCourtesyTicketQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: number, note?: string | null, is_used: boolean, price: any, service_charge: any, access_typeId?: number | null, owner_typeId?: number | null, createdAt: any, updatedAt?: any | null, access_type?: { __typename?: 'AccessType', id: number, name: string } | null, ticket_type?: { __typename?: 'OwnerType', id: string, name: string } | null, event: { __typename?: 'Event', id: number, name: string } } | null };

export type UserClientQueryVariables = Exact<{
  userClientId: Scalars['Int']['input'];
}>;


export type UserClientQuery = { __typename?: 'Query', userClient: { __typename?: 'UserClient', id: number, name: string, last_name: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, createdAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type EditUserMutationVariables = Exact<{
  updateUserId: Scalars['Int']['input'];
  data: UpdateUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type RemoveUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type ShowUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ShowUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null };

export type ShowUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: number, name?: string | null, last_name?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null } | null> | null };


export const ShowAbilitiesDocument = gql`
    query ShowAbilities {
  abilitys {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useShowAbilitiesQuery__
 *
 * To run a query within a React component, call `useShowAbilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowAbilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowAbilitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowAbilitiesQuery(baseOptions?: Apollo.QueryHookOptions<ShowAbilitiesQuery, ShowAbilitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowAbilitiesQuery, ShowAbilitiesQueryVariables>(ShowAbilitiesDocument, options);
      }
export function useShowAbilitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowAbilitiesQuery, ShowAbilitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowAbilitiesQuery, ShowAbilitiesQueryVariables>(ShowAbilitiesDocument, options);
        }
export type ShowAbilitiesQueryHookResult = ReturnType<typeof useShowAbilitiesQuery>;
export type ShowAbilitiesLazyQueryHookResult = ReturnType<typeof useShowAbilitiesLazyQuery>;
export type ShowAbilitiesQueryResult = Apollo.QueryResult<ShowAbilitiesQuery, ShowAbilitiesQueryVariables>;
export const ShowAccessTypeDocument = gql`
    query ShowAccessType($accessTypeId: Int!) {
  accessType(id: $accessTypeId) {
    id
    name
    description
    enter_and_exit_option
    price
    createdAt
    updatedAt
    deleted
    deletedAt
  }
}
    `;

/**
 * __useShowAccessTypeQuery__
 *
 * To run a query within a React component, call `useShowAccessTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowAccessTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowAccessTypeQuery({
 *   variables: {
 *      accessTypeId: // value for 'accessTypeId'
 *   },
 * });
 */
export function useShowAccessTypeQuery(baseOptions: Apollo.QueryHookOptions<ShowAccessTypeQuery, ShowAccessTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowAccessTypeQuery, ShowAccessTypeQueryVariables>(ShowAccessTypeDocument, options);
      }
export function useShowAccessTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowAccessTypeQuery, ShowAccessTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowAccessTypeQuery, ShowAccessTypeQueryVariables>(ShowAccessTypeDocument, options);
        }
export type ShowAccessTypeQueryHookResult = ReturnType<typeof useShowAccessTypeQuery>;
export type ShowAccessTypeLazyQueryHookResult = ReturnType<typeof useShowAccessTypeLazyQuery>;
export type ShowAccessTypeQueryResult = Apollo.QueryResult<ShowAccessTypeQuery, ShowAccessTypeQueryVariables>;
export const AccessTypesByEventDocument = gql`
    query AccessTypesByEvent($eventId: Int!) {
  accessTypesByEventId(eventId: $eventId) {
    id
    name
    description
    enter_and_exit_option
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAccessTypesByEventQuery__
 *
 * To run a query within a React component, call `useAccessTypesByEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessTypesByEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessTypesByEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAccessTypesByEventQuery(baseOptions: Apollo.QueryHookOptions<AccessTypesByEventQuery, AccessTypesByEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessTypesByEventQuery, AccessTypesByEventQueryVariables>(AccessTypesByEventDocument, options);
      }
export function useAccessTypesByEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessTypesByEventQuery, AccessTypesByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessTypesByEventQuery, AccessTypesByEventQueryVariables>(AccessTypesByEventDocument, options);
        }
export type AccessTypesByEventQueryHookResult = ReturnType<typeof useAccessTypesByEventQuery>;
export type AccessTypesByEventLazyQueryHookResult = ReturnType<typeof useAccessTypesByEventLazyQuery>;
export type AccessTypesByEventQueryResult = Apollo.QueryResult<AccessTypesByEventQuery, AccessTypesByEventQueryVariables>;
export const CreateAccessTypeDocument = gql`
    mutation CreateAccessType($data: CreateAccessTypeInput!) {
  createAccessType(data: $data) {
    id
    name
    description
    enter_and_exit_option
    price
    createdAt
    updatedAt
  }
}
    `;
export type CreateAccessTypeMutationFn = Apollo.MutationFunction<CreateAccessTypeMutation, CreateAccessTypeMutationVariables>;

/**
 * __useCreateAccessTypeMutation__
 *
 * To run a mutation, you first call `useCreateAccessTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessTypeMutation, { data, loading, error }] = useCreateAccessTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAccessTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessTypeMutation, CreateAccessTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccessTypeMutation, CreateAccessTypeMutationVariables>(CreateAccessTypeDocument, options);
      }
export type CreateAccessTypeMutationHookResult = ReturnType<typeof useCreateAccessTypeMutation>;
export type CreateAccessTypeMutationResult = Apollo.MutationResult<CreateAccessTypeMutation>;
export type CreateAccessTypeMutationOptions = Apollo.BaseMutationOptions<CreateAccessTypeMutation, CreateAccessTypeMutationVariables>;
export const EditAccessTypeDocument = gql`
    mutation EditAccessType($updateAccessTypeId: Int!, $data: UpdateAccessTypeInput!) {
  updateAccessType(id: $updateAccessTypeId, data: $data) {
    id
    description
    enter_and_exit_option
    price
  }
}
    `;
export type EditAccessTypeMutationFn = Apollo.MutationFunction<EditAccessTypeMutation, EditAccessTypeMutationVariables>;

/**
 * __useEditAccessTypeMutation__
 *
 * To run a mutation, you first call `useEditAccessTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccessTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccessTypeMutation, { data, loading, error }] = useEditAccessTypeMutation({
 *   variables: {
 *      updateAccessTypeId: // value for 'updateAccessTypeId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditAccessTypeMutation(baseOptions?: Apollo.MutationHookOptions<EditAccessTypeMutation, EditAccessTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccessTypeMutation, EditAccessTypeMutationVariables>(EditAccessTypeDocument, options);
      }
export type EditAccessTypeMutationHookResult = ReturnType<typeof useEditAccessTypeMutation>;
export type EditAccessTypeMutationResult = Apollo.MutationResult<EditAccessTypeMutation>;
export type EditAccessTypeMutationOptions = Apollo.BaseMutationOptions<EditAccessTypeMutation, EditAccessTypeMutationVariables>;
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
export const CreateEventCategoryViewDocument = gql`
    query CreateEventCategoryView {
  eventSubCategories {
    id
    name
  }
}
    `;

/**
 * __useCreateEventCategoryViewQuery__
 *
 * To run a query within a React component, call `useCreateEventCategoryViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateEventCategoryViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateEventCategoryViewQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateEventCategoryViewQuery(baseOptions?: Apollo.QueryHookOptions<CreateEventCategoryViewQuery, CreateEventCategoryViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateEventCategoryViewQuery, CreateEventCategoryViewQueryVariables>(CreateEventCategoryViewDocument, options);
      }
export function useCreateEventCategoryViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateEventCategoryViewQuery, CreateEventCategoryViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateEventCategoryViewQuery, CreateEventCategoryViewQueryVariables>(CreateEventCategoryViewDocument, options);
        }
export type CreateEventCategoryViewQueryHookResult = ReturnType<typeof useCreateEventCategoryViewQuery>;
export type CreateEventCategoryViewLazyQueryHookResult = ReturnType<typeof useCreateEventCategoryViewLazyQuery>;
export type CreateEventCategoryViewQueryResult = Apollo.QueryResult<CreateEventCategoryViewQuery, CreateEventCategoryViewQueryVariables>;
export const CreateEventCategoryDocument = gql`
    mutation CreateEventCategory($data: CreateEventCategoryInput!) {
  createEventCategory(data: $data) {
    id
    name
    description
    event_sub_categories {
      name
      description
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateEventCategoryMutationFn = Apollo.MutationFunction<CreateEventCategoryMutation, CreateEventCategoryMutationVariables>;

/**
 * __useCreateEventCategoryMutation__
 *
 * To run a mutation, you first call `useCreateEventCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventCategoryMutation, { data, loading, error }] = useCreateEventCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventCategoryMutation, CreateEventCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventCategoryMutation, CreateEventCategoryMutationVariables>(CreateEventCategoryDocument, options);
      }
export type CreateEventCategoryMutationHookResult = ReturnType<typeof useCreateEventCategoryMutation>;
export type CreateEventCategoryMutationResult = Apollo.MutationResult<CreateEventCategoryMutation>;
export type CreateEventCategoryMutationOptions = Apollo.BaseMutationOptions<CreateEventCategoryMutation, CreateEventCategoryMutationVariables>;
export const EditEventCategoryDocument = gql`
    query EditEventCategory($eventCategoryId: Int!) {
  eventCategory(id: $eventCategoryId) {
    id
    name
    description
    event_sub_categories {
      id
      name
      description
    }
  }
  eventSubCategories {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useEditEventCategoryQuery__
 *
 * To run a query within a React component, call `useEditEventCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditEventCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditEventCategoryQuery({
 *   variables: {
 *      eventCategoryId: // value for 'eventCategoryId'
 *   },
 * });
 */
export function useEditEventCategoryQuery(baseOptions: Apollo.QueryHookOptions<EditEventCategoryQuery, EditEventCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditEventCategoryQuery, EditEventCategoryQueryVariables>(EditEventCategoryDocument, options);
      }
export function useEditEventCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditEventCategoryQuery, EditEventCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditEventCategoryQuery, EditEventCategoryQueryVariables>(EditEventCategoryDocument, options);
        }
export type EditEventCategoryQueryHookResult = ReturnType<typeof useEditEventCategoryQuery>;
export type EditEventCategoryLazyQueryHookResult = ReturnType<typeof useEditEventCategoryLazyQuery>;
export type EditEventCategoryQueryResult = Apollo.QueryResult<EditEventCategoryQuery, EditEventCategoryQueryVariables>;
export const EventCategoriesDocument = gql`
    query EventCategories {
  eventCategories {
    id
    name
    description
    event_sub_categories {
      id
      name
      event_categoryId
    }
  }
  eventSubCategories {
    id
    name
    event_categoryId
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
export const ModifyEventCategoryDocument = gql`
    mutation ModifyEventCategory($updateEventCategoryId: Int!, $data: UpdateEventCategoryInput!) {
  updateEventCategory(id: $updateEventCategoryId, data: $data) {
    id
    name
    description
    updatedAt
    createdAt
    event_sub_categories {
      id
      name
    }
  }
}
    `;
export type ModifyEventCategoryMutationFn = Apollo.MutationFunction<ModifyEventCategoryMutation, ModifyEventCategoryMutationVariables>;

/**
 * __useModifyEventCategoryMutation__
 *
 * To run a mutation, you first call `useModifyEventCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyEventCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyEventCategoryMutation, { data, loading, error }] = useModifyEventCategoryMutation({
 *   variables: {
 *      updateEventCategoryId: // value for 'updateEventCategoryId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useModifyEventCategoryMutation(baseOptions?: Apollo.MutationHookOptions<ModifyEventCategoryMutation, ModifyEventCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyEventCategoryMutation, ModifyEventCategoryMutationVariables>(ModifyEventCategoryDocument, options);
      }
export type ModifyEventCategoryMutationHookResult = ReturnType<typeof useModifyEventCategoryMutation>;
export type ModifyEventCategoryMutationResult = Apollo.MutationResult<ModifyEventCategoryMutation>;
export type ModifyEventCategoryMutationOptions = Apollo.BaseMutationOptions<ModifyEventCategoryMutation, ModifyEventCategoryMutationVariables>;
export const ShowEventCategoriesDocument = gql`
    query ShowEventCategories {
  eventCategories {
    id
    name
    description
    events_count
    event_sub_categories_count
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useShowEventCategoriesQuery__
 *
 * To run a query within a React component, call `useShowEventCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowEventCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ShowEventCategoriesQuery, ShowEventCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventCategoriesQuery, ShowEventCategoriesQueryVariables>(ShowEventCategoriesDocument, options);
      }
export function useShowEventCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventCategoriesQuery, ShowEventCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventCategoriesQuery, ShowEventCategoriesQueryVariables>(ShowEventCategoriesDocument, options);
        }
export type ShowEventCategoriesQueryHookResult = ReturnType<typeof useShowEventCategoriesQuery>;
export type ShowEventCategoriesLazyQueryHookResult = ReturnType<typeof useShowEventCategoriesLazyQuery>;
export type ShowEventCategoriesQueryResult = Apollo.QueryResult<ShowEventCategoriesQuery, ShowEventCategoriesQueryVariables>;
export const ShowEventCategoryDocument = gql`
    query ShowEventCategory($eventCategoryId: Int!) {
  eventCategory(id: $eventCategoryId) {
    id
    name
    description
    events_count
    event_sub_categories_count
    events_count
    event_sub_categories {
      id
      name
      description
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useShowEventCategoryQuery__
 *
 * To run a query within a React component, call `useShowEventCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventCategoryQuery({
 *   variables: {
 *      eventCategoryId: // value for 'eventCategoryId'
 *   },
 * });
 */
export function useShowEventCategoryQuery(baseOptions: Apollo.QueryHookOptions<ShowEventCategoryQuery, ShowEventCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventCategoryQuery, ShowEventCategoryQueryVariables>(ShowEventCategoryDocument, options);
      }
export function useShowEventCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventCategoryQuery, ShowEventCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventCategoryQuery, ShowEventCategoryQueryVariables>(ShowEventCategoryDocument, options);
        }
export type ShowEventCategoryQueryHookResult = ReturnType<typeof useShowEventCategoryQuery>;
export type ShowEventCategoryLazyQueryHookResult = ReturnType<typeof useShowEventCategoryLazyQuery>;
export type ShowEventCategoryQueryResult = Apollo.QueryResult<ShowEventCategoryQuery, ShowEventCategoryQueryVariables>;
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
    event_sub_categories {
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
export const EditEventDocument = gql`
    query EditEvent($eventId: Int!) {
  event(id: $eventId) {
    id
    name
    description
    event_location
    event_location_url
    start_date
    end_date
    start_time
    end_time
    re_entry
    event_logo_url
    event_banner_url
    event_sub_categories {
      id
      name
    }
  }
  eventSubCategories {
    id
    name
  }
}
    `;

/**
 * __useEditEventQuery__
 *
 * To run a query within a React component, call `useEditEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEditEventQuery(baseOptions: Apollo.QueryHookOptions<EditEventQuery, EditEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditEventQuery, EditEventQueryVariables>(EditEventDocument, options);
      }
export function useEditEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditEventQuery, EditEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditEventQuery, EditEventQueryVariables>(EditEventDocument, options);
        }
export type EditEventQueryHookResult = ReturnType<typeof useEditEventQuery>;
export type EditEventLazyQueryHookResult = ReturnType<typeof useEditEventLazyQuery>;
export type EditEventQueryResult = Apollo.QueryResult<EditEventQuery, EditEventQueryVariables>;
export const ShowEventStaffDocument = gql`
    query ShowEventStaff($eventId: Int!) {
  event(id: $eventId) {
    staff {
      id
      name
      last_name
      createdAt
      roles {
        name
      }
    }
  }
}
    `;

/**
 * __useShowEventStaffQuery__
 *
 * To run a query within a React component, call `useShowEventStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowEventStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowEventStaffQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useShowEventStaffQuery(baseOptions: Apollo.QueryHookOptions<ShowEventStaffQuery, ShowEventStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowEventStaffQuery, ShowEventStaffQueryVariables>(ShowEventStaffDocument, options);
      }
export function useShowEventStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowEventStaffQuery, ShowEventStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowEventStaffQuery, ShowEventStaffQueryVariables>(ShowEventStaffDocument, options);
        }
export type ShowEventStaffQueryHookResult = ReturnType<typeof useShowEventStaffQuery>;
export type ShowEventStaffLazyQueryHookResult = ReturnType<typeof useShowEventStaffLazyQuery>;
export type ShowEventStaffQueryResult = Apollo.QueryResult<ShowEventStaffQuery, ShowEventStaffQueryVariables>;
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
    event_sub_categories {
      id
      name
      event_category {
        id
        name
      }
    }
  }
  selled_tickets_by_event(event_id: $eventId) {
    id
    createdAt
    serial_number
    service_charge
    is_paid
    is_used
    note
    price
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
    event_sub_categories {
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
    event_sub_categories {
      id
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
export const ClearnotificationsDocument = gql`
    mutation Clearnotifications {
  clearNotifications
}
    `;
export type ClearnotificationsMutationFn = Apollo.MutationFunction<ClearnotificationsMutation, ClearnotificationsMutationVariables>;

/**
 * __useClearnotificationsMutation__
 *
 * To run a mutation, you first call `useClearnotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearnotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearnotificationsMutation, { data, loading, error }] = useClearnotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearnotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ClearnotificationsMutation, ClearnotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearnotificationsMutation, ClearnotificationsMutationVariables>(ClearnotificationsDocument, options);
      }
export type ClearnotificationsMutationHookResult = ReturnType<typeof useClearnotificationsMutation>;
export type ClearnotificationsMutationResult = Apollo.MutationResult<ClearnotificationsMutation>;
export type ClearnotificationsMutationOptions = Apollo.BaseMutationOptions<ClearnotificationsMutation, ClearnotificationsMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($deleteNotificationId: Int!) {
  deleteNotification(id: $deleteNotificationId) {
    id
    title
  }
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      deleteNotificationId: // value for 'deleteNotificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    title
    description
    user {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
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
    events {
      id
      name
      description
      event_location
      start_date
      end_date
    }
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
export const OwnerTypeByEventDocument = gql`
    query OwnerTypeByEvent($eventId: Int!) {
  ownerTypeByEvent(eventId: $eventId) {
    id
    name
    event {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useOwnerTypeByEventQuery__
 *
 * To run a query within a React component, call `useOwnerTypeByEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnerTypeByEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnerTypeByEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useOwnerTypeByEventQuery(baseOptions: Apollo.QueryHookOptions<OwnerTypeByEventQuery, OwnerTypeByEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnerTypeByEventQuery, OwnerTypeByEventQueryVariables>(OwnerTypeByEventDocument, options);
      }
export function useOwnerTypeByEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnerTypeByEventQuery, OwnerTypeByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnerTypeByEventQuery, OwnerTypeByEventQueryVariables>(OwnerTypeByEventDocument, options);
        }
export type OwnerTypeByEventQueryHookResult = ReturnType<typeof useOwnerTypeByEventQuery>;
export type OwnerTypeByEventLazyQueryHookResult = ReturnType<typeof useOwnerTypeByEventLazyQuery>;
export type OwnerTypeByEventQueryResult = Apollo.QueryResult<OwnerTypeByEventQuery, OwnerTypeByEventQueryVariables>;
export const ShowOwnerTypesDocument = gql`
    query ShowOwnerTypes {
  ownerTypes {
    id
    name
    event {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useShowOwnerTypesQuery__
 *
 * To run a query within a React component, call `useShowOwnerTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowOwnerTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowOwnerTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowOwnerTypesQuery(baseOptions?: Apollo.QueryHookOptions<ShowOwnerTypesQuery, ShowOwnerTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowOwnerTypesQuery, ShowOwnerTypesQueryVariables>(ShowOwnerTypesDocument, options);
      }
export function useShowOwnerTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowOwnerTypesQuery, ShowOwnerTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowOwnerTypesQuery, ShowOwnerTypesQueryVariables>(ShowOwnerTypesDocument, options);
        }
export type ShowOwnerTypesQueryHookResult = ReturnType<typeof useShowOwnerTypesQuery>;
export type ShowOwnerTypesLazyQueryHookResult = ReturnType<typeof useShowOwnerTypesLazyQuery>;
export type ShowOwnerTypesQueryResult = Apollo.QueryResult<ShowOwnerTypesQuery, ShowOwnerTypesQueryVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($data: CreateRoleInput!) {
  createRole(data: $data) {
    id
    name
    description
    abilities {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const EditRoleDocument = gql`
    mutation EditRole($updateRoleId: Int!, $data: UpdateRoleInput!) {
  updateRole(id: $updateRoleId, data: $data) {
    id
    name
    description
    abilities {
      id
      name
    }
    createdAt
    updatedAt
    deletedAt
  }
}
    `;
export type EditRoleMutationFn = Apollo.MutationFunction<EditRoleMutation, EditRoleMutationVariables>;

/**
 * __useEditRoleMutation__
 *
 * To run a mutation, you first call `useEditRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRoleMutation, { data, loading, error }] = useEditRoleMutation({
 *   variables: {
 *      updateRoleId: // value for 'updateRoleId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditRoleMutation(baseOptions?: Apollo.MutationHookOptions<EditRoleMutation, EditRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRoleMutation, EditRoleMutationVariables>(EditRoleDocument, options);
      }
export type EditRoleMutationHookResult = ReturnType<typeof useEditRoleMutation>;
export type EditRoleMutationResult = Apollo.MutationResult<EditRoleMutation>;
export type EditRoleMutationOptions = Apollo.BaseMutationOptions<EditRoleMutation, EditRoleMutationVariables>;
export const ShowRoleForEditDocument = gql`
    query ShowRoleForEdit($roleId: Int!) {
  role(id: $roleId) {
    id
    name
    description
    createdAt
    updatedAt
    deletedAt
    abilities {
      id
      name
      description
    }
  }
  abilitys {
    id
    name
  }
}
    `;

/**
 * __useShowRoleForEditQuery__
 *
 * To run a query within a React component, call `useShowRoleForEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowRoleForEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowRoleForEditQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useShowRoleForEditQuery(baseOptions: Apollo.QueryHookOptions<ShowRoleForEditQuery, ShowRoleForEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowRoleForEditQuery, ShowRoleForEditQueryVariables>(ShowRoleForEditDocument, options);
      }
export function useShowRoleForEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowRoleForEditQuery, ShowRoleForEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowRoleForEditQuery, ShowRoleForEditQueryVariables>(ShowRoleForEditDocument, options);
        }
export type ShowRoleForEditQueryHookResult = ReturnType<typeof useShowRoleForEditQuery>;
export type ShowRoleForEditLazyQueryHookResult = ReturnType<typeof useShowRoleForEditLazyQuery>;
export type ShowRoleForEditQueryResult = Apollo.QueryResult<ShowRoleForEditQuery, ShowRoleForEditQueryVariables>;
export const RemoveUsersFromRoleDocument = gql`
    mutation RemoveUsersFromRole($roleId: Int!, $userIds: [Int!]!) {
  removeUsersFromRole(id: $roleId, userIds: $userIds) {
    id
    name
    description
    createdAt
    updatedAt
    deletedAt
    abilities {
      id
      name
    }
    users {
      id
      name
      last_name
      email
      createdAt
      updatedAt
      roles {
        id
        name
      }
    }
  }
}
    `;
export type RemoveUsersFromRoleMutationFn = Apollo.MutationFunction<RemoveUsersFromRoleMutation, RemoveUsersFromRoleMutationVariables>;

/**
 * __useRemoveUsersFromRoleMutation__
 *
 * To run a mutation, you first call `useRemoveUsersFromRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUsersFromRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUsersFromRoleMutation, { data, loading, error }] = useRemoveUsersFromRoleMutation({
 *   variables: {
 *      roleId: // value for 'roleId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useRemoveUsersFromRoleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUsersFromRoleMutation, RemoveUsersFromRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUsersFromRoleMutation, RemoveUsersFromRoleMutationVariables>(RemoveUsersFromRoleDocument, options);
      }
export type RemoveUsersFromRoleMutationHookResult = ReturnType<typeof useRemoveUsersFromRoleMutation>;
export type RemoveUsersFromRoleMutationResult = Apollo.MutationResult<RemoveUsersFromRoleMutation>;
export type RemoveUsersFromRoleMutationOptions = Apollo.BaseMutationOptions<RemoveUsersFromRoleMutation, RemoveUsersFromRoleMutationVariables>;
export const RolesListDocument = gql`
    query RolesList($pagination: Pagination) {
  roles(pagination: $pagination) {
    pagination {
      take
      skip
      pages
      currentPage
      nextPage
    }
    count
    data {
      id
      name
      description
      abilities {
        id
        name
      }
      usersCount
      createdAt
      updatedAt
      deletedAt
    }
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
 *      pagination: // value for 'pagination'
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
export const ShowRoleDocument = gql`
    query ShowRole($roleId: Int!) {
  role(id: $roleId) {
    id
    name
    description
    createdAt
    updatedAt
    deletedAt
    abilities {
      id
      name
    }
    users {
      id
      name
      last_name
      email
      createdAt
      updatedAt
      roles {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useShowRoleQuery__
 *
 * To run a query within a React component, call `useShowRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowRoleQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useShowRoleQuery(baseOptions: Apollo.QueryHookOptions<ShowRoleQuery, ShowRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowRoleQuery, ShowRoleQueryVariables>(ShowRoleDocument, options);
      }
export function useShowRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowRoleQuery, ShowRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowRoleQuery, ShowRoleQueryVariables>(ShowRoleDocument, options);
        }
export type ShowRoleQueryHookResult = ReturnType<typeof useShowRoleQuery>;
export type ShowRoleLazyQueryHookResult = ReturnType<typeof useShowRoleLazyQuery>;
export type ShowRoleQueryResult = Apollo.QueryResult<ShowRoleQuery, ShowRoleQueryVariables>;
export const SearchEventsByCategoryDocument = gql`
    query SearchEventsByCategory($categoryId: Int!) {
  eventCategory(id: $categoryId) {
    id
    name
  }
  eventSubCategoriesByCategory(categoryId: $categoryId) {
    id
    name
  }
  eventsByCategory(categoryId: $categoryId) {
    id
    name
    start_date
    end_date
    price_from
    price_to
    start_time
    end_time
    event_location
  }
}
    `;

/**
 * __useSearchEventsByCategoryQuery__
 *
 * To run a query within a React component, call `useSearchEventsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEventsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEventsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useSearchEventsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<SearchEventsByCategoryQuery, SearchEventsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchEventsByCategoryQuery, SearchEventsByCategoryQueryVariables>(SearchEventsByCategoryDocument, options);
      }
export function useSearchEventsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchEventsByCategoryQuery, SearchEventsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchEventsByCategoryQuery, SearchEventsByCategoryQueryVariables>(SearchEventsByCategoryDocument, options);
        }
export type SearchEventsByCategoryQueryHookResult = ReturnType<typeof useSearchEventsByCategoryQuery>;
export type SearchEventsByCategoryLazyQueryHookResult = ReturnType<typeof useSearchEventsByCategoryLazyQuery>;
export type SearchEventsByCategoryQueryResult = Apollo.QueryResult<SearchEventsByCategoryQuery, SearchEventsByCategoryQueryVariables>;
export const AssignManyStaffDocument = gql`
    mutation AssignManyStaff($eventId: Int!, $userIds: [Int!]!) {
  assignManyStaff(eventId: $eventId, userIds: $userIds) {
    id
    name
    last_name
    roles {
      id
      name
    }
  }
}
    `;
export type AssignManyStaffMutationFn = Apollo.MutationFunction<AssignManyStaffMutation, AssignManyStaffMutationVariables>;

/**
 * __useAssignManyStaffMutation__
 *
 * To run a mutation, you first call `useAssignManyStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignManyStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignManyStaffMutation, { data, loading, error }] = useAssignManyStaffMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useAssignManyStaffMutation(baseOptions?: Apollo.MutationHookOptions<AssignManyStaffMutation, AssignManyStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignManyStaffMutation, AssignManyStaffMutationVariables>(AssignManyStaffDocument, options);
      }
export type AssignManyStaffMutationHookResult = ReturnType<typeof useAssignManyStaffMutation>;
export type AssignManyStaffMutationResult = Apollo.MutationResult<AssignManyStaffMutation>;
export type AssignManyStaffMutationOptions = Apollo.BaseMutationOptions<AssignManyStaffMutation, AssignManyStaffMutationVariables>;
export const AssignStaffDocument = gql`
    mutation AssignStaff($userId: Int!, $eventId: Int!) {
  assignStaff(userId: $userId, eventId: $eventId) {
    id
    name
    last_name
    roles {
      id
      name
    }
  }
}
    `;
export type AssignStaffMutationFn = Apollo.MutationFunction<AssignStaffMutation, AssignStaffMutationVariables>;

/**
 * __useAssignStaffMutation__
 *
 * To run a mutation, you first call `useAssignStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStaffMutation, { data, loading, error }] = useAssignStaffMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAssignStaffMutation(baseOptions?: Apollo.MutationHookOptions<AssignStaffMutation, AssignStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignStaffMutation, AssignStaffMutationVariables>(AssignStaffDocument, options);
      }
export type AssignStaffMutationHookResult = ReturnType<typeof useAssignStaffMutation>;
export type AssignStaffMutationResult = Apollo.MutationResult<AssignStaffMutation>;
export type AssignStaffMutationOptions = Apollo.BaseMutationOptions<AssignStaffMutation, AssignStaffMutationVariables>;
export const ShowAvailableEventStaffDocument = gql`
    query ShowAvailableEventStaff($eventId: Int!) {
  availableStaff(eventId: $eventId) {
    id
    name
    last_name
    roles {
      id
      name
    }
  }
}
    `;

/**
 * __useShowAvailableEventStaffQuery__
 *
 * To run a query within a React component, call `useShowAvailableEventStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowAvailableEventStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowAvailableEventStaffQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useShowAvailableEventStaffQuery(baseOptions: Apollo.QueryHookOptions<ShowAvailableEventStaffQuery, ShowAvailableEventStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowAvailableEventStaffQuery, ShowAvailableEventStaffQueryVariables>(ShowAvailableEventStaffDocument, options);
      }
export function useShowAvailableEventStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowAvailableEventStaffQuery, ShowAvailableEventStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowAvailableEventStaffQuery, ShowAvailableEventStaffQueryVariables>(ShowAvailableEventStaffDocument, options);
        }
export type ShowAvailableEventStaffQueryHookResult = ReturnType<typeof useShowAvailableEventStaffQuery>;
export type ShowAvailableEventStaffLazyQueryHookResult = ReturnType<typeof useShowAvailableEventStaffLazyQuery>;
export type ShowAvailableEventStaffQueryResult = Apollo.QueryResult<ShowAvailableEventStaffQuery, ShowAvailableEventStaffQueryVariables>;
export const UnassignManyStaffDocument = gql`
    mutation UnassignManyStaff($eventId: Int!, $userIds: [Int!]!) {
  unassignManyStaff(eventId: $eventId, userIds: $userIds) {
    id
    name
    last_name
    email
    roles {
      id
      name
    }
  }
}
    `;
export type UnassignManyStaffMutationFn = Apollo.MutationFunction<UnassignManyStaffMutation, UnassignManyStaffMutationVariables>;

/**
 * __useUnassignManyStaffMutation__
 *
 * To run a mutation, you first call `useUnassignManyStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignManyStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignManyStaffMutation, { data, loading, error }] = useUnassignManyStaffMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useUnassignManyStaffMutation(baseOptions?: Apollo.MutationHookOptions<UnassignManyStaffMutation, UnassignManyStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignManyStaffMutation, UnassignManyStaffMutationVariables>(UnassignManyStaffDocument, options);
      }
export type UnassignManyStaffMutationHookResult = ReturnType<typeof useUnassignManyStaffMutation>;
export type UnassignManyStaffMutationResult = Apollo.MutationResult<UnassignManyStaffMutation>;
export type UnassignManyStaffMutationOptions = Apollo.BaseMutationOptions<UnassignManyStaffMutation, UnassignManyStaffMutationVariables>;
export const UnassignStaffDocument = gql`
    mutation UnassignStaff($userId: Int!, $eventId: Int!) {
  unassignStaff(userId: $userId, eventId: $eventId) {
    id
    name
    last_name
    email
    roles {
      id
      name
    }
  }
}
    `;
export type UnassignStaffMutationFn = Apollo.MutationFunction<UnassignStaffMutation, UnassignStaffMutationVariables>;

/**
 * __useUnassignStaffMutation__
 *
 * To run a mutation, you first call `useUnassignStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignStaffMutation, { data, loading, error }] = useUnassignStaffMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useUnassignStaffMutation(baseOptions?: Apollo.MutationHookOptions<UnassignStaffMutation, UnassignStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignStaffMutation, UnassignStaffMutationVariables>(UnassignStaffDocument, options);
      }
export type UnassignStaffMutationHookResult = ReturnType<typeof useUnassignStaffMutation>;
export type UnassignStaffMutationResult = Apollo.MutationResult<UnassignStaffMutation>;
export type UnassignStaffMutationOptions = Apollo.BaseMutationOptions<UnassignStaffMutation, UnassignStaffMutationVariables>;
export const CreateCourtesyDocument = gql`
    mutation CreateCourtesy($data: CreateCourtessyTicketInput!) {
  createCourtesyTicket(data: $data) {
    id
    note
    service_charge
    access_type {
      id
      name
    }
    createdAt
  }
}
    `;
export type CreateCourtesyMutationFn = Apollo.MutationFunction<CreateCourtesyMutation, CreateCourtesyMutationVariables>;

/**
 * __useCreateCourtesyMutation__
 *
 * To run a mutation, you first call `useCreateCourtesyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourtesyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourtesyMutation, { data, loading, error }] = useCreateCourtesyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourtesyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourtesyMutation, CreateCourtesyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourtesyMutation, CreateCourtesyMutationVariables>(CreateCourtesyDocument, options);
      }
export type CreateCourtesyMutationHookResult = ReturnType<typeof useCreateCourtesyMutation>;
export type CreateCourtesyMutationResult = Apollo.MutationResult<CreateCourtesyMutation>;
export type CreateCourtesyMutationOptions = Apollo.BaseMutationOptions<CreateCourtesyMutation, CreateCourtesyMutationVariables>;
export const EditTicketDocument = gql`
    mutation EditTicket($updateTicketId: Int!, $data: UpdateTicketInput!) {
  updateTicket(id: $updateTicketId, data: $data) {
    id
    note
    is_used
    price
    service_charge
    access_typeId
    owner_typeId
    access_type {
      id
      name
    }
    ticket_type {
      id
      name
    }
    event {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export type EditTicketMutationFn = Apollo.MutationFunction<EditTicketMutation, EditTicketMutationVariables>;

/**
 * __useEditTicketMutation__
 *
 * To run a mutation, you first call `useEditTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTicketMutation, { data, loading, error }] = useEditTicketMutation({
 *   variables: {
 *      updateTicketId: // value for 'updateTicketId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditTicketMutation(baseOptions?: Apollo.MutationHookOptions<EditTicketMutation, EditTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTicketMutation, EditTicketMutationVariables>(EditTicketDocument, options);
      }
export type EditTicketMutationHookResult = ReturnType<typeof useEditTicketMutation>;
export type EditTicketMutationResult = Apollo.MutationResult<EditTicketMutation>;
export type EditTicketMutationOptions = Apollo.BaseMutationOptions<EditTicketMutation, EditTicketMutationVariables>;
export const ShowCourtesyTicketsDocument = gql`
    query ShowCourtesyTickets($eventId: Int!) {
  courtecy_tickets(eventId: $eventId) {
    id
    note
    access_typeId
    price
    service_charge
    ticket_type {
      id
      name
    }
    access_type {
      id
      name
    }
    is_used
    createdAt
  }
}
    `;

/**
 * __useShowCourtesyTicketsQuery__
 *
 * To run a query within a React component, call `useShowCourtesyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowCourtesyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowCourtesyTicketsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useShowCourtesyTicketsQuery(baseOptions: Apollo.QueryHookOptions<ShowCourtesyTicketsQuery, ShowCourtesyTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowCourtesyTicketsQuery, ShowCourtesyTicketsQueryVariables>(ShowCourtesyTicketsDocument, options);
      }
export function useShowCourtesyTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowCourtesyTicketsQuery, ShowCourtesyTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowCourtesyTicketsQuery, ShowCourtesyTicketsQueryVariables>(ShowCourtesyTicketsDocument, options);
        }
export type ShowCourtesyTicketsQueryHookResult = ReturnType<typeof useShowCourtesyTicketsQuery>;
export type ShowCourtesyTicketsLazyQueryHookResult = ReturnType<typeof useShowCourtesyTicketsLazyQuery>;
export type ShowCourtesyTicketsQueryResult = Apollo.QueryResult<ShowCourtesyTicketsQuery, ShowCourtesyTicketsQueryVariables>;
export const ShowCourtesyTicketDocument = gql`
    query ShowCourtesyTicket($ticketId: Int!) {
  ticket(id: $ticketId) {
    id
    note
    is_used
    price
    service_charge
    access_typeId
    owner_typeId
    access_type {
      id
      name
    }
    ticket_type {
      id
      name
    }
    event {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useShowCourtesyTicketQuery__
 *
 * To run a query within a React component, call `useShowCourtesyTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowCourtesyTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowCourtesyTicketQuery({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useShowCourtesyTicketQuery(baseOptions: Apollo.QueryHookOptions<ShowCourtesyTicketQuery, ShowCourtesyTicketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowCourtesyTicketQuery, ShowCourtesyTicketQueryVariables>(ShowCourtesyTicketDocument, options);
      }
export function useShowCourtesyTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowCourtesyTicketQuery, ShowCourtesyTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowCourtesyTicketQuery, ShowCourtesyTicketQueryVariables>(ShowCourtesyTicketDocument, options);
        }
export type ShowCourtesyTicketQueryHookResult = ReturnType<typeof useShowCourtesyTicketQuery>;
export type ShowCourtesyTicketLazyQueryHookResult = ReturnType<typeof useShowCourtesyTicketLazyQuery>;
export type ShowCourtesyTicketQueryResult = Apollo.QueryResult<ShowCourtesyTicketQuery, ShowCourtesyTicketQueryVariables>;
export const UserClientDocument = gql`
    query UserClient($userClientId: Int!) {
  userClient(id: $userClientId) {
    id
    name
    last_name
  }
}
    `;

/**
 * __useUserClientQuery__
 *
 * To run a query within a React component, call `useUserClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserClientQuery({
 *   variables: {
 *      userClientId: // value for 'userClientId'
 *   },
 * });
 */
export function useUserClientQuery(baseOptions: Apollo.QueryHookOptions<UserClientQuery, UserClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserClientQuery, UserClientQueryVariables>(UserClientDocument, options);
      }
export function useUserClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserClientQuery, UserClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserClientQuery, UserClientQueryVariables>(UserClientDocument, options);
        }
export type UserClientQueryHookResult = ReturnType<typeof useUserClientQuery>;
export type UserClientLazyQueryHookResult = ReturnType<typeof useUserClientLazyQuery>;
export type UserClientQueryResult = Apollo.QueryResult<UserClientQuery, UserClientQueryVariables>;
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
export const EditUserDocument = gql`
    mutation EditUser($updateUserId: Int!, $data: UpdateUserInput!) {
  updateUser(id: $updateUserId, data: $data) {
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
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($deleteUserId: Int!) {
  deleteUser(id: $deleteUserId) {
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
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const ShowUserDocument = gql`
    query ShowUser($userId: Int!) {
  user(id: $userId) {
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
 * __useShowUserQuery__
 *
 * To run a query within a React component, call `useShowUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useShowUserQuery(baseOptions: Apollo.QueryHookOptions<ShowUserQuery, ShowUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowUserQuery, ShowUserQueryVariables>(ShowUserDocument, options);
      }
export function useShowUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowUserQuery, ShowUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowUserQuery, ShowUserQueryVariables>(ShowUserDocument, options);
        }
export type ShowUserQueryHookResult = ReturnType<typeof useShowUserQuery>;
export type ShowUserLazyQueryHookResult = ReturnType<typeof useShowUserLazyQuery>;
export type ShowUserQueryResult = Apollo.QueryResult<ShowUserQuery, ShowUserQueryVariables>;
export const ShowUsersDocument = gql`
    query ShowUsers {
  users {
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
 * __useShowUsersQuery__
 *
 * To run a query within a React component, call `useShowUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowUsersQuery(baseOptions?: Apollo.QueryHookOptions<ShowUsersQuery, ShowUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowUsersQuery, ShowUsersQueryVariables>(ShowUsersDocument, options);
      }
export function useShowUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowUsersQuery, ShowUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowUsersQuery, ShowUsersQueryVariables>(ShowUsersDocument, options);
        }
export type ShowUsersQueryHookResult = ReturnType<typeof useShowUsersQuery>;
export type ShowUsersLazyQueryHookResult = ReturnType<typeof useShowUsersLazyQuery>;
export type ShowUsersQueryResult = Apollo.QueryResult<ShowUsersQuery, ShowUsersQueryVariables>;