import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SongList = () => {
  /**
   * penyanyi dapat melihat daftar lagu-lagu premium miliknya
   */
  const { singerid } = useParams()
  const [songs, setSongs] = useState([])

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/songs/singer/${singerid}`)
      console.log('res', res.data)
      setSongs(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <div>
      {songs.map(({song_id, judul, penyayi_id, audio_path, name}) => {
        return <div key={song_id}>{song_id} {judul} {penyayi_id} {audio_path} {name}</div>
      })}
    </div>
  )
}

export default SongList
