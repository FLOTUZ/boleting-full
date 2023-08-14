import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditCourtecyTicketView from "@/modules/courtecy-tickets/views/edit-courtecy-ticket.view";

import {
  EditCourtecyTicketPath,
  EventsPath,
  ShowCourtecyTicketPath,
  ShowCourtecyTicketsPath,
  ShowEventPath,
} from "@/routes";
import { useRouter } from "next/router";

const EditCourtecyTicketRoute = () => {
  const router = useRouter();
  const { id: eventId, courtesyId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Editar cortesía`}
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
        {
          label: `editar`,
          href: EditCourtecyTicketPath(String(eventId), String(courtesyId)),
        },
      ]}
    >
      <EditCourtecyTicketView />
    </DesktopLayoutComponent>
  );
};

export default EditCourtecyTicketRoute;
