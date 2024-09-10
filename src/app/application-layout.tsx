import {
  ArrowRightStartOnRectangleIcon,
  BeakerIcon,
  ChevronUpIcon,
  CircleStackIcon,
  FolderIcon,
  InformationCircleIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { HomeIcon } from '@heroicons/react/20/solid'
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from 'components/catalyst/dropdown'
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from 'components/catalyst/sidebar'
import { SidebarLayout } from 'components/catalyst/sidebar-layout'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContext.tsx'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout() {
  const location = useLocation()
  const { globalPermissions } = useAuth()
  
  return (
    <SidebarLayout
      navbar={null}
      sidebar={
        <Sidebar>
          <Header />

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={location.pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/projects" current={location.pathname === 'projects'}>
                <FolderIcon />
                <SidebarLabel>Projects</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {globalPermissions.includes("PermissionNameDTO.AUTH_USER_UPDATE") && (
              <SidebarSection>
                <SidebarHeading>Admin</SidebarHeading>
                <SidebarItem href="/users" current={location.pathname === '/users'}>
                  <UserIcon />
                  <SidebarLabel>Users</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/groups" current={location.pathname === '/groups'}>
                  <UserGroupIcon />
                  <SidebarLabel>Groups</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            )}

            <SidebarSection>
              <SidebarHeading>Links</SidebarHeading>
              <SidebarItem>
                <BeakerIcon />
                <SidebarLabel>Link 1</SidebarLabel>
              </SidebarItem>
              <SidebarItem>
                <CircleStackIcon />
                <SidebarLabel>Link 2</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarHeading>Help</SidebarHeading>
              <SidebarItem>
                <InformationCircleIcon />
                <SidebarLabel>Documentation</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  )
}

const Header = () => {
  const { principal } = useAuth()

  return (
    <SidebarHeader>
      <Dropdown>
        <DropdownButton as={SidebarItem}>
          <span className="flex min-w-0 items-center gap-3">
            <span className="min-w-0">
              <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                {principal?.firstName} {principal?.lastName}
              </span>
              <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                {principal?.email}
              </span>
            </span>
          </span>
          <ChevronUpIcon />
        </DropdownButton>
        <AccountDropdownMenu anchor="top start" />
      </Dropdown>
    </SidebarHeader>
  )
}
