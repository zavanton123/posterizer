import mongoose, {Document, Model, Schema, Types} from "mongoose";

export interface IComment extends Document {
  content: string;
  author: IUser['_id'];
}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {timestamps: true}
);

export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser['_id'];
  category: ICategory['_id'];
  tags: Types.Array<ITag['_id']>;
  comments: Types.Array<IComment>;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    comments: [CommentSchema]
  },
  {timestamps: true}
);

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
);

export interface ITaxonomy extends Document {
  name: string
}

export interface ICategory extends ITaxonomy {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true
  }
});

export interface ITag extends ITaxonomy {
  name: string;
  posts: Types.Array<IPost['_id']>;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

export const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);
export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export const Category: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);
export const Tag: Model<ITag> = mongoose.model<ITag>('Tag', TagSchema);
