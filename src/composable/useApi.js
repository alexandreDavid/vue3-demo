import axios from 'axios'

export default async (url, callback, { error = {}, loading = {} }) => {
  error.value = false
  loading.value = true
  try {
    callback((await axios.get(url)).data)
  } catch (err) {
    error.value = err
  }
  loading.value = false
}