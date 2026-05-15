import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../constants/theme';

import DashboardScreen from '../screens/DashboardScreen';
import AgendaScreen from '../screens/AgendaScreen';
import FocusZoneScreen from '../screens/FocusZoneScreen';
import MetricsScreen from '../screens/MetricsScreen';
import TasksScreen from '../screens/TasksScreen';
import NewSessionScreen from '../screens/NewSessionScreen';
import NewTaskScreen from '../screens/NewTaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type IconName = keyof typeof MaterialIcons.glyphMap;

interface TabItem {
  name: string;
  icon: IconName;
  component: React.ComponentType;
}

const TAB_ITEMS: TabItem[] = [
  { name: 'Inicio', icon: 'home', component: DashboardScreen },
  { name: 'Agenda', icon: 'calendar-month', component: AgendaScreen },
  { name: 'Estudio', icon: 'timer', component: FocusZoneScreen },
  { name: 'Métricas', icon: 'analytics', component: MetricsScreen },
  { name: 'Tareas', icon: 'checklist', component: TasksScreen },
];

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.background + 'ee',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
          paddingHorizontal: 8,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.04,
              shadowRadius: 24,
            },
            android: { elevation: 12 },
          }),
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.onSurfaceVariant + '99',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginTop: 2,
        },
      }}
    >
      {TAB_ITEMS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.activeTab : undefined}>
                <MaterialIcons name={tab.icon} size={24} color={color} />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="NuevaSesion"
          component={NewSessionScreen}
          options={{
            headerShown: true,
            title: 'Nueva Sesión',
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.primary,
            headerTitleStyle: { fontWeight: '700', color: COLORS.onBackground },
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="NuevaTarea"
          component={NewTaskScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.taskId ? 'Editar Tarea' : 'Nueva Tarea',
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.primary,
            headerTitleStyle: { fontWeight: '700', color: COLORS.onBackground },
            presentation: 'modal',
            animation: 'slide_from_bottom',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: COLORS.primaryFixed + '80',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.lg,
  },
});
