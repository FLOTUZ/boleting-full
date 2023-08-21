import { Box } from "@chakra-ui/react";
import EditCategoryForm from "../components/edit-category-form";
//@Emmanuel
//Faltan editar categorias en el formulario, traer la data para hacer la conexion a la BD
const EditCategoryView = () => {
  return (
    <Box p={4}>
      <EditCategoryForm />
    </Box>
  );
};

export default EditCategoryView;
