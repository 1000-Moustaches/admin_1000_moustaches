import React from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import SourceLink from "../SourceLink";

const Footer: React.FC = () => {
    return (
        <Navbar>
            <Nav navbar>
                <NavItem>
                    ⓒ 2024 - <SourceLink link="https://1000moustaches.fr">1000 moustaches</SourceLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Footer;
