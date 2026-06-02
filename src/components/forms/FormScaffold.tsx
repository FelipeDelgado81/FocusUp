import React, { type ReactNode, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface FormScaffoldProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function FormScaffold({
  title,
  subtitle,
  children,
}: FormScaffoldProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.form}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scroll: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: '700',
      color: COLORS.onBackground,
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.onSurfaceVariant,
      marginTop: 6,
    },
    form: {
      backgroundColor: COLORS.surfaceContainerLowest,
      borderRadius: RADIUS.xxl,
      padding: 24,
      ...SHADOWS.lg,
    },
  });
