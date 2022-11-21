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
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditSong: React.FC = () => {
  const url = 'http://127.0.0.1:3000'

  const { singerid, songid } = useParams()

  // const [song, setSong] = useState(null)
  const [songTitle, setSongTitle] = useState(null)
  const [songPath, setSongPath] = useState(null)

  const fetchSong = async () => {
    try {
      const res = await axios.get(`${url}/singer/${singerid}/songs/${songid}`)
      setSongTitle(res.data[0].judul)
      setSongPath(res.data[0].audio_path)
    } catch (err) {
      console.error(err)
    }
  }

  const saveSong = async () => {
    const payload = {
      song_id: parseInt(songid),
      judul: songTitle,
      penyanyi_id: singerid,
      audio_path: songPath,
    }
    console.log('payload', payload)
    try {
      const res = await axios.post(
        `${url}/singer/${singerid}/songs/${songid}`,
        payload
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSong()
  }, [])

  const handleSongTitle = (event) => {
    setSongTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // post to endpoint that insert new song data
    setSongTitle(songTitle)
    setSongPath(songPath)
    saveSong()
  }

  return (
    <Flex flexGrow={1} justifyContent="flex-start" flexDirection="column">
      {singerid} {songid}
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
            <FormLabel>Audio Path</FormLabel>
            <Text mb={2}>
              Audio Path {songPath ? songPath : 'Loading...'}
            </Text>{' '}
            <Input type="file" />
          </FormControl>
          <Button colorScheme="teal" size="sm" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

export default EditSong
