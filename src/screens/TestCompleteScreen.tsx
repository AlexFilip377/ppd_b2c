import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type TestCompleteScreenProps = {
  onBackToTests: () => void;
};

export function TestCompleteScreen({ onBackToTests }: TestCompleteScreenProps) {
  return (
    <View style={ui.scrollPad}>
      <View style={styles.screen}>
        <Text style={styles.title}>Вы завершили тест!</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: '73%' }]} />
        </View>
        <Text style={styles.progress}>73%</Text>
        <Text style={styles.text}>
          Если у вас остались вопросы по пройденной теме, вы можете обратиться к ИИ-боту, который уже
          проанализировал ваш ответ и готов к обсуждению.
        </Text>
        <Image source={require('../../assets/images/robot_good.png')} resizeMode="contain" style={styles.robot} />
        <Pressable style={ui.button} onPress={onBackToTests}>
          <Text style={ui.buttonText}>Вернуться к тестам</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 22,
  },
  track: {
    height: 6,
    borderRadius: 100,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
    marginHorizontal: 40,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progress: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  text: {
    color: '#d0d0d0',
    lineHeight: 20,
    marginBottom: 10,
  },
  robot: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
