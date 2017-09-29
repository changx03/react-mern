/*eslint linebreak-style: ["error", "windows"]*/
/*eslint no-console: 0*/

import React from "react";
import ReactDOM from "react-dom";
import CommentBox from "./comment-box";
// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<CommentBox url="http://localhost:3001/api/comments" pollInterval={2000} />, document.getElementById("root"));
