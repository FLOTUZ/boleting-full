import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowCourtecyTicketsView from "@/modules/courtecy-tickets/views/show-courtecy-tickets.view";
import { EventsPath, ShowEventPath, ShowCourtecyTicketsPath } from "@/routes";
import { useRouter } from "next/router";

const ShowCourtecyTicketsRoute = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopLayoutComponent
      title={`Cortesías`}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: `${id}`,
          href: ShowEventPath(id as string),
        },
        {
          label: "Cortesías",
          href: ShowCourtecyTicketsPath(String(id)),
        },
      ]}
    >
      <ShowCourtecyTicketsView />
    </DesktopLayoutComponent>
  );
};

export default ShowCourtecyTicketsRoute;
