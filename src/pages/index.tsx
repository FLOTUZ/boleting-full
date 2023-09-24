import { UserProvider } from "@/contexts/user.context";
import LandingViewComponent from "@/modules/landing-page/views/landing.view";

const MaindRoute = () => {
  return (
    <UserProvider>
      <LandingViewComponent />
    </UserProvider>
  );
};

export default MaindRoute;
