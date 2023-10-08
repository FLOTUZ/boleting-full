import { GetStaticProps } from "next";

import LandingViewComponent from "@/modules/landing-page/views/landing.view";
import { LandingPageProvider } from "@/modules/landing-page/contexts/landing-page.context";

import { EventSubCategory } from "@/gql/generated";
import { prisma } from "@/server";

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

export default RootRoute;
