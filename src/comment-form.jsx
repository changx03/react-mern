/*eslint linebreak-style: ["error", "windows"]*/
/*eslint no-console: 0*/

import React, { Component } from 'react';
import style from './style';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            text: ""
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        let author = this.state.author.trim(),
            text = this.state.text.trim();
        console.log(`${author} said "${text}"`);
        if(!author || !text) { return; }

        this.props.onCommentSubmit({
            author: author,
            text: text
        });
        this.setState({ author: "", text: "" });
    }

    render() {
        return (
            <form style={style.commentForm} onSubmit={this.handleSubmit}>
                <input type="text"
                    name="author"
                    id="author"
                    placeholder="Your name..."
                    style={style.commentFormAuthor}
                    value={this.state.author}
                    onChange={this.handleAuthorChange} />
                <input type="text"
                    name="text"
                    id="text"
                    placeholder="Say something..."
                    style={style.commentFormText}
                    value={this.state.text}
                    onChange={this.handleTextChange} />
                <input type="submit"
                    style={style.commentFormPost}
                    value="Post" />
            </form>
        );
    }
}
