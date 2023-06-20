import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateEventView from "@/modules/tickets/views/create-event.view";
import { CreateTicketPath, TicketsPath } from "@/routes";
import React from "react";

const CreateEventRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Mis eventos"}
      breadCrumbs={[
        {
          label: "Eventos",
          href: TicketsPath,
        },
        {
          label: "Crear evento",
          href: CreateTicketPath,
        },
      ]}
    >
      <CreateEventView />
    </DesktopLayoutComponent>
  );
};

export default CreateEventRoute;
