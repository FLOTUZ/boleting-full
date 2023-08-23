import { UserProvider } from "@/contexts/user.context";
import CreateUserView from "@/modules/users/views/create-user.view";

function CreateUserRoute() {
  return (
    <UserProvider>
      <CreateUserView />
    </UserProvider>
  );
}

export default CreateUserRoute;
