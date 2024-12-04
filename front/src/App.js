import React from "react";
import componentQueries from "react-component-queries";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthFormState } from "./ui/components/AuthForm";
import { EmptyLayout, LayoutRoute, MainLayout } from "./ui/components/Layout";
import PageSpinner from "./ui/components/PageSpinner";
import "./ui/styles/reduction.scss";

const AuthPage = React.lazy(() => import("./ui/pages/AuthPage"));
const DashboardPage = React.lazy(() => import("./ui/pages/DashboardPage"));
const AnimalsPage = React.lazy(() => import("./ui/pages/animals/AnimalsPage"));
const AnimalDetailPage = React.lazy(() => import("./ui/pages/animals/AnimalDetailPage"));
const VeterinariansPage = React.lazy(() => import("./ui/pages/veterinarians/VeterinariansPage"));
const VeterinarianDetailPage = React.lazy(() => import("./ui/pages/veterinarians/VeterinarianDetailPage"));
const HostFamiliesPage = React.lazy(() => import("./ui/pages/hostFamilies/HostFamiliesPage"));
const HostFamilyDetailPage = React.lazy(() => import("./ui/pages/hostFamilies/HostFamilyDetailPage"));
const UsersPage = React.lazy(() => import("./ui/pages/users/UsersPage"));
const UserDetailPage = React.lazy(() => import("./ui/pages/users/UserDetailPage"));

const getBasename = () => {
    return `/${import.meta.env.VITE_PUBLIC_URL?.split("/").pop()}`;
};

class App extends React.Component {
    render() {
        return (
            <BrowserRouter basename={getBasename()}>
                <Switch>
                    <Route exact path="/login">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute layout={EmptyLayout} component={(props) => <AuthPage {...props} authState={AuthFormState.LOGIN} />} />
                        </React.Suspense>
                    </Route>
                    <Route exact path="/signup">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute layout={EmptyLayout} component={(props) => <AuthPage {...props} authState={AuthFormState.SIGNUP} />} />
                        </React.Suspense>
                    </Route>
                    <Route index exact path="/">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={DashboardPage} />
                        </React.Suspense>
                    </Route>
                    <Route exact path="/animals">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={AnimalsPage} />
                        </React.Suspense>
                    </Route>
                    <Route path="/animals/:id">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={AnimalDetailPage} />
                        </React.Suspense>
                    </Route>
                    <Route exact path="/veterinarians">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={VeterinariansPage} />
                        </React.Suspense>
                    </Route>
                    <Route path="/veterinarians/:id">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={VeterinarianDetailPage} />
                        </React.Suspense>
                    </Route>
                    <Route exact path="/hostFamilies">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={HostFamiliesPage} />
                        </React.Suspense>
                    </Route>
                    <Route path="/hostFamilies/:id">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={HostFamilyDetailPage} />
                        </React.Suspense>
                    </Route>
                    <Route exact path="/users">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={UsersPage} />
                        </React.Suspense>
                    </Route>
                    <Route path="/users/:id">
                        <React.Suspense fallback={<PageSpinner />}>
                            <LayoutRoute isPrivate layout={MainLayout} component={UserDetailPage} />
                        </React.Suspense>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

const query = ({ width }) => {
    if (width < 575) {
        return { breakpoint: "xs" };
    }

    if (576 < width && width < 767) {
        return { breakpoint: "sm" };
    }

    if (768 < width && width < 991) {
        return { breakpoint: "md" };
    }

    if (992 < width && width < 1199) {
        return { breakpoint: "lg" };
    }

    if (width > 1200) {
        return { breakpoint: "xl" };
    }

    return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
