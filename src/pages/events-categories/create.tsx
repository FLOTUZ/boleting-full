import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateCategoryView from "@/modules/events-categories/views/create-category.view";
import { CreateCategories } from "@/routes";
import React from "react";

const CreateCategoryRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Mis Categorias"}
      breadCrumbs={[
        {
          label: "Crear Categoria",
          href: CreateCategories,
        },
      ]}
    >
      <CreateCategoryView />
    </DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
