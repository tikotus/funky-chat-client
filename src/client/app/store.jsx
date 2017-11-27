import { createStore } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = fromJS({
	channel: 'general'
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
		return state.set('channel', action.channel)
	case 'CHANGE_CHANNEL':
		return state.set('channel', action.channel)
	case 'CHANGE_INPUT_NAME':
		return state.set('inputName', action.inputName)
	case 'CHANGE_NAME':
		return state.set('name', action.name)
	case 'SET_ID':
		return state.set('id', action.id)
	case 'CHANGE_MESSAGE':
		return state.set('outgoingMessage', action.text)
	default:
		return state
	}
}

const store = createStore(chatApp)

export default store