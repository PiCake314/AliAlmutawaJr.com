import Link from "next/link";

// Sample blog posts data. In a real app, you can fetch this from a file or CMS.
const posts = [
  { id: "1", title: "Colons and Dots", image: "/images/post1.png" },
];

export default function Blog() {
  return (
    <div className="w-full p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post.id} className="w-full">
            <Link href={`/blog/post${post.id}`}>
              <div className="block">
                <img src={post.image} alt={post.title} className="w-full h-auto mb-4" />
                <h3 className="text-center">{post.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
  