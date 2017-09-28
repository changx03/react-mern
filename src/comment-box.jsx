import React, { Component } from 'react';
import CommentList from './comment-list';
import CommentForm from './comment-form';
import DATA from './data';
import style from './style';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    render() {
        return (
            <div style={style.commentBox}>
                <h2>Comments:</h2>
                <CommentList data={DATA} />
                <CommentForm />
            </div>
        );
    }
}
