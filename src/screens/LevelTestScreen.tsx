import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OnboardingQuestion } from '../data/onboardingQuestions';
import { colors, ui } from '../theme';

type LevelTestScreenProps = {
  question: OnboardingQuestion;
  questionNumber: number;
  selected: number | null;
  onSelect: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export function LevelTestScreen({
  question,
  questionNumber,
  selected,
  onSelect,
  onSubmit,
  onBack,
}: LevelTestScreenProps) {
  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <View style={styles.track}>
          <View style={[styles.fill, { width: '66%' }]} />
        </View>
        <Text style={styles.progressText}>2/3</Text>
        <Text style={styles.title}>Тест для определения уровня</Text>
        <Text style={styles.question}>
          {questionNumber}. {question.text}
        </Text>
        {question.options.map((answer, index) => (
          <Pressable key={`${questionNumber}-${index}`} style={styles.answerRow} onPress={() => onSelect(index)}>
            <View style={[styles.radio, selected === index && styles.radioSelected]} />
            <Text style={styles.answerText}>{answer}</Text>
          </Pressable>
        ))}
        <Pressable
          style={[ui.button, styles.submitBtn, selected === null && styles.disabled]}
          onPress={onSubmit}
          disabled={selected === null}
        >
          <Text style={ui.buttonText}>Ответить</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 600,
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
    backgroundColor: colors.accent,
    height: '100%',
  },
  progressText: {
    color: colors.muted,
    textAlign: 'center',
    marginVertical: 8,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    marginBottom: 12,
  },
  question: {
    color: '#d2d2d2',
    fontSize: 19,
    lineHeight: 30,
    marginBottom: 8,
  },
  answerRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    alignItems: 'flex-start',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1.3,
    borderColor: '#fff',
    marginTop: 4,
  },
  radioSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  answerText: {
    flex: 1,
    color: '#d0d0d0',
    fontSize: 14,
    lineHeight: 20,
  },
  submitBtn: {
    marginTop: 22,
  },
  disabled: {
    opacity: 0.55,
  },
});
