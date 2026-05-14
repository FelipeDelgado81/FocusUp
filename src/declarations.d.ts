declare module '@expo/vector-icons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface MaterialIconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
  }

  export class MaterialIcons extends Component<MaterialIconsProps> {
    static glyphMap: Record<string, number>;
  }
}
