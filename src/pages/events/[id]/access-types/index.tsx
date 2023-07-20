import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowAccessTypesView from "@/modules/access-types/views/show-access-types.view";
import { AccessTypesPath, EventsPath, ShowEventPath } from "@/routes";
import { useRouter } from "next/router";

const AccessTypesRoute = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopLayoutComponent
      title={"Accesos"}
      breadCrumbs={[
        { label: "Eventos", href: EventsPath },
        { label: `${id}`, href: ShowEventPath(String(id)) },
        { label: "Accesos", href: AccessTypesPath(Number(id)) },
      ]}
    >
      <ShowAccessTypesView />
    </DesktopLayoutComponent>
  );
};

export default AccessTypesRoute;
