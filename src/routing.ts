import ManageSong from "./pages/ManageSong"
import { PageRouting } from "./types/interface"

export const Routing: PageRouting[] = [
  {
    title: 'Manage Song',
    path: 'manage-song',
    component: ManageSong
  }
]