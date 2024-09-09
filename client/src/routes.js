import App from "./App";
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import Projects from './components/Projects';
import Search from './components/Search';
import Login from './components/Login';
import InterestsList from './components/InterestsList';

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
        element: <Projects />
    },
    {
        path: "/Search",
        element: <Search />
    },    
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/InterestsList",
        element: <InterestsList />
    }]
    }
];


export default routes;