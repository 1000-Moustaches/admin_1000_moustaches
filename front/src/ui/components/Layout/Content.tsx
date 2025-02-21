import React from "react";
import bn from "../../../utils/bemnames";
import { Container } from "reactstrap";

const bem = bn.create("content");

interface ContentProps {
    tag?: React.ElementType;
    className?: string;
    [key: string]: any;
}

const Content: React.FC<ContentProps> = ({ tag: Tag = Container, className, ...restProps }) => {
    const classes = bem.b(className);
    return <Tag className={classes} {...restProps} />;
};

export default Content;
