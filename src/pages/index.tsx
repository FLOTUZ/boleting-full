import { UserProvider } from "@/contexts/user.context";
import MainView from "@/modules/main.view";

const MaindRoute = () => {
  return (
    <UserProvider>
      <MainView />
    </UserProvider>
  );
};

export default MaindRoute;
