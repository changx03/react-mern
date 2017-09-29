/*eslint linebreak-style: ["error", "windows"]*/
/*eslint no-console: 0*/

import React, { Component } from "react";
import Comment from "./comment";
import style from "./style";

export default class CommentList extends Component {
    render() {
        const commentNodes = this.props.data.map((comment, index) => {
            return (
                <Comment
                    author={comment.author}
                    uniqueID={comment["_id"]}
                    key={index}
                    onCommentDelete={this.props.onCommentDelete}
                    onCommentUpdate={this.props.onCommentUpdate}>
                    {comment.text}
                </Comment>
            );
        });

        return (
            <div style={style.commentList}>
                {commentNodes}
            </div>
        );
    }
}
