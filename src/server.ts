import app from './app'

const HOST = '0.0.0.0'
const PORT = 8080

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${HOST}:${PORT}`)
})
