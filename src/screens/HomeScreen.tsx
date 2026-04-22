import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type HomeScreenProps = {
  onOpenAssistant: () => void;
  onOpenTests: () => void;
  onOpenCourse: () => void;
};

export function HomeScreen({ onOpenAssistant, onOpenTests, onOpenCourse }: HomeScreenProps) {
  const courses = ['Архитектура мобильных приложений', 'Работа с API', 'Производительность приложения', 'Публикация приложений'];

  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View>
          <Text style={styles.heroTitle}>Мои курсы</Text>
          <Text style={styles.heroSub}>Уровень 5</Text>
          <Pressable style={styles.miniBtn} onPress={onOpenTests}>
            <Text style={styles.miniBtnText}>Перейти к тестам</Text>
          </Pressable>
        </View>
        <Image source={require('../../assets/images/robot_book.png')} style={styles.heroRobot} resizeMode="contain" />
      </View>

      <View style={styles.listCard}>
        <View style={ui.rowBetween}>
          <Text style={styles.sectionTitle}>Список курсов</Text>
          <Pressable onPress={onOpenAssistant}>
            <Text style={styles.chat}>💬</Text>
          </Pressable>
        </View>
        <View style={styles.coursesWrap}>
          {courses.map((course) => (
            <Pressable key={course} style={styles.courseItem} onPress={onOpenCourse}>
              <View>
                <Text style={styles.courseTitle}>{course}</Text>
                <Text style={styles.courseMeta}>2 лекции • 2 видео • 1 презентация</Text>
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
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 39,
    lineHeight: 42,
    fontWeight: '700',
  },
  heroSub: {
    color: '#fff',
    marginTop: 3,
    marginBottom: 10,
  },
  miniBtn: {
    backgroundColor: '#232323',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  miniBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  heroRobot: {
    width: 126,
    height: 126,
  },
  listCard: {
    paddingTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 10,
  },
  chat: {
    color: '#fff',
    fontSize: 19,
    marginBottom: 6,
  },
  coursesWrap: {
    marginTop: 4,
  },
  courseItem: {
    backgroundColor: '#111',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseTitle: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 4,
  },
  courseMeta: {
    color: colors.muted,
    fontSize: 15,
  },
  goCircle: {
    width: 30,
    height: 30,
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
