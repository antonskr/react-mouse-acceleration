type MouseAcceleration = {
    x: number;
    y: number;
    speed: number;
    verticalSpeed: number;
    horizontalSpeed: number;
    verticalDirection: number;
    horizontalDirection: number;
    acceleration: number;
    verrticalAcceleration: number;
    horizontalAcceleration: number;
};
declare const useMouseAcceleration: () => MouseAcceleration;
export default useMouseAcceleration;
