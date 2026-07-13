create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  topic text not null,
  scheduled_date date not null,
  start_time time not null,
  end_time time not null,
  priority text not null check (priority in ('ALTA', 'MEDIA', 'BAJA')),
  location text,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  due_date date,
  priority text not null check (priority in ('ALTA', 'MEDIA', 'BAJA')),
  category text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.pomodoro_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  study_session_id uuid references public.study_sessions(id) on delete set null,
  duration_minutes integer not null check (duration_minutes > 0),
  completed_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.study_sessions enable row level security;
alter table public.tasks enable row level security;
alter table public.pomodoro_logs enable row level security;

create policy "Users manage their profile" on public.profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "Users manage their sessions" on public.study_sessions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users manage their tasks" on public.tasks for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users manage their pomodoros" on public.pomodoro_logs for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute procedure public.create_profile_for_new_user();
