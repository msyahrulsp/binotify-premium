import Home from "./Home"
import ManageSong from "./pages/ManageSong/EditSong"
import SongList from "./pages/ManageSong"
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