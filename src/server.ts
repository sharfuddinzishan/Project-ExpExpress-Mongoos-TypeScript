import app from './app'
import config from './app/config'

const bootstrap = () => {
  try {
    app.listen(config.port || 4000, () => {
      console.log(`port ${config.port} Listened Successfully`)
    })
  } catch (error) {
    console.log('Port Connection Error')
  }
}

bootstrap()
