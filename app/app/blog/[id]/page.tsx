import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

type PostProps = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: PostProps) {
  const { id } = params;

  // Read the markdown file based on the post ID
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${id}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl mb-4">{id.replace(/-/g, ' ')}</h1>
        <ReactMarkdown>{fileContents}</ReactMarkdown>
      </div>
    );
  } catch (error) {
    // Handle error if post file is not found
    notFound();
  }
}
