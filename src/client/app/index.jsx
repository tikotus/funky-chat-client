import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import ChannelList from './ChannelList'
import MessageList from './MessageList'
import MessageField from './MessageField'
import store from './store'
import socket from './socket'

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

socket.on('connect', () => {
	socket.emit('init')
	socket.emit('join', 'general')
})
socket.on('message', (sender, text, channel) => store.dispatch(addMessage(sender, text, channel)))
socket.on('changeState', state => store.dispatch(updateServerState(state)))

const muiTheme = createMuiTheme()

function App() {
	return (
		<Grid container spacing={24}>
			<Grid item xs={2}>
				<Paper><ChannelList /></Paper>
			</Grid>
			<Grid item xs>
				<Paper><MessageList /></Paper>
				<MessageField />
			</Grid>
		</Grid>
	)
}

render(
	<Provider store={store}>
		<MuiThemeProvider theme={muiTheme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
)
