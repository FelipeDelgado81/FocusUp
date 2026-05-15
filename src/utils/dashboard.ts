export function getGreetingMessage(): { title: string; subtitle: string } {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      title: '¡Buenos días!',
      subtitle: 'Empieza tu día con una sesión de estudio',
    };
  }

  if (hour < 18) {
    return {
      title: '¡Buenas tardes!',
      subtitle: '¿Listo para tu próxima sesión?',
    };
  }

  return {
    title: '¡Buenas noches!',
    subtitle: 'Última oportunidad para estudiar hoy',
  };
}

export function getDailyProgress(todayCount: number, target = 5): number {
  if (todayCount === 0) return 0;
  return Math.min((todayCount / target) * 100, 100);
}
