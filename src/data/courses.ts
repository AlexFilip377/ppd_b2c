export type CourseTopic = {
  title: string;
  profileSubtitle: string;
};

export const allCourseTopics: CourseTopic[] = [
  { title: 'Архитектура мобильных приложений', profileSubtitle: 'Изучены материалы по архитектуре приложений' },
  { title: 'Работа с API', profileSubtitle: 'Изучены материалы по интеграции с API' },
  { title: 'Производительность приложения', profileSubtitle: 'Изучены материалы по оптимизации' },
  { title: 'Публикация приложений', profileSubtitle: 'Изучены материалы по публикации' },
  { title: 'Основы дизайн-систем', profileSubtitle: 'Изучены материалы по дизайн-системам' },
  { title: 'UI-компоненты', profileSubtitle: 'Изучены материалы по UI-компонентам' },
  { title: 'Типографика и цвета', profileSubtitle: 'Изучены материалы по типографике' },
  { title: 'Основы серверной инфраструктуры', profileSubtitle: 'Изучены материалы по инфраструктуре' },
  { title: 'Облачные технологии', profileSubtitle: 'Изучены материалы по облачным сервисам' },
  { title: 'Контейнеризация', profileSubtitle: 'Изучены материалы по контейнерам' },
  { title: 'Разбор задач', profileSubtitle: 'Изучены материалы по разбору задач' },
  { title: 'Логика и алгоритмы', profileSubtitle: 'Изучены материалы по алгоритмам' },
  { title: 'Анализ систем', profileSubtitle: 'Изучены материалы по анализу систем' },
  { title: 'Работа в команде', profileSubtitle: 'Изучены материалы по командной работе' },
  { title: 'Обсуждение идей', profileSubtitle: 'Изучены материалы по коммуникации' },
  { title: 'Рабочие встречи', profileSubtitle: 'Изучены материалы по встречам' },
];

export function getCourseProfileSubtitle(title: string): string {
  return allCourseTopics.find((c) => c.title === title)?.profileSubtitle ?? 'Тема пройдена';
}
