import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowCourtecyTicketView from "@/modules/courtecy-tickets/views/show-courtecy-ticket.view";

import {
  EventsPath,
  ShowCourtecyTicketPath,
  ShowCourtecyTicketsPath,
  ShowEventPath,
} from "@/routes";
import { useRouter } from "next/router";

const ShowCourtecyTicketRoute = () => {
  const router = useRouter();
  const { id: eventId, courtesyId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Ver cortesía`}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: `${eventId}`,
          href: ShowEventPath(eventId as string),
        },
        {
          label: "Cortesías",
          href: ShowCourtecyTicketsPath(String(eventId)),
        },
        {
          label: `${courtesyId}`,
          href: ShowCourtecyTicketPath(String(eventId), String(courtesyId)),
        },
      ]}
    >
      <ShowCourtecyTicketView />
    </DesktopLayoutComponent>
  );
};

export default ShowCourtecyTicketRoute;
