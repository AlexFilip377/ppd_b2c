import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type TestsScreenProps = {
  onOpenTest: () => void;
  onOpenAssistant: () => void;
};

export function TestsScreen({ onOpenTest, onOpenAssistant }: TestsScreenProps) {
  const tests = [
    { title: 'Архитектура мобильных приложений', done: true },
    { title: 'Архитектура мобильных приложений', done: false },
    { title: 'Работа с API', done: false },
    { title: 'Работа с API', done: false },
    { title: 'Производительность приложения', done: true },
    { title: 'Публикация приложений', done: false },
  ];

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={ui.rowBetween}>
          <Text style={styles.title}>Тесты</Text>
          <Pressable onPress={onOpenAssistant}>
            <Text style={styles.chat}>💬</Text>
          </Pressable>
        </View>

        <View style={styles.testsWrap}>
          {tests.map((item, i) => (
            <Pressable key={`${item.title}-${i}`} style={styles.testRow} onPress={onOpenTest}>
              <View style={styles.rowLeft}>
                {item.done ? <Feather name="check" size={14} color="#2ade63" /> : <View style={styles.dot} />}
                <View>
                  <Text style={styles.testTitle}>{item.title}</Text>
                  <Text style={styles.testSub}>тест {i % 2 === 0 ? 1 : 2}</Text>
                </View>
              </View>
              <View style={styles.goCircle}>
                <Text style={styles.goArrow}>→</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chat: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    minHeight: 700,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 44,
    lineHeight: 46,
    marginBottom: 10,
    fontWeight: '700',
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 11,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#3b3b3b',
  },
  testTitle: {
    color: colors.text,
    fontSize: 16,
  },
  testSub: {
    color: colors.muted,
    fontSize: 13,
  },
  goCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goArrow: {
    color: '#111',
    fontWeight: '700',
  },
  testsWrap: {
    marginTop: 2,
  },
});
