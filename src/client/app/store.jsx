import { createStore } from 'redux'
import { fromJS, List } from 'immutable'
import socket from './socket'

const initialState = fromJS({
	channel: 'general',
})

function chatApp(state = initialState, action) {
	switch (action.type) {
	case 'UPDATE_SERVER_STATE':
		return state.merge(fromJS(action.serverState))
	case 'ADD_MESSAGE':
		return state.updateIn(['messages', action.channel], List(), v => v.push({ text: action.text, sender: action.sender }))
	case 'CHANGE_CHANNEL':
		return state.set('channel', action.channel)
	case 'SEND_MESSAGE':
		// If message starts with / then pass first word as event type, second as value. For example /join chan
		if (state.get('outgoingMessage').charAt(0) == '/')
			socket.emit(state.get('outgoingMessage').split(' ')[0].substring(1), state.get('outgoingMessage').split(' ')[1])
		else
			socket.emit('message', state.get('outgoingMessage'), state.get('channel'))
		return state.set('outgoingMessage', null)
	case 'CHANGE_MESSAGE':
		return state.set('outgoingMessage', action.text)
	default:
		return state
	}
}

const store = createStore(chatApp)

export default store