import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import AddOrganizationView from "@/modules/organizations/views/create-organization.view.tsx";
import { OrganizationsPath, CreateOrganizationPath } from "@/routes";
import React from "react";

const CreateOrganizationRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Organizaciones"}
      breadCrumbs={[
        {
          label: "Organizaciones",
          href: OrganizationsPath,
        },
        {
          label: "Añadir Organizacion",
          href: CreateOrganizationPath,
        },
      ]}
    >
      <AddOrganizationView />
    </DesktopLayoutComponent>
  );
};

export default CreateOrganizationRoute;
