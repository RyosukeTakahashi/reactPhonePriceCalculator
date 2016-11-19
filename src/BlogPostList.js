/**
 * Created by Ryo on 2016/09/18.
 */
// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

class BlogPostList extends Component {
  
  //cst for constructor
  //sfc for stateless functional component
  
  constructor(props) {
    super(props);
    this.state = {blogPosts : []};
  }

  componentDidMount() {
    console.log("blog post list did mount")
    axios.get('http://brains.wp.xdomain.jp/wp-json/wp/v2/posts/?per_page=3').then((response) => {
      this.setState({blogPosts: response.data})
      console.log("wp api fetched")
    }).catch((err) => {
      console.log("error occured")
      console.log(err)
    })
  }


  render() {
    // console.log(this.state.blogPosts)
    let postNodes = this.state.blogPosts.map((post) => {

      return (
        <div key={post.id}>
          {post.title.rendered}
        </div>
      );
    });

    return (
      <div className="BlogPostList">
        {postNodes}
      </div>
    );
  }
}

BlogPostList.propTypes = {};
BlogPostList.defaultProps = {};

export default BlogPostList;
