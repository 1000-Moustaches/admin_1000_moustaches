import React, { FC, useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import Page, { CustomBreadcrumbItem } from "../components/Page";
import logo from "../../assets/img/logo/Logo1000Moustaches.png";
import PermissionsManager from "../../managers/permissions.manager";
import Permissions from "../../logic/entities/Permissions";
import AnimalsNonAdopted from "../components/Card/Dashboard/AnimalsNonAdopted";

type PagePermissions = {
    canReadPets?: boolean;
    canReadVets?: boolean;
    petPermission?: Permissions;
};

const DashboardPage: FC = () => {
    const handleAnimalsClick = (): void => {
        window.location.href = "/animals";
    };

    return (
        <Page
            className="DashboardPage"
            title="Dashboard"
            breadcrumbs={[
                {
                    name: "Dashboard",
                    active: true,
                    to: null,
                } as CustomBreadcrumbItem,
            ]}
        >
            <Row>
                <Col sm={{ size: 4 }}>
                    <AnimalsNonAdopted />
                </Col>
            </Row>
        </Page>
    );
};

export default DashboardPage;
