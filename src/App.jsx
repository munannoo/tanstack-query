import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, queryOptions } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  if (postQuery.isLoading) return <h1>Loading data....</h1>;
  if (postQuery.isError) {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  console.log(postQuery.data);

  return (
    <div>
      <h1>Tanstack Query</h1>
      {postQuery.data?.map((post) => (
        <p>
          {post.id}
          {"."} {post.title}
        </p>
      ))}
    </div>
  );
}

export default App;
