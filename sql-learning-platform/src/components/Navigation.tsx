import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  width: 280px;
  background: ${props => props.theme.colors.secondary};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1rem;
  overflow-y: auto;
`;

const NavigationTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const LessonGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const GroupTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const LessonItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  background: ${props => props.isActive ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.isActive ? props.theme.colors.background : props.theme.colors.textSecondary};
  border: none;
  padding: 0.75rem 1rem;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.isActive ? props.theme.colors.accent : props.theme.colors.hover};
    color: ${props => props.theme.colors.text};
  }

  &:before {
    content: '${props => props.isActive ? '📖' : '📄'}';
    margin-right: 0.5rem;
  }
`;

const MotivationalBox = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}20, ${props => props.theme.colors.success}20);
  border: 1px solid ${props => props.theme.colors.accent}40;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
`;

const MotivationalText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  background: ${props => props.theme.colors.border};
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.success});
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

interface NavigationProps {
  activeLesson: string;
  onLessonChange: (lesson: string) => void;
}

const lessons = [
  {
    group: '🎯 Podstawy SQL',
    items: [
      { id: 'podstawy', title: 'Wprowadzenie do SQL' },
      { id: 'select-basic', title: 'Podstawy SELECT' },
      { id: 'where', title: 'Filtrowanie danych WHERE' },
      { id: 'order-limit', title: 'Sortowanie i ograniczenia' }
    ]
  },
  {
    group: '🔗 Łączenie tabel',
    items: [
      { id: 'joins-intro', title: 'Wprowadzenie do JOIN' },
      { id: 'inner-join', title: 'INNER JOIN' },
      { id: 'left-join', title: 'LEFT JOIN' },
      { id: 'multiple-joins', title: 'Wiele połączeń' }
    ]
  },
  {
    group: '📊 Funkcje agregujące',
    items: [
      { id: 'count-sum', title: 'COUNT i SUM' },
      { id: 'group-by', title: 'GROUP BY' },
      { id: 'having', title: 'HAVING' },
      { id: 'subqueries', title: 'Podzapytania' }
    ]
  },
  {
    group: '🚀 Zaawansowane',
    items: [
      { id: 'window-functions', title: 'Funkcje okna' },
      { id: 'case-when', title: 'CASE WHEN' },
      { id: 'crud', title: 'INSERT, UPDATE, DELETE' },
      { id: 'performance', title: 'Optymalizacja zapytań' }
    ]
  }
];

export const Navigation: React.FC<NavigationProps> = ({ activeLesson, onLessonChange }) => {
  const totalLessons = lessons.reduce((acc, group) => acc + group.items.length, 0);
  const completedLessons = 3; // Można to później przenieść do stanu
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <NavigationContainer>
      <NavigationTitle>📚 Plan nauki SQL</NavigationTitle>
      
      {lessons.map((group) => (
        <LessonGroup key={group.group}>
          <GroupTitle>{group.group}</GroupTitle>
          {group.items.map((lesson) => (
            <LessonItem
              key={lesson.id}
              isActive={activeLesson === lesson.id}
              onClick={() => onLessonChange(lesson.id)}
            >
              {lesson.title}
            </LessonItem>
          ))}
        </LessonGroup>
      ))}
      
      <MotivationalBox>
        <MotivationalText>
          💪 Twój postęp: {completedLessons}/{totalLessons}
        </MotivationalText>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <MotivationalText style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          🎯 Każde zapytanie to krok bliżej celu!
        </MotivationalText>
      </MotivationalBox>
    </NavigationContainer>
  );
};