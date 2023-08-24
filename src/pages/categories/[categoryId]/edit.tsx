import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditCategoryView from "@/modules/categories/views/edit-category.view";
import { CategoriesPath, EditCategoryPath, ShowCategoryPath } from "@/routes";
import { useRouter } from "next/router";

const EditCategoryRoute = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Editar categoria ${categoryId}`}
      breadCrumbs={[
        {
          label: "Categorias",
          href: CategoriesPath,
        },
        {
          label: `${categoryId}`,
          href: ShowCategoryPath(categoryId as string),
        },
        {
          label: "Editar",
          href: EditCategoryPath(Number(categoryId)),
        },
      ]}
    >
      <EditCategoryView />
    </DesktopLayoutComponent>
  );
};

export default EditCategoryRoute;
