import React from 'react'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListSubheader from 'material-ui/List/ListSubheader'
import { connect } from 'react-redux'


const mapStateToProps = state => {
	const channelContainsMe = c => c.get('joinedClientIds').contains(state.get('id'))
	return {
		joinedChannels: state.get('channels') ? state.get('channels').filter(channelContainsMe).keySeq() : [],
		availableChannels: state.get('channels') ? state.get('channels').filterNot(channelContainsMe).keySeq() : [],
		channel: state.get('channel')
	}
}

const ChannelList = connect(mapStateToProps, null)(
	props => (
		<div>
			<List subheader={<ListSubheader>Joined Channels</ListSubheader>}>
				{props.joinedChannels.map((v, k) => <ListItem key={k} style={{fontWeight:v===props.channel ? 'bold' : 'normal'}}>{v}</ListItem>)}
			</List>
			<List subheader={<ListSubheader>Available Channels</ListSubheader>}>
				{props.availableChannels.map((v, k) => <ListItem key={k} style={{fontWeight:v===props.channel ? 'bold' : 'normal'}}>{v}</ListItem>)}
			</List>
		</div>
	)
)

export default ChannelList
