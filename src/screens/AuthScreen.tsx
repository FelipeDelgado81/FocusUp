import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS } from '../constants/theme';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Campos requeridos', 'Ingresa tu correo y contraseña.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Contraseña corta',
        'La contraseña debe tener al menos 6 caracteres.',
      );
      return;
    }

    setSubmitting(true);
    const credentials = { email: email.trim().toLowerCase(), password };
    const result = isRegistering
      ? await supabase.auth.signUp({
          ...credentials,
          options: { emailRedirectTo: 'focusup://' },
        })
      : await supabase.auth.signInWithPassword(credentials);
    setSubmitting(false);

    if (result.error) {
      Alert.alert('No fue posible continuar', result.error.message);
      return;
    }
    if (isRegistering && !result.data.session) {
      Alert.alert(
        'Revisa tu correo',
        'Confirma tu cuenta para comenzar a usar FocusUp.',
      );
    }
  };

  const sendPasswordReset = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      Alert.alert(
        'Correo requerido',
        'Ingresa tu correo para enviarte el enlace de recuperación.',
      );
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: 'focusup://',
    });
    setSubmitting(false);

    if (error) {
      Alert.alert('No fue posible enviar el correo', error.message);
      return;
    }

    Alert.alert(
      'Revisa tu correo',
      'Te enviamos un enlace para recuperar tu contraseña.',
    );
  };

  if (!isSupabaseConfigured) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Configura FocusUp</Text>
          <Text style={styles.copy}>
            Copia .env.example como .env y agrega las credenciales públicas de
            Supabase.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isRegistering ? 'Crea tu cuenta' : 'Bienvenido a FocusUp'}
        </Text>
        <Text style={styles.copy}>
          Organiza tu estudio y mantén tus datos sincronizados.
        </Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Correo electrónico"
          placeholderTextColor={COLORS.outline}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          placeholder="Contraseña"
          placeholderTextColor={COLORS.outline}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          disabled={submitting}
          style={styles.primary}
          onPress={submit}
        >
          <Text style={styles.primaryText}>
            {submitting
              ? 'Procesando...'
              : isRegistering
                ? 'Registrarme'
                : 'Iniciar sesión'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={submitting}
          onPress={() => setIsRegistering((value) => !value)}
        >
          <Text style={styles.link}>
            {isRegistering ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
          </Text>
        </TouchableOpacity>
        {!isRegistering && (
          <TouchableOpacity disabled={submitting} onPress={sendPasswordReset}>
            <Text style={styles.secondaryLink}>Olvide mi contraseña</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  card: {
    gap: 14,
    padding: 24,
    borderRadius: RADIUS.xxl,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.onBackground },
  copy: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainerLow,
    color: COLORS.onSurface,
  },
  primary: {
    alignItems: 'center',
    padding: 16,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
  },
  primaryText: { color: COLORS.onPrimary, fontWeight: '700' },
  link: {
    textAlign: 'center',
    padding: 10,
    color: COLORS.primary,
    fontWeight: '700',
  },
  secondaryLink: {
    textAlign: 'center',
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
});
