'use client';

import { useState } from 'react';
import {
  Users,
  Settings,
  Database,
  ChevronDown,
  UserPlus,
  UserCheck,
  Shield,
  Lock,
  Monitor,
  Bell,
  FileText,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const menuItems = [
  {
    title: 'User Management',
    icon: Users,
    items: [
      { title: 'All Users', icon: Users },
      { title: 'Add User', icon: UserPlus },
      { title: 'User Roles', icon: UserCheck },
      { title: 'Permissions', icon: Shield },
    ],
  },
  {
    title: 'System Settings',
    icon: Settings,
    items: [
      { title: 'General', icon: Settings },
      { title: 'Security', icon: Lock },
      { title: 'Monitoring', icon: Monitor },
      { title: 'Notifications', icon: Bell },
    ],
  },
  {
    title: 'Database Operations',
    icon: Database,
    items: [
      { title: 'Query Builder', icon: Database },
      { title: 'Backups', icon: FileText },
      { title: 'Analytics', icon: BarChart3 },
      { title: 'Performance', icon: Activity },
    ],
  },
];

interface AdminSidebarProps {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
}

export default function AdminSidebar({ activeItem, onItemSelect }: AdminSidebarProps) {
  const [openGroups, setOpenGroups] = useState<string[]>(['User Management']);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const handleItemClick = (item: string) => {
    onItemSelect?.(item);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((group) => (
                <Collapsible
                  key={group.title}
                  open={openGroups.includes(group.title)}
                  onOpenChange={() => toggleGroup(group.title)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <group.icon className="h-4 w-4" />
                        <span>{group.title}</span>
                        <ChevronDown
                          className={`ml-auto h-4 w-4 transition-transform ${
                            openGroups.includes(group.title) ? 'rotate-180' : ''
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              onClick={() => handleItemClick(item.title)}
                              isActive={activeItem === item.title}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}