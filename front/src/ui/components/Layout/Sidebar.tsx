import React from "react";
import Logo1000Moustaches from "../../../assets/img/logo/Logo1000Moustaches.png";
import SourceLink from "../SourceLink";
import { MdDashboard, MdPets, MdHealthAndSafety, MdHomeFilled, MdPeople } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "../../../utils/bemnames";
import { WebsiteCarbonBadge } from "react-websitecarbon-badge";

interface SidebarItem {
    to: string;
    name: string;
    exact: boolean;
    Icon: React.ComponentType<{ className?: string; size?: number }>;
}

const navItems: SidebarItem[] = [
    { to: "/", name: "Dashboard", exact: true, Icon: MdDashboard },
    { to: "/animals", name: "Animaux", exact: false, Icon: MdPets },
    {
        to: "/veterinarians",
        name: "Vétérinaires",
        exact: false,
        Icon: MdHealthAndSafety,
    },
    {
        to: "/hostFamilies",
        name: "Familles d'Accueil",
        exact: false,
        Icon: MdHomeFilled,
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
