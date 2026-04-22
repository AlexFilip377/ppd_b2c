import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ui } from '../theme';

type AssistantScreenProps = {
  onBack: () => void;
};

export function AssistantScreen({ onBack }: AssistantScreenProps) {
  return (
    <ScrollView contentContainerStyle={ui.scrollPad}>
      <View style={styles.screen}>
        <View>
          <View style={styles.head}>
            <Pressable onPress={onBack}>
              <Text style={styles.back}>‹</Text>
            </Pressable>
            <Text style={styles.headTitle}>ИИ-ассистент</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.msgLeft}>
            <Text style={styles.msgText}>Какой вопрос Вас интересует сегодня?</Text>
          </View>
          <View style={styles.msgRight}>
            <Text style={styles.msgText}>Давай разберем вопросы по ООП</Text>
          </View>
        </View>

        <View style={styles.inputWrap}>
          <TextInput style={styles.input} placeholder="Введите сообщение..." placeholderTextColor="#6f6f6f" />
          <Pressable onPress={() => {}}>
            <Text style={styles.send}>➤</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 700,
    justifyContent: 'space-between',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  back: {
    color: '#fff',
    fontSize: 28,
  },
  headTitle: {
    color: '#fff',
    fontSize: 16,
  },
  msgLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 10,
    maxWidth: '75%',
    marginBottom: 12,
  },
  msgRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#c96f2b',
    borderRadius: 12,
    padding: 10,
    maxWidth: '75%',
  },
  msgText: {
    color: '#fff',
    fontSize: 12,
  },
  inputWrap: {
    backgroundColor: '#111',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    color: '#fff',
    flex: 1,
    paddingVertical: 8,
  },
  send: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
