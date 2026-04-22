import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type TestQuestionScreenProps = {
  selected: number | null;
  onSelect: (n: number) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export function TestQuestionScreen({ selected, onSelect, onBack, onSubmit }: TestQuestionScreenProps) {
  const answers = [
    'Задача системных администраторов и ручных проверок.',
    'Автоматизация всех фаз жизненного цикла процессов в компании.',
    'Интеграция разработки и эксплуатации для ускорения поставки ПО.',
  ];

  return (
    <View style={ui.scrollPad}>
      <View style={styles.screen}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <View style={styles.track}>
          <View style={[styles.fill, { width: '20%' }]} />
        </View>
        <Text style={styles.progress}>1/5</Text>

        <Text style={styles.qText}>1. В чем заключается основная цель методологии DevOps?</Text>
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
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    fontSize: 22,
    lineHeight: 32,
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
    lineHeight: 20,
  },
  disabled: {
    opacity: 0.55,
    marginTop: 12,
  },
});
