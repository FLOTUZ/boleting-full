import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventView from "@/modules/events/views/show-event.view";
import { useRouter } from "next/router";

const ShowEventRoute = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Evento ${id}`}
      breadCrumbs={[
        {
          label: "Eventos",
          href: "/events",
        },
        {
          label: `Evento ${id}`,
          href: `/events/${id}`,
        },
      ]}
    >
      <ShowEventView id={Number(id)} />
    </DesktopLayoutComponent>
  );
};

export default ShowEventRoute;
