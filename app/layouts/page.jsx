import Feed from "@/components/Feed/Feed";
import { fetchPosts } from "@/lib/data";
import React from "react";

async function LayoutPage({ searchParams }) {
  const index = searchParams.index || "";
  const data = await fetchPosts();
  return (
    <div className="flex flex-col items-center w-screen gap-3">
      <h1 className="text-4xl font-bol mt-10">IG Layouts</h1>
      {data && <Feed data={data} index={index} />}
    </div>
  );
}

export default LayoutPage;
