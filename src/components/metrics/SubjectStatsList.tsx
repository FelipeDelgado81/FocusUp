import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';
import type { SubjectStat } from '../../utils/metrics';

interface SubjectStatsListProps {
  subjects: SubjectStat[];
}

export default function SubjectStatsList({ subjects }: SubjectStatsListProps) {
  if (subjects.length === 0) return null;

  return (
    <>
      <Text style={styles.subjectTitle}>Asignaturas</Text>
      {subjects.map((subject) => (
        <View key={subject.name} style={styles.subjectCard}>
          <View style={styles.subjectLeft}>
            <View
              style={[
                styles.subjectIcon,
                { backgroundColor: subject.color + '20' },
              ]}
            >
              <MaterialIcons
                name={subject.icon}
                size={20}
                color={subject.color}
              />
            </View>
            <View>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectHours}>
                {subject.count} {subject.count === 1 ? 'sesión' : 'sesiones'}
              </Text>
            </View>
          </View>
          <View style={styles.subjectRight}>
            <Text style={[styles.subjectPercent, { color: subject.color }]}>
              {subject.percent}%
            </Text>
            <View style={styles.subjectBarTrack}>
              <View
                style={[
                  styles.subjectBar,
                  {
                    width: `${subject.percent}%`,
                    backgroundColor: subject.color,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  subjectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  subjectCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subjectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  subjectHours: {
    fontSize: 12,
    color: COLORS.outline,
    fontWeight: '500',
    marginTop: 2,
  },
  subjectRight: {
    alignItems: 'flex-end',
  },
  subjectPercent: {
    fontSize: 16,
    fontWeight: '700',
  },
  subjectBarTrack: {
    width: 60,
    height: 6,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: RADIUS.round,
    marginTop: 4,
    overflow: 'hidden',
  },
  subjectBar: {
    height: '100%',
    borderRadius: RADIUS.round,
  },
});
