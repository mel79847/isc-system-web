import { Permission } from "../models/permissionInterface";
import { useUserStore } from "../store/store";

export function useHasPermission() {
  const user = useUserStore((state) => state.user);

  const hasPermission = (permissionName: string) => {
    return user?.roles?.some((role: string) => {
      return user?.roles_permissions?.[role]?.permissions.find((permission: Permission) => permission.name === permissionName);
    });
  };

  return hasPermission;
}