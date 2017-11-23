import React from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
	messages: state.getIn(['messages', state.get('channel')], [])
})

class MessageList extends React.Component {
	render() {
		return (
			<div>
				{this.props.messages.map((v, k) => <div key={k}>{v.sender + ': ' + v.text}</div>)}
				<div ref={node => this['bottom'] = node}></div>
			</div>
		)
	}

	componentDidUpdate() {
		this['bottom'].scrollIntoView()
	}
}

export default connect(mapStateToProps, null)(MessageList)