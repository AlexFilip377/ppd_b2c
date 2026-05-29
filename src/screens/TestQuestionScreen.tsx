import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type TestQuestionScreenProps = {
  testTitle: string;
  testSubtitle: string;
  currentStep: number;
  totalSteps: number;
  question: string;
  answers: string[];
  selected: number | null;
  onSelect: (n: number) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export function TestQuestionScreen({
  testTitle,
  testSubtitle,
  currentStep,
  totalSteps,
  question,
  answers,
  selected,
  onSelect,
  onBack,
  onSubmit,
}: TestQuestionScreenProps) {
  const progressWidth = `${Math.round((currentStep / totalSteps) * 100)}%` as const;
  return (
    <View style={styles.page}>
      <Text style={styles.pageHint}>{testSubtitle ? `${testTitle}, ${testSubtitle}` : testTitle}</Text>
      <View style={ui.scrollPad}>
      <View style={styles.screen}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <View style={styles.track}>
          <View style={[styles.fill, { width: progressWidth }]} />
        </View>
        <Text style={styles.progress}>
          {currentStep}/{totalSteps}
        </Text>

        <Text style={styles.qText}>
          {currentStep}. {question}
        </Text>
        {answers.map((answer, idx) => (
          <Pressable key={answer} style={styles.answerRow} onPress={() => onSelect(idx)}>
            <View style={[styles.radio, selected === idx && styles.radioSelected]} />
            <Text style={styles.answerText}>{answer}</Text>
          </Pressable>
        ))}

        <Pressable style={[ui.button, selected === null && styles.disabled]} onPress={onSubmit} disabled={selected === null}>
          <Text style={ui.buttonText}>Ответить</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  pageHint: {
    color: '#8c8c8c',
    fontSize: 13,
    marginLeft: 6,
    marginBottom: 6,
  },
  screen: {
    flex: 1,
    backgroundColor: '#171313',
    borderRadius: 34,
    padding: 12,
  },
  back: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
    marginBottom: 8,
  },
  track: {
    height: 6,
    borderRadius: 100,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progress: {
    color: colors.muted,
    textAlign: 'center',
    marginVertical: 10,
  },
  qText: {
    color: '#d2d2d2',
    fontSize: 30,
    lineHeight: 36,
    marginVertical: 20,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1.3,
    borderColor: '#fff',
    marginTop: 3,
  },
  radioSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  answerText: {
    flex: 1,
    color: '#d0d0d0',
    lineHeight: 18,
    fontSize: 12,
  },
  disabled: {
    opacity: 0.55,
    marginTop: 12,
  },
});
