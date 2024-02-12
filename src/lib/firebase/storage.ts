import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '@/lib/firebase/config/firebase'

export const uploadFile = async (file: File, path: string) => {
  try {
    const fileRef = ref(storage, `${path}/${file.name}`)

    await uploadBytes(fileRef, file)

    const url = await getDownloadURL(fileRef)

    return url
  } catch (error) {
    console.log('[STORAGE]: Fail to upload file ', error)
    return null
  }
}
