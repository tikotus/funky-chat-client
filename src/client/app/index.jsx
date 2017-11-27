import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ChannelList from './ChannelList'
import MessageList from './MessageList'
import MessageField from './MessageField'
import NameSelection from './NameSelection'
import ClientList from './ClientList'
import store from './store'
import socket from './socket'

document.body.style.overflow = 'hidden'

const updateServerState = serverState => ({
	type: 'UPDATE_SERVER_STATE',
	serverState
})

const addMessage = (sender, text, channel) => ({
	type: 'ADD_MESSAGE',
	sender,
	text,
	channel
})

const changeChannel = (channel) => ({
	type: 'CHANGE_CHANNEL',
	channel
})

const setId = id => ({
	type: 'SET_ID',
	id
})

socket.on('connect', () => {
	socket.emit('init', id => store.dispatch(setId(id)))
	socket.emit('join', 'general')
})
socket.on('message', (sender, text, channel) => store.dispatch(addMessage(sender, text, channel)))
socket.on('messages', (messages, channel) => messages.forEach(v => store.dispatch(addMessage(v.sender, v.text, channel))))
socket.on('changeState', state => store.dispatch(updateServerState(state)))
socket.on('join', channel => store.dispatch(changeChannel(channel)))

const App = connect(s => ({ name: s.get('name') }), null)(
	props => (props.name != undefined ? (
		<div style={{ display: 'flex', height: '100%', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
			<Paper style={{ flex: '0 1 200px', margin: '5px', padding: '5px', overflowY: 'auto' }}><ChannelList /></Paper>
			<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<Paper style={{ flex: 1, margin: '5px', padding: '5px', overflowY: 'auto' }}><MessageList /></Paper>
				<Paper style={{ flex: '0 1 0px', margin: '5px', padding: '5px' }}><MessageField /></Paper>
			</div>
			<Paper style={{ flex: '0 1 200px', margin: '5px', padding: '5px', overflowY: 'auto' }}><ClientList /></Paper>
		</div>
	) : <NameSelection />)
)

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
)
