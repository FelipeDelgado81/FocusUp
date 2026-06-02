import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { isSameDay, WEEK_DAY_LABELS } from '../../utils/agenda';

interface AgendaCalendarProps {
  monthLabel: string;
  weekDates: Date[];
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
  onPrevWeek: () => void;
  onToday: () => void;
  onNextWeek: () => void;
}

export default function AgendaCalendar({
  monthLabel,
  weekDates,
  selectedDayIndex,
  onSelectDay,
  onPrevWeek,
  onToday,
  onNextWeek,
}: AgendaCalendarProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.calendarCard}>
      <View style={styles.calendarHeader}>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <View style={styles.calendarNav}>
          <TouchableOpacity onPress={onPrevWeek}>
            <MaterialIcons
              name="chevron-left"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToday}>
            <Text style={styles.todayBtn}>Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextWeek}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.daysRow}>
        {weekDates.map((date, index) => {
          const selected = index === selectedDayIndex;
          const today = isSameDay(date, new Date());

          return (
            <TouchableOpacity
              key={date.toISOString()}
              style={[styles.dayCell, selected && styles.dayCellSelected]}
              onPress={() => onSelectDay(index)}
            >
              <Text
                style={[styles.dayLabel, selected && styles.dayLabelSelected]}
              >
                {WEEK_DAY_LABELS[index]}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  selected && styles.dayNumberSelected,
                  today && !selected && styles.dayNumberToday,
                ]}
              >
                {date.getDate()}
              </Text>
              {(selected || today) && (
                <View
                  style={[
                    styles.dayDot,
                    today && !selected && styles.dayDotToday,
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    calendarCard: {
      backgroundColor: COLORS.surfaceContainerLowest,
      borderRadius: RADIUS.xxl,
      padding: 16,
      marginBottom: 24,
      ...SHADOWS.sm,
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 6,
    },
    monthLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.onSurface,
    },
    calendarNav: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    todayBtn: {
      fontSize: 13,
      fontWeight: '700',
      color: COLORS.primary,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dayCell: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: RADIUS.lg,
      gap: 6,
    },
    dayCellSelected: {
      backgroundColor: COLORS.primary,
      ...SHADOWS.md,
    },
    dayLabel: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      color: COLORS.onSurfaceVariant,
    },
    dayLabelSelected: {
      color: COLORS.onPrimary + 'cc',
    },
    dayNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.onSurface,
    },
    dayNumberSelected: {
      color: COLORS.onPrimary,
      fontWeight: '700',
    },
    dayNumberToday: {
      color: COLORS.primary,
      fontWeight: '700',
    },
    dayDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: COLORS.white,
    },
    dayDotToday: {
      backgroundColor: COLORS.primary,
    },
  });
