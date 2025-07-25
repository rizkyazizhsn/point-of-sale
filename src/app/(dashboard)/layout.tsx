import { Separator } from '@/components/ui/separator'
import AppSidebar from '@/components/common/app-sidebar'
import { DarkModeToggle } from '@/components/common/darkmode-toggle'
import DashboardBreadcrumb from './_components/dashboard-breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='overflow-x-hidden'>
        <header className='flex justify-between h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='cursor-pointer' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <DashboardBreadcrumb />
          </div>
          <div className='px-4'>
            <DarkModeToggle />
          </div>
        </header>
        <main className='flex flex-1 flex-col items-start gap-4 p-4 pt-0'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout