import { Pressable, StyleSheet, Text, View } from 'react-native';
import { specialties } from '../data/onboardingQuestions';
import { SpecialtyId } from '../services/auth';
import { colors, ui } from '../theme';

type SpecialtyScreenProps = {
  selected: SpecialtyId | null;
  onSelect: (id: SpecialtyId) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export function SpecialtyScreen({ selected, onSelect, onSubmit, onBack }: SpecialtyScreenProps) {
  return (
    <View style={ui.scrollPad}>
      <View style={styles.screen}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </Pressable>

        <View style={styles.track}>
          <View style={[styles.fill, { width: '33%' }]} />
        </View>
        <Text style={styles.progressText}>1/3</Text>

        <Text style={styles.title}>Выберите свою специальность</Text>

        {specialties.map((item, index) => (
          <Pressable
            key={item.id}
            style={[styles.optionRow, index < specialties.length - 1 && styles.optionBorder]}
            onPress={() => onSelect(item.id)}
          >
            <View style={[styles.radio, selected === item.id && styles.radioSelected]} />
            <Text style={styles.optionText}>{item.label}</Text>
          </Pressable>
        ))}

        <Pressable style={[ui.button, styles.submitBtn, selected === null && styles.disabled]} onPress={onSubmit} disabled={selected === null}>
          <Text style={ui.buttonText}>Подтвердить</Text>
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
    marginBottom: 20,
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#4a4a4a',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1.3,
    borderColor: '#fff',
  },
  radioSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  submitBtn: {
    marginTop: 'auto',
  },
  disabled: {
    opacity: 0.55,
  },
});
