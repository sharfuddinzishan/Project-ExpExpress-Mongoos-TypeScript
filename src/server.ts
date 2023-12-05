import app from './app'
import config from './app/config/config'

const bootstrap = () => {
  try {
    app.listen(config.port || 4000, () => {
      // eslint-disable-next-line no-console
      console.log(`port ${config.port} Listened Successfully`)
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Port Connection Error')
  }
}

bootstrap()
