import { getInitialData } from '../utils/api'
import {
    recieveUsers
} from '../actions/users'
import {
    recieveTweets
} from '../actions/tweet'
import {
    setAuthedUser
} from '../actions/authUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
        .then(({users, tweets}) => {
            dispatch(recieveUsers(users))
            dispatch(recieveTweets(tweets))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}