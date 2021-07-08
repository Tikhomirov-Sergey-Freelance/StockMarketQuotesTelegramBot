import initMongo from './init-mongo'
import initBot from './init-bot'
import initCommands from './init-commands'

const init = async () => {
    
    initMongo()
    await initBot()
    initCommands()

}

init()