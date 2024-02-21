import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center w-screen gap-3">
      <Link className="text-blue-400 underline uppercase" href={"/layouts"}>
        Go to layouts
      </Link>
    </div>
  );
}
