import React from "react";
import Content from "./Content";

interface EmptyLayoutProps {
    children: React.ReactNode;
    [key: string]: any;
}

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children, ...restProps }) => (
    <main className="cr-app bg-light" {...restProps}>
        <Content fluid>{children}</Content>
    </main>
);

export default EmptyLayout;
