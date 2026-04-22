import { StyleSheet } from 'react-native';

export const colors = {
  pageBg: '#1f1b1d',
  cardBg: '#1f1b1d',
  cardInner: '#141313',
  text: '#f3f3f3',
  textSecondary: '#b6b6b6',
  muted: '#8f8f8f',
  border: '#4a4a4a',
  accent: '#c96f2b',
  accentDim: '#9f5c2e',
};

export const ui = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  scrollPad: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 34,
    padding: 16,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    color: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
