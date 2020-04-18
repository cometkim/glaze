import { useStyling } from 'glaze';
import * as React from 'react';

function App() {
  const sx = useStyling();
  return (
    <p
      className={sx({
        px: 4,
        color: 'white',
        bg: 'red',
      })}
    >
      Hello, world!
    </p>
  );
}
