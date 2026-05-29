import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from './src/components/BottomNav';
import { casesList } from './src/data/cases';
import { getCourseProfileSubtitle } from './src/data/courses';
import { getQuestionsForSpecialty } from './src/data/onboardingQuestions';
import {
  completeOnboarding,
  login,
  logout,
  register,
  saveTestAnswer,
  setSpecialty,
  specialtyLabels,
  SpecialtyId,
  subscribeAuthState,
  updateUser,
  User,
} from './src/services/auth';
import { AuthFormData, AuthScreen } from './src/screens/AuthScreen';
import { AssistantScreen } from './src/screens/AssistantScreen';
import { CaseDetailScreen } from './src/screens/CaseDetailScreen';
import { CasesScreen } from './src/screens/CasesScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InstructionsScreen } from './src/screens/InstructionsScreen';
import { LevelTestScreen } from './src/screens/LevelTestScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SpecialtyScreen } from './src/screens/SpecialtyScreen';
import { TestCompleteScreen } from './src/screens/TestCompleteScreen';
import { TestQuestionScreen } from './src/screens/TestQuestionScreen';
import { TestsScreen } from './src/screens/TestsScreen';
import { TopicDetailScreen } from './src/screens/TopicDetailScreen';
import { ui } from './src/theme';
import { MainTab, ScreenName } from './src/types';

function formatAgeLabel(birthDate: string | null): string {
  if (!birthDate) return '';
  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return '';
  const now = new Date();
  let age = now.getFullYear() - parsed.getFullYear();
  const monthDiff = now.getMonth() - parsed.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < parsed.getDate())) {
    age -= 1;
  }
  if (age < 0) return '';
  return `${age} лет`;
}

function getOnboardingScreen(user: User): ScreenName {
  if (user.onboardingCompleted) return 'home';
  if (!user.specialty) return 'specialty';
  const questions = getQuestionsForSpecialty(user.specialty);
  if (user.testAnswers.length < questions.length) return 'levelTest';
  return 'instructions';
}

