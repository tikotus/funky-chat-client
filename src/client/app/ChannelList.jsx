import React from 'react'
import List from 'material-ui/List'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'


const mapStateToProps = state => {
	const channelContainsMe = c => c.get('joinedClientIds').contains(state.get('id'))
	return {
		joinedChannels: state.get('channels') ? state.get('channels').filter(channelContainsMe).keySeq() : [],
		availableChannels: state.get('channels') ? state.get('channels').filterNot(channelContainsMe).keySeq() : [],
		channel: state.get('channel')
	}
}

const trimChannelName = name => {
	if (name.length > 15)
		return name.substring(0, 12) + '...'
	else
		return name
}

const ChannelListItem = props => (
	<div>
		<FlatButton style={{ fontWeight: props.selected ? 'bold' : 'normal' }}>
			{trimChannelName(props.text)}
		</FlatButton>
		<br />
	</div>
)
//<Typography type="body1" style={{fontWeight:props.selected ? 'bold' : 'normal'}} component="h3">{props.text}</Typography>

const ChannelList = connect(mapStateToProps, null)(
	props => (
		<div>
			<p>Joined</p>
			{props.joinedChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={v === props.channel} />)}
			<p>Available</p>
			{props.availableChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={false} />)}
		</div>
	)
)

export default ChannelList
