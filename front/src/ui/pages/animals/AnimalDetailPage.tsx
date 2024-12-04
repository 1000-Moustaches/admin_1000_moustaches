import React, { FC, useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Input, Label, Row, AccordionHeader, AccordionBody } from "reactstrap";
import AnimalsManager, { Sexe } from "../../../managers/animals.manager";
import HostFamiliesManager from "../../../managers/hostFamilies.manager";
import { MdRefresh, MdOutlineModeEdit, MdSave, MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import BooleanNullableDropdown from "../../components/BooleanNullableDropdown";
import { SPECIES_ID } from "../../../utils/constants";
import HostFamiliesHistory from "./HostFamiliesHistory";
import VeterinarianInterventionsHistory from "./VeterinarianInterventionsHistory";
import VeterinarianInterventionsManager from "../../../managers/veterinarianInterventions.manager";
import Dropdown from "../../components/Dropdown";
import NullableDropdown from "../../components/NullableDropdown";
import AnimalsToHostFamiliesManager from "../../../managers/animalsToHostFamilies.manager";
import Page, { CustomBreadcrumbItem } from "../../components/Page";
import NotificationSystem from "react-notification-system";
import AnimalToHostFamily from "../../../logic/entities/AnimalToHostFamily";
import Species from "../../../logic/entities/Species";
import HostFamily from "../../../logic/entities/HostFamily";
import VeterinarianIntervention from "../../../logic/entities/VeterinarianIntervention";
import Animal from "../../../logic/entities/Animal";
import { useHistory } from "react-router-dom";

interface AnimalDetailPageProps {
    match: {
        params: {
            id: string;
        };
    };
    [key: string]: any;
}

class AnimalDetailPageData {
    animal?: Animal;
    animalToHostFamilies: AnimalToHostFamily[];
    species: Species[];
    hostFamilies: HostFamily[];
    sexes: Sexe[];
    veterinarianInterventions: VeterinarianIntervention[];

    constructor() {
        this.animal = undefined;
        this.animalToHostFamilies = [];
        this.species = [];
        this.hostFamilies = [];
        this.sexes = [];
        this.veterinarianInterventions = [];
    }
}

enum AnimalDetailPageAccordion {
    INFO = "INFO",
    PEC = "PEC",
    HEALTH = "HEALTH",
    BEHAVIOUR = "BEHAVIOUR",
    EXIT = "EXIT",
    DEATH = "DEATH",
}

class AnimalDetailPageAccordionState {
    type: AnimalDetailPageAccordion;
    id: string;

    constructor(type: AnimalDetailPageAccordion, id: string) {
        this.type = type;
        this.id = id;
    }
}

const AnimalDetailPage: FC<AnimalDetailPageProps> = ({ match, ...props }) => {
    const animalId = match.params.id;
    const [data, setData] = useState<AnimalDetailPageData>(new AnimalDetailPageData());
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

    const [notificationSystem, setNotificationSystem] = useState<NotificationSystem | undefined>(undefined);

    const history = useHistory();

    // Accordions
    const [accordions, setAccordions] = useState<AnimalDetailPageAccordionState[]>(
        Object.values(AnimalDetailPageAccordion)
            .map((type) => {
                if (typeof type !== "string") return null;
                var accordionType = type as AnimalDetailPageAccordion;
                return new AnimalDetailPageAccordionState(accordionType, "");
            })
            .filter((a) => a !== null) as AnimalDetailPageAccordionState[]
    );

    const toggleAccordion = (type: AnimalDetailPageAccordion, id: string) => {
        let newAccordions = accordions.map((accordion) => {
            if (accordion.type === type) {
                if (accordion.id === id) {
                    accordion.id = "";
                } else {
                    accordion.id = id;
                }
            }
            return accordion;
        });
        setAccordions(newAccordions);
    };

    const getAnimal = () => {
        let id = parseInt(animalId);
        if (isNaN(id)) {
            return Promise.resolve(undefined);
        }
        return AnimalsManager.getById(id).catch((err) => {
            console.error(err);
            notificationSystem?.addNotification({
                message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                level: "error",
            });
            return undefined;
        });
    };

    const getAnimalToHostFamilies = () => {
        let id = parseInt(animalId);
        if (isNaN(id)) {
            return Promise.resolve([]);
        }
        return HostFamiliesManager.getByAnimalId(id)
            .then((animalToHostFamilies) =>
                animalToHostFamilies.sort((a, b) => new Date(b.entry_date ?? "").getTime() - new Date(a.entry_date ?? "").getTime())
            )
            .catch((err) => {
                console.error(err);
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                    level: "error",
                });
                return [] as AnimalToHostFamily[];
            });
    };

    const getSpecies = () => {
        return AnimalsManager.getSpecies()
            .then((species) => species.sort((a, b) => a.name.localeCompare(b.name)))
            .catch((err) => {
                console.log(err);
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                    level: "error",
                });
                return [] as Species[];
            });
    };

    const getSexes = () => {
        return AnimalsManager.getSexes()
            .then((sexes) => sexes.sort((a, b) => a.value.localeCompare(b.value)))
            .catch((err) => {
                console.log(err);
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                    level: "error",
                });
                return [] as Sexe[];
            });
    };

    const getVeterinarianInterventions = () => {
        let id = parseInt(animalId);
        if (isNaN(id)) {
            return Promise.resolve([]);
        }
        return VeterinarianInterventionsManager.getByAnimalId(id)
            .then((interventions) => interventions.sort((a, b) => new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()))
            .catch((err) => {
                console.log(err);
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                    level: "error",
                });
                return [] as VeterinarianIntervention[];
            });
    };

    const getHostFamilies = () => {
        return HostFamiliesManager.getAll()
            .then((hostFamilies) => hostFamilies.sort((a, b) => a.name?.localeCompare(b.name ?? "") ?? 0))
            .catch((err) => {
                console.log(err);
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la récupération des données\n${err}`,
                    level: "error",
                });
                return [] as HostFamily[];
            });
    };

    const refresh = () => {
        Promise.all([getSpecies(), getSexes(), getHostFamilies()])
            .then(([species, sexes, hostFamilies]) => {
                setData((previousData) => {
                    return {
                        ...previousData,
                        species,
                        sexes,
                        hostFamilies,
                    };
                });
            })
            .then(() => {
                if (animalId !== "new") {
                    Promise.all([getAnimal(), getAnimalToHostFamilies(), getVeterinarianInterventions()]).then(
                        ([animal, animalToHostFamilies, veterinarianInterventions]) => {
                            if (animal === undefined) {
                                console.error("Animal not found");
                                notificationSystem?.addNotification({
                                    message: "Animal non trouvé",
                                    level: "error",
                                });
                                return;
                            }
                            setData((previousData) => {
                                return {
                                    ...previousData,
                                    animal,
                                    animalToHostFamilies,
                                    veterinarianInterventions,
                                };
                            });
                        }
                    );
                } else {
                    setAccordions((previousValues) => {
                        return previousValues.map((value) => {
                            switch (value.type) {
                                case AnimalDetailPageAccordion.INFO:
                                case AnimalDetailPageAccordion.PEC:
                                case AnimalDetailPageAccordion.HEALTH:
                                case AnimalDetailPageAccordion.BEHAVIOUR:
                                    return new AnimalDetailPageAccordionState(value.type, "1");
                                case AnimalDetailPageAccordion.EXIT:
                                case AnimalDetailPageAccordion.DEATH:
                                    return new AnimalDetailPageAccordionState(value.type, "");
                            }
                        });
                    });
                    setIsEditing(true);
                    setData((previousData) => {
                        return {
                            ...previousData,
                            animal: AnimalsManager.createAnimal(),
                        };
                    });
                }
            });
    };

    useEffect(() => {
        refresh();
    }, []);

    // Auto select first species for new animal
    useEffect(() => {
        if (animalId === "new" && data.animal !== undefined && data.species.length > 0 && data.animal?.species_id === undefined) {
            setData((previousData) => {
                return {
                    ...previousData,
                    animal: {
                        ...data.animal!,
                        species_id: data.species[0].id,
                        species_name: data.species[0].name,
                    },
                };
            });
        }
    }, [animalId, data.animal, data.species]);

    useEffect(() => {
        if (data.animal !== undefined && data.species.length > 0) {
            let specie = data.species.find((sp) => sp.id === data.animal?.species_id);
            if (specie !== undefined) {
                data.animal?.setSpecies(specie);
            } else {
                console.warn("Can't find species for animal", data.animal, data.species);
            }
        }
    }, [data.species, data.animal]);

    const save = () => {
        setIsEditing(false);
        if (data.animal === undefined) {
            return;
        }
        if (animalId === "new") {
            // Send new data to API
            AnimalsManager.create(data.animal)
                .then((updatedAnimal) => {
                    notificationSystem?.addNotification({
                        message: "Animal créé",
                        level: "success",
                    });
                    history.push(`/animals/${updatedAnimal.id}`);
                    setData((previousData) => {
                        return {
                            ...previousData,
                            animal: updatedAnimal,
                        };
                    });
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
        AnimalsManager.update(data.animal)
            .then(() => {
                getAnimal().then(() => {
                    var exitOrDeathDate = data.animal?.death_date || data.animal?.exit_date;
                    if (exitOrDeathDate !== undefined && exitOrDeathDate !== "") {
                        data.animalToHostFamilies
                            .filter((athf) => athf.exit_date === undefined)
                            .forEach((athf) => {
                                AnimalsToHostFamiliesManager.update(
                                    new AnimalToHostFamily(athf.animal_id, athf.animal_name, athf.host_family_id, athf.entry_date, exitOrDeathDate)
                                );
                            });
                    }
                });
                notificationSystem?.addNotification({
                    message: "Animal mis à jour",
                    level: "success",
                });
            })
            .catch((err) => {
                console.error(err);
                getAnimal();
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la mise à jour des données\n${err}`,
                    level: "error",
                });
            });
    };

    const deleteA = () => {
        if (data.animal === undefined) {
            return;
        }
        AnimalsManager.delete(data.animal)
            .then(() => {
                notificationSystem?.addNotification({
                    message: "Animal supprimé",
                    level: "success",
                });
                history.push("/animals");
            })
            .catch((err) => {
                console.error(err);
                getAnimal();
                notificationSystem?.addNotification({
                    message: `Une erreur s'est produite pendant la suppression des données\n${err}`,
                    level: "error",
                });
            });
    };

    let content = <div>Chargement...</div>;

    if (data.animal === undefined) {
        content = <div>Animal non trouvé</div>;
    } else if (data.animal === null) {
        content = <div>Chargement...</div>;
    } else {
        content = (
            <div>
                <Row className={"justify-content-end"}>
                    <Col xs={"auto"}>
                        {animalId !== "new" && isEditing && (
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
                            <Button className="ms-2" color="success" onClick={() => save()}>
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
                        {animalId === "new" && <h2>Nouvel Animal</h2>}
                        {animalId !== "new" && <h2>{data.animal.name}</h2>}
                    </CardHeader>
                    <CardBody>
                        {(animalId === "new" || isEditing === true) && (
                            <Row>
                                <Col xs={12}>
                                    <Label>Nom</Label>
                                    <Input
                                        value={data.animal.name || ""}
                                        disabled={!isEditing}
                                        onChange={(evt) =>
                                            setData((previousData) => {
                                                return {
                                                    ...previousData,
                                                    animal: {
                                                        ...previousData.animal!,
                                                        name: evt.target.value,
                                                    },
                                                };
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                        )}
                        <Row className="text-center">
                            <Col md={4} lg={3}>
                                <Label>Diffusable</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.broadcastable ?? null}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    broadcastable: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Réservable</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.bookable ?? null}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    bookable: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Réservé·e</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.reserved ?? null}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    reserved: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Duplicata ICAD nécessaire ?</Label>
                                <NullableDropdown
                                    withNewLine={true}
                                    color={
                                        data.animal.need_icad_duplicate === null || data.animal.need_icad_duplicate === undefined
                                            ? "warning"
                                            : data.animal.need_icad_duplicate === "received"
                                            ? "success"
                                            : data.animal.need_icad_duplicate === "waiting"
                                            ? "info"
                                            : "danger"
                                    }
                                    value={data.animal.need_icad_duplicate}
                                    values={["no", "waiting", "received"]}
                                    valueDisplayName={(value) =>
                                        value === null || value === undefined
                                            ? "NSP"
                                            : value === "received"
                                            ? "Oui, reçu"
                                            : value === "waiting"
                                            ? "Oui, demandé"
                                            : "Non"
                                    }
                                    valueActiveCheck={(value) => data.animal?.need_icad_duplicate === value}
                                    key={"need_icad_duplicate"}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newNeedIcadDuplicate) => {
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    need_icad_duplicate: newNeedIcadDuplicate,
                                                },
                                            };
                                        });
                                    }}
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Adopté·e</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.adopted ?? null}
                                    disabled={!isEditing}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    adopted: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Album créé</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.album_created ?? null}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    album_created: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                            <Col md={4} lg={3}>
                                <Label>Contrat envoyé</Label>
                                <BooleanNullableDropdown
                                    withNewLine={true}
                                    value={data.animal.contract_sent ?? null}
                                    disabled={!isEditing || data.animal.adopted}
                                    onChange={(newValue) =>
                                        setData((previousData) => {
                                            return {
                                                ...previousData,
                                                animal: {
                                                    ...previousData.animal!,
                                                    contract_sent: newValue ?? undefined,
                                                },
                                            };
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.INFO)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.INFO, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Informations</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Photo</Label>
                                        </Col>
                                        <Col xs={6}>
                                            <Row>
                                                <Col xs={12}>
                                                    <Label>ICAD</Label>
                                                    <Input
                                                        value={data.animal.icad || ""}
                                                        disabled={!isEditing}
                                                        onChange={(evt) =>
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        icad: evt.target.value,
                                                                    },
                                                                };
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>
                                                    <Label>Espèce</Label>
                                                    <Dropdown
                                                        withNewLine={true}
                                                        color={"primary"}
                                                        disabled={!isEditing}
                                                        value={{
                                                            id: data.animal.species_id,
                                                            name: data.animal.species_name,
                                                        }}
                                                        values={data.species}
                                                        valueDisplayName={(aSpecies) => aSpecies.name}
                                                        valueActiveCheck={(aSpecies) => aSpecies.id === data.animal?.species_id}
                                                        key={"species"}
                                                        onChange={(newSpecies) =>
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        species_id: newSpecies.id,
                                                                        species_name: newSpecies.name,
                                                                    },
                                                                };
                                                            })
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={6}>
                                                    <Label>Sexe</Label>
                                                    <NullableDropdown
                                                        withNewLine={true}
                                                        color={"primary"}
                                                        disabled={!isEditing}
                                                        value={
                                                            data.animal.sexe === undefined || data.animal.sexe === null
                                                                ? null
                                                                : data.sexes.find((aSexe) => aSexe.key === data.animal?.sexe)
                                                        }
                                                        values={data.sexes}
                                                        valueDisplayName={(aSexe) => aSexe.value}
                                                        valueActiveCheck={(aSexe) => aSexe.key === data.animal?.sexe}
                                                        key={"sexes"}
                                                        onChange={(newSexe) =>
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        sexe: newSexe?.key,
                                                                    },
                                                                };
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}>
                                                    <Label>Race</Label>
                                                    <Input
                                                        value={data.animal.race || ""}
                                                        disabled={!isEditing}
                                                        onChange={(evt) =>
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        race: evt.target.value,
                                                                    },
                                                                };
                                                            })
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Date de naissance</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.birthdate}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                birthdate: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>Signes distinctifs</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.distinctive_signs || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                distinctive_signs: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.PEC)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.PEC, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Prise en charge</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Date de PEC</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.entry_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                entry_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>Lieu de PEC</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.place_of_care || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                place_of_care: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Raisons de PEC</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.reason_for_care || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                reason_for_care: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>Informations de PEC</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.care_infos || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                care_infos: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Label>Cédant</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.transferor || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                transferor: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.HEALTH)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.HEALTH, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Santé</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Primo vaccination</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.first_vaccination_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                first_vaccination_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>Rappel de vaccin</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.second_vaccination_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                second_vaccination_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} md={3}>
                                            <Label>Stérilisé·e</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.sterilised ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                sterilised: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                        {data.animal.species_id === SPECIES_ID.CAT && (
                                            <>
                                                <Col xs={6} md={3}>
                                                    <Label>Extérieur obligatoire</Label>
                                                    <BooleanNullableDropdown
                                                        withNewLine={true}
                                                        value={data.animal.need_external_access ?? null}
                                                        disabled={!isEditing}
                                                        onChange={(newValue) => {
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        need_external_access: newValue ?? undefined,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    />
                                                </Col>
                                                <Col xs={6} md={3}>
                                                    <Label>Négatif FIV</Label>
                                                    <BooleanNullableDropdown
                                                        withNewLine={true}
                                                        value={data.animal.fiv_negative ?? null}
                                                        disabled={!isEditing}
                                                        onChange={(newValue) => {
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        fiv_negative: newValue ?? undefined,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    />
                                                </Col>
                                                <Col xs={6} md={3}>
                                                    <Label>Négatif FELV</Label>
                                                    <BooleanNullableDropdown
                                                        withNewLine={true}
                                                        value={data.animal.felv_negative ?? null}
                                                        disabled={!isEditing}
                                                        onChange={(newValue) => {
                                                            setData((previousData) => {
                                                                return {
                                                                    ...previousData,
                                                                    animal: {
                                                                        ...previousData.animal!,
                                                                        felv_negative: newValue ?? undefined,
                                                                    },
                                                                };
                                                            });
                                                        }}
                                                    />
                                                </Col>
                                            </>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Date des anti-parasitaires</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.anti_parasitic_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                anti_parasitic_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Label>Particularité de santé</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.health_issues || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                health_issues: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.BEHAVIOUR)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.BEHAVIOUR, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Comportement</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={12}>
                                            <Label>Caractère</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.behaviour || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                behaviour: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} md={3}>
                                            <Label>Besoin congénère</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.need_friends ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                need_friends: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Label>Attitude</Label>
                                            <NullableDropdown
                                                withNewLine={true}
                                                color={
                                                    data.animal.posture === null || data.animal.posture === undefined
                                                        ? "fearfull"
                                                        : data.animal.posture === "shy"
                                                        ? "info"
                                                        : data.animal.posture === "sociable"
                                                        ? "success"
                                                        : "danger"
                                                }
                                                value={data.animal.posture}
                                                values={["nsp", "fearfull", "shy", "sociable"]}
                                                valueDisplayName={(value) =>
                                                    value === null || value === undefined
                                                        ? "NSP"
                                                        : value === "fearfull"
                                                        ? "Craintif"
                                                        : value === "shy"
                                                        ? "Peureux"
                                                        : value === "sociable"
                                                        ? "Sociable"
                                                        : ""
                                                }
                                                valueActiveCheck={(value) => data.animal?.posture === value}
                                                key={"posture"}
                                                disabled={!isEditing}
                                                onChange={(newPosture) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                posture: newPosture,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} md={3}>
                                            <Label>OK chats</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.cats_ok ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                cats_ok: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Label>OK chiens</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.dogs_ok ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                dogs_ok: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Label>OK enfants</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.kids_ok ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                kids_ok: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Label>Particularité</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.behavior_particularity || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                behavior_particularity: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>

                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.EXIT)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.EXIT, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Sortie</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <Label>Certificat de cession</Label>
                                            <BooleanNullableDropdown
                                                withNewLine={true}
                                                value={data.animal.transfer_certificate ?? null}
                                                disabled={!isEditing}
                                                onChange={(newValue) => {
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                transfer_certificate: newValue ?? undefined,
                                                            },
                                                        };
                                                    });
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={8}>
                                            <Label>Date de sortie</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.exit_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                exit_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Label>Raison de sortie</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.exit_reason || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                exit_reason: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        <Accordion
                            className="pb-3"
                            open={accordions.find((a) => a.type === AnimalDetailPageAccordion.DEATH)?.id ?? ""}
                            {...{
                                toggle: (id: string) => toggleAccordion(AnimalDetailPageAccordion.DEATH, id),
                            }}
                        >
                            <AccordionItem>
                                <AccordionHeader targetId="1">Décès</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row>
                                        <Col xs={6}>
                                            <Label>Date de décès</Label>
                                            <Input
                                                type="date"
                                                value={data.animal.death_date}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                death_date: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Label>Raison du décès</Label>
                                            <Input
                                                type="textarea"
                                                value={data.animal.death_reason || ""}
                                                disabled={!isEditing}
                                                onChange={(evt) =>
                                                    setData((previousData) => {
                                                        return {
                                                            ...previousData,
                                                            animal: {
                                                                ...previousData.animal!,
                                                                death_reason: evt.target.value,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </CardBody>
                </Card>
                <br />
                <VeterinarianInterventionsHistory
                    animalId={parseInt(animalId)}
                    veterinarianInterventions={data.veterinarianInterventions}
                    notificationSystem={notificationSystem}
                    shouldRefresh={getVeterinarianInterventions}
                    {...props}
                />
                <br />
                <HostFamiliesHistory
                    animalId={parseInt(animalId)}
                    animalName={data.animal.name ?? ""}
                    hostFamilies={data.hostFamilies}
                    animalToHostFamilies={data.animalToHostFamilies}
                    notificationSystem={notificationSystem}
                    shouldRefresh={() => {
                        getAnimalToHostFamilies()?.then(getAnimal);
                    }}
                    {...props}
                />
            </div>
        );
    }

    return (
        <Page
            className="AnimalPage"
            title="Détail de l'animal"
            breadcrumbs={[{ name: "Animaux", to: "/animals" } as CustomBreadcrumbItem, { name: "Animal", active: true } as CustomBreadcrumbItem]}
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
                        deleteA();
                    }
                }}
                bodyEntityName={"un Animal"}
            />
        </Page>
    );
};
export default AnimalDetailPage;
