import { Feather, Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MainTab } from '../types';
import { colors } from '../theme';

type BottomNavProps = {
  activeTab: MainTab;
  onSelect: (tab: MainTab) => void;
};

export function BottomNav({ activeTab, onSelect }: BottomNavProps) {
  return (
    <View style={styles.wrap}>
      <NavItem active={activeTab === 'home'} onPress={() => onSelect('home')}>
        <Ionicons name="book-outline" size={20} color="#fff" />
      </NavItem>
      <NavItem active={activeTab === 'tests'} onPress={() => onSelect('tests')}>
        <Feather name="edit-3" size={18} color="#fff" />
      </NavItem>
      <NavItem active={activeTab === 'cases'} onPress={() => onSelect('cases')}>
        <Ionicons name="briefcase-outline" size={18} color="#fff" />
      </NavItem>
      <NavItem active={activeTab === 'profile'} onPress={() => onSelect('profile')}>
        <Ionicons name="person-outline" size={18} color="#fff" />
      </NavItem>
    </View>
  );
}

type NavItemProps = {
  children: ReactNode;
  active: boolean;
  onPress: () => void;
};

function NavItem({ children, active, onPress }: NavItemProps) {
  return (
    <Pressable style={[styles.item, active && styles.itemActive]} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: colors.accent,
  },
});
