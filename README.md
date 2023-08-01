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
  speed: number;
  horizontalSpeed: number;
  acceleration: number;
  horizontalAcceleration: number;
  horizontalDirection: number;
};
```

- `speed`: Represents the overall speed of the mouse movement.
- `horizontalSpeed`: Represents the speed of horizontal mouse movement.
- `acceleration`: Represents the acceleration of the mouse movement.
- `horizontalAcceleration`: Represents the acceleration of horizontal mouse movement.
- `horizontalDirection`: Represents the direction of horizontal mouse movement (-1 for left, 1 for right).

## License

MIT
```