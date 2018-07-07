import React from 'react'
import {connect} from 'react-redux'
import NewTweet from './NewTweet'
import Tweet from './Tweet'

class TweetPage extends React.Component {
    render() {
        const {id, replies} = this.props

        return(
            <div className="center">
                <Tweet id={id} />
                <NewTweet id={id} />
                {replies.length !== 0
                    ? <h4>Replies:</h4>
                    :''
                }
                <ul>
                    {
                        replies.map((replyId) => <Tweet id={replyId} />)
                    }
                </ul>
            </div>
        )
    }
}
function mapStateToProps({authUser, tweets, users}, props) {
    const { id } = props.match.params

    return {
        id,
        authUser,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)