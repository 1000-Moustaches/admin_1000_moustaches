import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from "reactstrap";
import SpeciesCounts from "../../../../logic/entities/SpeciesCounts";
import { PiCatFill, PiDogFill } from "react-icons/pi";
import { PiRabbitFill } from "react-icons/pi";
import { MdPestControlRodent } from "react-icons/md";
import { SPECIES_ID } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import HostFamilyKindsManager from "../../../../managers/hostFamilyKinds.manager";

// pagePermissions[navItem.ressourceName]?.can_read)
const HostFamiliesCard = () => {
    const navigate = useNavigate();
    const handleGoToHostFamilies = async (speciesId?: number) => {
        const hostFamilyKinds = await HostFamilyKindsManager.getAll();
        const filteredKinds = hostFamilyKinds.filter((hfk) => hfk.species.id == speciesId);
        var searchParams: String[] = [];
        filteredKinds.forEach((kind) => {
            searchParams.push(`kinds=${kind.id}`);
        });
        const url = speciesId ? `/hostfamilies?${searchParams.join("&")}` : "/hostfamilies";
        navigate(url);
    };

    const buttonStyle: React.CSSProperties = { width: "100%", padding: "16px" };

    // body style={{ borderColor: "#43ABC9" }}
    return (
        <Card body className="text-center" xs="auto">
            <CardBody>
                <CardTitle>Nombre de familles d'accueil disponibles</CardTitle>
            </CardBody>
            <Row className="justify-content-center">
                <Col className="d-flex align-items-center" xs="4">
                    <Button onClick={() => handleGoToHostFamilies()} style={buttonStyle}>
                        <CardTitle> Total </CardTitle>
                        <CardText className="fs-1">23</CardText>
                    </Button>
                </Col>
                <Col xs="4">
                    <Button onClick={() => handleGoToHostFamilies(SPECIES_ID.DOG)} className="mb-3" style={buttonStyle}>
                        <PiDogFill size={35} />
                        <CardText className="fs-4"> 12</CardText>
                    </Button>
                    <br />
                    <Button onClick={() => handleGoToHostFamilies(SPECIES_ID.RABBIT)} style={buttonStyle}>
                        <PiRabbitFill size={35} />
                        <CardText className="fs-4"> 2 </CardText>
                    </Button>
                </Col>
                <Col xs="4">
                    <Button onClick={() => handleGoToHostFamilies(SPECIES_ID.CAT)} className="mb-3" style={buttonStyle}>
                        <PiCatFill size={35} />
                        <CardText className="fs-4"> 9 </CardText>
                    </Button>
                    <br />
                    <Button onClick={() => handleGoToHostFamilies(SPECIES_ID.OTHER)} style={buttonStyle}>
                        <MdPestControlRodent size={35} />
                        <CardText className="fs-4"> 0</CardText>
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default HostFamiliesCard;
