import { UserProvider } from "@/contexts/user.context";
import UserListView from "@/modules/users/views/user-list.view";

const UsersListRoute = () => {
  return (
    <UserProvider>
      <UserListView />
    </UserProvider>
  );
};

export default UsersListRoute;
