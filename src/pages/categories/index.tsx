import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowCategoriesView from "@/modules/categories/views/show-categories.view";
import { CategoriesPath } from "@/routes";

const CreateCategoryRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Categorias"}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
      ]}
    >
      <ShowCategoriesView />
    </DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
