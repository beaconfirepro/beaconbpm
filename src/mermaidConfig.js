const mermaidConfig = {
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    fontFamily: "'Evolve Sans', sans-serif",
    fontWeight: "bold",
    fontSize: '16px',
    primaryColor: '#114B5F',
    secondaryColor: '#028090',
    tertiaryColor: '#E06F03',
    textColor: '#ffffff', // explicitly white text
    lineColor: '#6B8F9C',
    nodeBorder: '#114B5F',
    clusterBkg: '#F1EEEC',
    edgeLabelBackground: '#ffffff',
    nodeTextColor: '#ffffff', // white text in nodes explicitly
    nodeBorderRadius: '8px',
  },
  flowchart: {
    curve: 'basis',
    htmlLabels: true,
  },
};

export default mermaidConfig;
