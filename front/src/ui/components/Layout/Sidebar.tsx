import React from "react";
import Logo1000Moustaches from "../../../assets/img/logo/Logo1000Moustaches.png";
import SourceLink from "../SourceLink";
import { MdDashboard, MdPets, MdHealthAndSafety, MdHomeFilled, MdPeople } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "../../../utils/bemnames";
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";
import useGetPermissions from "../../../hooks/useGetPermissions";

interface SidebarItem {
    to: string;
    name: string;
    exact: boolean;
    Icon: React.ComponentType<{ className?: string; size?: number }>;
    ressourceName?: string;
    visibility?: boolean;
}

const navItems: SidebarItem[] = [
    {
        to: "/",
        name: "Dashboard",
        exact: true,
        Icon: MdDashboard,
    },
    {
        to: "/animals",
        name: "Animaux",
        exact: false,
        Icon: MdPets,
        ressourceName: "pet_list",
    },
    {
        to: "/veterinarians",
        name: "Vétérinaires",
        exact: false,
        Icon: MdHealthAndSafety,
        ressourceName: "vet_list",
    },
    {
        to: "/hostFamilies",
        name: "Familles d'Accueil",
        exact: false,
        Icon: MdHomeFilled,
        ressourceName: "hf_list",
    },
    {
        to: "/users",
        name: "Utilisateur·ice·s",
        exact: false,
        Icon: MdPeople,
    },
];

const bem = bn.create("sidebar");

const Sidebar: React.FC = () => {
    //TODO:
    // - faire la boucle qui récupère les permissions en fonction des ressourcesName de Item
    // - faire la boucle qui récupère les booléens pour la visibilité des boutons de la sidebar
    let array: string[] = ["pets"];
    let test: string[] = navItems.map((item) => item.name);
    const pagePermissions = useGetPermissions(array);

    pagePermissions.find((perm) => perm?.ressource_name == "pets")?.can_read;
    pagePermissions["pets"].can_read;

    return (
        <aside className={bem.b()}>
            <div className={bem.e("background")} />
            <div className={bem.e("content")}>
                <Navbar>
                    <SourceLink className="navbar-brand justify-content-center" link="https://1000moustaches.fr">
                        <img src={Logo1000Moustaches} height="100" alt="1000 Moustaches" />
                    </SourceLink>
                </Navbar>
                <Nav vertical>
                    {navItems.map(({ to, name, exact, Icon }, index) => (
                        <NavItem key={index} className={bem.e("nav-item")}>
                            <BSNavLink id={`navItem-${name}-${index}`} className="text-uppercase" tag={NavLink} to={to} end={exact}>
                                <Icon className={bem.e("nav-item-icon")} />
                                <span>{name}</span>
                            </BSNavLink>
                        </NavItem>
                    ))}
                </Nav>
                <WebsiteCarbonBadge lang="fr" url="https://admin-1000-moustaches.web.app/hostFamilies" />
            </div>
        </aside>
    );
};

export default Sidebar;
