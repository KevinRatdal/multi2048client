import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const SockTest = () => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [lastPong, setLastPong] = useState<string | null>(null)
    const [msg, setMsg] = useState('')
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true)
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        socket.on('serverTest', (...args) => {
            console.log(args)
            setLastPong(new Date().toISOString())
        })

        socket.on('receiveMessage', (message) => {
            setMsg(prev => prev + '---' + message)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('serverTest')
        }
    }, [])

    const sendTest = (message: string, gameId: string | undefined) => {
        if (gameId) {
            socket.emit('sendMessage', { message: message }, gameId)
        } else {
            socket.emit('sendMessage', { message: message })
        }
    } 
    const joinRoom = (gameId: string) => {
        socket.emit('joinRoom', gameId,(res: string) => {
           setMsg(prev => prev + '\t' +res)
        })
    } 
  return (
    <div>
          <p>Connected: {'' + isConnected}</p>
          <p>Last pong: {lastPong || '-'}</p>
          <p>msg: {msg || '-'}</p>
          <button onClick={() => sendTest('testglob', undefined)}>Send test glob</button>
          <button onClick={() => sendTest('testroommessage', 'ff33dd')}>Send test room</button>
          <button onClick={() => joinRoom('ff33dd')}> joinRoom</button>
    </div>
  )
}

export default SockTest