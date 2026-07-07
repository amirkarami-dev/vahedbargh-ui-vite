import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { NonAuthLayout } from '@/layouts/NonAuthLayout'
import { VerticalLayout } from '@/layouts/VerticalLayout'
import { RequireRole } from '@/routes/RequireRole'
import { PageFallback } from '@/shared/components/PageFallback'
import { Role } from '@/shared/types/roles'

// Pages are lazy-loaded so each becomes its own JS chunk (smaller first load).
const Login = lazy(() => import('@/features/auth/Login').then(m => ({ default: m.Login })))
const SubmitSms = lazy(() =>
  import('@/features/auth/SubmitSms').then(m => ({ default: m.SubmitSms })),
)
const Dashboard = lazy(() =>
  import('@/features/dashboard/Dashboard').then(m => ({ default: m.Dashboard })),
)
const BaseInfoPage = lazy(() =>
  import('@/features/baseInfo/BaseInfoPage').then(m => ({ default: m.BaseInfoPage })),
)
const ElectProjectsPage = lazy(() =>
  import('@/features/electProjects/ElectProjectsPage').then(m => ({ default: m.ElectProjectsPage })),
)
const ElectProjectsPanelMakerPage = lazy(() =>
  import('@/features/electProjects/ElectProjectsPanelMakerPage').then(m => ({
    default: m.ElectProjectsPanelMakerPage,
  })),
)
const CreateProjectPage = lazy(() =>
  import('@/features/electProjects/CreateProjectPage').then(m => ({ default: m.CreateProjectPage })),
)
const ProjectsWizardPage = lazy(() =>
  import('@/features/electProjects/ProjectsWizardPage').then(m => ({ default: m.ProjectsWizardPage })),
)
const ElectProjectProcessEngPage = lazy(() =>
  import('@/features/electProjectProcess/ElectProjectProcessEngPage').then(m => ({
    default: m.ElectProjectProcessEngPage,
  })),
)
const ElectProjectProcessPage = lazy(() =>
  import('@/features/electProjectProcess/ElectProjectProcessPage').then(m => ({
    default: m.ElectProjectProcessPage,
  })),
)
const ElectProjectProcessEdcPage = lazy(() =>
  import('@/features/electProjectProcess/ElectProjectProcessEdcPage').then(m => ({
    default: m.ElectProjectProcessEdcPage,
  })),
)
const ElectProjectProcessListPage = lazy(() =>
  import('@/features/electProjectProcess/ElectProjectProcessListPage').then(m => ({
    default: m.ElectProjectProcessListPage,
  })),
)
const SupportPage = lazy(() =>
  import('@/features/support/SupportPage').then(m => ({ default: m.SupportPage })),
)
const TicketPage = lazy(() =>
  import('@/features/support/TicketPage').then(m => ({ default: m.TicketPage })),
)
const AccountingPage = lazy(() =>
  import('@/features/accounting/AccountingPage').then(m => ({ default: m.AccountingPage })),
)
const EngWorkPage = lazy(() =>
  import('@/features/engWork/EngWorkPage').then(m => ({ default: m.EngWorkPage })),
)
const ElectProjectsReportPage = lazy(() =>
  import('@/features/reports/ElectProjectsReportPage').then(m => ({
    default: m.ElectProjectsReportPage,
  })),
)
const EngInvoiceReportPage = lazy(() =>
  import('@/features/reports/EngInvoiceReportPage').then(m => ({ default: m.EngInvoiceReportPage })),
)
const EngineersReportPage = lazy(() =>
  import('@/features/reports/EngineersReportPage').then(m => ({ default: m.EngineersReportPage })),
)
const EngPaymentPage = lazy(() =>
  import('@/features/engPayment/EngPaymentPage').then(m => ({ default: m.EngPaymentPage })),
)
const PublicLayout = lazy(() =>
  import('@/features/public/landing/layout/PublicLayout').then(m => ({ default: m.PublicLayout })),
)
const Landing = lazy(() =>
  import('@/features/public/landing/pages/Landing').then(m => ({ default: m.Landing })),
)
const AnnouncementsPage = lazy(() =>
  import('@/features/public/landing/pages/AnnouncementsPage').then(m => ({ default: m.AnnouncementsPage })),
)
const AnnouncementDetailPage = lazy(() =>
  import('@/features/public/landing/pages/AnnouncementDetailPage').then(m => ({
    default: m.AnnouncementDetailPage,
  })),
)
const MeetingsPage = lazy(() =>
  import('@/features/public/landing/pages/MeetingsPage').then(m => ({ default: m.MeetingsPage })),
)
const MeetingDetailPage = lazy(() =>
  import('@/features/public/landing/pages/MeetingDetailPage').then(m => ({ default: m.MeetingDetailPage })),
)
const ArchivePage = lazy(() =>
  import('@/features/public/landing/pages/ArchivePage').then(m => ({ default: m.ArchivePage })),
)
const ServicesPage = lazy(() =>
  import('@/features/public/landing/pages/ServicesPage').then(m => ({ default: m.ServicesPage })),
)
const ProcessesPage = lazy(() =>
  import('@/features/public/landing/pages/ProcessesPage').then(m => ({ default: m.ProcessesPage })),
)
const AboutPage = lazy(() =>
  import('@/features/public/landing/pages/AboutPage').then(m => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('@/features/public/landing/pages/ContactPage').then(m => ({ default: m.ContactPage })),
)
const UsersPage = lazy(() =>
  import('@/features/users/UsersPage').then(m => ({ default: m.UsersPage })),
)
const MyFilesPage = lazy(() =>
  import('@/features/userFiles/MyFilesPage').then(m => ({ default: m.MyFilesPage })),
)
const ProfilePage = lazy(() =>
  import('@/features/auth/ProfilePage').then(m => ({ default: m.ProfilePage })),
)
const AnnouncementsAdminPage = lazy(() =>
  import('@/features/admin/landing/AnnouncementsAdminPage').then(m => ({ default: m.AnnouncementsAdminPage })),
)
const MeetingsAdminPage = lazy(() =>
  import('@/features/admin/landing/MeetingsAdminPage').then(m => ({ default: m.MeetingsAdminPage })),
)
const DocumentsAdminPage = lazy(() =>
  import('@/features/admin/landing/DocumentsAdminPage').then(m => ({ default: m.DocumentsAdminPage })),
)
const StatsAdminPage = lazy(() =>
  import('@/features/admin/landing/StatsAdminPage').then(m => ({ default: m.StatsAdminPage })),
)
const ContactMessagesPage = lazy(() =>
  import('@/features/admin/landing/ContactMessagesPage').then(m => ({ default: m.ContactMessagesPage })),
)
const ProjectPublicPage = lazy(() =>
  import('@/features/public/ProjectPublicPage').then(m => ({ default: m.ProjectPublicPage })),
)
const PaymentPublicPage = lazy(() =>
  import('@/features/public/PaymentPublicPage').then(m => ({ default: m.PaymentPublicPage })),
)

const withSuspense = (node: ReactNode) => <Suspense fallback={<PageFallback />}>{node}</Suspense>

// Route table. Per-route role limits come from old-ui/src/routes/allRoutes.js.
// The protected group below only checks authentication; specific routes add
// <RequireRole roles={[...]}> for role gating.
export const router = createBrowserRouter([
  {
    // Public landing zone (anonymous). '/' is the landing site; its login CTA
    // links to /login. Wrapped in the Tailwind-scoped PublicLayout.
    element: withSuspense(<PublicLayout />),
    children: [
      { path: '/', element: withSuspense(<Landing />) },
      { path: '/announcements', element: withSuspense(<AnnouncementsPage />) },
      { path: '/announcements/:slug', element: withSuspense(<AnnouncementDetailPage />) },
      { path: '/meetings', element: withSuspense(<MeetingsPage />) },
      { path: '/meetings/:id', element: withSuspense(<MeetingDetailPage />) },
      { path: '/archive', element: withSuspense(<ArchivePage />) },
      { path: '/services', element: withSuspense(<ServicesPage />) },
      { path: '/processes', element: withSuspense(<ProcessesPage />) },
      { path: '/about', element: withSuspense(<AboutPage />) },
      { path: '/contact', element: withSuspense(<ContactPage />) },
    ],
  },
  {
    element: <NonAuthLayout />,
    children: [
      { path: '/login', element: withSuspense(<Login />) },
      { path: '/submit-sms', element: withSuspense(<SubmitSms />) },
      { path: '/ep', element: withSuspense(<ProjectPublicPage />) },
      { path: '/tp', element: withSuspense(<PaymentPublicPage />) },
    ],
  },
  {
    element: (
      <RequireRole>
        <VerticalLayout />
      </RequireRole>
    ),
    children: [
      { path: '/dashboard', element: withSuspense(<Dashboard />) },
      { path: '/profile', element: withSuspense(<ProfilePage />) },
      {
        path: '/BaseInfo/ExeEng',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Accountant, Role.Section]}>
            {withSuspense(<BaseInfoPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjects',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Section, Role.Employee]}>
            {withSuspense(<ElectProjectsPage />)}
          </RequireRole>
        ),
      },
      {
        // ElectAdmin's project list (old-ui ElectProjectsEdc). Same list component;
        // columns adapt to the ElectAdmin role.
        path: '/projects/ElectProjectsEdc',
        element: (
          <RequireRole roles={[Role.ElectAdmin]}>
            {withSuspense(<ElectProjectsPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/CreateProject',
        element: (
          <RequireRole roles={[Role.ElectAdmin]}>{withSuspense(<CreateProjectPage />)}</RequireRole>
        ),
      },
      {
        path: '/projects/create',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Section]}>
            {withSuspense(<ProjectsWizardPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjectsPanelMaker',
        element: (
          <RequireRole roles={[Role.PanelMaker]}>
            {withSuspense(<ElectProjectsPanelMakerPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjectProcessEng',
        element: (
          <RequireRole roles={[Role.Engineer]}>
            {withSuspense(<ElectProjectProcessEngPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjectProcess',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Section]}>
            {withSuspense(<ElectProjectProcessPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjectProcessEdc',
        element: (
          <RequireRole roles={[Role.ElectAdmin]}>
            {withSuspense(<ElectProjectProcessEdcPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/projects/ElectProjectProcessList',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Section]}>
            {withSuspense(<ElectProjectProcessListPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/support',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Engineer, Role.Employee, Role.Accountant]}>
            {withSuspense(<SupportPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/support/:id',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Engineer, Role.Employee, Role.Accountant]}>
            {withSuspense(<TicketPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/accounting',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Engineer, Role.Accountant, Role.Section]}>
            {withSuspense(<AccountingPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/EngWork',
        element: (
          <RequireRole roles={[Role.Administrator, Role.Engineer, Role.Employee, Role.Accountant]}>
            {withSuspense(<EngWorkPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/reports/electProjects',
        element: (
          <RequireRole roles={[Role.Administrator]}>
            {withSuspense(<ElectProjectsReportPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/reports/engInvoices',
        element: (
          <RequireRole roles={[Role.Accountant]}>
            {withSuspense(<EngInvoiceReportPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/reports/engReports',
        element: (
          <RequireRole roles={[Role.Engineer]}>
            {withSuspense(<EngineersReportPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/accounting/EngPayment',
        element: (
          <RequireRole roles={[Role.Accountant]}>
            {withSuspense(<EngPaymentPage />)}
          </RequireRole>
        ),
      },
      {
        path: '/users',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<UsersPage />)}</RequireRole>
        ),
      },
      {
        path: '/admin/landing/announcements',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<AnnouncementsAdminPage />)}</RequireRole>
        ),
      },
      {
        path: '/admin/landing/meetings',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<MeetingsAdminPage />)}</RequireRole>
        ),
      },
      {
        path: '/admin/landing/documents',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<DocumentsAdminPage />)}</RequireRole>
        ),
      },
      {
        path: '/admin/landing/stats',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<StatsAdminPage />)}</RequireRole>
        ),
      },
      {
        path: '/admin/landing/contact',
        element: (
          <RequireRole roles={[Role.Administrator]}>{withSuspense(<ContactMessagesPage />)}</RequireRole>
        ),
      },
      {
        path: '/userFile',
        element: (
          <RequireRole
            roles={[Role.Administrator, Role.Engineer, Role.PanelMaker, Role.ElectAdmin, Role.Section]}
          >
            {withSuspense(<MyFilesPage />)}
          </RequireRole>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
