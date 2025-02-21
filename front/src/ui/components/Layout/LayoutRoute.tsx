import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PageSpinner from "../PageSpinner";

interface LayoutRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType<any>;
    layout: React.ComponentType<any>;
    [key: string]: any;
}

const LayoutRoute: React.FC<LayoutRouteProps> = ({ isPrivate, component: Component, layout: Layout, ...props }) => {
    const location = useLocation();

    if (isPrivate) {
        return sessionStorage.getItem("Auth Token") ? (
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        ) : (
            <Navigate to="/login" state={{ from: location }} />
        );
    }

    return (
        <Layout {...props}>
            <React.Suspense fallback={<PageSpinner />}>
                <Component {...props} />
            </React.Suspense>
        </Layout>
    );
};

export default LayoutRoute;
