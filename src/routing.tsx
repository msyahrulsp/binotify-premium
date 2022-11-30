import Home from './pages/Root';
import ErrorPage from './pages/ErrorPage';
// import ManageSong from "./pages/ManageSong/EditSong"
import SongList from './pages/ManageSong';
import EditSong from './pages/ManageSong/EditSong';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import { SubscriptionPage } from './pages/SubscriptionPage';

export const Routing = [
  {
    title: 'Home',
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        title: 'Manage Song',
        path: 'singer/:singerid/songs',
        element: <SongList />
      },
      {
        title: 'Manage Song',
        path: 'singer/:singerid/songs/:songid',
        element: <EditSong />
      },
      {
        title: 'Subscription',
        path: '/subscription',
        element: <SubscriptionPage />
      }
    ]
  },
  {
    title: 'Login',
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    title: 'Register',
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />
  }
];
