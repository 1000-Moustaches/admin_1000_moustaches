import React from "react";
import { MdBorderColor } from "react-icons/md";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import { PiCatFill, PiDogFill } from "react-icons/pi";
import { PiRabbitFill } from "react-icons/pi";
import { MdPestControlRodent } from "react-icons/md";

const PresentAnimals = () => {
    return (
        <div>
            <Card body className="text-center">
                <CardBody>
                    <CardTitle>Nombre d'animaux présents dans l'association</CardTitle>
                </CardBody>
                <Row>
                    <Col>
                        <Card body style={{ borderColor: "#43ABC9", height: "80%" }}>
                            <CardTitle> Total </CardTitle>
                            <CardText className="fs-1" style={{ alignItems: "center", justifyContent: "center" }}>
                                200
                            </CardText>
                        </Card>
                    </Col>
                    <Col>
                        <Card body style={{ borderColor: "#43ABC9" }} className="align-items-center">
                            <PiDogFill size={35} />
                            <CardText className="fs-4"> 15 </CardText>
                        </Card>
                        <br />
                        <Card body style={{ borderColor: "#43ABC9" }} className="align-items-center">
                            {/* <PiRabbitDuotone size={35} /> */}
                            <CardText className="fs-4"> 6 </CardText>
                        </Card>
                    </Col>
                    <Col>
                        <Card body style={{ borderColor: "#43ABC9" }} className="align-items-center">
                            <PiCatFill size={35} />
                            <CardText className="fs-4"> 177 </CardText>
                        </Card>
                        <br />
                        <Card body style={{ borderColor: "#43ABC9" }} className="align-items-center">
                            <MdPestControlRodent size={35} />
                            <CardText className="fs-4"> 2 </CardText>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
export default PresentAnimals;
