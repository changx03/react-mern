/*eslint linebreak-style: ["error", "windows"]*/
/*eslint no-console: 0*/

import React, { Component } from "react";
import axios from "axios";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
// import DATA from "./data";
import style from "./style";

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }

    render() {
        return (
            <div style={style.commentBox}>
                <h2>Comments:</h2>
                <CommentList
                    onCommentDelete={this.handleCommentDelete}
                    onCommentUpdate={this.handleCommentUpdate}
                    data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    loadCommentsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            });
    }

    handleCommentSubmit(comment) {
        let comments = this.state.data;
        comment.id = Date.now();
        console.log(comments.id);

        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        axios.post(this.props.url, comment)
            .catch(err => {
                console.error(err);
                this.setState({ data: comments });
            });
    }

    handleCommentDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleCommentUpdate(id, comment) {
        axios.put(`${this.props.url}/${id}`, comment)
            .catch(err => {
                console.error(err);
            });
    }
}
