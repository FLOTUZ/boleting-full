import LandingViewComponent from "@/modules/landing-page/views/landing.view";
import { LandingPageProvider } from "@/modules/landing-page/contexts/landing-page.context";

import { EventSubCategory } from "@/gql/generated";

interface RootRoute {
  eventSubCategories: EventSubCategory[];
}
const RootRoute = ({ eventSubCategories }: RootRoute) => {
  return (
    <LandingPageProvider eventSubCategories={eventSubCategories}>
      <LandingViewComponent />
    </LandingPageProvider>
  );
};

export default RootRoute;
