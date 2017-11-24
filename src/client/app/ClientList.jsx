import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const mapStateToProps = state => ({
	clients: state.get('clients') || [],
	channel: state.get('channels').get(state.get('channel')),
	channelName: state.get('channel')
})

const getClientsOnChannel = (clients, channel) => {
	return clients.filter(v => channel.get('joinedClientIds').contains(v.get('clientId')))
}

const ClientList = connect(mapStateToProps, null)(
	props => (
		props.channel ? <List>
			<Subheader>{'Users on #' + props.channelName}</Subheader>
			{getClientsOnChannel(props.clients, props.channel)
				.map((v, k) => <ListItem key={k}>{v.get('name')}</ListItem>)}
		</List> : (<div>Loading...</div>)
	)
)

export default ClientList