import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChannelList from './ChannelList'
import MessageList from './MessageList'
import MessageField from './MessageField'
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
socket.on('changeState', state => store.dispatch(updateServerState(state)))
socket.on('join', channel => store.dispatch(changeChannel(channel)))

function App() {
	return (
		<div style={{display:'flex', height:'100%', flexDirection:'row', justifyContent:'space-between', flex:1}}>
			<Paper style={{flex:1, margin:'5px'}}><ChannelList /></Paper>
			<div style={{flex:5, display:'flex', flexDirection:'column'}}>
				<Paper style={{flex:1, margin:'5px', padding:'5px', overflowY:'auto'}}><MessageList /></Paper>
				<Paper style={{flex:'0 1 0px', margin:'5px', padding:'5px'}}><MessageField /></Paper>
			</div>
		</div>
	)
}

/*
<div style={{width:'100%', height:'100%', display:'flex'}}>
<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
	<Paper style={{flex:1}}><ChannelList /></Paper>
	<div style={{flex:5}}>
		Hello
	</div>
	<div style={{flex:1}}>
		Hello
	</div>
</div>
</div>
*/

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
)
