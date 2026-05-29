import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { casesList } from '../data/cases';
import { colors, ui } from '../theme';

type CasesScreenProps = {
  completedCases: string[];
  onOpenCase: (title: string) => void;
  onOpenAssistant: () => void;
};

export function CasesScreen({ completedCases, onOpenCase, onOpenAssistant }: CasesScreenProps) {
  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={ui.rowBetween}>
          <Text style={styles.title}>Кейсы и задания</Text>
          <Pressable style={styles.chatBtn} onPress={onOpenAssistant}>
            <Feather name="message-circle" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.listWrap}>
          {casesList.map((item) => {
            const done = completedCases.includes(item.title);
            return (
              <Pressable key={item.id} style={styles.caseItem} onPress={() => onOpenCase(item.title)}>
                <View style={styles.caseTop}>
                  <Text style={styles.caseTitle}>{item.title}</Text>
                  <View style={styles.iconsWrap}>
                    {item.hasBriefcase ? <Ionicons name="briefcase-outline" size={18} color="#fff" /> : null}
                    {done ? <Ionicons name="checkmark" size={20} color="#67f96a" /> : null}
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.caseBottom}>
                  <Text style={styles.caseDesc}>{item.description}</Text>
                  <View style={styles.goCircle}>
                    <Ionicons name="arrow-forward" size={18} color="#111" />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
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
  title: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 40,
    marginBottom: 12,
    fontWeight: '500',
  },
  chatBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  listWrap: {
    marginTop: 2,
  },
  caseItem: {
    backgroundColor: '#111',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  caseTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 28,
  },
  caseTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    flex: 1,
    flexShrink: 1,
    paddingRight: 10,
  },
  iconsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#4a4a4a',
    marginTop: 8,
    marginBottom: 10,
  },
  caseBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  caseDesc: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 19,
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  goCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
