import React from 'react'
import type { ReactNode } from 'react';

import AdminLayoutCSR from '@/components/Admin/AdminLayoutCSR';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AdminLayoutCSR>
            {children}
        </AdminLayoutCSR>
    );
}
