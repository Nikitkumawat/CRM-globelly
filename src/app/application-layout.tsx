import {
  ArrowRightStartOnRectangleIcon,
  BeakerIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChevronUpIcon,
  CircleStackIcon,
  ClipboardIcon,
  CurrencyDollarIcon,
  FolderIcon,
  HomeIcon,
  InformationCircleIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
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

              <SidebarItem href="/projects" current={location.pathname === '/projects'}>
                <FolderIcon />
                <SidebarLabel>Projects</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/global-config" current={location.pathname === '/global-config'}>
                <InformationCircleIcon />
                <SidebarLabel>Global Config</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/leads" current={location.pathname === '/leads'}>
                <UserGroupIcon />
                <SidebarLabel>Leads</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/data" current={location.pathname === '/data'}>
                <FolderIcon />
                <SidebarLabel>Data</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/invoice" current={location.pathname === '/invoice'}>
                <CurrencyDollarIcon />
                <SidebarLabel>Invoice</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/reports" current={location.pathname === '/reports'}>
                <CircleStackIcon />
                <SidebarLabel>Reports</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/properties" current={location.pathname === '/properties'}>
                <BuildingOfficeIcon />
                <SidebarLabel>Properties</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/attendance" current={location.pathname === '/attendance'}>
                <CalendarIcon />
                <SidebarLabel>Attendance</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/tasks" current={location.pathname === '/tasks'}>
                <ClipboardIcon />
                <SidebarLabel>Tasks</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/team" current={location.pathname === '/team'}>
                <UserIcon />
                <SidebarLabel>Team</SidebarLabel>
              </SidebarItem>

              <SidebarItem href="/org-profile" current={location.pathname === '/org-profile'}>
                <BuildingOfficeIcon />
                <SidebarLabel>Org Profile</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {/* Admin section only visible with permission */}
            {globalPermissions.includes('PermissionNameDTO.AUTH_USER_UPDATE') && (
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

            {/* Additional Links */}
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

            {/* Help Section */}
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
