import Home from "./Home"
import ErrorPage from "./pages/ErrorPage"
// import ManageSong from "./pages/ManageSong/EditSong"
import SongList from "./pages/ManageSong"

export const Routing = [
  {
    title: 'Home',
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      {
        title: 'Manage Song',
        path: 'singer/:singerid/songs',
        element: <SongList/>
      }
    ]
  },

]