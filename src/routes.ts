export const rootPath = "/";
export const LoginPath = "auth/login";
export const RegisterPath = "auth/register";
export const profilePath = "/profile";

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

// =========== CATEGORIES ============
export const CategoriesPath = "/categories";
export const CreateCategoriesPath = "/categories/create";

// ============ Staff ============
export const ShowEventStaffIdPath = (id: number) => `/events/${id}/staff`;

export const ShowEventStaffPath = (id: number, staffId: number) =>
  `/events/${id}/staff/${staffId}`;

export const CreateEventStaffPath = (id: number) =>
  `/events/${id}/staff/create`;

export const EditEventStaffPath = (id: number, staffId: number) =>
  `/events/${id}/staff/${staffId}/edit`;
