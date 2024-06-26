export const RootPath = "/";
export const LoginPath = "/auth/login";
export const RegisterPath = "/auth/register";
export const LoginClientPath = "/auth/client";
export const RegisterClientPath = "/auth/client/register";
export const ProfilePath = "/profile";
export const DashboardPath = "/dashboard";
export const TermsAndConditionsPath = "/terms-and-conditions";
export const PaymentIntentAPIPath = "/api/create-payment-intent";

// ============ ORGANIZATIONS ============
export const OrganizationsPath = "/organizations";
export const CreateOrganizationPath = "/organizations/create";
export const ShowOrganizationPath = (id: string) => `/organizations/${id}`;

//============= EVENTS ============
export const EventsPath = "/events";
export const CreateEventPath = "/events/create";
export const ShowEventPath = (id: string) => `/events/${id}`;
export const EditEventPath = (id: number) => `/events/${id}/edit`;

// =========== USERS ============
export const UsersPath = "/users";
export const ShowUserPath = (id: string) => `/users/${id}`;
export const EditUserPath = (userId: string) => `/users/${userId}/edit`;
export const CreateUsersPath = "/users/create";

// =========== ROLES ============
export const ShowRolesPath = "/users/roles";
export const CreateRolePath = "/users/roles/create";
export const ShowRolePath = (id: string) => `/users/roles/${id}`;
export const EditRolePath = (id: string) => `/users/roles/${id}/edit`;

// =========== CATEGORIES ============
export const CategoriesPath = "/categories";
export const CreateCategoriesPath = "/categories/create";
export const ShowCategoryPath = (categoryId: string) =>
  `/categories/${categoryId}`;
export const EditCategoryPath = (categoryId: string) =>
  `/categories/${categoryId}/edit`;

// =========== BUY TICKETS ============
export const SearchEventsByCategoryPath = (categoryId: string) =>
  `/search/categories/${categoryId}/events`;

export const SearchEventsBySubcategoryPath = (subcategoryId: string) =>
  `/search/sub-categories/${subcategoryId}/events`;

export const SearchEventById = (eventId: string) => `/search/events/${eventId}`;

export const SearchOrganizationById = (organizationId: string) =>
  `/search/organizations/${organizationId}`;

export const ShowAccessTypesByEvent = (eventId: string) =>
  `/search/events/${eventId}/access-types`;

export const SearchTicketsByEvent = (eventId: string, accessTypeId: string) =>
  `/search/events/${eventId}/access-types/${accessTypeId}/tickets`;

// ============ EVENTS ============
export const ShowEventStaffIdPath = (id: number) => `/events/${id}/staff`;

export const ShowEventStaffPath = (id: number, staffId: number) =>
  `/events/${id}/staff/${staffId}`;

export const CreateEventStaffPath = (id: number) =>
  `/events/${id}/staff/create`;

export const EditEventStaffPath = (id: number, staffId: number) =>
  `/events/${id}/staff/${staffId}/edit`;

export const AccessTypesPath = (id: number) => `/events/${id}/access-types`;
export const CreateAccessTypePath = (id: number) =>
  `/events/${id}/access-types/create`;
export const ShowAccessTypePath = (id: number, accessTypeId: number) =>
  `/events/${id}/access-types/${accessTypeId}`;
export const EditAccessTypePath = (id: number, accessTypeId: number) =>
  `/events/${id}/access-types/${accessTypeId}/edit`;

export const ShowCourtecyTicketsPath = (id: string) =>
  `/events/${id}/courtesy-tickets`;
export const CreateCourtecyTicketPath = (id: string) =>
  `/events/${id}/courtesy-tickets/create`;
export const ShowCourtecyTicketPath = (id: string, courtesyId: string) =>
  `/events/${id}/courtesy-tickets/${courtesyId}`;
export const EditCourtecyTicketPath = (id: string, courtesyId: string) =>
  `/events/${id}/courtesy-tickets/${courtesyId}/edit`;

// =========== ORDERS ============
export const ShowOrdersPath = `/orders`;
export const CreateOrderPath = (
  eventId: string,
  accessTypeId: string,
  buyedTicketsCount: number
) =>
  `/orders/create?eventId=${eventId}&accessTypeId=${accessTypeId}&buyedTicketsCount=${buyedTicketsCount}`;

export const PaymentPath = (
  eventId: string,
  accessTypeId: string,
  buyedTicketsCount: number
) =>
  `/orders/payment?eventId=${eventId}&accessTypeId=${accessTypeId}&buyedTicketsCount=${buyedTicketsCount}`;

export const ShowOrderPath = (orderId: string) => `/orders/${orderId}`;

export const SuccessPaymentPath = (orderId: string) =>
  `/orders/${orderId}/success`;

export const CancelPaymentPath = (orderId: string) =>
  `/orders/${orderId}/cancel`;

export const ShowOrderCheckoutPath = (orderId: string) =>
  `/orders/${orderId}/checkout`;
