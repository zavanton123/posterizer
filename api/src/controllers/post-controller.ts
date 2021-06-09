import {HttpException, processError} from "../utils/errors";
import _ from "lodash";
import {HTTP_CREATED, HTTP_FORBIDDEN, HTTP_NO_CONTENT, HTTP_NOT_FOUND, HTTP_OK} from "../utils/constants";
import {NextFunction, Request, Response} from "express";
import {AuthRequest} from "../auth/auth-middleware";
import {ICategory} from "../models/models";

const {Post, User, Tag, Category} = require('../models/models');


export async function fetchPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await Post.find({}, {'__v': 0});

    if (posts.length > 0) {
      return res.status(HTTP_OK).json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.status(HTTP_OK).json([]);
    }
  } catch (err) {
    processError(err, next);
  }
}

export async function fetchPostById(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await Post.findById(req.params.postId, {'__v': 0});
    if (post) {
      return res.status(HTTP_OK).json({post: post});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const authRequest = req as AuthRequest

    let model: ICategory
    model = await Category.findOne({name: req.body.category});
    if (!model) {
      model = await Category.create({name: req.body.category});
    }

    const tags = await findOrCreateTags(req);
    const tagIds = _.map(tags, '_id');

    // Note: author id is taken from the Authorization header
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: authRequest.userId,
      category: model._id,
      tags: tagIds
    });

    for (const tag of tags) {
      tag.posts.push(post);
      await tag.save();
    }
    return res.status(HTTP_CREATED).json({post: post});
  } catch (error) {
    processError(error, next);
  }
}


export async function deletePostById(req: Request, res: Response, next: NextFunction) {
  try {
    const authRequest = req as AuthRequest;
    await checkPost(authRequest);
    const deletedPost = await Post.findByIdAndRemove(req.params.postId);
    if (deletedPost) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

export async function updatePostById(req: Request, res: Response, next: NextFunction) {
  try {
    const authRequest = req as AuthRequest;
    await checkPost(authRequest);

    let model;
    model = await Category.findOne({name: req.body.category});
    if (!model) {
      model = await Category.create({name: req.body.category});
    }

    const tags = await findOrCreateTags(req);
    const tagIds = _.map(tags, '_id');

    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId, {
      title: req.body.title,
      content: req.body.content,
      category: model,
      tags: tagIds
    });

    if (post) {
      return res.status(HTTP_NO_CONTENT).json({});
    } else {
      return res.status(HTTP_NOT_FOUND).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

const checkPost = async (req: AuthRequest) => {
  const targetPost = await Post.findById(req.params.postId);
  // check that the post exists
  if (!targetPost) {
    throw new HttpException('Post not found', HTTP_NOT_FOUND)
  }

  // check that the authenticated user is the author
  if (req.userId !== targetPost.author._id.toString()) {
    throw new HttpException(
      'Only authors can edit or delete their posts',
      HTTP_FORBIDDEN
    );
  }
}

// const findOrCreate = async (name: string, Model) => {
//   let model;
//   model = await Model.findOne({name: name});
//   if (!model) {
//     model = await Model.create({name: name});
//   }
//   return model;
// }

const findOrCreateTags = async (req: Request) => {
  const tags = [];
  for (const tagName of req.body.tags) {

    let model;
    model = await Tag.findOne({name: tagName});
    if (!model) {
      model = await Tag.create({name: tagName});
    }

    tags.push(model);
  }
  return tags;
};