export default function App() {
  const testsCatalog = useMemo(
    () => [
      { id: 'mobile-1', title: 'Архитектура мобильных приложений', subtitle: 'тест 1' },
      { id: 'mobile-2', title: 'Архитектура мобильных приложений', subtitle: 'тест 2' },
      { id: 'api-1', title: 'Работа с API', subtitle: 'тест 1' },
      { id: 'api-2', title: 'Работа с API', subtitle: 'тест 2' },
      { id: 'perf-1', title: 'Производительность приложения', subtitle: 'тест 1' },
      { id: 'perf-2', title: 'Производительность приложения', subtitle: 'тест 2' },
      { id: 'publish-1', title: 'Публикация приложения', subtitle: 'тест 1' },
      { id: 'publish-2', title: 'Публикация приложения', subtitle: 'тест 2' },
    ],
    []
  );
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<ScreenName>('auth');
  const [previousScreen, setPreviousScreen] = useState<ScreenName>('home');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId | null>(null);
  const [levelAnswer, setLevelAnswer] = useState<number | null>(null);
  const [testAnswer, setTestAnswer] = useState<number | null>(null);
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [testStep, setTestStep] = useState(0);
  const [testSelections, setTestSelections] = useState<number[]>([]);
  const [testResultPercent, setTestResultPercent] = useState(0);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [currentCase, setCurrentCase] = useState<string>('Кейс');
  const [detailKind, setDetailKind] = useState<'course' | 'case'>('course');
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  useEffect(() => {
    let isFirstAuthEvent = true;
    const unsubscribe = subscribeAuthState((current) => {
      if (current) {
        setUser(current);
        setSelectedSpecialty(current.specialty);
        setScreen((prev) => {
          if (isFirstAuthEvent || prev === 'auth') return getOnboardingScreen(current);
          return prev;
        });
      } else {
        setUser(null);
        setScreen('auth');
      }
      isFirstAuthEvent = false;
      setBooting(false);
    });
    return unsubscribe;
  }, []);

  const questions = useMemo(() => {
    const specialty = user?.specialty ?? selectedSpecialty;
    if (!specialty) return [];
    return getQuestionsForSpecialty(specialty);
  }, [user?.specialty, selectedSpecialty]);

  const currentQuestionIndex = user?.testAnswers.length ?? 0;
  const currentQuestion = questions[currentQuestionIndex];
  const activeTest = useMemo(() => testsCatalog.find((test) => test.id === activeTestId) ?? null, [activeTestId, testsCatalog]);
  const testQuestions = useMemo(
    () => [
      {
        question: 'В чем заключается основная цель методологии DevOps?',
        options: [
          'Замена системных администраторов программистами, которые умеют настраивать серверы.',
          'Автоматизация всех без исключения ручных процессов в компании.',
          'Налаживание взаимодействия между разработкой и эксплуатацией для ускорения поставки ПО.',
        ],
        correctIndex: 2,
      },
      {
        question: "Что означает принцип 'Idempotency' в управлении конфигурациями (например, в Ansible или Terraform)?",
        options: [
          'Автоматическое удаление старых конфигураций перед созданием новых.',
          'Свойство системы приходить в одно и то же состояние независимо от количества повторных запусков.',
          'Возможность выполнения скрипта только один раз для предотвращения ошибок.',
        ],
        correctIndex: 1,
      },
      {
        question: 'Какая практика CI/CD отвечает за автоматическую проверку того, что новый код не нарушил существующую функциональность продукта?',
        options: ['Continuous Delivery', 'Continuous Integration', 'Continuous Deployment'],
        correctIndex: 1,
      },
      {
        question: 'В чем главное отличие контейнеризации (Docker) от виртуализации (VMware/KVM)?',
        options: [
          'Контейнеры предназначены только для хранения баз данных, а VM - для приложений.',
          'Контейнеры используют общее ядро хостовой ОС, а виртуальные машины запускают собственную ОС.',
          'Виртуальные машины всегда работают быстрее контейнеров из-за прямой работы с железом.',
        ],
        correctIndex: 1,
      },
      {
        question: "Что такое 'Blue-Green Deployment'?",
        options: [
          'Метод мониторинга, где синим цветом помечаются рабочие, а зеленым - новые.',
          'Стратегия, при которой трафик постепенно переключается на новую версию (Canary).',
          'Создание двух идентичных сред, одна из которых живая, а на другую выкатывается обновление.',
        ],
        correctIndex: 2,
      },
    ],
    []
  );
  const activeTestQuestion = testQuestions[testStep] ?? testQuestions[0];

  const profileCompletedCases = useMemo(
    () =>
      casesList
        .filter((item) => completedCases.includes(item.title))
        .map((item) => ({ id: item.id, title: item.title, subtitle: item.description })),
    [completedCases]
  );

  const profileCompletedTests = useMemo(
    () =>
      testsCatalog
        .filter((item) => completedTests.includes(item.id))
        .map((item) => ({ id: item.id, title: item.title, subtitle: `Пройден ${item.subtitle}` })),
    [completedTests, testsCatalog]
  );

  const profileCompletedLectures = useMemo(
    () =>
      completedCourses.map((title) => ({
        id: title,
        title,
        subtitle: getCourseProfileSubtitle(title),
      })),
    [completedCourses]
  );

  const goTab = (tab: MainTab) => {
    if (tab === 'home') setScreen('home');
    if (tab === 'tests') setScreen('tests');
    if (tab === 'cases') setScreen('cases');
    if (tab === 'profile') setScreen('profile');
  };

  const openAssistant = () => {
    setPreviousScreen(screen);
    setScreen('assistant');
  };

  const goBackFromAssistant = () => {
    setScreen(previousScreen);
  };

  const handleAuthSubmit = async (data: AuthFormData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === 'register') {
        const result = await register({
          name: data.name,
          city: data.city,
          birthDate: data.birthDate,
          email: data.email,
          password: data.password,
        });
        if ('error' in result) {
          setAuthError(result.error);
          return;
        }
        setUser(result.user);
        setSelectedSpecialty(null);
        setLevelAnswer(null);
        setScreen('specialty');
      } else {
        const result = await login(data.email, data.password);
        if ('error' in result) {
          setAuthError(result.error);
          return;
        }
        setUser(result.user);
        setSelectedSpecialty(result.user.specialty);
        setScreen(getOnboardingScreen(result.user));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSpecialtySubmit = async () => {
    if (!user || !selectedSpecialty) return;
    const updated = await setSpecialty(user.id, selectedSpecialty);
    if (updated) {
      setUser(updated);
      setLevelAnswer(null);
      setScreen('levelTest');
    }
  };

  const handleLevelTestSubmit = async () => {
    if (!user || levelAnswer === null || !currentQuestion) return;
    const updated = await saveTestAnswer(user.id, currentQuestionIndex, levelAnswer, questions);
    if (!updated) return;

    setUser(updated);
    setLevelAnswer(null);

    if (updated.testAnswers.length >= questions.length) {
      setScreen('instructions');
    }
  };

  const handleInstructionsComplete = async () => {
    if (!user) return;
    const updated = await completeOnboarding(user.id);
    if (updated) {
      setUser(updated);
      setScreen('home');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setSelectedSpecialty(null);
    setLevelAnswer(null);
    setAuthError(null);
    setScreen('auth');
  };

  const activeTab: MainTab | null =
    screen === 'home' || screen === 'tests' || screen === 'cases' || screen === 'profile' ? screen : null;

  if (booting) {
    return (
      <SafeAreaView style={[ui.safeArea, styles.boot]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#c96f2b" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ui.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      {screen === 'auth' && (
        <AuthScreen
          mode={authMode}
          onModeChange={(mode) => {
            setAuthMode(mode);
            setAuthError(null);
          }}
          onSubmit={handleAuthSubmit}
          loading={authLoading}
          error={authError}
        />
      )}

      {screen === 'specialty' && (
        <SpecialtyScreen
          selected={selectedSpecialty}
          onSelect={setSelectedSpecialty}
          onSubmit={handleSpecialtySubmit}
          onBack={() => {
            logout().then(() => {
              setUser(null);
              setScreen('auth');
            });
          }}
        />
      )}

      {screen === 'levelTest' && currentQuestion && (
        <LevelTestScreen
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selected={levelAnswer}
          onSelect={setLevelAnswer}
          onSubmit={handleLevelTestSubmit}
          onBack={async () => {
            if (currentQuestionIndex === 0) {
              setScreen('specialty');
              return;
            }
            if (!user) return;
            const updated = await updateUser(user.id, {
              testAnswers: user.testAnswers.slice(0, -1),
            });
            if (updated) {
              setUser(updated);
              setLevelAnswer(null);
            }
          }}
        />
      )}

      {screen === 'instructions' && (
        <InstructionsScreen
          onContinue={handleInstructionsComplete}
          onBack={() => setScreen('levelTest')}
          onOpenAssistant={openAssistant}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onOpenAssistant={openAssistant}
          onOpenTests={() => setScreen('tests')}
          onOpenCourse={(title) => {
            setDetailKind('course');
            setCurrentCase(title);
            setScreen('caseDetail');
          }}
          completedCourses={completedCourses}
        />
      )}

      {screen === 'tests' && (
        <TestsScreen
          tests={testsCatalog}
          completedTests={completedTests}
          onOpenTest={(testId) => {
            setActiveTestId(testId);
            setTestStep(0);
            setTestSelections([]);
            setTestAnswer(null);
            setScreen('testQuestion');
          }}
          onOpenAssistant={openAssistant}
        />
      )}

      {screen === 'testQuestion' && (
        <TestQuestionScreen
          testTitle={activeTest?.title ?? 'Тест'}
          testSubtitle={activeTest?.subtitle ?? ''}
          currentStep={testStep + 1}
          totalSteps={testQuestions.length}
          question={activeTestQuestion.question}
          answers={activeTestQuestion.options}
          selected={testAnswer}
          onSelect={setTestAnswer}
          onBack={() => {
            setScreen('tests');
            setTestAnswer(null);
          }}
          onSubmit={() => {
            if (testAnswer === null) return;
            const nextSelections = [...testSelections];
            nextSelections[testStep] = testAnswer;
            setTestSelections(nextSelections);
            setTestAnswer(null);

            const nextStep = testStep + 1;
            if (nextStep < testQuestions.length) {
              setTestStep(nextStep);
              return;
            }

            const correctAnswers = nextSelections.reduce(
              (acc, answer, index) => acc + (answer === testQuestions[index].correctIndex ? 1 : 0),
              0
            );
            const percent = Math.round((correctAnswers / testQuestions.length) * 100);
            setTestResultPercent(percent);
            if (activeTestId) {
              setCompletedTests((prev) => (prev.includes(activeTestId) ? prev : [...prev, activeTestId]));
            }
            setScreen('testComplete');
          }}
        />
      )}

      {screen === 'testComplete' && <TestCompleteScreen percent={testResultPercent} onBackToTests={() => setScreen('tests')} />}

      {screen === 'cases' && (
        <CasesScreen
          completedCases={completedCases}
          onOpenAssistant={openAssistant}
          onOpenCase={(title) => {
            setDetailKind('case');
            setCurrentCase(title);
            setScreen('caseDetail');
          }}
        />
      )}

      {screen === 'caseDetail' && detailKind === 'course' && (
        <TopicDetailScreen
          topicTitle={currentCase}
          isCompleted={completedCourses.includes(currentCase)}
          onToggleCompleted={() =>
            setCompletedCourses((prev) =>
              prev.includes(currentCase) ? prev.filter((title) => title !== currentCase) : [...prev, currentCase]
            )
          }
          onBack={() => setScreen('home')}
          onOpenAssistant={openAssistant}
        />
      )}

      {screen === 'caseDetail' && detailKind === 'case' && (
        <CaseDetailScreen
          caseTitle={currentCase}
          onBack={() => setScreen('cases')}
          onCaseSubmitted={() =>
            setCompletedCases((prev) => (prev.includes(currentCase) ? prev : [...prev, currentCase]))
          }
        />
      )}

      {screen === 'profile' && user && (
        <ProfileScreen
          name={user.name}
          email={user.email}
          specialty={user.specialty ? specialtyLabels[user.specialty] : '—'}
          city={user.city || '—'}
          ageLabel={formatAgeLabel(user.birthDate)}
          levelPercent={user.levelPercent}
          completedCases={profileCompletedCases}
          completedTests={profileCompletedTests}
          completedLectures={profileCompletedLectures}
          onOpenAssistant={openAssistant}
          onLogout={handleLogout}
        />
      )}

      {screen === 'assistant' && <AssistantScreen onBack={goBackFromAssistant} />}

      {activeTab && (
        <View style={styles.fixedNav}>
          <BottomNav activeTab={activeTab} onSelect={goTab} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedNav: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
});
