import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type ContentTab = 'lectures' | 'video' | 'presentations';

type LessonItem = {
  title: string;
  size: string;
};

type TopicContent = {
  lectures: LessonItem[];
  video: LessonItem[];
  presentations: LessonItem[];
};

type TopicDetailScreenProps = {
  topicTitle: string;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  onBack: () => void;
  onOpenAssistant: () => void;
};

const topicContent: Record<string, TopicContent> = {
  'Архитектура мобильных приложений': {
    lectures: [
      { title: 'Как строится архитектура приложения', size: '245 KB' },
      { title: 'Разделение логики и интерфейса', size: '302 KB' },
    ],
    video: [{ title: 'Разбор архитектуры реального приложения', size: '1.2 MB' }],
    presentations: [
      { title: 'Основные архитектуры мобильных приложений', size: '125 KB' },
      { title: 'MVC, MVP, MVVM: сравнение подходов', size: '203 KB' },
    ],
  },
  'Работа с API': {
    lectures: [
      { title: 'Как мобильное приложение общается с сервером', size: '245 KB' },
      { title: 'Обработка ошибок и статусов ответа', size: '302 KB' },
    ],
    video: [
      { title: 'Подключение API в мобильном приложении', size: '1.2 MB' },
      { title: 'Практический пример запроса данных', size: '203 KB' },
    ],
    presentations: [{ title: 'Основы REST API', size: '125 KB' }],
  },
  'Производительность приложения': {
    lectures: [
      { title: 'Почему приложения начинают тормозить', size: '245 KB' },
      { title: 'Основы профилирования', size: '302 KB' },
    ],
    video: [],
    presentations: [{ title: 'Оптимизация мобильных приложений', size: '125 KB' }],
  },
  'Публикация приложений': {
    lectures: [{ title: 'Процесс публикации приложения', size: '245 KB' }],
    video: [
      { title: 'Основы профилирования', size: '302 KB' },
      { title: 'Оптимизация мобильных приложений', size: '125 KB' },
    ],
    presentations: [],
  },
};

const tabLabels: Record<ContentTab, string> = {
  lectures: 'Лекции',
  video: 'Видео',
  presentations: 'Презентации',
};

const tabOrder: ContentTab[] = ['lectures', 'video', 'presentations'];

export function TopicDetailScreen({
  topicTitle,
  isCompleted,
  onToggleCompleted,
  onBack,
  onOpenAssistant,
}: TopicDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('lectures');
  const content = useMemo(
    () => topicContent[topicTitle] ?? topicContent['Архитектура мобильных приложений'],
    [topicTitle]
  );
  const activeItems = content[activeTab];

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={ui.rowBetween}>
          <Pressable onPress={onBack} style={styles.backRow}>
            <Ionicons name="chevron-back" size={16} color="#fff" />
            <Text style={styles.title}>{topicTitle}</Text>
          </Pressable>
          <Pressable style={styles.chatBtn} onPress={onOpenAssistant}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.panel}>
        <Pressable style={styles.completeBtn} onPress={onToggleCompleted}>
          <Text style={styles.completeBtnText}>
            {isCompleted ? 'Отметить как незавершенный' : 'Отметить как пройденный'}
          </Text>
        </Pressable>

        <View style={styles.segmentWrap}>
          {tabOrder.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.segmentItem, activeTab === tab && styles.segmentActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.segmentText, activeTab === tab && styles.segmentTextActive]}>{tabLabels[tab]}</Text>
            </Pressable>
          ))}
        </View>

        {activeItems.length > 0 ? (
          activeItems.map((item) => (
            <View key={item.title} style={styles.materialRow}>
              <View style={styles.materialInfo}>
                <Text style={styles.materialTitle}>{item.title}</Text>
                <Text style={styles.materialSize}>{item.size}</Text>
              </View>
              <View style={styles.goCircle}>
                <Ionicons name="open-outline" size={14} color="#111" />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            {activeTab === 'video' ? 'Видео нет.' : activeTab === 'presentations' ? 'Презентаций нет.' : 'Материалов нет.'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: colors.accent,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 62,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '500',
    marginLeft: 2,
    flexShrink: 1,
  },
  chatBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  panel: {
    marginTop: -36,
    marginHorizontal: 12,
    backgroundColor: '#111',
    borderRadius: 28,
    padding: 12,
    minHeight: 500,
  },
  completeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#090909',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10,
  },
  completeBtnText: {
    color: '#fff',
    fontSize: 11,
  },
  segmentWrap: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  segmentItem: {
    flex: 1,
    minHeight: 30,
    borderRadius: 15,
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
  segmentText: {
    color: '#d3d3d3',
    fontSize: 11,
  },
  segmentTextActive: {
    color: '#fff',
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  materialInfo: {
    flex: 1,
    paddingRight: 8,
  },
  materialTitle: {
    color: '#f2f2f2',
    fontSize: 12,
    marginBottom: 2,
  },
  materialSize: {
    color: '#8f8f8f',
    fontSize: 10,
  },
  goCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#8d8d8d',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});
