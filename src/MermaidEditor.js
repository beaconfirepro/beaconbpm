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
          // Ensure the SVG is wrapped safely in a div
          diagramRef.current.innerHTML = `<div>${svg}</div>`;
          setSvgCode(svg);
        })
        .catch((error) => {
          diagramRef.current.innerHTML = `<pre style="color:red;">${error}</pre>`;
        });
    }
  };


 const downloadSvg = () => {
  // Explicitly replace problematic HTML tags like <br> with spaces or line breaks
  const cleanSvg = svgCode
    .replace(/<br>/g, ' ')          // remove problematic <br> tags
    .replace(/&nbsp;/g, ' ')        // replace HTML spaces
    .replace(/<p>/g, '<text>')      // replace paragraph tags with valid SVG text tags
    .replace(/<\/p>/g, '</text>');  // close SVG text tags correctly

  const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
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
