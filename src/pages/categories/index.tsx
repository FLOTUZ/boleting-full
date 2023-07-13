import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { CategoriesPath } from "@/routes";

const CreateCategoryRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Mis categorias"}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
      ]}
    ></DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
