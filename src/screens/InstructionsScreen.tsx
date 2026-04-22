import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type InstructionsScreenProps = {
  onContinue: () => void;
  onBack: () => void;
  onOpenAssistant: () => void;
};

export function InstructionsScreen({ onContinue, onBack, onOpenAssistant }: InstructionsScreenProps) {
  return (
    <View style={ui.scrollPad}>
      <View style={styles.screen}>
        <View style={ui.rowBetween}>
          <Pressable onPress={onBack}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
          <Pressable onPress={onOpenAssistant}>
            <Text style={styles.chat}>💬</Text>
          </Pressable>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: '100%' }]} />
        </View>
        <Text style={styles.progressText}>3/3</Text>

        <Text style={styles.title}>Вы готовы начать!</Text>
        <Text style={styles.text}>Мы подобрали персональный план обучения на основе ваших ответов.</Text>
        <Text style={styles.text}>Изучайте лекции, видео и задания, после обучения отправьте резюме.</Text>
        <Image source={require('../../assets/images/robot_happy.png')} style={styles.robot} resizeMode="contain" />
        <Pressable style={ui.button} onPress={onContinue}>
          <Text style={ui.buttonText}>Начать</Text>
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
  },
  chat: {
    color: '#fff',
    fontSize: 18,
  },
  track: {
    height: 6,
    borderRadius: 100,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
    marginTop: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    color: colors.muted,
    textAlign: 'center',
    marginVertical: 8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    marginBottom: 12,
  },
  text: {
    color: '#d0d0d0',
    lineHeight: 22,
    marginBottom: 8,
  },
  robot: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginVertical: 6,
  },
});
