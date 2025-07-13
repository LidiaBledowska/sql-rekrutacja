import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { SqlTerminal } from './components/SqlTerminal';
import { Navigation } from './components/Navigation';
import { LessonContent } from './components/LessonContent';
import { GlobalStyles, darkTheme } from './styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Header = styled.header`
  background: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-bottom: 2px solid ${props => props.theme.colors.accent};
`;

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 0 10px ${props => props.theme.colors.accent};
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  height: calc(100vh - 120px);
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TerminalArea = styled.div`
  flex: 1;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

function App() {
  const [activeLesson, setActiveLesson] = useState('podstawy');

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <Title>🚀 SQL Rekrutacja Academy</Title>
          <Subtitle>Naucz się SQL na przykładzie bazy rekrutacyjnej</Subtitle>
        </Header>
        
        <MainContent>
          <Navigation 
            activeLesson={activeLesson} 
            onLessonChange={setActiveLesson} 
          />
          
          <ContentArea>
            <LessonContent lesson={activeLesson} />
            <TerminalArea>
              <SqlTerminal />
            </TerminalArea>
          </ContentArea>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
