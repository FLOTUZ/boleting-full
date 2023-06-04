import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventView from "@/modules/events/views/show-event.view";
import { useRouter } from "next/router";

const ShowEventRoute = () => {
  const {
    query: { id },
    isReady: loading,
  } = useRouter();

  if (!loading) {
    return (
      <DesktopLayoutComponent title={`Evento ${id}`}>
        <div>Cargando...</div>
      </DesktopLayoutComponent>
    );
  }

  return (
    <DesktopLayoutComponent title={`Evento ${id}`}>
      {id ? (
        <ShowEventView id={parseInt(id as string)} />
      ) : (
        <div>Evento no encontrado</div>
      )}
    </DesktopLayoutComponent>
  );
};

export default ShowEventRoute;
