import React from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'


const mapStateToProps = state => ({
	messages: state.getIn(['messages', state.get('channel')], [])
})

const MessageList = connect(mapStateToProps, null)(
	props => (
		<div>
			<Typography type="headline" component="h3">Messages</Typography>
			{props.messages.map((v, k) => <Typography key={k}>{v.sender + ': ' + v.text}</Typography>)}
		</div>
	)
)

export default MessageList