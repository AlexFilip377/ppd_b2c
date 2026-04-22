import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type CasesScreenProps = {
  onOpenCase: (title: string) => void;
  onOpenAssistant: () => void;
};

export function CasesScreen({ onOpenCase, onOpenAssistant }: CasesScreenProps) {
  const cases = [
    'Каталог товаров',
    'Оффлайн режим',
    'Библиотека компонентов',
    'Развертывание сервиса',
    'Мониторинг системы',
  ];

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={ui.rowBetween}>
          <Text style={ui.pageTitle}>Кейсы и задания</Text>
          <Pressable onPress={onOpenAssistant}>
            <Text style={styles.chat}>💬</Text>
          </Pressable>
        </View>
        {cases.map((item, idx) => (
          <Pressable key={item} style={styles.row} onPress={() => onOpenCase(item)}>
            <View style={styles.caseInfo}>
              <Text style={styles.caseTitle}>{item}</Text>
              <Text style={styles.caseSub}>{idx % 2 === 0 ? 'Создать рабочий модуль.' : 'Реализовать сценарий задачи.'}</Text>
            </View>
            <View style={styles.goCircle}>
              <Text style={styles.goArrow}>→</Text>
            </View>
          </Pressable>
        ))}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  caseInfo: {
    flex: 1,
    marginRight: 8,
  },
  caseTitle: {
    color: colors.text,
    marginBottom: 2,
    fontSize: 15,
  },
  caseSub: {
    color: colors.muted,
    fontSize: 12,
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
