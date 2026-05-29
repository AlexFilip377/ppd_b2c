import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getCaseDetail } from '../data/cases';
import { colors, ui } from '../theme';

type CaseDetailScreenProps = {
  caseTitle: string;
  onBack: () => void;
  onCaseSubmitted?: () => void;
};

type PickedFile = {
  name: string;
  uri: string;
};

export function CaseDetailScreen({ caseTitle, onBack, onCaseSubmitted }: CaseDetailScreenProps) {
  const detail = useMemo(() => getCaseDetail(caseTitle), [caseTitle]);
  const [selectedFile, setSelectedFile] = useState<PickedFile | null>(null);
  const [note, setNote] = useState('');

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      if (!file) return;

      setSelectedFile({
        name: file.name,
        uri: file.uri,
      });
      onCaseSubmitted?.();
    } catch {
      Alert.alert('Ошибка', 'Не удалось выбрать файл');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[ui.scrollPad, styles.content]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.screen}>
        <Pressable onPress={onBack} style={styles.backRow}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.title}>{caseTitle}</Text>
        </Pressable>

        <Text style={styles.intro}>{detail.intro}</Text>

        {detail.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.bullets.map((bullet) => (
              <Text key={bullet} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}

        <View style={styles.uploadCard}>
          <Text style={styles.uploadLabel}>Выберите файл</Text>
          {selectedFile ? (
            <Text style={styles.fileName} numberOfLines={2}>
              {selectedFile.name}
            </Text>
          ) : null}
          <Pressable style={styles.uploadBtn} onPress={pickFile}>
            <Text style={styles.uploadBtnText}>Загрузить</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.noteInput}
          placeholder="Ссылка или комментарий к заданию..."
          placeholderTextColor="#6f6f6f"
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  screen: {
    flex: 1,
    paddingTop: 8,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '500',
    flex: 1,
    flexShrink: 1,
    marginLeft: 4,
  },
  intro: {
    color: '#c8c8c8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    marginBottom: 6,
  },
  bullet: {
    color: '#c5c5c5',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    paddingLeft: 2,
  },
  uploadCard: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  uploadLabel: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 10,
  },
  fileName: {
    color: '#d8d8d8',
    fontSize: 13,
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 96,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#111',
  },
});
