select *
from public.waitlist_signups
order by created_at desc;

select plan, count(*) as signup_count
from public.waitlist_signups
group by plan
order by signup_count desc;

select stage, count(*) as signup_count
from public.waitlist_signups
group by stage
order by signup_count desc;

select bottleneck, count(*) as signup_count
from public.waitlist_signups
where bottleneck is not null
group by bottleneck
order by signup_count desc;
