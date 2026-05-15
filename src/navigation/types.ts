import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Tabs: undefined;
  NuevaSesion: { sessionId?: string } | undefined;
  NuevaTarea: undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Agenda: undefined;
  Estudio: undefined;
  Métricas: undefined;
  Tareas: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
