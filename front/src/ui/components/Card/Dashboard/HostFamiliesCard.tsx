import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from "reactstrap";
import SpeciesCounts from "../../../../logic/entities/SpeciesCounts";
import { PiCatFill, PiDogFill } from "react-icons/pi";
import { PiRabbitFill } from "react-icons/pi";
import { MdPestControlRodent } from "react-icons/md";
import { SPECIES_ID } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

// pagePermissions[navItem.ressourceName]?.can_read)
const HostFamiliesCard = () => {
    const navigate = useNavigate();
    const handleGoToHostFamilies = () => {
        navigate("/hostfamilies");
    };

    // body style={{ borderColor: "#43ABC9" }}
    return (
        <Card body className="text-center" xs="auto">
            <CardBody>
                <CardTitle>Nombre de familles d'accueil disponibles</CardTitle>
            </CardBody>
            <Row className="justify-content-center">
                <Col className="d-flex align-items-center" xs="4">
                    <Button onClick={handleGoToHostFamilies} style={{ minWidth: "110px", minHeight: "125px" }}>
                        <CardTitle> Total </CardTitle>
                        <CardText className="fs-1">23</CardText>
                    </Button>
                </Col>
                <Col xs="4">
                    <Button onClick={handleGoToHostFamilies} className="mb-3" style={{ minWidth: "110px", minHeight: "100px" }}>
                        <PiDogFill size={35} />
                        <CardText className="fs-4"> 12</CardText>
                    </Button>
                    <br />
                    <Button onClick={handleGoToHostFamilies} size="lg" style={{ minWidth: "110px", minHeight: "100px" }}>
                        <PiRabbitFill size={35} />
                        <CardText className="fs-4"> 2 </CardText>
                    </Button>
                </Col>
                <Col xs="4">
                    <Button onClick={handleGoToHostFamilies} className="mb-3" size="lg" style={{ minWidth: "110px", minHeight: "100px" }}>
                        <PiCatFill size={35} />
                        <CardText className="fs-4"> 9 </CardText>
                    </Button>
                    <br />
                    <Button onClick={handleGoToHostFamilies} size="lg" style={{ minWidth: "110px", minHeight: "100px" }}>
                        <MdPestControlRodent size={35} />
                        <CardText className="fs-4"> 0</CardText>
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default HostFamiliesCard;
