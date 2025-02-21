import { useState, useEffect } from 'react';
import Permissions from '../logic/entities/Permissions';

const getPermissions = (): Permissions[] | null => {
    const permissions = sessionStorage.getItem("permissions")
    return permissions ? JSON.parse(permissions) : null;
  };




const useGetPermissions = (ressource : string) => {
    const [permission, setPermission] = useState<Permissions| null> (null)

  
    useEffect(() => {
        const permissions = getPermissions()
        console.log("permissions",permissions)
        setPermission (permissions?.find((perm) => perm.ressource_name === ressource)?? null)
    }, []);
    return permission
}
  
  export default useGetPermissions;