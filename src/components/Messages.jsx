import axios from 'axios';
import React, { Component } from 'react';
import {API_URL} from '../config';
import io from 'socket.io-client';

let socket = ''

class Messages extends Component {

    messagesEnd = React.createRef()
     state = {
        loading: true,
        messages: [],
        message: '',
     }

     scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
        }

        componentDidMount() {

            socket = io(`${API_URL}`);

            let conversationId = this.props.match.chatId
             axios.get(`${API_URL}/messages/${conversationId}`)
                .then(response => {
                    this.setState({
                        loading: false,
                        messages: response.data
                    }, () => {
                        this.scrollToBottom();
                    })
                })

                socket.emit('join_chat', conversationId);

                socket.on("receive_message", (data) => {
                    console.log("Got data", data)
                    this.setState({
                        messages: [...this.state.messages, data]
                    }, () => {
                        this.scrollToBottom();
                    })
                })
        }

        handleMessageInput = (event) => {
            this.setState({
                message: event.target.value
            })
        }

        sendMessage = async () => {

            let messageContent = {
                chatId: this.props.match.params.chatId,
                content: {
                    sender: this.props.user,
                    message: this.state.message,
                },
            };

            await socket.emit('send_message', messageContent);
            this.setState({
                messages: [...this.state.messages, messageContent.content],
                message: ''
            }, () => {
                this.scrollToBottom();
            }
            )
        }

        render() {
            const {loading, messages} = this.state
            const {user} = this.props

            if (loading)  {
                <p>Loading all messages . . .</p>
            }

            return (
                <div>
                    <h2>You're in the Chat Page</h2>
                    <div className="chatContainer">
                        <div className="messages">
                            {messages.map((val) => {
                                return (
                                    <div key={val._id} className="messageContainer" id={val.sender.name == user.name ? "You" : "Other"}>
                                        <div className="messageIndividual">
                                            {val.sender.name}: {val.message}
                                        </div>
                                    </div>
                                )
                            })
                        }
                         <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                    <div className="messageInputs">
                        <input value={this.state.currentMessage} type="text" placeholder="Message..."
                            onChange={this.handleMessageInput}
                        />
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages;

                    