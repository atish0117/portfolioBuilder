import { Client, Storage, ID } from 'appwrite'

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Appwrite Endpoint
  .setProject('685ba773000a9e14b538') // project ID

export const storage = new Storage(client)

export const BUCKET_ID = '685ba85e0026b9b324a4' //  bucket ID

export const uploadFile = async (file, type) => {
  try {
   const fileId=ID.unique()

    const response = await storage.createFile(
      BUCKET_ID,
      fileId,
      file
    )

    // Get file URL
    const fileUrl = storage.getFileView(BUCKET_ID, response.$id)

    console.log('File url successfully:', fileUrl)
    return {
      fileId: response.$id,
      fileUrl: fileUrl,
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw error

  }
}

export const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile(BUCKET_ID, fileId)
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
}
