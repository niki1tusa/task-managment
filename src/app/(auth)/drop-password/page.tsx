import { DropPasswordClient } from '@/components/auth/drop-passoword/DropPasswordClient'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Drop-password',

}

export default function NewPasswordPage() {
    return <DropPasswordClient/>
}
