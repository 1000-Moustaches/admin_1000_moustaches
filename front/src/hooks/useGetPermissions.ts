import { useState, useEffect } from "react";
import Permissions from "../logic/entities/Permissions";

const getPermissions = (): Permissions[] | null => {
    const permissions = sessionStorage.getItem("permissions");
    return permissions ? JSON.parse(permissions) : null;
};

const useGetPermissions = (ressources: string[]) => {
    const [permissions, setPermissions] = useState<(Permissions | null)[]>([]);

    useEffect(() => {
        const allPermissions = getPermissions();
        setPermissions(ressources.map((ressource) => allPermissions?.find((perm) => perm.ressource_name === ressource) ?? null));
    }, [ressources]);

    return permissions;
};

export default useGetPermissions;
