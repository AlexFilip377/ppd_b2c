import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, ui } from '../theme';

type AuthScreenProps = {
  mode: 'register' | 'login';
  onModeChange: (mode: 'register' | 'login') => void;
  onContinue: () => void;
};

export function AuthScreen({ mode, onModeChange, onContinue }: AuthScreenProps) {
  const isRegister = mode === 'register';
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2005);

  const years = buildYears();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  return (
    <>
      <ScrollView contentContainerStyle={ui.scrollPad} keyboardShouldPersistTaps="handled">
        <View style={styles.screen}>
          <Text style={ui.pageTitle}>{isRegister ? 'Регистрация' : 'Вход'}</Text>

          <View style={styles.segmentWrap}>
            <Pressable style={[styles.segment, isRegister && styles.segmentActive]} onPress={() => onModeChange('register')}>
              <Text style={[styles.segmentText, isRegister && styles.segmentTextActive]}>Регистрация</Text>
            </Pressable>
            <Pressable style={[styles.segment, !isRegister && styles.segmentActive]} onPress={() => onModeChange('login')}>
              <Text style={[styles.segmentText, !isRegister && styles.segmentTextActive]}>Вход</Text>
            </Pressable>
          </View>

          {isRegister ? (
            <>
              <TextInput
                style={ui.input}
                placeholder="Фамилия и имя"
                placeholderTextColor="#777"
                autoCapitalize="words"
                textContentType="name"
                returnKeyType="next"
              />

              <Pressable style={[ui.input, styles.dateField]} onPress={() => setDatePickerVisible(true)}>
                <Text style={birthDate ? styles.dateValue : styles.datePlaceholder}>
                  {birthDate ? formatDate(birthDate) : 'Выберите дату рождения'}
                </Text>
                <Text style={styles.dateIcon}>▾</Text>
              </Pressable>

              <TextInput
                style={ui.input}
                placeholder="Город, в котором живете"
                placeholderTextColor="#777"
                autoCapitalize="words"
                textContentType="addressCity"
                returnKeyType="next"
              />
              <TextInput
                style={ui.input}
                placeholder="login@email.com"
                placeholderTextColor="#777"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <TextInput
                style={ui.input}
                placeholder="************"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                returnKeyType="next"
              />
              <TextInput
                style={ui.input}
                placeholder="Повторите пароль"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                returnKeyType="done"
              />
            </>
          ) : (
            <>
              <Image source={require('../../assets/images/start.png')} resizeMode="contain" style={styles.startImage} />
              <TextInput
                style={ui.input}
                placeholder="login@email.com"
                placeholderTextColor="#777"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <TextInput
                style={ui.input}
                placeholder="************"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                returnKeyType="done"
              />
            </>
          )}

          <View style={styles.socialRow}>
            <Pressable style={styles.socialBtn} onPress={() => {}}>
              <Text style={styles.socialText}>G</Text>
            </Pressable>
            <Pressable style={styles.socialBtn} onPress={() => {}}>
              <Text style={styles.socialText}>A</Text>
            </Pressable>
            <Pressable style={styles.socialBtn} onPress={() => {}}>
              <Text style={styles.socialText}>GH</Text>
            </Pressable>
          </View>

          <Pressable style={[ui.button, { marginTop: 18 }]} onPress={onContinue}>
            <Text style={ui.buttonText}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={datePickerVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Выберите дату рождения</Text>
            <View style={styles.pickerRow}>
              <WheelColumn
                label="День"
                items={days}
                selected={selectedDay}
                onSelect={setSelectedDay}
              />
              <WheelColumn
                label="Месяц"
                items={months}
                selected={selectedMonth}
                onSelect={(month) => {
                  setSelectedMonth(month);
                  const maxDay = getDaysInMonth(selectedYear, month);
                  if (selectedDay > maxDay) setSelectedDay(maxDay);
                }}
              />
              <WheelColumn
                label="Год"
                items={years}
                selected={selectedYear}
                onSelect={(year) => {
                  setSelectedYear(year);
                  const maxDay = getDaysInMonth(year, selectedMonth);
                  if (selectedDay > maxDay) setSelectedDay(maxDay);
                }}
              />
            </View>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancelBtn} onPress={() => setDatePickerVisible(false)}>
                <Text style={styles.modalCancelText}>Отмена</Text>
              </Pressable>
              <Pressable
                style={styles.modalApplyBtn}
                onPress={() => {
                  setBirthDate(new Date(selectedYear, selectedMonth - 1, selectedDay));
                  setDatePickerVisible(false);
                }}
              >
                <Text style={styles.modalApplyText}>Выбрать</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

type WheelColumnProps = {
  label: string;
  items: number[];
  selected: number;
  onSelect: (value: number) => void;
};

function WheelColumn({ label, items, selected, onSelect }: WheelColumnProps) {
  return (
    <View style={styles.wheelCol}>
      <Text style={styles.wheelLabel}>{label}</Text>
      <ScrollView style={styles.wheelList} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <Pressable key={`${label}-${item}`} style={styles.wheelItem} onPress={() => onSelect(item)}>
            <Text style={[styles.wheelText, selected === item && styles.wheelTextSelected]}>{String(item).padStart(2, '0')}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function buildYears() {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 80;
  const list: number[] = [];
  for (let y = currentYear; y >= minYear; y -= 1) {
    list.push(y);
  }
  return list;
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 690,
  },
  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
  segmentText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  startImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePlaceholder: {
    color: '#777',
  },
  dateValue: {
    color: '#fff',
  },
  dateIcon: {
    color: '#9a9a9a',
    fontSize: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: '#1f1b1d',
    borderRadius: 18,
    padding: 14,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  wheelCol: {
    flex: 1,
  },
  wheelLabel: {
    color: '#a9a9a9',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  wheelList: {
    maxHeight: 180,
    backgroundColor: '#121212',
    borderRadius: 12,
  },
  wheelItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  wheelText: {
    color: '#c6c6c6',
    fontSize: 15,
  },
  wheelTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#343434',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalApplyBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalCancelText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalApplyText: {
    color: '#fff',
    fontWeight: '700',
  },
});
