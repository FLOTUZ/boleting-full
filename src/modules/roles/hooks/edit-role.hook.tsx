import {
  Ability,
  Role,
  useEditRoleMutation,
  useShowRoleForEditLazyQuery,
} from "@/gql/generated";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

interface EditRoleHookProps {
  roleId: string;
  onCompleted: (data: { updateRole: Role }) => void;
  onError?: (error: any) => void;
}

export const useEditRole = ({
  roleId,
  onCompleted,
  onError,
}: EditRoleHookProps) => {
  const [abilitiesList, setAbilitiesList] = useState<Ability[]>([]);
  const [role, setRole] = useState<Role>();

  const [GET_ROLE, { loading: loadingRole, error: getRoleError }] =
    useShowRoleForEditLazyQuery({
      variables: {
        roleId: Number(roleId),
      },
      onCompleted(data) {
        setRole(data.role as Role);
        setAbilitiesList(data.abilitys as Ability[]);
      },
    });

  const [updateRole] = useEditRoleMutation({
    onCompleted(data) {
      onCompleted({
        updateRole: data.updateRole as Role,
      });
    },
    onError(error) {
      onError && onError(error);
    },
  });

  useEffect(() => {
    if (roleId) {
      GET_ROLE();
    }
  }, [GET_ROLE, roleId]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: role?.name,
      description: role?.description,
      abilities: role?.abilities?.map((ability) => ability.id),
    },
    onSubmit: (data) => {
      updateRole({
        variables: {
          updateRoleId: role!.id,
          data,
        },
      });
    },
  });

  return {
    getRoleError,
    loadingRole,
    abilitiesList,
    form,
  };
};
