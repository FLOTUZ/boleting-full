import { GetStaticProps } from "next";

import LandingViewComponent from "@/modules/landing-page/views/landing.view";
import { LandingPageProvider } from "@/modules/landing-page/contexts/landing-page.context";

import { ClientProvider } from "@/contexts/client.context";

import { EventSubCategory } from "@/gql/generated";
import { prisma } from "@/server";

interface MaindRouteProps {
  eventSubCategories: EventSubCategory[];
}
const MaindRoute = ({ eventSubCategories }: MaindRouteProps) => {
  return (
    <LandingPageProvider eventSubCategories={eventSubCategories}>
      <LandingViewComponent />
    </LandingPageProvider>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const eventSubCategories = await prisma.eventSubCategory.findMany({
    include: {
      event_category: true,
    },
  });

  return {
    props: {
      eventSubCategories: JSON.parse(JSON.stringify(eventSubCategories)),
    },
  };
};

export default MaindRoute;
