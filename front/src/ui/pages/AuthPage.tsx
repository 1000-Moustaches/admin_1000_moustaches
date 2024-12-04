import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "reactstrap";
import AuthForm, { AuthFormState } from "../components/AuthForm";

interface AuthPageProps {
    authState: AuthFormState;
}

const AuthPage: FC<AuthPageProps> = ({ authState }) => {
    const navigate = useNavigate();

    const handleAuthState = (authState: AuthFormState): void => {
        if (authState === AuthFormState.LOGIN) {
            // Go to page /login
            navigate("/login");
        } else {
            navigate("/signup");
        }
    };

    const handleLogoClick = (): void => {
        navigate("/");
    };

    return (
        <Row
            style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Col md={6} lg={4}>
                <Card body>
                    <AuthForm authState={authState} onChangeAuthState={handleAuthState} onLogoClick={handleLogoClick} />
                </Card>
            </Col>
        </Row>
    );
};

export default AuthPage;
