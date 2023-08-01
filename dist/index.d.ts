type MouseAcceleration = {
    speed: number;
    horizontalSpeed: number;
    acceleration: number;
    horizontalAcceleration: number;
    horizontalDirection: number;
};
declare const useMouseAcceleration: () => MouseAcceleration;
export default useMouseAcceleration;
