import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import mermaidConfig from './mermaidConfig';

const MermaidDiagram = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize(mermaidConfig);
    mermaid.contentLoaded();
  }, [chart]);

  return <div className="mermaid">{chart}</div>;
};

export default MermaidDiagram;