import React, { FC, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from "reactstrap";
import VeterinariansManager from "../../../managers/veterinarians.manager";
import { MdDelete, MdDirections, MdOutlineModeEdit, MdRefresh, MdSave } from "react-icons/md";
import SourceLink from "../../components/SourceLink";
import BooleanNullableDropdown from "../../components/BooleanNullableDropdown";
import PriceLevelDropdown from "../../components/PriceLevelDropdown";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import Geocode from "../../../utils/geocode";
import NotificationSystem from "react-notification-system";
import Veterinarian from "../../../logic/entities/Veterinarian";
import Page, { CustomBreadcrumbItem } from "../../components/Page";
import { useNavigate, useParams } from "react-router-dom";

interface VeterinarianDetailPageProps {
    [key: string]: any;
}

const VeterinarianDetailPage: FC<VeterinarianDetailPageProps> = ({ props }) => {
    const { id: paramVetId } = useParams();
    const vetId = paramVetId ?? "new";
    const [veterinarian, setVeterinarian] = useState<Veterinarian | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

    const [notificationSystem, setNotificationSystem] = useState<NotificationSystem | undefined>(undefined);

    const [geocodeFound, setGeocodeFound] = useState<boolean | null>(null);
    const [previousAddress, setPreviousAddress] = useState<string | null>(null);
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [shouldSave, setShouldSave] = useState(false);

    const navigate = useNavigate();

    const getVeterinarian = () => {
        if (veterinarian !== null) {
            setVeterinarian(null);
        }
        let id = parseInt(vetId);
        if (vetId !== "new" && !isNaN(id)) {
            VeterinariansManager.getById(id)
                .then((vet) => {
                    setPreviousAddress(vet.address ?? null);
                    setVeterinarian(vet);
                })
                .catch((err) => {
                    console.error(err);
                    notificationSystem?.addNotification({
                        message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                        level: "error",
                    });
                });
        } else {
            console.error("Can't get veterianrian with non number id");
        }
    };

    const refresh = () => {
        if (vetId !== "new") {
            getVeterinarian();
        } else {
            setVeterinarian(VeterinariansManager.createVeterinarian());
            setIsEditing(true);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (veterinarian !== null && previousAddress !== veterinarian.address) {
            setPreviousAddress(veterinarian.address ?? null);

            if (veterinarian.address !== null && veterinarian.address !== undefined && veterinarian.address.length > 10) {
                // Geocode address
                setIsGeocoding(true);
                setGeocodeFound(null);
                Geocode.getCoordinatesFromAddress(veterinarian.address)
                    .then((coordinates) => {
                        if (coordinates !== null) {
                            veterinarian.latitude = coordinates.lat;
                            veterinarian.longitude = coordinates.lng;
                        } else {
                            console.warn("Can't get coordinates for address");
                            veterinarian.latitude = undefined;
                            veterinarian.longitude = undefined;
                        }
                        setIsGeocoding(false);
                        setGeocodeFound(true);

                        saveIfNeeded();
                    })
                    .catch((err: Error) => {
                        console.error(err);
                        setIsGeocoding(false);
                        setGeocodeFound(false);

                        saveIfNeeded();
                    });
            }
        }
    }, [veterinarian]);

    useEffect(() => {
        if (!isGeocoding && shouldSave) {
            saveIfNeeded();
        }
    }, [shouldSave, isGeocoding]);

    const save = () => {
        if (!isGeocoding) {
            setIsEditing(false);
            setShouldSave(true);
        } else {
            setShouldSave(true);
        }
    };

    const saveIfNeeded = () => {
        if (shouldSave === false) {
            return;
        }

        if (veterinarian === null) {
            return;
        }

        setShouldSave(false);
        if (vetId === "new") {
            // Send new data to API
            VeterinariansManager.create(veterinarian)
                .then((updatedVeterinarian) => {
                    notificationSystem?.addNotification({
                        message: "Vétérinaire créé",
                        level: "success",
                    });
                    navigate(`/veterinarians/${updatedVeterinarian.id}`);
                    // setVeterinarian(updatedVeterinarian);
                })
                .catch((err) => {
                    console.error(err);
                    notificationSystem?.addNotification({
                        message: `Une erreur s'est produite pendant la création des données\n${err}`,
                        level: "error",
                    });
                });
            return;
        }

        // Send new data to API
        VeterinariansManager.update(veterinarian)
            .then(() => {
                getVeterinarian();
                notificationSystem?.addNotification({
                    message: "Vétérinaire mis à jour",
                    level: "success",
                });
            })
            .catch((err) => {
                console.error(err);
                getVeterinarian();
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la mise à jour des données\n${err}`,
                    level: "error",
                });
            });
    };

    const deleteV = () => {
        if (veterinarian === null) {
            return;
        }
        VeterinariansManager.delete(veterinarian)
            .then(() => {
                notificationSystem?.addNotification({
                    message: "Vétérinaire supprimé",
                    level: "success",
                });
                navigate("/veterinarians");
            })
            .catch((err) => {
                console.error(err);
                getVeterinarian();
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la suppression des données\n${err}`,
                    level: "error",
                });
            });
    };

    let content = <div>Chargement...</div>;
    if (veterinarian === undefined) {
        content = <div>Vétérinaire non trouvé</div>;
    } else if (veterinarian === null) {
        content = <div>Chargement...</div>;
    } else {
        content = (
            <div>
                <Row className={"justify-content-end"}>
                    <Col xs={"auto"}>
                        {vetId !== "new" && isEditing && (
                            <Button color="danger" onClick={() => setShowDeleteConfirmationModal(true)}>
                                <MdDelete />
                            </Button>
                        )}
                        {!isEditing && (
                            <Button className="ms-2" color="primary" onClick={() => setIsEditing(true)}>
                                <MdOutlineModeEdit />
                            </Button>
                        )}
                        {isEditing && (
                            <Button className="ms-2" color="success" onClick={save}>
                                <MdSave />
                            </Button>
                        )}
                        <Button className="ms-2" onClick={refresh}>
                            <MdRefresh />
                        </Button>
                    </Col>
                </Row>

                <br />

                <Card>
                    <CardHeader>
                        {vetId === "new" && <h2>Nouveau vétérinaire</h2>}
                        {vetId !== "new" && <h2>{veterinarian.name}</h2>}
                    </CardHeader>
                    <CardBody>
                        {vetId === "new" && (
                            <Row>
                                <Col xs={12}>
                                    <Label>Nom</Label>
                                    <Input
                                        value={veterinarian.name || ""}
                                        disabled={!isEditing}
                                        onChange={(evt) =>
                                            setVeterinarian({
                                                ...veterinarian,
                                                name: evt.target.value,
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col xs={6}>
                                <Row>
                                    <Col xs={12}>
                                        <Label>Téléphone</Label>
                                        <Input
                                            value={veterinarian.phone}
                                            disabled={!isEditing}
                                            onChange={(evt) =>
                                                setVeterinarian({
                                                    ...veterinarian,
                                                    phone: evt.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Label>E-mail</Label>
                                        <Input
                                            value={veterinarian.mail}
                                            disabled={!isEditing}
                                            onChange={(evt) =>
                                                setVeterinarian({
                                                    ...veterinarian,
                                                    mail: evt.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Label>
                                    {veterinarian.address !== undefined && (
                                        <SourceLink link={`https://www.google.com/maps/place/${veterinarian.address}`}>
                                            <span>
                                                Adresse <MdDirections />
                                            </span>
                                        </SourceLink>
                                    )}
                                    {veterinarian.address === undefined && <span>Adresse</span>}
                                </Label>
                                <Input
                                    type="textarea"
                                    value={veterinarian.address}
                                    disabled={!isEditing}
                                    onChange={(evt) =>
                                        setVeterinarian({
                                            ...veterinarian,
                                            address: evt.target.value,
                                        })
                                    }
                                />
                                {geocodeFound !== null && (
                                    <p className={geocodeFound === true ? "text-success" : "text-danger"}>
                                        <small>{geocodeFound === true ? "Adresse valide" : "Adresse non trouvée"}</small>
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Row>
                                    <Col xs={6}>
                                        <Label>Gestion des urgences</Label>
                                    </Col>
                                    <Col xs={6}>
                                        <Label>Niveau de prix</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <BooleanNullableDropdown
                                            value={veterinarian.emergencies ?? null}
                                            disabled={!isEditing}
                                            onChange={(newValue) => {
                                                setVeterinarian({
                                                    ...veterinarian,
                                                    emergencies: newValue ?? undefined,
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <PriceLevelDropdown
                                            value={veterinarian.priceLevel}
                                            disabled={!isEditing}
                                            onChange={(newValue) => {
                                                setVeterinarian({
                                                    ...veterinarian,
                                                    priceLevel: newValue,
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Label>Méthode de confirmation de rendez-vous</Label>
                                <Input
                                    type="textarea"
                                    value={veterinarian.appointmentConfirmationProcedure}
                                    disabled={!isEditing}
                                    onChange={(evt) =>
                                        setVeterinarian({
                                            ...veterinarian,
                                            appointmentConfirmationProcedure: evt.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Label>Date de paiement</Label>
                                <Input
                                    type="textarea"
                                    value={veterinarian.invoicePaymentDate}
                                    disabled={!isEditing}
                                    onChange={(evt) =>
                                        setVeterinarian({
                                            ...veterinarian,
                                            invoicePaymentDate: evt.target.value,
                                        })
                                    }
                                />
                            </Col>
                            <Col xs={6}>
                                <Label>Moyen de paiement</Label>
                                <Input
                                    type="textarea"
                                    value={veterinarian.paymentMethod}
                                    disabled={!isEditing}
                                    onChange={(evt) =>
                                        setVeterinarian({
                                            ...veterinarian,
                                            paymentMethod: evt.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <Page
            className="VeterinarianPage"
            title="Détail du vétérinaire"
            breadcrumbs={[
                {
                    name: "Vétérinaires",
                    to: "/veterinarians",
                } as CustomBreadcrumbItem,
                { name: "Vétérinaire", active: true } as CustomBreadcrumbItem,
            ]}
            notificationSystemCallback={(notifSystem) => {
                setNotificationSystem(notifSystem);
            }}
        >
            {content}

            <DeleteConfirmationModal
                show={showDeleteConfirmationModal}
                handleClose={(confirmed) => {
                    setShowDeleteConfirmationModal(false);
                    if (confirmed) {
                        deleteV();
                    }
                }}
                bodyEntityName={"un Vétérinaire"}
            />
        </Page>
    );
};
export default VeterinarianDetailPage;
