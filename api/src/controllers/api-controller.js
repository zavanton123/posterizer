const models = require('../models/models');
const {processError} = require("../utils/errors");

const {
  Post,
  User,
  Tag,
  Category,
} = models;

exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, {
      '_id': 1,
      'title': 1,
      'content': 1,
      'author': 1,
      'tags': 1
    });
    if (posts.length > 0) {
      return res.json({
        message: `Found ${posts.length} posts`,
        posts: posts
      });
    } else {
      return res.status(200).json({
        message: "No posts found"
      });
    }
  } catch (err) {
    processError(err, next);
  }
};

exports.fetchPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (post) {
      return res.status(200).json({
        message: "Post is found",
        post: {
          post: post
        }
      });
    } else {
      return res.json({
        message: `No post with id ${postId} is found.`
      });
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.createPost = async (req, res, next) => {
  console.log(`zavanton - create post`);
  try {
    const user = await User.create({
      username: 'zavanton',
      email: 'zavanton@yandex.ru',
      password: 'some-pass'
    });
    const title = req.body.title;
    const content = req.body.content;
    const categoryName = req.body.category;
    console.log(`zavanton - category: ${categoryName}`);

    let targetCategory;
    targetCategory = await Category.findOne({name: categoryName});
    if (!targetCategory) {
      targetCategory = await Category.create({name: categoryName});
    }

    // const tags = req.body.tags;
    // console.log(`zavanton - tags: ${tags}`);

    const post = await Post.create({
      title: title,
      content: content,
      author: user,
      category: targetCategory._id,
    });

    return res.status(201).json({
      message: 'Post created',
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        author: user._id,
        category: post.category._id
      }
    });
  } catch (error) {
    processError(error, next);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findByIdAndRemove(postId);
    if (deletedPost) {
      return res.status(200).json({
        message: 'Removed post',
        post: deletedPost
      });
    } else {
      return res.status(200).json({
        message: `No post with id ${postId} is found.`
      });
    }
  } catch (err) {
    processError(err, next);
  }
}

exports.updatePostById = async (req, res, next) => {
  return next();
  // try {
  //   const postId = req.params.postId;
  //   const post = await Post.findByIdAndUpdate(postId, {title: req.body.title});
  //   if (post) {
  //     return res.status(200).json({
  //       message: "Post is updated",
  //       post: {
  //         _id: post._id,
  //         title: post.title
  //       }
  //     });
  //   } else {
  //     return res.json({
  //       message: `No post with id ${postId} is found.`
  //     });
  //   }
  // } catch (err) {
  //   processError(err, next);
  // }
}
