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

## License

MIT
```