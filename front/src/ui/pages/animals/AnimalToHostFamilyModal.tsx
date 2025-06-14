import React, { FC, useEffect, useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import NullableDropdown from "../../components/NullableDropdown";
import AnimalsToHostFamiliesManager from "../../../managers/animalsToHostFamilies.manager";
import AnimalToHostFamily from "../../../logic/entities/AnimalToHostFamily";
import HostFamily from "../../../logic/entities/HostFamily";
import NotificationSystem from "react-notification-system";

interface AnimalToHostFamilyModalProps {
    hostFamilies: HostFamily[];
    animalToHostFamily: AnimalToHostFamily;
    currentAnimalToHostFamily: AnimalToHostFamily;
    show: boolean;
    handleClose: (close: boolean) => void;
    notificationSystem?: NotificationSystem;
}

const AnimalToHostFamilyModal: FC<AnimalToHostFamilyModalProps> = ({
    hostFamilies,
    animalToHostFamily: athf,
    currentAnimalToHostFamily,
    show,
    handleClose,
    notificationSystem,
    ...props
}) => {
    const [animalToHostFamily, setAnimalToHostFamily] = useState<AnimalToHostFamily>(athf);
    const modification = !!athf.hostFamily;

    useEffect(() => {}, []);

    const save = () => {
        if (modification) {
            AnimalsToHostFamiliesManager.update(animalToHostFamily)
                .then((_) => {
                    notificationSystem?.addNotification({
                        message: "Lien Animal / Famille d'accueil modifié",
                        level: "success",
                    });
                    handleClose(true);
                })
                .catch((err) => {
                    console.error(err);
                    notificationSystem?.addNotification({
                        message: `Une erreur s'est produite pendant la modification des données\n${err}`,
                        level: "error",
                    });
                });
        } else {
            AnimalsToHostFamiliesManager.create(animalToHostFamily)
                .then((_) => {
                    notificationSystem?.addNotification({
                        message: "Lien Animal / Famille d'accueil créé",
                        level: "success",
                    });
                    handleClose(true);
                })
                .catch((err) => {
                    console.error(err);
                    notificationSystem?.addNotification({
                        message: `Une erreur s'est produite pendant la création des données\n${err}`,
                        level: "error",
                    });
                });
        }
        return;
    };

    return (
        <Modal isOpen={show} {...props}>
            <ModalHeader closeButton>
                <h1>Animal / Famille d'accueil</h1>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs={6}>
                        <Label>Famille d'accueil</Label>
                        <NullableDropdown
                            withNewLine={true}
                            withSearch={true}
                            withSort={true}
                            color={"primary"}
                            value={hostFamilies.find((hf) => hf.id === animalToHostFamily.hostFamily?.id)}
                            values={[...hostFamilies.filter((hf) => hf.id !== currentAnimalToHostFamily?.hostFamily?.id), undefined]}
                            valueDisplayName={(hf) => (hf === undefined ? "-" : `${hf.firstname} ${hf.name}`)}
                            valueActiveCheck={(hf) =>
                                hf === undefined ? animalToHostFamily.hostFamily?.id === undefined : hf.id === animalToHostFamily.hostFamily?.id
                            }
                            key={"hostFamily"}
                            onChange={(newHf) =>
                                setAnimalToHostFamily({
                                    ...animalToHostFamily,
                                    hostFamily: newHf,
                                })
                            }
                        />
                    </Col>
                    <Col xs={6}>
                        <Label>Date d'entrée</Label>
                        <Input
                            type="date"
                            value={animalToHostFamily.entryDate}
                            onChange={(evt) =>
                                setAnimalToHostFamily({
                                    ...animalToHostFamily,
                                    entryDate: evt.target.value,
                                })
                            }
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => handleClose(false)}>
                    Annuler
                </Button>
                <Button color="primary" onClick={() => save()} disabled={!animalToHostFamily.hostFamily}>
                    Sauvegarder
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AnimalToHostFamilyModal;
