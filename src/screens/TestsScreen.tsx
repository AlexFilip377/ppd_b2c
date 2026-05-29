import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, ui } from '../theme';

type TestsScreenProps = {
  tests: Array<{ id: string; title: string; subtitle: string }>;
  completedTests: string[];
  onOpenTest: (id: string) => void;
  onOpenAssistant: () => void;
};

export function TestsScreen({ tests, completedTests, onOpenTest, onOpenAssistant }: TestsScreenProps) {
  return (
    <ScrollView contentContainerStyle={ui.scrollPad} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.pageHint}>Тесты</Text>
        <View style={ui.rowBetween}>
          <Text style={styles.title}>Тесты</Text>
          <Pressable style={styles.chatBtn} onPress={onOpenAssistant}>
            <Feather name="message-circle" size={16} color="#fff" />
          </Pressable>
        </View>        

        <View style={styles.testsWrap}>
          {tests.map((item) => (
            <Pressable key={item.id} style={styles.testRow} onPress={() => onOpenTest(item.id)}>
              <View style={styles.rowLeft}>
                <View style={styles.statusSlot}>
                  {completedTests.includes(item.id) ? (
                    <Feather name="check" size={14} color="#2ade63" />
                  ) : null}
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.testTitle}>{item.title}</Text>
                  <Text style={styles.testSub}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.goCircle}>
                <Ionicons name="arrow-forward" size={16} color="#111" />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 700,
    flex: 1,
    backgroundColor: '#171313',
    borderRadius: 34,
    padding: 16,
  },
  pageHint: {
    color: '#7f7f7f',
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 40,
    marginBottom: 10,
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
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 11,
    overflow: 'hidden',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    marginRight: 10,
  },
  statusSlot: {
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  testTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
  },
  testSub: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 17,
    marginTop: 2,
  },
  goCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  testsWrap: {
    marginTop: 2,
  },
});
