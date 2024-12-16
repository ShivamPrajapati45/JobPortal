import AdminJobs from "@/components/admin/AdminJobs";
import Applicants from "@/components/admin/Applicants";
import Companies from "@/components/admin/Companies";
import CompanySetup from "@/components/admin/CompanySetup";
import CreateCompany from "@/components/admin/CreateCompany";
import PostJob from "@/components/admin/PostJob";
import Login from "@/Pages/auth/Login";
import Signup from "@/Pages/auth/Signup";
import Browse from "@/Pages/Browse";
import JobDetails from "@/Pages/JobDetails";
import Jobs from "@/Pages/Jobs";
import Profile from "@/Pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@/components/Home";

export const allRoutes = [
    {
        path: '*',
        element: <div>PAGE NOT FOUND</div>
    },
    {
        path: '/home',
        element: <ProtectedRoute component={Home}/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },

    {
        path: '/jobs',
        exact: true,
        element: <ProtectedRoute component={Jobs}/>
    },
    {
        path: '/search',
        exact: true,
        element: <ProtectedRoute component={Browse}/>
    },
    {
        path: '/profile',
        exact: true,
        element: <ProtectedRoute component={Profile}/>
    },
    {
        path: '/details/:id',
        exact: true,
        element: <JobDetails/>
    },
    {
        path: '/admin/companies',
        exact: true,
        element: <ProtectedRoute component={Companies}/>
    },
    {
        path: '/admin/companies/create',
        exact: true,
        element: <ProtectedRoute component={CreateCompany}/>
    },
    {
        path: '/admin/companies/:id',
        exact: true,
        element: <ProtectedRoute component={CompanySetup}/>
    },
    {
        path: '/admin/jobs',
        exact: true,
        element: <ProtectedRoute component={AdminJobs}/>
    },
    {
        path: '/admin/job/create',
        exact: true,
        element: <PostJob/>
    },
    {
        path: '/admin/jobs/:id/applicants',
        exact: true,
        element: <ProtectedRoute component={Applicants}/>
    },
]