import React, { Component } from "react";
import styled from "./style";
import marked from "marked";

export default class Comment extends Component {
    rawMarkup = () => {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div style={styled.comment}>
                <h3>{this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
}
