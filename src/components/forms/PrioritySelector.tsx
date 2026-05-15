import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRIORITIES } from '../../constants/formOptions';
import { COLORS, RADIUS } from '../../constants/theme';
import { formFieldStyles } from './FormField';

interface PrioritySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PrioritySelector({
  label,
  value,
  onChange,
}: PrioritySelectorProps) {
  return (
    <View>
      <Text style={formFieldStyles.label}>{label}</Text>
      <View style={styles.priorityRow}>
        {PRIORITIES.map((priority) => {
          const selected = value === priority.value;

          return (
            <TouchableOpacity
              key={priority.value}
              style={[
                styles.priorityButton,
                selected && {
                  backgroundColor: priority.activeBg,
                  borderColor: priority.border,
                },
              ]}
              onPress={() => onChange(priority.value)}
            >
              <View
                style={[styles.priorityDot, { backgroundColor: priority.dot }]}
              />
              <Text
                style={[
                  styles.priorityText,
                  selected && { color: priority.border },
                ]}
              >
                {priority.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 2,
    borderColor: COLORS.transparent,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
