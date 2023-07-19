import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateAccessTypeView from "@/modules/access-types/views/create-access-type.view";
import {
  AccessTypesPath,
  CreateAccessTypePath,
  EventsPath,
  ShowEventPath,
} from "@/routes";
import { useRouter } from "next/router";

const CreateAccessTypeRoute = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopLayoutComponent
      title={"Crear acceso"}
      breadCrumbs={[
        { label: "Eventos", href: EventsPath },
        {
          label: `Evento ${id}`,
          href: ShowEventPath(id as string),
        },
        {
          label: "Configurar accesos",
          href: AccessTypesPath(Number(id)),
        },
        {
          label: "Crear acceso",
          href: CreateAccessTypePath(Number(id)),
        },
      ]}
    >
      <CreateAccessTypeView />
    </DesktopLayoutComponent>
  );
};

export default CreateAccessTypeRoute;
