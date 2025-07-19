import React from 'react';
import MermaidDiagram from './MermaidDiagram';

const App = () => {
  const chart = `
    graph LR
      A[Deb's Mermaid App] --> B{Working yet?}
      B -->|YES| C[All Good]
      B -->|NO| D[Still Broken]
  `;

  return (
    <div className="App">
      <MermaidDiagram chart={chart} />
    </div>
  );
};

export default App;