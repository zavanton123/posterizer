import {HttpException, processError} from "../utils/errors";
import {HTTP_CREATED, HTTP_FORBIDDEN, HTTP_NO_CONTENT, HTTP_NOT_FOUND} from "../utils/constants";
import {NextFunction, Request, Response} from "express";
import {AuthRequest} from "../auth/auth-middleware";
import {IPost, Post} from "../models/models";

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const authRequest = req as AuthRequest;
    const postId = req.params.postId;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push:
          {
            comments: {
              author: authRequest.userId,
              content: req.body.content
            }
          }
      }
    );

    if (updatedPost) {
      return res.status(HTTP_CREATED).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const authRequest = req as AuthRequest;
    await checkCommentAuthor(authRequest);
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const result = await Post.findByIdAndUpdate(postId, {$pull: {comments: {_id: commentId}}});
    if (result) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

const checkCommentAuthor = async (req: AuthRequest) => {
  const post: IPost | null = await Post.findById(req.params.postId);
  if (post) {
    for (const comment of post.comments) {
      if (comment._id.toString() === req.params.commentId) {
        if (req.userId !== comment.author._id.toString()) {
          throw new HttpException(
            'Only comment authors can update their comments',
            HTTP_FORBIDDEN
          );
        }
      }
    }
  }
}
