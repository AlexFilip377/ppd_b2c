import { Feather, Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

export type ProfileListItem = {
  id: string;
  title: string;
  subtitle: string;
};

type ProfileScreenProps = {
  name: string;
  email: string;
  specialty: string;
  city: string;
  ageLabel: string;
  levelPercent: number;
  completedCases: ProfileListItem[];
  completedTests: ProfileListItem[];
  completedLectures: ProfileListItem[];
  onOpenAssistant: () => void;
  onLogout: () => void;
};

const levelSteps = ['Новичок', 'Любитель', 'Уверенный', 'Продвинутый', 'Эксперт'] as const;

function getActiveLevelIndex(percent: number): number {
  if (percent < 20) return 0;
  if (percent < 40) return 1;
  if (percent < 60) return 2;
  if (percent < 80) return 3;
  return 4;
}

function CompletedList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: ProfileListItem[];
  emptyText: string;
}) {
  return (
    <View style={styles.listBlock}>
      <Text style={styles.listTitle}>{title}</Text>
      {items.length > 0 ? (
        items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View style={styles.listItemText}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.listItemSub}>{item.subtitle}</Text>
            </View>
            <View style={styles.goCircle}>
              <Ionicons name="arrow-forward" size={16} color="#111" />
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>{emptyText}</Text>
      )}
    </View>
  );
}

export function ProfileScreen({
  name,
  email,
  specialty,
  city,
  ageLabel,
  levelPercent,
  completedCases,
  completedTests,
  completedLectures,
  onOpenAssistant,
  onLogout,
}: ProfileScreenProps) {
  const activeLevelIndex = useMemo(() => getActiveLevelIndex(levelPercent), [levelPercent]);
  const activeLevelName = levelSteps[activeLevelIndex];

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.pageHint}>Профиль</Text>

        <View style={ui.rowBetween}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={34} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.meta}>{email}</Text>
              <Text style={styles.meta}>{specialty}</Text>
              <Text style={styles.meta}>
                {city}
                {ageLabel ? `, ${ageLabel}` : ''}
              </Text>
            </View>
          </View>
          <Pressable style={styles.chatBtn} onPress={onOpenAssistant}>
            <Feather name="message-circle" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.levelRow}>
          <Text style={styles.levelName}>{activeLevelName}</Text>
          <Text style={styles.levelPercent}>{levelPercent}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, levelPercent))}%` }]} />
        </View>
        <View style={styles.levelScale}>
          {levelSteps.map((step, index) => (
            <Text key={step} style={[styles.levelStep, index === activeLevelIndex && styles.levelStepActive]}>
              {step}
            </Text>
          ))}
        </View>

        <Pressable style={styles.primaryBtn} onPress={() => {}}>
          <Text style={styles.primaryBtnText}>Повысить уровень</Text>
        </Pressable>

        <CompletedList
          title="Список выполненных кейсов"
          items={completedCases}
          emptyText="Пока нет выполненных кейсов"
        />
        <CompletedList
          title="Список пройденных тестов"
          items={completedTests}
          emptyText="Пока нет пройденных тестов"
        />
        <CompletedList
          title="Список пройденных лекций"
          items={completedLectures}
          emptyText="Пока нет пройденных лекций"
        />

        <Pressable style={styles.primaryBtn} onPress={() => {}}>
          <Text style={styles.primaryBtnText}>Отправить резюме</Text>
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 700,
    backgroundColor: '#171313',
    borderRadius: 34,
    padding: 16,
  },
  pageHint: {
    color: '#7f7f7f',
    fontSize: 13,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 17,
  },
  chatBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 6,
  },
  levelName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  levelPercent: {
    color: colors.muted,
    fontSize: 13,
  },
  progressBar: {
    height: 6,
    borderRadius: 100,
    backgroundColor: '#e8e8e8',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  levelScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 14,
    gap: 4,
  },
  levelStep: {
    color: colors.muted,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  levelStepActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listBlock: {
    marginBottom: 12,
  },
  listTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#111',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  listItemText: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  listItemTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#4a4a4a',
    marginVertical: 8,
  },
  listItemSub: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 19,
  },
  goCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 4,
  },
  logoutBtn: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff8a80',
    fontSize: 15,
  },
});
