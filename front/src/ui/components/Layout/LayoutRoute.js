import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const LayoutRoute = ({ isPrivate, component: Component, layout: Layout, ...props }) => {
    const location = useLocation();
    if (isPrivate) {
        return sessionStorage.getItem("Auth Token") ? (
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location },
                }}
            />
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
