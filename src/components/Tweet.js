import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweet'
import {Link, withRouter} from 'react-router-dom'

class Tweet extends React.Component {
    handleLike(e) {
        e.preventDefault()

        const {dispatch, authUser, tweet} = this.props

        dispatch(handleToggleTweet({
            id:tweet.id,
            authUser,
            hasLiked:tweet.hasLiked
        }))
        
    }
    toParent(e, id) {
        e.preventDefault()
        
        this.props.history.push(`/tweet/${id}`)
    }
    render() {

        const {tweet } = this.props

        if(tweet === null)
        {
            return <p>Tweet doesn't exist..!</p>
        }
        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
        } = tweet

        return(
            <Link className="tweet" to={`/tweet/${id}`}>
                <img
                    src={avatar}
                    className="avatar"
                    alt={`Avatar of ${name}`}
                />
                <div style={{textAlign:'left'}}>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    <div>
                        {parent && (
                                <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                                    Reply to @{parent.author}
                                </button>
                            )
                        }
                    </div>
                    <p>{text}</p>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies !==0 && replies}</span>
                        <button className="heart-icon" onClick={this.handleLike.bind(this)} style={{border:'none',backgroundColor:'white'}}>
                        {hasLiked === true
                        ? <TiHeartFullOutline color='red' className="tweet-icon" />
                        : <TiHeartOutline className="tweet-icon" />}
                        <span>{likes !==0 && likes}</span>
                        </button>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({tweets, authUser, users}, {id}) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authUser, parentTweet) : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))