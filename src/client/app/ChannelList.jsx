import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardHeader } from 'material-ui/Card'


const mapStateToProps = state => {
	const channelContainsMe = c => c.get('joinedClientIds').contains(state.get('id'))
	return {
		joinedChannels: state.get('channels') ? state.get('channels').filter(channelContainsMe).keySeq() : [],
		availableChannels: state.get('channels') ? state.get('channels').filterNot(channelContainsMe).keySeq() : [],
		channel: state.get('channel')
	}
}

const mapDispatchToProps = dispatch => ({
	changeChannel: channel => dispatch({ type: 'CHANGE_CHANNEL', channel }),
	joinChannel: channel => dispatch({ type: 'JOIN_CHANNEL', channel })
})

const trimChannelName = name => {
	if (name.length > 15)
		return name.substring(0, 12) + '...'
	else
		return name
}

const ChannelListItem = props => (
	<div>
		<FlatButton
			style={{ textAlign: 'left' }}
			labelStyle={{ fontWeight: props.selected ? 'bold' : 'normal' }}
			primary={props.joined}
			secondary={!props.joined}
			label={trimChannelName(props.text)}
			onClick={props.onClick} />
		<br />
	</div>
)
//<Typography type="body1" style={{fontWeight:props.selected ? 'bold' : 'normal'}} component="h3">{props.text}</Typography>


const ChannelList = connect(mapStateToProps, mapDispatchToProps)(
	props => (
		<div>
			<Card style={{ marginBottom: '5px' }}>
				<CardHeader title='Joined' />
				{props.joinedChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={v === props.channel} joined={true} onClick={() => props.changeChannel(v)} />)}
			</Card>
			<Card>
				<CardHeader title='Available' />
				{props.availableChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={false} joined={false} onClick={() => props.joinChannel(v)} />)}
			</Card>
			<p>{'Join new channels with "/join [chan]"'}</p>
			<p>{'Change name with "/nick [name]"'}</p>
		</div>
	)
)

export default ChannelList
