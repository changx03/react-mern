import React, { Component } from 'react';
import Comment from './comment';
import style from './style';

class CommentList extends Component {
    render() {
        const commentNodes = this.props.data.map(comment => {
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        });

        return (
            <div style={style.commentList}>
                {commentNodes}
            </div>
        );
    }
}
