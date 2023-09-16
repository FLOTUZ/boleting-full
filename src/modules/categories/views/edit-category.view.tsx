import EditCategoryForm from "../components/edit-category-form";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { CategoriesPath, EditCategoryPath, ShowCategoryPath } from "@/routes";
import { useRouter } from "next/router";

const EditCategoryView = () => {
  const router = useRouter();

  const { id: idCategory } = router.query;
  return (
    <DesktopLayoutComponent
      title={"Categorias"}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
        {
          label: `${idCategory}`,
          href: ShowCategoryPath(String(idCategory)),
        },
        {
          label: "Edit",
          href: EditCategoryPath(String(idCategory)),
        },
      ]}
    >
      <EditCategoryForm />
    </DesktopLayoutComponent>
  );
};

export default EditCategoryView;
