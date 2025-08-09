import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

// TODO: chat-sidebar должен пропадать когда на этой странице находишся, (layout?) 
export default function Page() {
	return <div className="flex h-full bg-gray-50 dark:bg-gray-900">

  <aside className="w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col">
    <div className="p-3">
      <input
        type="text"
        placeholder="Search messages..."
        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
      />
    </div>

    <div className="px-3 flex gap-2 mb-2">
      <button className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs">All</button>
      <button className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs">Unread</button>
      <button className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs">@Mentions</button>
    </div>

    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
        <img src="/avatar1.png" className="w-8 h-8 rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Project Alpha</p>
          <p className="text-xs text-gray-500 truncate">Last message preview...</p>
        </div>
        <span className="bg-blue-500 text-white rounded-full text-xs px-2">3</span>
      </div>
    </div>
  </aside>

  <main className="flex-1 flex flex-col">
    <div className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <img src="/avatar1.png" className="w-8 h-8 rounded-full" />
        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Project Alpha</h2>
      </div>
      <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        ⚙
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-center">
        <span className="text-xs text-gray-400">Today</span>
      </div>

      <div className="flex items-start gap-3">
        <img src="/avatar2.png" className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Alice</p>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
            Hey! Did you finish the task?
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 justify-end">
        <div>
          <div className="bg-blue-500 text-white rounded-xl px-3 py-2 text-sm">
            Yes, I just uploaded it!
          </div>
        </div>
        <img src="/my-avatar.png" className="w-8 h-8 rounded-full" />
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-sm">
        Send
      </button>
    </div>
  </main>

  <aside className="w-80 border-l border-gray-200 dark:border-gray-700 hidden lg:flex flex-col">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Task Context</h3>
    </div>
    <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-600 dark:text-gray-300">
      <p><strong>Title:</strong> Fix UI bug</p>
      <p><strong>Due:</strong> 12 Aug</p>
      <p><strong>Status:</strong> In progress</p>
    </div>
  </aside>
</div>
;
}
