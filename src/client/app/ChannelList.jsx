import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'


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
		<ListItem
			style={{ textAlign: 'left', fontWeight: props.selected ? 'bold' : 'normal' }}
			onClick={props.onClick}
			primaryText={trimChannelName(props.text)}>
		</ListItem>
		<br />
	</div>
)
//<Typography type="body1" style={{fontWeight:props.selected ? 'bold' : 'normal'}} component="h3">{props.text}</Typography>


const ChannelList = connect(mapStateToProps, mapDispatchToProps)(
	props => (
		<div>
			<List>
				<Subheader>Joined</Subheader>
				{props.joinedChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={v === props.channel} joined={true} onClick={() => props.changeChannel(v)} />)}
			</List>
			<List>
				<Subheader>Available</Subheader>
				{props.availableChannels.map((v, k) => <ChannelListItem key={k} text={v} selected={false} joined={false} onClick={() => props.joinChannel(v)} />)}
			</List>
			<p>{'Join new channels with "/join [chan]"'}</p>
			<p>{'Change name with "/nick [name]"'}</p>
		</div>
	)
)

export default ChannelList
