import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'

const chooseAction = (text, channel) => {
	if (text.indexOf('/join ') == 0)
		return { type: 'JOIN_CHANNEL', channel: text.split(' ')[1] }
	else if (text.indexOf('/nick ') == 0)
		return { type: 'CHANGE_NAME', name: text.split(' ')[1] }
	else
		return { type: 'SEND_MESSAGE', text, channel }
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
	if (e.which == 13) {
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