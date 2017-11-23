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

const setId = id => ({
	type: 'SET_ID',
	id
})

socket.on('connect', () => {
	socket.emit('init', id => store.dispatch(setId(id)))
	socket.emit('join', 'general')
})
socket.on('message', (sender, text, channel) => store.dispatch(addMessage(sender, text, channel)))
socket.on('changeState', state => store.dispatch(updateServerState(state)))
socket.on('join', channel => store.dispatch(changeChannel(channel)))

const muiTheme = createMuiTheme()

function App() {
	return (
		<div style={{padding:12}}>
			<Grid container spacing={24}>
				<Grid item xs={2} style={{height:'100%'}}>
					<Paper style={{height:'100%'}}><ChannelList /></Paper>
				</Grid>
				<Grid item xs style={{height:'100%'}}>
					<div style={{display:'flex', flexFlow:'column', height:'100%'}}>
						<Paper style={{flex:'1 1 auto'}}><MessageList /></Paper>
						<div style={{flex:'0 1 0px', paddingTop:'10px'}}>
							<MessageField />
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
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
