import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

type PostProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { id } = params;

  // 1. Path to your image (must be in /public/ folder)
  // Example: public/blog-previews/post1.png
  const imageUrl = `https://www.alialmutawajr.com/images/post${id}.png`;

  return {
    title: id.replace(/-/g, ' '),
    openGraph: {
      title: id.replace(/-/g, ' '),
      description: 'Check out my latest blog post!',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image', // This makes the image big and clickable
      images: [imageUrl],
    },
  };
}


export default async function Post({ params }: PostProps) {
  const { id } = params;

  // Read the markdown file based on the post ID
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${id}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return (
      <>
      <Header />

      <div className="max-w-3xl mx-auto p-6 prose prose-invert lg:prose-xl">
        <ReactMarkdown>{fileContents}</ReactMarkdown>
      </div>

      <Footer />
      </>
    );
  } catch (error) {
    // Handle error if post file is not found
    notFound();
  }
}
