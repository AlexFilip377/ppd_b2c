import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type HomeScreenProps = {
  onOpenAssistant: () => void;
  onOpenTests: () => void;
  onOpenCourse: (title: string) => void;
  completedCourses: string[];
};

type CourseItem = {
  title: string;
  stats: string[];
};

type CourseTab = {
  id: 'mobile' | 'design' | 'infra' | 'thinking' | 'communication';
  label: string;
  courses: CourseItem[];
};

const courseTabs: CourseTab[] = [
  {
    id: 'mobile',
    label: 'Мобильная разработка',
    courses: [
      {
        title: 'Архитектура мобильных приложений',
        stats: ['2 лекции', '1 видео', '2 презентации'],
      },
      {
        title: 'Работа с API',
        stats: ['2 лекции', '2 видео', '1 презентация'],
      },
      {
        title: 'Производительность приложения',
        stats: ['2 лекции', '0 видео', '1 презентация'],
      },
      {
        title: 'Публикация приложений',
        stats: [],
      },
    ],
  },
  {
    id: 'design',
    label: 'Дизайн-системы',
    courses: [
      {
        title: 'Основы дизайн-систем',
        stats: ['2 лекции', '1 видео', '2 презентации'],
      },
      {
        title: 'UI-компоненты',
        stats: ['2 лекции', '2 видео', '1 презентация'],
      },
      {
        title: 'Типографика и цвета',
        stats: ['2 лекции', '1 видео', '1 презентация'],
      },
    ],
  },
  {
    id: 'infra',
    label: 'Инфраструктура',
    courses: [
      {
        title: 'Основы серверной инфраструктуры',
        stats: ['2 лекции', '1 видео', '2 презентации'],
      },
      {
        title: 'Облачные технологии',
        stats: ['2 лекции', '2 видео', '1 презентация'],
      },
      {
        title: 'Контейнеризация',
        stats: ['2 лекции', '0 видео', '1 презентация'],
      },
    ],
  },
  {
    id: 'thinking',
    label: 'Техническое мышление',
    courses: [
      {
        title: 'Разбор задач',
        stats: ['2 лекции', '1 видео', '2 презентации'],
      },
      {
        title: 'Логика и алгоритмы',
        stats: ['2 лекции', '2 видео', '1 презентация'],
      },
      {
        title: 'Анализ систем',
        stats: ['2 лекции', '0 видео', '1 презентация'],
      },
    ],
  },
  {
    id: 'communication',
    label: 'Коммуникация',
    courses: [
      {
        title: 'Работа в команде',
        stats: ['2 лекции', '2 видео', '2 презентации'],
      },
      {
        title: 'Обсуждение идей',
        stats: ['2 лекции', '2 видео', '1 презентация'],
      },
      {
        title: 'Рабочие встречи',
        stats: ['2 лекции', '0 видео', '1 презентация'],
      },
    ],
  },
];

export function HomeScreen({ onOpenAssistant, onOpenTests, onOpenCourse, completedCourses }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<CourseTab['id']>('mobile');
  const activeCourses = useMemo(
    () => courseTabs.find((tab) => tab.id === activeTab)?.courses ?? [],
    [activeTab]
  );

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Главная</Text>

      <View style={styles.hero}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroTitle}>Мои курсы</Text>
          <Pressable style={styles.chatBtn} onPress={onOpenAssistant}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.heroBody}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroSub}>Предметов: 5</Text>
            <Text style={styles.heroSub}>Завершено: 2</Text>
            <Text style={styles.heroMeta}>• Дизайн-системы</Text>
            <Text style={styles.heroMeta}>• Коммуникация</Text>
          </View>
          <Image source={require('../../assets/images/robot_book.png')} style={styles.heroRobot} resizeMode="contain" />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.segmentWrap}
        style={styles.segmentScroll}
      >
        {courseTabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[styles.segmentItem, activeTab === tab.id && styles.segmentActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.segmentText, activeTab === tab.id && styles.segmentTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.coursesWrap}>
        {activeCourses.map((course) => (
          <Pressable key={course.title} style={styles.courseItem} onPress={() => onOpenCourse(course.title)}>
            <View style={styles.courseTop}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              {completedCourses.includes(course.title) ? <Ionicons name="checkmark" size={20} color="#67f96a" /> : null}
            </View>
            <View style={styles.divider} />
            <View style={styles.courseBottom}>
              <View style={styles.metaWrap}>
                {course.stats.map((item) => (
                  <Text key={item} style={styles.courseMeta}>
                    • {item}
                  </Text>
                ))}
              </View>
              <View style={styles.goCircle}>
                <Ionicons name="arrow-forward" size={18} color="#111" />
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.emptyPill} onPress={() => onOpenCourse(activeCourses[0]?.title ?? 'Тема')}>
        <Text style={styles.emptyPillText}> </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: '#696969',
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 34,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 10,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  heroBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  heroLeft: {
    flex: 1,
    paddingRight: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '600',
  },
  chatBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSub: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
  },
  heroMeta: {
    color: '#ffd4b5',
    fontSize: 14,
    lineHeight: 18,
  },
  heroRobot: {
    width: 130,
    height: 130,
  },
  segmentWrap: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  segmentScroll: {
    backgroundColor: '#3d3d3d',
    borderRadius: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  segmentItem: {
    minWidth: 116,
    minHeight: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
  segmentText: {
    color: '#cbcbcb',
    fontSize: 12,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: '#fff',
  },
  coursesWrap: {
    marginTop: 2,
  },
  courseItem: {
    backgroundColor: '#111',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  courseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 30,
  },
  courseTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    flexShrink: 1,
    paddingRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#4a4a4a',
    marginTop: 8,
    marginBottom: 10,
  },
  courseBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  metaWrap: {
    flex: 1,
    paddingRight: 10,
  },
  courseMeta: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 19,
  },
  goCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPill: {
    marginTop: 2,
    borderRadius: 999,
    backgroundColor: '#111',
    minHeight: 46,
  },
  emptyPillText: {
    color: 'transparent',
  },
});
