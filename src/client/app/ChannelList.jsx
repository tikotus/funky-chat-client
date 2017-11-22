import React from 'react'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListSubheader from 'material-ui/List/ListSubheader'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
	channelNames: state.get('channels') ? state.get('channels').keySeq() : []
})

const ChannelList = connect(mapStateToProps, null)(
	props => (
		<List subheader={<ListSubheader>Channels</ListSubheader>}>
			{props.channelNames.map((v, k) => <ListItem key={k}>{v}</ListItem>)}
		</List>
	)
)

export default ChannelList
