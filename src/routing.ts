import Home from "./Home"
import ManageSong from "./pages/ManageSong"
import SongList from "./pages/SongList"
import { PageRouting } from "./types/interface"

export const Routing: PageRouting[] = [
  {
    title: 'Manage Song',
    path: 'singer/:singerid/songs',
    component: SongList
  },
  {
    title: 'Home',
    path: '/',
    component: Home
  }
]