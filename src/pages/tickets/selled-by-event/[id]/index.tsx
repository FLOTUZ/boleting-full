import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowSelledByEventView from "@/modules/tickets/views/show-selled-by-event.view";
import { SelledByEventPath, TicketsPath } from "@/routes";
import { useRouter } from "next/router";

function SelledByEventRoute() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Tickets vendidos"}
      breadCrumbs={[
        {
          label: "Tickets",
          href: TicketsPath,
        },
        {
          label: `Evento ${id}`,
          href: SelledByEventPath(Number(id)),
        },
      ]}
    >
      <ShowSelledByEventView eventId={Number(id)} />
    </DesktopLayoutComponent>
  );
}

export default SelledByEventRoute;
