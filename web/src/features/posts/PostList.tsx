import React, {useEffect, useState} from "react";
import {fetchPosts} from "./data/PostApi";
import {IPost} from "./data/Models";

export const PostList = () => {
  const [hasError, setHasError] = useState<boolean>();
  const [posts, setPosts] = useState<Array<IPost>>();

  useEffect(() => {
    const loadPosts = async () => {
      console.log(`zavanton - loadPosts`);
      try {
        const posts = await fetchPosts();
        console.log(`zavanton - posts loaded:`);
        console.log(posts);
        setPosts(posts);
      } catch (err) {
        console.log(`zavanton - load post error`);
        setHasError(true);
      }
    }

    loadPosts();
  }, []);

  let content = <p></p>;

  if (posts && posts.length > 0) {
    content = <ul>
      {
        posts.map(post => {
          return <li>{post.title}</li>
        })
      }
    </ul>
  }

  if (hasError) {
    content = <p>Some error...</p>;
  }

  return (
    <>
      <h3>Post List</h3>
      {content}
    </>
  );
}
