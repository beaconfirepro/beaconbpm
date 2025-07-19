import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import mermaidConfig from './mermaidConfig';

const MermaidEditor = () => {
  const [code, setCode] = useState('');
  const diagramRef = useRef(null);
  const [svgCode, setSvgCode] = useState('');

  useEffect(() => {
    mermaid.initialize(mermaidConfig);
  }, []);

  const handleRender = () => {
    if (diagramRef.current) {
      mermaid.render('mermaidDiagram', code)
        .then(({ svg }) => {
          diagramRef.current.innerHTML = svg;
          setSvgCode(svg);
        })
        .catch((error) => {
          diagramRef.current.innerHTML = `<pre style="color:red;">${error}</pre>`;
        });
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'mermaid-diagram.svg';
    downloadLink.click();
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div style={{ padding: '20px' }}>
      <textarea
        placeholder="Paste your Mermaid diagram code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        style={{ width: '70%', fontSize: '14px', fontFamily: 'monospace' }}
      />
      <button onClick={handleRender} style={{ marginTop: '10px', padding: '8px 15px' }}>
        Render Diagram
      </button>
      <button onClick={downloadSvg} style={{ marginTop: '10px', marginLeft: '10px', padding: '8px 15px' }}>
        Download SVG
      </button>
      <div ref={diagramRef} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default MermaidEditor;
