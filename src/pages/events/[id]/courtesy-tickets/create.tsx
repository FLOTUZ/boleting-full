import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateCourtecyTicketView from "@/modules/courtecy-tickets/views/create-courtecy-ticket.view";
import {
  CreateCourtecyTicketPath,
  EventsPath,
  ShowEventPath,
  ShowCourtecyTicketsPath,
} from "@/routes";
import { useRouter } from "next/router";

const CrateTicket = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopLayoutComponent
      title={`Nueva Cortesía`}
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
        {
          label: "Nueva Cortesía",
          href: CreateCourtecyTicketPath(String(id)),
        },
      ]}
    >
      <CreateCourtecyTicketView />
    </DesktopLayoutComponent>
  );
};

export default CrateTicket;
