const node_ssh = require('node-ssh')
const path = require('path')
const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

const config = {
    host: '84.201.189.200',
    username: 'tixomirov95',
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: `${__dirname}/crypto/privatekey.ppk`,
    passphrase: '41514151'
  }

  const botDit = '/opt/currency-bot/'
  const localDir = path.normalize(`${__dirname}/../`)
  const tokensFileName = 'tokens.ts'

async function run() {

  const connect = await ssh.connect(config)

  const gitPullCommang = await ssh.execCommand('sudo git pull', { cwd: botDit })
  console.log('command git pull', gitPullCommang)

  const npmi = await ssh.execCommand('sudo npm i', { cwd: botDit })
  console.log('command npm i', npmi)

  //Копирую файл со своими токенами, а не пустой с гита
  /*const rmTokens = await ssh.execCommand('sudo rm ./tokens.ts', { cwd: `${botDit}src/configs/` })
  console.log('command rm ./tokens.ts', rmTokens)*/

  await ssh.putFile(`${localDir}/src/configs/${tokensFileName}`, `${botDit}src/configs/${tokensFileName}`)
  console.log('Локальный файл с токенами перенесен')

  const build = await ssh.execCommand('sudo npm run build', { cwd: botDit })
  console.log('command build', build)

  const pm2Stop = await ssh.execCommand('sudo pm2 stop currency-bot', { cwd: botDit })
  console.log('command pm2Stop', pm2Stop)

  //Есть воч но почему-то не работает
  const pm2Start = await ssh.execCommand('sudo pm2 start ./build/app.js --name currency-bot', { cwd: botDit })
  console.log('command pm2Start', pm2Start)

  process.exit()
}

run()