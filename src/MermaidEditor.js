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

  const downloadPng = () => {
    const svgData = new XMLSerializer().serializeToString(diagramRef.current.firstChild);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      URL.revokeObjectURL(svgUrl);

      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'mermaid-diagram.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 'image/png');
    };

    img.src = svgUrl;
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
      <button onClick={downloadPng} style={{ marginTop: '10px', marginLeft: '10px', padding: '8px 15px' }}>
        Download PNG
      </button>
      <div ref={diagramRef} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default MermaidEditor;
