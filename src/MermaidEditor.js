import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import mermaidConfig from './mermaidConfig';
import { downloadMermaidImage } from './downloadMermaidImage';

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

  const handleDownloadPng = () => {
    const svgElement = diagramRef.current.querySelector('svg');
    if (svgElement) {
      downloadMermaidImage(svgElement, mermaidConfig);
    }
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
      <button onClick={handleDownloadPng} style={{ marginTop: '10px', marginLeft: '10px', padding: '8px 15px' }}>
        Download PNG
      </button>

      <table style={{ border: '2px solid #114B5F', marginTop: '20px', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td
              style={{
                width: '840px',
                padding: '10px',
                border: '1px solid #114B5F',
                verticalAlign: 'top',
              }}
            >
              <div ref={diagramRef} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MermaidEditor;
