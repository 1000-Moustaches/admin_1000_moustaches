import React, { useEffect, useRef } from "react";
import { Content, Footer, Header, Sidebar } from "./index";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "../../../utils/constants";
import { getDeviceConfig } from "../../../utils/breakpoint";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const notificationSystem = useRef<any>(null);

    const isSidebarOpen = (): boolean => {
        return document.querySelector(".cr-sidebar")?.classList.contains("cr-sidebar--open") ?? false;
    };

    const openSidebar = (openOrClose: "open" | "close"): void => {
        const sidebar = document.querySelector(".cr-sidebar");
        if (openOrClose === "open") {
            sidebar?.classList.add("cr-sidebar--open");
        } else {
            sidebar?.classList.remove("cr-sidebar--open");
        }
    };

    const checkBreakpoint = (breakpoint: string): void => {
        switch (breakpoint) {
            case "xs":
            case "sm":
            case "md":
                openSidebar("close");
                break;
            case "lg":
            case "xl":
            default:
                openSidebar("open");
                break;
        }
    };

    const handleContentClick = (): void => {
        const breakpoint = getDeviceConfig(window.innerWidth);
        if (isSidebarOpen() && (breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md")) {
            openSidebar("close");
        }
    };

    useEffect(() => {
        checkBreakpoint(getDeviceConfig(window.innerWidth));
    }, []);

    return (
        <main className="cr-app bg-light">
            <Sidebar />
            <Content fluid onClick={handleContentClick}>
                <Header />
                {children}
                <Footer />
            </Content>

            <NotificationSystem ref={notificationSystem} style={NOTIFICATION_SYSTEM_STYLE} />
        </main>
    );
};

export default MainLayout;
