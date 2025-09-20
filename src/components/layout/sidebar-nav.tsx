'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, LayoutDashboard, MessageCircle, School, PanelLeft } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

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
  const { toggleSidebar, state } = useSidebar();

  return (
    <div className="flex flex-col h-full">
      <SidebarMenu className="flex-1">
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
      <div className="p-2 mt-auto hidden md:block">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => toggleSidebar()}
        >
          <PanelLeft
            className={cn(
              'h-5 w-5 transition-transform duration-300',
              state === 'collapsed' && 'rotate-180'
            )}
          />
          <span className="group-data-[collapsible=icon]:hidden">Collapse</span>
        </Button>
      </div>
    </div>
  );
}
