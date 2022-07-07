import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useStorage = () => {

  const storage = new Storage({
    size: 1000,
    defaultExpires: null,
    storageBackend: AsyncStorage,
    enableCache: true,
    sync: {
      // we'll talk about the details later.
    },
  })

  const setItem = async (key: string, value: any) => {
    try {
      await storage.save({
        key,
        data: value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getItem = async (key: string) => {
    try {
      const value = await storage.load({
        key,
      })
      return value
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = async (key: string) => {
    try {
      await storage.remove({
        key,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const clear = async () => {
    try {
      await storage.clearMap()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear
  }
}

export default useStorage
