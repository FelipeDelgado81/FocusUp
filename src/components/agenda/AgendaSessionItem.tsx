import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';
import type { Session } from '../../hooks/useSessions';
import {
  PRIORITY_ICON_BG,
  PRIORITY_ICON_COLOR,
  SUBJECT_ICONS,
} from '../../utils/agenda';
import PriorityBadge from '../PriorityBadge';

interface AgendaSessionItemProps {
  session: Session;
  onEdit: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}

export default function AgendaSessionItem({
  session,
  onEdit,
  onDelete,
}: AgendaSessionItemProps) {
  return (
    <View style={styles.sessionCard}>
      <View style={styles.sessionTop}>
        <View style={styles.sessionInfo}>
          <View
            style={[
              styles.sessionIcon,
              {
                backgroundColor:
                  PRIORITY_ICON_BG[session.priority] || COLORS.primaryFixed,
              },
            ]}
          >
            <MaterialIcons
              name={SUBJECT_ICONS[session.subject] || SUBJECT_ICONS.default}
              size={22}
              color={PRIORITY_ICON_COLOR[session.priority] || COLORS.onSurface}
            />
          </View>
          <View style={styles.sessionContent}>
            <Text style={styles.sessionTitle}>
              {session.subject} {session.topic}
            </Text>
            <View style={styles.sessionTime}>
              <MaterialIcons
                name="schedule"
                size={14}
                color={COLORS.onSurfaceVariant}
              />
              <Text style={styles.sessionTimeText}>
                {session.startTime} - {session.endTime}
              </Text>
            </View>
            {session.location && (
              <View style={styles.locationRow}>
                <MaterialIcons
                  name="place"
                  size={14}
                  color={COLORS.onSurfaceVariant}
                />
                <Text style={styles.locationText}>{session.location}</Text>
              </View>
            )}
          </View>
        </View>
        <PriorityBadge
          priority={session.priority as 'ALTA' | 'MEDIA' | 'BAJA'}
        />
      </View>

      <View style={styles.sessionBottom}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit(session.id)}
          >
            <MaterialIcons
              name="edit"
              size={18}
              color={COLORS.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onDelete(session.id)}
          >
            <MaterialIcons name="delete" size={18} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer + '20',
  },
  sessionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sessionInfo: {
    flexDirection: 'row',
    gap: 14,
    flex: 1,
    marginRight: 10,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionContent: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 4,
  },
  sessionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sessionTimeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  sessionBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainer + '20',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
