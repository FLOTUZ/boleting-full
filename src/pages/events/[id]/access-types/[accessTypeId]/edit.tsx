import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditAccessTypeView from "@/modules/access-types/views/edit-access-type.view";
import {
  AccessTypesPath,
  EditAccessTypePath,
  EventsPath,
  ShowAccessTypePath,
  ShowEventPath,
} from "@/routes";
import { useRouter } from "next/router";

const EditAccessTypeRoute = () => {
  const router = useRouter();
  const { id, accessTypeId } = router.query;
  return (
    <DesktopLayoutComponent
      title={"Editar Accesso"}
      breadCrumbs={[
        { label: "Eventos", href: EventsPath },
        { label: `${id}`, href: ShowEventPath(String(id)) },
        { label: "Accesos", href: AccessTypesPath(Number(id)) },
        {
          label: `${accessTypeId}`,
          href: ShowAccessTypePath(Number(id), Number(accessTypeId)),
        },
        {
          label: "Editar",
          href: EditAccessTypePath(Number(id), Number(accessTypeId)),
        },
      ]}
    >
      <EditAccessTypeView />
    </DesktopLayoutComponent>
  );
};

export default EditAccessTypeRoute;
