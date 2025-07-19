import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import mermaidConfig from './mermaidConfig';

const MermaidEditor = () => {
  const [code, setCode] = useState('');
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize(mermaidConfig);
  }, []);

  const handleRender = () => {
    if (diagramRef.current) {
      mermaid.render('mermaidDiagram', code, (svgCode) => {
        diagramRef.current.innerHTML = svgCode;
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <textarea
        placeholder="Paste your Mermaid diagram code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        style={{ width: '100%', fontSize: '14px', fontFamily: 'monospace' }}
      />
      <button onClick={handleRender} style={{ marginTop: '10px', padding: '8px 15px' }}>
        Render Diagram
      </button>
      <div ref={diagramRef} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default MermaidEditor;
