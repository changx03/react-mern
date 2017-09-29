/*eslint linebreak-style: ["error", "windows"]*/
/*eslint no-console: 0*/

import React, { Component } from "react";
import marked from "marked";
import styled from "./style";

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            author: "",
            text: ""
        };

        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }

    render() {
        return (
            <div style={styled.comment}>
                <h3>{this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <button type="button" className="btn btn-primary" onClick={this.updateComment}>update</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteComment}>delete</button>
                {(this.state.toBeUpdated) &&
                    <form onSubmit={this.handleCommentUpdate}>
                        <input
                            type='text'
                            placeholder='Update name...'
                            style={styled.commentFormAuthor}
                            value={this.state.author}
                            onChange={this.handleAuthorChange} />
                        <input
                            type='text'
                            placeholder='Update your comment...'
                            style={styled.commentFormText}
                            value={this.state.text}
                            onChange={this.handleTextChange} />
                        <input
                            type='submit'
                            style={styled.commentFormPost}
                            value='Update' />
                    </form>
                }
            </div>
        );
    }

    deleteComment(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onCommentDelete(id);
        console.log("Deleted");
    }

    updateComment(e) {
        e.preventDefault();
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }

    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleCommentUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID,
            author = (this.state.author) ? this.state.author : null,
            text = (this.state.text) ? this.state.text : null,
            comment = {
                author: author,
                text: text
            };

        this.props.onCommentUpdate(id, comment);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: "",
            text: ""
        });
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
}
