import { UserProvider } from "@/contexts/user.context";
import CreateUserView from "@/modules/users/views/create-user.view";

function CreateUsersRoute() {
  return (
    <UserProvider>
      <CreateUserView />
    </UserProvider>
  );
}

export default CreateUsersRoute;
