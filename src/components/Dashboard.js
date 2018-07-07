import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                
                {console.log(this.props)}
                <ul>
                    {
                        this.props.tweetIds.map((id) => (
                            <li key={id}>
                                <Tweet id={id} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({tweets}) {
    return {
        tweetIds: Object.keys(tweets).sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}
export default connect(mapStateToProps)(Dashboard)