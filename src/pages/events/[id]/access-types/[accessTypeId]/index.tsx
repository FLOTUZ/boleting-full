import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowAccessTypeView from "@/modules/access-types/views/show-access-type.view";
import {
  AccessTypesPath,
  EventsPath,
  ShowAccessTypePath,
  ShowEventPath,
} from "@/routes";
import { useRouter } from "next/router";

const ShowAccessTypeRoute = () => {
  const router = useRouter();
  const { id, accessTypeId } = router.query;
  return (
    <DesktopLayoutComponent
      title={"Accesso"}
      breadCrumbs={[
        { label: "Eventos", href: EventsPath },
        { label: `Evento ${id}`, href: ShowEventPath(String(id)) },
        { label: "Configurar Accesos", href: AccessTypesPath(Number(id)) },
        {
          label: "Acceso",
          href: ShowAccessTypePath(Number(id), Number(accessTypeId)),
        },
      ]}
    >
      <ShowAccessTypeView />
    </DesktopLayoutComponent>
  );
};

export default ShowAccessTypeRoute;
