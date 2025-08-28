'use client';

import { useQuery } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Avatar } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useChannelStore } from '@/store/channel.store';
import { useModalStore } from '@/store/modals.store';

import type { TChannelParticipantsRow, TChannelRow } from '../channel/channel.types';

import { getChannelParticipantsById } from '@/services/channel/channel-client.service';
import { useProfile } from '@/hooks/useProfile';

interface Props {
	channel: TChannelRow | null;
}
export default function PartySide({ channel }: Props) {
	const [sortedParty, setSortedPaty] = useState<'role' | 'a-z'>('role');
	const [searchProfileByName, setSearchProfileByName] = useState('');
	const { activeChannel } = useChannelStore();
	const { open } = useModalStore();
	const channelId = channel?.id;
	const { profile: currentProfile } = useProfile()
	const { data: participants, isLoading } = useQuery<TChannelParticipantsRow[]>({
		queryKey: ['channel_participants', channelId],
		queryFn: () => getChannelParticipantsById(channelId!),
		enabled: !!channelId,
	});
	const sortedProfiles =
		sortedParty === 'role'
			? participants
					?.filter(Boolean)
					.sort((a, b) => {
						if (a.role === 'owner') return -1;
						if (b.role === 'owner') return 1;
						return 0;
					})
					.map(p => p.profile)
					.flat()
			: participants
					?.map(p => p.profile)
					.flat()
					.filter(p => !!p.name)
					.sort((a, b) => a.name!.localeCompare(b.name!));

	const ownerChannel = participants?.find(p => p.role === 'owner');
	// search profile
	const handleSearch = searchProfileByName
		? sortedProfiles?.filter(channel =>
				channel.name?.toLowerCase().includes(searchProfileByName.trim().toLowerCase())
			)
		: sortedProfiles;
 return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden border-l-2">
      {/* Header */}
      <div className="mx-5 mt-7 mb-1">
        <Title heading="page">Party</Title>
      </div>
      <div className="border-b-2 shadow-sm" />

      <Tabs defaultValue="role" className="dark:bg-muted bg-gray w-full shadow-sm">
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b-2">
          <TabsTrigger onClick={() => setSortedPaty('role')} value="role">Role</TabsTrigger>
          <TabsTrigger onClick={() => setSortedPaty('a-z')} value="a-z">A-Z</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* field search */}
      <div className="mx-2 mt-2">
        <Textarea
          value={searchProfileByName}
          setValue={setSearchProfileByName}
          className="focus:ring-primary/40 w-full transition-colors focus:ring-1"
          rounded="rounded"
          placeholder="Search profile..."
        />
      </div>

      {/* LIST — именно он скроллится */}
      <div className="mx-2 my-2 flex-1 min-h-0">
        <div className="flex h-full min-h-0 flex-col gap-1 overflow-y-auto rounded border p-2 py-2 shadow shadow-neutral-400">
          {isLoading ? (
            <Skeleton width="mx-3 2xl:h-[300px]" length={1} />
          ) : (
            handleSearch?.map(profile => (
              <div
                key={profile.id}
                className="group flex items-center justify-between gap-2 px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="relative flex items-center gap-2 truncate p-1">
                  <div className="relative">
                    <Avatar img={profile.avatar_path} />
                    <div className="absolute top-5.5 right-0 h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500" />
                  </div>
                  <span className="group-hover:text-primary relative transition-colors dark:group-hover:text-white">
                    {profile.name}
                  </span>
                </div>

                {/* безопаснее с optional chaining */}
                {activeChannel?.created_by === profile.id && (
                  <span className="ml-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-semibold text-black">
                    OWNER
                  </span>
                )}

                {activeChannel?.type === 'group' && currentProfile?.id !== profile.id && (
                  <button
                    title="Remove user from a channel"
                    type="button"
                    onClick={() => open('deleteProfileFromPartyChannel', profile)}
                  >
                    <Trash2Icon
                      size={18}
                      className="text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fade overlay - ок, остается абсолютным внутри relative-родителя */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-50 h-8 w-full bg-gradient-to-t from-primary/10 to-transparent dark:from-gray/5" />
    </div>
  );
}
