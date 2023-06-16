import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateCategoryView from "@/modules/events-categories/views/create-category.view";
import EditCategoryView from "@/modules/events-categories/views/edit-category.view";
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
      <EditCategoryView />
    </DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
