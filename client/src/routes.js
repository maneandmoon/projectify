import App from "./App";
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import ProjectPage from './components/ProjectPage';
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
        path: "/profile",
        element: <UserProfile />
    },
    {
        path: "/projects",
        element: <ProjectPage />
    },
    // {
    //     path: "/search",
    //     element: <Search />
    // },    
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/interests",
        element: <InterestList />
    }]
    }
];


export default routes;