'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, LayoutDashboard, MessageCircle, School } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/career-chat',
    label: 'Career Chat',
    icon: MessageCircle,
  },
  {
    href: '/colleges',
    label: 'Colleges',
    icon: School,
  },
  {
    href: '/success-stories',
    label: 'Success Stories',
    icon: Award,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
              className={cn(
                'group',
                pathname === item.href &&
                  'bg-primary/10 text-primary hover:bg-primary/20'
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5 text-primary/80 group-hover:text-primary" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
