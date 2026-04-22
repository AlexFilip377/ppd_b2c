import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type CaseDetailScreenProps = {
  caseTitle: string;
  pickerVisible: boolean;
  onOpenPicker: () => void;
  onClosePicker: () => void;
  onBack: () => void;
  onOpenAssistant: () => void;
};

export function CaseDetailScreen({
  caseTitle,
  pickerVisible,
  onOpenPicker,
  onClosePicker,
  onBack,
  onOpenAssistant,
}: CaseDetailScreenProps) {
  return (
    <>
      <ScrollView contentContainerStyle={ui.scrollPad}>
        <View style={styles.screen}>
          <View style={ui.rowBetween}>
            <Pressable onPress={onBack}>
              <Text style={styles.back}>‹ {caseTitle}</Text>
            </Pressable>
            <Pressable onPress={onOpenAssistant}>
              <Text style={styles.chat}>💬</Text>
            </Pressable>
          </View>

          <Text style={styles.desc}>
            Реализовать задачу в соответствии с условиями кейса. Продумайте логику, ошибки и пользовательский
            сценарий.
          </Text>
          <Text style={styles.h3}>Требования к задаче</Text>
          <Text style={styles.bullet}>- Исправная логика без ошибок</Text>
          <Text style={styles.bullet}>- Корректная работа оффлайн/онлайн</Text>
          <Text style={styles.bullet}>- Понятный интерфейс</Text>

          <Text style={styles.h3}>Критерии</Text>
          <Text style={styles.bullet}>- Чистый код</Text>
          <Text style={styles.bullet}>- Покрытие основных сценариев</Text>
          <Text style={styles.bullet}>- Понятное описание решения</Text>

          <View style={styles.uploadCard}>
            <Text style={styles.uploadTitle}>Прикрепить файл</Text>
            <Pressable style={styles.uploadBtn} onPress={onOpenPicker}>
              <Text style={styles.uploadBtnText}>Выбрать файл</Text>
            </Pressable>
          </View>

          <View style={styles.uploadCard}>
            <Text style={styles.uploadTitle}>Прикрепить файл</Text>
            <Pressable style={styles.uploadBtn} onPress={onOpenPicker}>
              <Text style={styles.uploadBtnText}>Выбрать файл</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal transparent visible={pickerVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Выберите файл</Text>
            <Pressable style={styles.modalOption} onPress={onClosePicker}>
              <Text style={styles.modalOptionText}>Фото из галереи</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={onClosePicker}>
              <Text style={styles.modalOptionText}>Документ из памяти</Text>
            </Pressable>
            <Pressable style={styles.modalCancel} onPress={onClosePicker}>
              <Text style={styles.modalCancelText}>Отмена</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 720,
  },
  back: {
    color: '#fff',
    fontSize: 26,
  },
  chat: {
    color: '#fff',
    fontSize: 18,
  },
  desc: {
    color: '#cfcfcf',
    lineHeight: 20,
    marginVertical: 14,
  },
  h3: {
    color: colors.text,
    fontSize: 18,
    marginTop: 8,
    marginBottom: 6,
  },
  bullet: {
    color: '#c7c7c7',
    marginBottom: 4,
  },
  uploadCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
  },
  uploadTitle: {
    color: colors.text,
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalBody: {
    width: '100%',
    backgroundColor: '#1b1b1b',
    borderRadius: 16,
    padding: 14,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomColor: '#343434',
    borderBottomWidth: 1,
  },
  modalOptionText: {
    color: '#dfdfdf',
  },
  modalCancel: {
    marginTop: 10,
    backgroundColor: colors.accentDim,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#fff',
    fontWeight: '600',
  },
});
