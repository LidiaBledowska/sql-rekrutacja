import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
`;

const LessonTitle = styled.h1`
  color: ${props => props.theme.colors.accent};
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px ${props => props.theme.colors.accent}40;
`;

const LessonDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  background: ${props => props.theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.accent};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const SectionContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  padding: 1rem;
  border-radius: 6px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.colors.border};
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.success}20, ${props => props.theme.colors.accent}20);
  border: 1px solid ${props => props.theme.colors.success}40;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const TaskBox = styled.div`
  background: ${props => props.theme.colors.warning}15;
  border: 1px solid ${props => props.theme.colors.warning}60;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

interface LessonContentProps {
  lesson: string;
}

const lessonData: Record<string, any> = {
  'podstawy': {
    title: '🎯 Wprowadzenie do SQL',
    description: 'Poznaj podstawy języka SQL i strukturę bazy danych rekrutacyjnej',
    sections: [
      {
        title: '🗄️ Nasza baza danych',
        content: (
          <>
            <p>Pracujemy z bazą danych rekrutacyjnej firmy zawierającą:</p>
            <CodeBlock>{`-- Tabela kandydaci
kandydaci:
- id (klucz główny)
- imie (VARCHAR)
- nazwisko (VARCHAR) 
- email (VARCHAR)
- telefon (VARCHAR)

-- Tabela stanowiska  
stanowiska:
- id (klucz główny)
- nazwa_firmy (VARCHAR)
- nazwa_stanowiska (VARCHAR)
- lokalizacja (VARCHAR)

-- Tabela aplikacje (łączy kandydatów ze stanowiskami)
aplikacje:
- id (klucz główny)
- kandydat_id (klucz obcy -> kandydaci.id)
- stanowisko_id (klucz obcy -> stanowiska.id)
- status (VARCHAR: 'złożona', 'w_trakcie', 'zaakceptowana', 'odrzucona')
- data_aplikacji (DATE)`}</CodeBlock>
          </>
        )
      },
      {
        title: '📋 Co to jest SQL?',
        content: (
          <>
            <p>SQL (Structured Query Language) to język służący do komunikacji z bazami danych. Pozwala na:</p>
            <ul style={{ marginLeft: '1.5rem', color: '#8b949e' }}>
              <li>🔍 Wyszukiwanie danych (SELECT)</li>
              <li>➕ Dodawanie nowych rekordów (INSERT)</li>
              <li>✏️ Modyfikowanie istniejących danych (UPDATE)</li>
              <li>🗑️ Usuwanie danych (DELETE)</li>
            </ul>
            <HighlightBox>
              <strong>💡 Wskazówka:</strong> SQL nie rozróżnia wielkości liter, ale dobrą praktyką jest pisanie słów kluczowych WIELKIMI LITERAMI.
            </HighlightBox>
          </>
        )
      }
    ],
    task: {
      title: '🎯 Twoje pierwsze zadanie',
      content: 'Spróbuj wykonać poniższe zapytanie w terminalu SQL. To Twoje pierwsze kroki w świecie baz danych!'
    }
  },
  'select-basic': {
    title: '🔍 Podstawy SELECT',
    description: 'Naucz się pobierać dane z bazy używając instrukcji SELECT',
    sections: [
      {
        title: '🎯 Składnia SELECT',
        content: (
          <>
            <CodeBlock>{`-- Podstawowa składnia SELECT
SELECT kolumna1, kolumna2
FROM nazwa_tabeli;

-- Pobranie wszystkich kolumn
SELECT * 
FROM nazwa_tabeli;`}</CodeBlock>
            <p>Gwiazdka (*) oznacza "wszystkie kolumny". To szybki sposób na zobaczenie całej zawartości tabeli.</p>
          </>
        )
      },
      {
        title: '💼 Przykłady dla bazy rekrutacyjnej',
        content: (
          <>
            <CodeBlock>{`-- Pobierz wszystkich kandydatów
SELECT * FROM kandydaci;

-- Pobierz tylko imiona i nazwiska
SELECT imie, nazwisko FROM kandydaci;

-- Pobierz wszystkie stanowiska
SELECT nazwa_firmy, nazwa_stanowiska FROM stanowiska;`}</CodeBlock>
            <TaskBox>
              <strong>🎯 Zadanie praktyczne:</strong> Spróbuj pobrać tylko emaile wszystkich kandydatów. Wykonaj zapytanie w terminalu poniżej!
            </TaskBox>
          </>
        )
      }
    ]
  }
};

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const content = lessonData[lesson] || lessonData['podstawy'];

  return (
    <ContentContainer>
      <LessonTitle>{content.title}</LessonTitle>
      <LessonDescription>{content.description}</LessonDescription>
      
      {content.sections?.map((section: any, index: number) => (
        <Section key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          <SectionContent>{section.content}</SectionContent>
        </Section>
      ))}
      
      {content.task && (
        <TaskBox>
          <h3 style={{ color: '#d29922', marginBottom: '0.5rem' }}>{content.task.title}</h3>
          <p style={{ color: '#8b949e' }}>{content.task.content}</p>
        </TaskBox>
      )}
    </ContentContainer>
  );
};