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
    >
      {/* Here we put the views of our categories with the button and link to send to create*/}
    </DesktopLayoutComponent>
  );
};

export default CreateCategoryRoute;
