import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageContext } from '../../App'
import { uploadFile } from '../../util/helper'
import Notification from '../../components/Notification'

const EditSong: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_REST_URL

  const { singerid, songid } = useParams()

  const [songTitle, setSongTitle] = useState('')
  const [songPath, setSongPath] = useState('')
  const [progress, setProgress] = useState(0)
  const { message, setMessageContent } = useContext(MessageContext)

  useEffect(() => {
    fetchSong()
  }, [])

  const fetchSong = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/singer/${singerid}/songs/${songid}`
      )
      setSongTitle(res.data.judul)
      setSongPath(res.data.audio_path)
      console.log('data', res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const saveSongToDB = async (songTitle, songPath, singerid) => {
    const payload = {
      song_id: parseInt(songid),
      judul: songTitle,
      penyanyi_id: singerid,
      audio_path: songPath,
    }
    console.log('payload', payload)
    try {
      const res = await axios.put(
        `${baseUrl}/singer/${singerid}/songs/${songid}`,
        payload
      )
      console.log('song added', res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSongTitle = (event) => {
    setSongTitle(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const file = e.target[1].files[0]

    if (file) {
      const fileDate = file.lastModifiedDate.toISOString()
      uploadFile(file, fileDate, setProgress).then((songPath) => {
        setSongPath(songPath)
        setMessageContent('Lagu telah diperbarui.')
        setSongTitle(songTitle)
        saveSongToDB(songTitle, songPath, singerid)
      })
    } else {
      setMessageContent('Lagu telah diperbarui.')
      setSongTitle(songTitle)
      saveSongToDB(songTitle, songPath, singerid)
    }
  }

  return (
    <Flex flexGrow={1} justifyContent="flex-start" flexDirection="column">
      <Notification message={message} />
      <Text>
        singerid: {singerid} songid: {songid}
      </Text>
      <Text fontSize="3xl" mb={4}>
        Edit Lagu
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl>
            <FormLabel>Judul</FormLabel>
            <Input
              type="text"
              value={songTitle ? songTitle : ''}
              onChange={handleSongTitle}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Audio Path
              <br />
            </FormLabel>
            <Text maxW="container.lg" mb={2}>{songPath ? songPath : 'Loading...'}</Text>{' '}
            <Input type="file" />
          </FormControl>
          {progress === 0 ? null : <Text>Uploading {progress}%</Text>}
          <Button colorScheme="teal" size="sm" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

export default EditSong
