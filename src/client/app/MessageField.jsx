import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'

const sendMessage = text => ({
	type: 'SEND_MESSAGE',
	text
})

const changeMessage = text => ({
	type: 'CHANGE_MESSAGE',
	text
})

const mapStateToProps = state => ({
	text: state.get('outgoingMessage') || ''
})

const mapDispatchToProps = dispatch => ({
	onSend: text => dispatch(sendMessage(text)),
	onChange: e => dispatch(changeMessage(e.target.value))
})

const onKeyDown = (e, send, text) => {
	if (e.which == 13) {
		e.preventDefault()
		send(text)
	}
}

const MessageField = connect(mapStateToProps, mapDispatchToProps)(
	props => (
		<TextField value={props.text} onKeyDown={e => onKeyDown(e, props.onSend, props.text)} InputProps={{onChange: e => props.onChange(e)}} />
	)
)

export default MessageField