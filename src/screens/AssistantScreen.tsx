import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { callGrok } from '../services/grok';
import { ASSISTANT_SYSTEM_PROMPT, ASSISTANT_WELCOME, ChatMessage } from '../types/chat';
import { colors } from '../theme';

type AssistantScreenProps = {
  onBack: () => void;
};

const initialMessages: ChatMessage[] = [
  { role: 'system', content: ASSISTANT_SYSTEM_PROMPT },
  { role: 'assistant', content: ASSISTANT_WELCOME },
];

export function AssistantScreen({ onBack }: AssistantScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const sendingRef = useRef(false);

  const visibleMessages = messages.filter((m) => m.role !== 'system');

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading || sendingRef.current) return;
    sendingRef.current = true;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const reply = await callGrok(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось получить ответ';
      setError(message);
      setMessages(newMessages);
    } finally {
      setLoading(false);
      sendingRef.current = false;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <View style={styles.container}>
        <View style={styles.screen}>
          <View style={styles.head}>
            <Pressable onPress={onBack} disabled={loading}>
              <Text style={styles.back}>‹</Text>
            </Pressable>
            <Text style={styles.headTitle}>ИИ-ассистент</Text>
            <View style={styles.headSpacer} />
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.chat}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {visibleMessages.map((msg, index) => (
              <View
                key={`${msg.role}-${index}-${msg.content.slice(0, 24)}`}
                style={msg.role === 'user' ? styles.msgRight : styles.msgLeft}
              >
                <Text style={styles.msgText}>{msg.content}</Text>
              </View>
            ))}

            {loading && (
              <View style={styles.msgLeft}>
                <ActivityIndicator color={colors.accent} size="small" />
              </View>
            )}
          </ScrollView>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Введите сообщение..."
              placeholderTextColor="#6f6f6f"
              value={input}
              onChangeText={setInput}
              editable={!loading}
              multiline
              maxLength={2000}
              // В multiline onSubmitEditing может срабатывать непредсказуемо и дублировать отправку
              blurOnSubmit={false}
            />
            <Pressable onPress={sendMessage} disabled={loading || !input.trim()} style={styles.sendBtn}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={[styles.send, (!input.trim() || loading) && styles.sendDisabled]}>➤</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  screen: {
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headSpacer: {
    width: 24,
  },
  back: {
    color: '#fff',
    fontSize: 28,
  },
  headTitle: {
    color: '#fff',
    fontSize: 16,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingBottom: 12,
    flexGrow: 1,
  },
  msgLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 10,
    maxWidth: '85%',
    marginBottom: 12,
  },
  msgRight: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 10,
    maxWidth: '85%',
    marginBottom: 12,
  },
  msgText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: '#ff8a80',
    fontSize: 12,
    marginBottom: 8,
  },
  inputWrap: {
    backgroundColor: '#111',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 2,
  },
  input: {
    color: '#fff',
    flex: 1,
    paddingVertical: 8,
    maxHeight: 120,
  },
  sendBtn: {
    paddingLeft: 8,
    paddingBottom: 6,
    minWidth: 28,
    alignItems: 'center',
  },
  send: {
    color: '#fff',
    fontSize: 16,
  },
  sendDisabled: {
    opacity: 0.4,
  },
});
