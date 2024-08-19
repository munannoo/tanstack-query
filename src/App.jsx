import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function App() {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => POSTS.push({ id: POSTS.length + 1, title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading data....</h1>;
  if (postQuery.isError) {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  console.log(newPostMutation);

  return (
    <div>
      <h1>Tanstack Query</h1>
      {postQuery.data?.map((post) => (
        <p key={post.id}>{`${post.id}. ${post.title}`}</p>
      ))}

      <button
        disabled={newPostMutation.isPending}
        onClick={() => newPostMutation.mutate("new post")}
      >
        Add New
      </button>
    </div>
  );
}

export default App;
