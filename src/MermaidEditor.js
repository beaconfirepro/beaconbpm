import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import mermaidConfig from './mermaidConfig';

const MermaidEditor = () => {
  const [code, setCode] = useState('');
  const [chart, setChart] = useState('');

  useEffect(() => {
    mermaid.initialize(mermaidConfig);
    mermaid.contentLoaded();
  }, [chart]);

  const handleChange = (e) => setCode(e.target.value);
  const handleRender = () => setChart(code);

  return (
    <div style={{ padding: '20px' }}>
      <textarea
        placeholder="Paste your Mermaid diagram code here"
        value={code}
        onChange={handleChange}
        rows={10}
        style={{ width: '100%', fontSize: '14px', fontFamily: 'monospace' }}
      />
      <button onClick={handleRender} style={{ marginTop: '10px', padding: '8px 15px' }}>
        Render Diagram
      </button>
      {chart && (
        <div className="mermaid" style={{ marginTop: '20px' }}>
          {chart}
        </div>
      )}
    </div>
  );
};

export default MermaidEditor;
