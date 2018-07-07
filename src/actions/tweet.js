import { saveLikeToggle,saveTweet } from '../utils/api'

import { showLoading, hideLoading } from 'react-redux-loading'

export const RECIEVE_TWEETS = 'RECIEVE_TWEETS'
export const TOGGLE_TWEETS = 'TOGGLE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'

export function recieveTweets(tweets) {
    return {
        type: RECIEVE_TWEETS,
        tweets
    }
}

function toggleTweet({id, authUser, hasLiked}) {
    return {
        type: TOGGLE_TWEETS,
        id,
        authUser,
        hasLiked
    }
}

export function handleToggleTweet(info) {
    return(dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
        .catch((e) => {
            dispatch(toggleTweet(info))
            alert('Like a Tweet failed !')
        })
    }
}

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {

        const {authUser} = getState()

        dispatch(showLoading())

        return saveTweet({
            text,
            author: authUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
    }
}