// src/downloadMermaidImage.js

export const downloadMermaidImage = (svgElement, mermaidConfig, filename = 'mermaid-diagram.png', scale = 3) => {
  const width = svgElement.clientWidth * scale;
  const height = svgElement.clientHeight * scale;

  svgElement.setAttribute('width', width);
  svgElement.setAttribute('height', height);

  // Explicitly embed fonts directly into SVG as CSS
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Evolve Sans';
      src: url('${window.location.origin}/fonts/evolve-bold.woff2') format('woff2');
      font-weight: bold;
    }
    @font-face {
      font-family: 'Evolve Sans';
      src: url('${window.location.origin}/fonts/evolve-regular.woff2') format('woff2');
      font-weight: normal;
    }
    @font-face {
      font-family: 'Brittany';
      src: url('${window.location.origin}/fonts/brittany.woff2') format('woff2');
      font-weight: normal;
    }
    * {
      font-family: ${mermaidConfig.themeVariables.fontFamily}, sans-serif !important;
      font-weight: ${mermaidConfig.themeVariables.fontWeight || 'bold'} !important;
      fill: ${mermaidConfig.themeVariables.textColor || '#ffffff'} !important;
    }
  `;

  const clonedSvgElement = svgElement.cloneNode(true);
  clonedSvgElement.insertBefore(style, clonedSvgElement.firstChild);

  const svgData = new XMLSerializer().serializeToString(clonedSvgElement);
  const svg64 = btoa(unescape(encodeURIComponent(svgData)));
  const image64 = 'data:image/svg+xml;base64,' + svg64;

  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      svgElement.removeAttribute('width');
      svgElement.removeAttribute('height');
    }, 'image/png');
  };

  img.src = image64;
};
