import { useEffect, useRef, useState } from 'react';
const useMouseAcceleration = () => {
    const [mouseMetrics, setMouseMetrics] = useState({
        x: 0,
        y: 0,
        speed: 0,
        verticalSpeed: 0,
        horizontalSpeed: 0,
        verticalDirection: 0,
        horizontalDirection: 0,
        acceleration: 0,
        verrticalAcceleration: 0,
        horizontalAcceleration: 0,
    });
    const mouseRef = useRef({
        prevSpeed: 0,
        prevVerticalSpeed: 0,
        prevHorizontalSpeed: 0,
        prevEvent: null,
        currentEvent: null,
    });
    const rafRef = useRef(0);
    const lastSpeedCalculation = useRef(0);
    const prevRafTimestamp = useRef(null);
    const isCalculating = useRef(false);
    const calculateMouseMetrics = (timestamp) => {
        if (timestamp - lastSpeedCalculation.current < 100) {
            return;
        }
        lastSpeedCalculation.current = timestamp;
        if (!mouseRef.current.currentEvent || !mouseRef.current.prevEvent) {
            mouseRef.current.prevEvent = mouseRef.current.currentEvent;
            return;
        }
        const offsetX = mouseRef.current.currentEvent.screenX - mouseRef.current.prevEvent.screenX;
        const offsetY = mouseRef.current.currentEvent.screenY - mouseRef.current.prevEvent.screenY;
        const movementX = Math.abs(offsetX);
        const movementY = Math.abs(offsetY);
        const movement = Math.sqrt(movementX * movementX + movementY * movementY);
        // mouse metrics
        const metrics = {
            x: mouseRef.current.currentEvent.clientX,
            y: mouseRef.current.currentEvent.clientY,
            speed: 10 * movement,
            verticalSpeed: 10 * movementY,
            horizontalSpeed: 10 * movementX,
            verticalDirection: Math.sign(offsetY),
            horizontalDirection: Math.sign(offsetX),
            acceleration: 10 * (10 * movement - mouseRef.current.prevSpeed),
            verrticalAcceleration: 10 * (10 * movementY - mouseRef.current.prevVerticalSpeed),
            horizontalAcceleration: 10 * (10 * movementX - mouseRef.current.prevHorizontalSpeed),
        };
        if (metrics.speed &&
            metrics.verticalSpeed &&
            metrics.horizontalSpeed &&
            metrics.acceleration &&
            metrics.horizontalAcceleration) {
            isCalculating.current = false;
        }
        setMouseMetrics(Object.assign({}, metrics));
        mouseRef.current.prevSpeed = metrics.speed;
        mouseRef.current.prevVerticalSpeed = metrics.verticalSpeed;
        mouseRef.current.prevHorizontalSpeed = metrics.horizontalSpeed;
        mouseRef.current.prevEvent = mouseRef.current.currentEvent;
    };
    useEffect(() => {
        const setMouseCurrentEvent = (e) => {
            mouseRef.current.currentEvent = e;
        };
        const startMouseCalculation = () => {
            if (isCalculating.current) {
                return;
            }
            isCalculating.current = true;
            const step = (timestamp) => {
                if (!isCalculating.current) {
                    return;
                }
                if (!prevRafTimestamp.current) {
                    prevRafTimestamp.current = timestamp;
                }
                prevRafTimestamp.current = timestamp;
                calculateMouseMetrics(timestamp);
                rafRef.current = requestAnimationFrame(step);
            };
            rafRef.current = requestAnimationFrame(step);
        };
        const handleMouseMove = (e) => {
            setMouseCurrentEvent(e);
            startMouseCalculation();
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);
    return mouseMetrics;
};
export default useMouseAcceleration;
