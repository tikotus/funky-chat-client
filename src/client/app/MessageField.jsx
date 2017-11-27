import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import socket from './socket'
''
const chooseAction = (text, channel) => {
	if (text.indexOf('/join ') == 0) {
		const joinedChannel = text.split(' ')[1]
		socket.emit('join', joinedChannel)
		return { type: 'JOIN_CHANNEL', channel: joinedChannel }
	}
	else if (text.indexOf('/nick ') == 0) {
		const name = text.split(' ')[1]
		socket.emit('nick', name)
		return { type: 'CHANGE_NAME', name }
	}
	else {
		socket.emit('message', text, channel)
		return undefined
	}
}

const changeMessage = text => ({
	type: 'CHANGE_MESSAGE',
	text
})

const mapStateToProps = state => ({
	text: state.get('outgoingMessage') || '',
	channel: state.get('channel')
})

const mapDispatchToProps = dispatch => ({
	onSend: (text, channel) => {
		dispatch(chooseAction(text, channel))
		dispatch({ type: 'CLEAR_INPUT' })
	},
	onChange: e => dispatch(changeMessage(e.target.value))
})

const onKeyDown = (e, send, text, channel) => {
	if (e.which == 13 && text.length > 0) {
		e.preventDefault()
		send(text, channel)
	}
}

const MessageField = connect(mapStateToProps, mapDispatchToProps)(
	props => (
		<TextField
			style={{ width: '100%' }}
			value={props.text}
			hintText={'Message #' + props.channel}
			name='message'
			onKeyDown={e => onKeyDown(e, props.onSend, props.text, props.channel)}
			onChange={e => props.onChange(e)} />
	)
)

export default MessageField