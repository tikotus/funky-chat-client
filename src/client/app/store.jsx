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
	case 'CLEAR_INPUT':
		return state.set('outgoingMessage', null)
	case 'JOIN_CHANNEL':
		socket.emit('join', action.channel)
		return state.set('channel', action.channel)
	case 'CHANGE_NAME':
		socket.emit('nick', action.name)
		return state
	case 'SET_ID':
		return state.set('id', action.id)
	case 'SEND_MESSAGE':
		socket.emit('message', action.text, action.channel)
		return state.set('outgoingMessage', null)
	case 'CHANGE_MESSAGE':
		return state.set('outgoingMessage', action.text)
	default:
		return state
	}
}

const store = createStore(chatApp)

export default store