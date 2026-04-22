import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type ProfileScreenProps = {
  onOpenAssistant: () => void;
};

export function ProfileScreen({ onOpenAssistant }: ProfileScreenProps) {
  const doneCases = ['Оффлайн режим', 'Библиотека компонентов', 'Развертывание сервиса', 'Оптимизация алгоритма'];

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={ui.rowBetween}>
          <Text style={ui.pageTitle}>Профиль</Text>
          <Pressable onPress={onOpenAssistant}>
            <Text style={styles.chat}>💬</Text>
          </Pressable>
        </View>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={34} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>Филипенко Александр</Text>
            <Text style={styles.meta}>ax@example.com</Text>
            <Text style={styles.meta}>Разработчик</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '46%' }]} />
        </View>
        <Text style={styles.levelText}>Уровень 46%</Text>

        <Pressable style={[ui.button, { marginBottom: 14 }]} onPress={() => {}}>
          <Text style={ui.buttonText}>Повысить уровень</Text>
        </Pressable>

        <Text style={styles.listTitle}>Список выполненных кейсов</Text>
        {doneCases.map((item) => (
          <Pressable key={item} style={styles.caseItem} onPress={() => {}}>
            <View>
              <Text style={styles.caseTitle}>{item}</Text>
              <Text style={styles.caseSub}>Реализован рабочий сценарий</Text>
            </View>
            <View style={styles.goCircle}>
              <Text style={styles.goArrow}>→</Text>
            </View>
          </Pressable>
        ))}

        <Pressable style={ui.button} onPress={() => {}}>
          <Text style={ui.buttonText}>Отправить резюме</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  chat: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 999,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 100,
    backgroundColor: '#dedede',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  levelText: {
    color: colors.muted,
    textAlign: 'right',
    marginVertical: 6,
  },
  listTitle: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  caseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
  },
  caseTitle: {
    color: colors.text,
  },
  caseSub: {
    color: colors.muted,
    fontSize: 11,
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
});
