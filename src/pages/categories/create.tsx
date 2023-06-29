import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateCategoryView from "@/modules/categories/create-category.view";
import { CategoriesPath, CreateCategoriesPath } from "@/routes";

const CreateCategoryRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Mis categorias"}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
        {
          label: "Crear",
          href: CreateCategoriesPath,
        },
      ]}
    >
      <CreateCategoryView />
    </DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
