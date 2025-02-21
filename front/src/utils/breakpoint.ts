import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

const getDeviceConfig = (width: number): Breakpoint => {
    if (width < 320) {
        return "xs";
    } else if (width >= 320 && width < 720) {
        return "sm";
    } else if (width >= 720 && width < 1024) {
        return "md";
    } else if (width >= 1024) {
        return "lg";
    }
    return "lg"; // default case
};

const useBreakpoint = (): Breakpoint => {
    const [brkPnt, setBrkPnt] = useState<Breakpoint>(() =>
        getDeviceConfig(window.innerWidth)
    );

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setBrkPnt(getDeviceConfig(window.innerWidth));
        }, 200);
        window.addEventListener("resize", calcInnerWidth);
        return () => window.removeEventListener("resize", calcInnerWidth);
    }, []);

    return brkPnt;
};

export { getDeviceConfig, useBreakpoint }; 