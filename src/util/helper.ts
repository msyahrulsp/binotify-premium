import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from './firebase'

export const uploadFile = (file, date, setProgress) => {
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