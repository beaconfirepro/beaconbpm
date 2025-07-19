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
bash: import: command not found
bash: import: command not found
bash: syntax error near unexpected token `('
bash: graph: command not found
bash: command substitution: line 3: unexpected EOF while looking for matching `''
bash: const: command not found
bash: syntax error near unexpected token `newline'
bash: syntax error near unexpected token `newline'
bash: syntax error near unexpected token `newline'
bash: syntax error near unexpected token `newline'
bash: syntax error near unexpected token `)'
bash: syntax error near unexpected token `}'