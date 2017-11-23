import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = state => ({
	inputName: state.get('inputName') || ''
})

const mapDispatchToProps = dispatch => ({
	onChangeInput: inputName => dispatch({ type: 'CHANGE_INPUT_NAME', inputName }),
	onSetName: name => dispatch({ type: 'CHANGE_NAME', name })
})

const NameSelection = connect(mapStateToProps, mapDispatchToProps)(
	props => (
		<div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<h1>Welcome to Funky Chat</h1>
			<TextField
				value={props.inputName ? props.inputName : ''}
				hintText='Name'
				onChange={e => props.onChangeInput(e.target.value)} />
			<RaisedButton
				style={{ margin: '5px' }}
				disabled={props.inputName.length < 3 ? true : false}
				label='OK'
				primary={true}
				onClick={() => props.onSetName(props.inputName)} />
		</div>
	)
)

export default NameSelection