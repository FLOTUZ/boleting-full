import { UserProvider } from "@/contexts/user.context";
import LandingView from "@/modules/landing.view";

const MaindRoute = () => {
  return (
    <UserProvider>
      <LandingView />
    </UserProvider>
  );
};

export default MaindRoute;
