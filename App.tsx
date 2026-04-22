import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from './src/components/BottomNav';
import { AuthScreen } from './src/screens/AuthScreen';
import { AssistantScreen } from './src/screens/AssistantScreen';
import { CaseDetailScreen } from './src/screens/CaseDetailScreen';
import { CasesScreen } from './src/screens/CasesScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InstructionsScreen } from './src/screens/InstructionsScreen';
import { LevelTestScreen } from './src/screens/LevelTestScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TestCompleteScreen } from './src/screens/TestCompleteScreen';
import { TestQuestionScreen } from './src/screens/TestQuestionScreen';
import { TestsScreen } from './src/screens/TestsScreen';
import { ui } from './src/theme';
import { MainTab, ScreenName } from './src/types';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('auth');
  const [previousScreen, setPreviousScreen] = useState<ScreenName>('home');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [levelAnswer, setLevelAnswer] = useState<number | null>(null);
  const [testAnswer, setTestAnswer] = useState<number | null>(null);
  const [currentCase, setCurrentCase] = useState<string>('Кейс');
  const [pickerVisible, setPickerVisible] = useState(false);

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

  const activeTab: MainTab | null =
    screen === 'home' || screen === 'tests' || screen === 'cases' || screen === 'profile' ? screen : null;

  return (
    <SafeAreaView style={ui.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      {screen === 'auth' && <AuthScreen mode={authMode} onModeChange={setAuthMode} onContinue={() => setScreen('levelTest')} />}

      {screen === 'levelTest' && (
        <LevelTestScreen
          selected={levelAnswer}
          onSelect={setLevelAnswer}
          onSubmit={() => setScreen('instructions')}
          onBack={() => setScreen('auth')}
        />
      )}

      {screen === 'instructions' && (
        <InstructionsScreen
          onContinue={() => setScreen('home')}
          onBack={() => setScreen('levelTest')}
          onOpenAssistant={openAssistant}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onOpenAssistant={openAssistant}
          onOpenTests={() => setScreen('tests')}
          onOpenCourse={() => setScreen('cases')}
        />
      )}

      {screen === 'tests' && <TestsScreen onOpenTest={() => setScreen('testQuestion')} onOpenAssistant={openAssistant} />}

      {screen === 'testQuestion' && (
        <TestQuestionScreen
          selected={testAnswer}
          onSelect={setTestAnswer}
          onBack={() => setScreen('tests')}
          onSubmit={() => setScreen('testComplete')}
        />
      )}

      {screen === 'testComplete' && <TestCompleteScreen onBackToTests={() => setScreen('tests')} />}

      {screen === 'cases' && (
        <CasesScreen
          onOpenAssistant={openAssistant}
          onOpenCase={(title) => {
            setCurrentCase(title);
            setScreen('caseDetail');
          }}
        />
      )}

      {screen === 'caseDetail' && (
        <CaseDetailScreen
          caseTitle={currentCase}
          pickerVisible={pickerVisible}
          onOpenPicker={() => setPickerVisible(true)}
          onClosePicker={() => setPickerVisible(false)}
          onBack={() => setScreen('cases')}
          onOpenAssistant={openAssistant}
        />
      )}

      {screen === 'profile' && <ProfileScreen onOpenAssistant={openAssistant} />}

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
  fixedNav: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
});
