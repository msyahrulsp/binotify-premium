import Home from "./pages/Root"
import ErrorPage from "./pages/ErrorPage"
// import ManageSong from "./pages/ManageSong/EditSong"
import SongList from "./pages/ManageSong"
import EditSong from "./pages/ManageSong/EditSong"

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
      },
      {
        title: 'Manage Song',
        path: 'singer/:singerid/songs/:songid',
        element: <EditSong/>
      }
    ]
  },

]