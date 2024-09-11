import App from "./App";
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import ProjectList from './components/ProjectList';
import Search from './components/Search';
import Login from './components/Login';
import InterestList from './components/InterestList';

const routes = [
    {
    path: "/",
    element: <App />,
    children: [{
        path: "/",
        element: <HomePage />
    },
    {
        path: "/Profile",
        element: <UserProfile />
    },
    {
        path: "/Projects",
        element: <ProjectList />
    },
    // {
    //     path: "/Search",
    //     element: <Search />
    // },    
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/InterestList",
        element: <InterestList />
    }]
    }
];


export default routes;