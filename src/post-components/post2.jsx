import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";

export default function Post2() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postQuery.isLoading) return <h1>Loading data....</h1>;
  if (postQuery.isError) {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  {
    console.log(postQuery);
  }

  return (
    <div>
      <h1>Post List 2</h1>

      {postQuery.data?.products?.toReversed().map((post) => (
        <p key={post.id}>{`${post.id}. ${post.title}`}</p>
      ))}
    </div>
  );
}
