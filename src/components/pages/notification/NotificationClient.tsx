'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import {
  CircleAlert,
  HandHelping,
  BookOpenText,
  BadgeCheck,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

type NoticeType = 'urgent' | 'information' | 'advice' | 'achievement';

type Notice = {
  id: string;
  type: NoticeType;
  text: string;
  created_at: string; // ISO
  isWatched: boolean;
};

const NOTICE: Notice[] = [
  { id: '1', type: 'urgent', text: 'The task deadline is approaching, only "06:04:52" left until it expires.', isWatched: false, created_at: '2025-08-24' },
  { id: '2', type: 'information', text: 'You have successfully registered, now you are part of the big Task Hub family. For our family members, we have special privileges: link...', isWatched: false, created_at: '2025-08-24' },
  { id: '3', type: 'information', text: 'You have been added to the "General" channel — this is the main channel for all Task Hub users.', isWatched: false, created_at: '2025-08-24' },
  { id: '4', type: 'advice', text: 'Complete your profile setup on the Settings page — this will make your profile more secure and appealing.', isWatched: false, created_at: '2025-08-24' },
  { id: '5', type: 'achievement', text: 'Congratulations! You have unlocked your first achievement: "Task Beginner" — for creating your first task in Task Hub.', isWatched: false, created_at: '2025-08-24' },
];

const TYPE_UI: Record<
  NoticeType,
  {
    icon: React.ComponentType<{ size?: number }>;
    box: string; // фон + бордер
    ring: string; // акцент подсветки
    pill: string; // бейдж даты
  }
> = {
  urgent: {
    icon: CircleAlert,
    box: 'bg-red-50 border-red-200',
    ring: 'ring-red-300',
    pill: 'bg-white text-red-700 border border-red-200',
  },
  information: {
    icon: BookOpenText,
    box: 'bg-gray-50 border-gray-200',
    ring: 'ring-gray-300',
    pill: 'bg-white text-gray-700 border border-gray-200',
  },
  advice: {
    icon: HandHelping,
    box: 'bg-amber-50 border-amber-200',
    ring: 'ring-amber-300',
    pill: 'bg-white text-amber-800 border border-amber-200',
  },
  achievement: {
    icon: BadgeCheck,
    box: 'bg-green-50 border-green-200',
    ring: 'ring-green-300',
    pill: 'bg-white text-green-700 border border-green-200',
  },
};

export default function NotificationClient() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = NOTICE.filter(n => (q ? n.text.toLowerCase().includes(q) : true));
    if (sortBy === 'type') {
      arr = [...arr].sort((a, b) => a.type.localeCompare(b.type));
    } else {
      arr = [...arr].sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    return arr;
  }, [query, sortBy]);

  return (
    <section className="mx-5 my-7 flex flex-col gap-6">
      <Title heading="page">Notice</Title>

      {/* toolbar */}
      <div className="flex flex-col gap-3 max-w-xl">
        <Textarea
          value={query}
          setValue={setQuery}
          placeholder="Search by word…"
        />
        <Tabs value={sortBy} onValueChange={(v)=>setSortBy(v as 'date'|'type')} className="bg-gray dark:bg-muted w-full shadow-sm rounded-md">
          <TabsList className="grid w-full grid-cols-2 rounded-md">
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="date">Date</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* list */}
      <ul className="flex flex-col gap-3">
        {items.map((n) => {
          const ui = TYPE_UI[n.type];
          const Icon = ui.icon;
          const isChecked = !!checked[n.id];

          return (
            <li key={n.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-3">
              {/* checkbox */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isChecked}
                    aria-checked={isChecked}
                    onChange={() =>
                      setChecked((m) => ({ ...m, [n.id]: !m[n.id] }))
                    }
                  />
                  <span
                    className={clsx(
                      'inline-flex h-5 w-5 items-center justify-center rounded border',
                      isChecked ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'
                    )}
                  >
                    {isChecked ? '✓' : ''}
                  </span>
                </label>
              </div>

              {/* card */}
              <div
                className={clsx(
                  'min-w-0 rounded-lg border dark:bg-gray-700  p-4 shadow-sm ring-1 ring-transparent transition-shadow',
                  ui.box,
                  isChecked && ui.ring
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">
                    <Icon size={22} />
                  </span>
                  <p
                    className="min-w-0 text-sm leading-6 text-gray-900 dark:text-gray-100 line-clamp-2"
                    title={n.text}
                  >
                    {n.text}
                  </p>
                </div>
              </div>

              {/* date pill */}
              <div className={clsx('self-stretch rounded-md px-3 py-2 text-xs flex items-center shadow-sm bg-white dark:bg-gray-700 shadow-neutral-400')}>
                {n.created_at}
              </div>
            </li>
          );
        })}

        {items.length === 0 && (
          <li className="rounded-md border border-dashed p-6 text-sm text-gray-600">
            Nothing found. Try another query.
          </li>
        )}
      </ul>
    </section>
  );
}
