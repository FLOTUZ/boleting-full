import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateEventView from "@/modules/events/views/create-event.view";
import { CreateEventPath, EventsPath } from "@/routes";
import React from "react";

const CreateEventRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Mis eventos"}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: "Crear evento",
          href: CreateEventPath,
        },
      ]}
    >
      <CreateEventView />
    </DesktopLayoutComponent>
  );
};

export default CreateEventRoute;
