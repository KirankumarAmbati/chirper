import React from 'react'
import { handleAddTweet } from '../actions/tweet'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class NewTweet extends React.Component {

    state = {
        text: '',
        toHome:''
    }

    handleChange = (e) => {
        const text = e.target.value

        this.setState(() => ({
            text            
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state

        const {dispatch, id} = this.props
        
        dispatch(handleAddTweet(text, id))

        this.setState(() => ({
            text:'',
            toHome: id ? false : true
        }))
    }
    render() {

        const {text, toHome} = this.state

        if(toHome === true) {
            return <Redirect to='/' />
        }
        const charLeft = 280 - text.length

        const textColor = charLeft < 100 ? { color:'red' } : { color:'blue'}
        
        return(
            <div className="center">
                <h4>Compose New Tweet</h4>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Enter your tweet"
                        maxLength='280'
                        className="textarea"
                        value={text}
                        onChange={this.handleChange}
                    />
                    <div>
                        <span style={textColor}>
                            {charLeft}
                        </span> remaining
                    </div>
                    <button
                        disabled= {text === ''}
                        type="submit"
                    >
                        SUBMIT        
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)