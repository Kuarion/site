package com.kuarion.backend.dtos;

import com.kuarion.backend.entities.Comment;
import com.kuarion.backend.entities.Post;

import java.util.List;

// this dto combines the post and its comments, so we send them together in the response
public class PostCommentDTO {

    private Post post;
    private List<Comment> comments;

    // constructor to create the dto
    public PostCommentDTO(Post post, List<Comment> comments) {
        this.post = post;
        this.comments = comments;
    }

    // getters, spring needs them to map the json response properly
    public Post getPost() {
        return post;
    }

    public List<Comment> getComments() {
        return comments;
    }
}
