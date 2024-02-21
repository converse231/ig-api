import Feed from "@/components/Feed/Feed";
import { fetchPosts } from "@/lib/data";
import React from "react";

async function LayoutPage() {
  const data = await fetchPosts();
  return (
    <div className="flex flex-col items-center w-screen gap-3">
      <h1 className="text-4xl font-bol mt-10">IG Layouts</h1>
      <Feed data={data} />
    </div>
  );
}

export default LayoutPage;
