import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { storage } from './firebase'
import { useParams } from 'react-router-dom'
import { MessageContext } from '../../App'

const AddSong = () => {
  const { message, setMessageContent } = useContext(MessageContext)
  const { singerid } = useParams()
  const [songTitle, setSongTitle] = useState('')
  const [progress, setProgress] = useState(0)

  const baseUrl = import.meta.env.VITE_BASE_REST_URL

  const uploadFile = (file, date) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `files/${file.name} - ${date}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(prog)
          },
          (err) => {
            console.log(err)
            reject(err)
          },
          async () => {
            const donwloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            setProgress(0)
            console.log('download url setted')
            resolve(donwloadURL)
          }
        )
      } else {
        reject('broken files')
      }
    })
  }

  const addSongToDB = async (judul, audio_path, penyanyi_id) => {
    // using REST API
    try {
      const payload = {
        judul: judul,
        audio_path: audio_path,
        penyanyi_id: penyanyi_id,
      }
      const res = await axios.post(`${baseUrl}/singer/${singerid}/songs`, payload)
      
      console.log('song added', res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const file = e.target[1].files[0]
    const fileDate = file.lastModifiedDate.toISOString()

    uploadFile(file, fileDate).then((songPath) => {
      addSongToDB(songTitle, songPath, singerid)
      setMessageContent('New song is added.')
      setSongTitle('')
      e.target.reset();
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <VStack gap={2} alignItems="flex-start" mb={4}>
          <FormControl>
            <FormLabel>Judul</FormLabel>
            <Input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Song File</FormLabel>
            <Input type="file" id="songFile" />
          </FormControl>
          {progress === 0 ? null : <Text>Uploading {progress}%</Text>}
          <HStack>
            <Button colorScheme="teal" size="sm" type="submit">
              Add
            </Button>
          </HStack>
        </VStack>
      </form>
    </div>
  )
}

export default AddSong
