import type { RouteObject } from 'react-router'
import { Suspense, lazy } from 'react'

// 기본 페이지
const App = lazy(() => import('@/App.tsx'))
const Landing = lazy(() => import('@/pages/Landing'))
const Error = lazy(() => import('@/pages/Error'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// 유저 페이지
const UserLayout = lazy(() => import('@/components/layout/UserLayout'))
const UserDashboard = lazy(() => import('@/pages/User/UserDashboard.tsx'))
const Exam = lazy(() => import('@/pages/User/Exam.tsx'))

// 어드민 페이지
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout'))

export const PATH = {
  // 기본
  Landing: '/landing',

  // 유저
  USER_DASHBOARD: '/',
  EXAM: '/exam',

  // 어드민
  ADMIN: '/admin',
}

const routes: RouteObject[] = [
  {
    path: PATH.USER_DASHBOARD,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    errorElement: <Error isRootError />,
    children: [
      {
        // 랜딩 라우트
        path: PATH.Landing,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        // 도메인 라우트
        errorElement: <Error />,
        children: [
          {
            // 유저 라우트
            element: <UserLayout />,
            children: [
              {
                index: true,
                element: <UserDashboard />,
              },
              {
                path: PATH.EXAM,
                element: <Exam />,
              },
            ],
          },
          {
            // 어드민 라우트
            path: PATH.ADMIN,
            element: <AdminLayout />,
            children: [],
          },
        ],
      },
      {
        // 404 라우트
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

export default routes
