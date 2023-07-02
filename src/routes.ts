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

// =========== USERS ============
export const UsersPath = "/users";

// =========== CATEGORIES ============
export const CategoriesPath = "/categories";
export const CreateCategoriesPath = "/categories/create";
