import { useEffect, useRef, useState } from "react";

type MouseAcceleration = {
  speed: number;
  horizontalSpeed: number;
  acceleration: number;
  horizontalAcceleration: number;
  horizontalDirection: number;
};

const useMouseAcceleration = (): MouseAcceleration => {
  const [mouse, setMouse] = useState<MouseAcceleration>({
    speed: 0,
    horizontalSpeed: 0,
    acceleration: 0,
    horizontalAcceleration: 0,
    horizontalDirection: 0,
  });

  const mouseRef = useRef<{
    x: number;
    y: number;
    speed: number;
    prevSpeed: number;
    horizontalSpeed: number;
    acceleration: number;
    horizontalAcceleration: number;
    prevHorizontalSpeed: number;
    horizontalDirection: number;
    prevEvent: MouseEvent | null;
    currentEvent: MouseEvent | null;
  }>({
    x: 0,
    y: 0,
    speed: 0,
    prevSpeed: 0,
    horizontalSpeed: 0,
    acceleration: 0,
    horizontalAcceleration: 0,
    prevHorizontalSpeed: 0,
    horizontalDirection: 0,
    prevEvent: null,
    currentEvent: null,
  });

  const lastSpeedCalculation = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const prevRafTimestamp = useRef<number | null>(null);
  const isAnimationActive = useRef<boolean>(false);

  const calculateSpeed = (timestamp: number): void => {
    if (timestamp - lastSpeedCalculation.current < 100) {
      return;
    }

    lastSpeedCalculation.current = timestamp;

    if (!mouseRef.current.currentEvent || !mouseRef.current.prevEvent) {
      mouseRef.current.prevEvent = mouseRef.current.currentEvent;
      return;
    }

    const offsetX =
      mouseRef.current.currentEvent.screenX -
      mouseRef.current.prevEvent.screenX;
    const offsetY =
      mouseRef.current.currentEvent.screenY -
      mouseRef.current.prevEvent.screenY;
    const movementX = Math.abs(offsetX);
    const movementY = Math.abs(offsetY);
    const movement = Math.sqrt(movementX * movementX + movementY * movementY);
    const speed = 10 * movement;

    mouseRef.current.speed = speed;
    mouseRef.current.horizontalSpeed = 10 * movementX;
    mouseRef.current.horizontalDirection = Math.sign(offsetX);
    mouseRef.current.acceleration = 10 * (speed - mouseRef.current.prevSpeed);
    mouseRef.current.horizontalAcceleration =
      10 *
      (mouseRef.current.horizontalSpeed - mouseRef.current.prevHorizontalSpeed);

    if (
      mouseRef.current.speed === 0 &&
      mouseRef.current.horizontalSpeed === 0 &&
      mouseRef.current.acceleration === 0 &&
      mouseRef.current.horizontalAcceleration === 0
    ) {
      isAnimationActive.current = false;
    }

    setMouse({
      speed: mouseRef.current.speed,
      horizontalSpeed: mouseRef.current.horizontalSpeed,
      acceleration: mouseRef.current.acceleration,
      horizontalAcceleration: mouseRef.current.horizontalAcceleration,
      horizontalDirection: mouseRef.current.horizontalDirection,
    });

    mouseRef.current.prevSpeed = speed;
    mouseRef.current.prevHorizontalSpeed = mouseRef.current.horizontalSpeed;
    mouseRef.current.prevEvent = mouseRef.current.currentEvent;
  };

  const setMousePosition = (e: MouseEvent): void => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    mouseRef.current.currentEvent = e;
  };

  const startCalculation = (): void => {
    if (isAnimationActive.current) {
      return;
    }

    isAnimationActive.current = true;

    rafRef.current = requestAnimationFrame(function step(timestamp) {
      if (!isAnimationActive.current) {
        return;
      }

      if (!prevRafTimestamp.current) {
        prevRafTimestamp.current = timestamp;
      }

      prevRafTimestamp.current = timestamp;

      calculateSpeed(timestamp);
      rafRef.current = requestAnimationFrame(step);
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition(e);
      startCalculation();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mouse;
};

export default useMouseAcceleration;
