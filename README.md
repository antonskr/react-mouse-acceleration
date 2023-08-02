# react-mouse-acceleration

React hook for tracking mouse acceleration.

## Installation

```bash
npm install react-mouse-acceleration
```

## Usage

```jsx
import React from 'react';
import useMouseAcceleration from 'react-mouse-acceleration';

const MyComponent = () => {
  const mouseAcceleration = useMouseAcceleration();

  console.log(mouseAcceleration);

  return (
    <div>
      {/* Use the mouseAcceleration values in your component */}
    </div>
  );
};
```

The `useMouseAcceleration` hook returns an object with the following shape:

```typescript
type MouseAcceleration = {
  x: number;
  y: number;
  speed: number;
  verticalSpeed: number;
  horizontalSpeed: number;
  verticalDirection: number;
  horizontalDirection: number;
  acceleration: number;
  verticalAcceleration: number;
  horizontalAcceleration: number;
};
```

- `x`: Represents the current X coordinate of the mouse pointer.
- `y`: Represents the current Y coordinate of the mouse pointer.
- `speed`: Represents the overall speed of the mouse movement.
- `verticalSpeed`: Represents the speed of the vertical mouse movement.
- `horizontalSpeed`: Represents the speed of the horizontal mouse movement.
- `verticalDirection`: Represents the direction of the vertical mouse movement (-1 for up, 1 for down).
- `horizontalDirection`: Represents the direction of the horizontal mouse movement (-1 for left, 1 for right).
- `acceleration`: Represents the acceleration of the mouse movement.
- `verticalAcceleration`: Represents the acceleration of the vertical mouse movement.
- `horizontalAcceleration`: Represents the acceleration of the horizontal mouse movement.

Using the values `speed`, `verticalSpeed`, and `horizontalSpeed` for animations is recommended because they provide smooth and consistent values of mouse speed. These values can be used to create smooth animations that respond to the user's mouse movements. Additionally, using mouse speed instead of raw mouse coordinates allows for more control over the animation speed and direction based on the user's input.

## License

MIT
```