import { Sidebar } from '@/components/sidebar/Sidebar'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <div className='border border-amber-500'>
        <Sidebar/>
        {children}
        </div>
}
