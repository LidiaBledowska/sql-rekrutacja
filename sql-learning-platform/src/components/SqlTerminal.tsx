import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

const TerminalContainer = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TerminalHeader = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TerminalDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const TerminalTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-left: 0.5rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const EditorContainer = styled.div`
  flex: 1;
  position: relative;
`;

const ExecuteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accent}dd;
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const ResultsContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
`;

const ResultSuccess = styled.div`
  color: ${props => props.theme.colors.success};
  margin-bottom: 0.5rem;
`;


export const SqlTerminal: React.FC = () => {
  const [sqlCode, setSqlCode] = useState(`-- Przykładowe zapytanie SQL
-- Sprawdź strukturę tabeli kandydaci
SELECT * FROM kandydaci LIMIT 5;

-- Znajdź wszystkich kandydatów z aplikacjami
SELECT k.imie, k.nazwisko, s.nazwa_stanowiska, a.status
FROM kandydaci k
JOIN aplikacje a ON k.id = a.kandydat_id
JOIN stanowiska s ON a.stanowisko_id = s.id;`);
  
  const [results, setResults] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeSQL = async () => {
    setIsExecuting(true);
    
    // Symulacja wykonania SQL
    setTimeout(() => {
      const queries = sqlCode.split(';').filter(q => q.trim() && !q.trim().startsWith('--'));
      const newResults = queries.map((query, index) => {
        if (query.toLowerCase().includes('select')) {
          return `✅ Zapytanie ${index + 1} wykonane pomyślnie! Zwrócono ${Math.floor(Math.random() * 10) + 1} wierszy.`;
        }
        return `✅ Zapytanie ${index + 1} wykonane pomyślnie!`;
      });
      
      setResults(prev => [...prev, ...newResults]);
      setIsExecuting(false);
    }, 1000);
  };

  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalDot color="#ff5f57" />
        <TerminalDot color="#ffbd2e" />
        <TerminalDot color="#28ca42" />
        <TerminalTitle>🗄️ SQL Terminal - Baza Rekrutacja</TerminalTitle>
      </TerminalHeader>
      
      <EditorContainer>
        <ExecuteButton 
          onClick={executeSQL} 
          disabled={isExecuting}
        >
          {isExecuting ? '⏳ Wykonuję...' : '▶️ Wykonaj SQL'}
        </ExecuteButton>
        
        <Editor
          height="100%"
          defaultLanguage="sql"
          value={sqlCode}
          onChange={(value) => setSqlCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </EditorContainer>
      
      {results.length > 0 && (
        <ResultsContainer>
          {results.map((result, index) => (
            <ResultSuccess key={index}>{result}</ResultSuccess>
          ))}
        </ResultsContainer>
      )}
    </TerminalContainer>
  );
};