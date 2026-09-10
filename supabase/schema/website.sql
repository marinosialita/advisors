create table public.website_submissions (
 id uuid primary key,
 kind text not null check (kind in ('contact','career')),
 name text not null check (length(name) between 1 and 150),
 email text not null check (length(email) <= 254),
 message text not null check (length(message) between 10 and 5000),
 details jsonb not null default '{}'::jsonb,
 consent boolean not null check (consent),
 locale text not null default 'en' check (locale in ('en','ru')),
 created_at timestamptz not null default now()
);
alter table public.website_submissions enable row level security;
revoke all on public.website_submissions from anon, authenticated;
grant select, insert, delete on public.website_submissions to service_role;
create index website_submissions_created_idx on public.website_submissions(created_at desc);
create table public.website_rate_limits (
 bucket text primary key,
 starts_at timestamptz not null,
 hits integer not null
);
alter table public.website_rate_limits enable row level security;
revoke all on public.website_rate_limits from anon, authenticated;
grant select, insert, update, delete on public.website_rate_limits to service_role;
create function public.website_take_quota(p_bucket text, p_seconds integer, p_limit integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare n integer;
begin
 if p_seconds < 1 or p_limit < 1 then return false; end if;
 insert into public.website_rate_limits(bucket, starts_at, hits)
 values(p_bucket, now(), 1)
 on conflict(bucket) do update set
 hits = case when website_rate_limits.starts_at + make_interval(secs => p_seconds) <= now() then 1 else website_rate_limits.hits + 1 end,
 starts_at = case when website_rate_limits.starts_at + make_interval(secs => p_seconds) <= now() then now() else website_rate_limits.starts_at end
 returning hits into n;
 return n <= p_limit;
end;
$$;
revoke all on function public.website_take_quota(text,integer,integer) from public,anon,authenticated;
grant execute on function public.website_take_quota(text,integer,integer) to service_role;
