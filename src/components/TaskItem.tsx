import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, type ThemeColors } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import type { Task } from '../storage/asyncStorage';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxArea}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
        >
          {task.completed && (
            <MaterialIcons name="check" size={16} color={COLORS.white} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <MaterialIcons
            name={task.dueDate.includes('Hoy') ? 'event' : 'schedule'}
            size={14}
            color={
              task.priority === 'ALTA'
                ? COLORS.tertiary
                : COLORS.onSurfaceVariant
            }
          />
          <Text
            style={[
              styles.dueDateText,
              task.priority === 'ALTA' && { color: COLORS.tertiary },
            ]}
          >
            {task.dueDate}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.priorityText}>Prioridad {task.priority}</Text>
        </View>
      </View>
      {onDelete && !task.completed && (
        <View style={styles.actionBtns}>
          {onEdit && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onEdit(task.id)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="edit" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onDelete(task.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="delete-outline"
              size={20}
              color={COLORS.error}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.surfaceContainerLowest,
      padding: 16,
      borderRadius: RADIUS.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor: COLORS.outlineVariant + '18',
    },
    checkboxArea: {
      padding: 2,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: COLORS.outlineVariant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.onSurface,
      marginBottom: 4,
    },
    titleCompleted: {
      textDecorationLine: 'line-through',
      color: COLORS.outline,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    dueDateText: {
      fontSize: 11,
      fontWeight: '700',
      color: COLORS.onSurfaceVariant,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: COLORS.outlineVariant,
    },
    priorityText: {
      fontSize: 11,
      fontWeight: '500',
      color: COLORS.onSurfaceVariant,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    actionBtns: {
      gap: 4,
    },
    actionBtn: {
      padding: 4,
    },
  });
