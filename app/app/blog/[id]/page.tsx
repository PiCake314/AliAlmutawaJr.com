import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import matter from 'gray-matter';

type PostProps = {
  params: {
    id: string;
  };
};

// 1. DYNAMIC METADATA GENERATION
export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { id } = params;
  const filePath = path.join(process.cwd(), 'posts', `${id}.md`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    // Use the title from the file, or fallback to the ID if missing
    const postTitle = data.title || id.replace(/-/g, ' ');

    return {
      metadataBase: new URL('https://www.alialmutawajr.com'),
      title: postTitle,
      openGraph: {
        title: postTitle,
        description: data.description || 'Check out my latest blog post!',
        images: [`/images/compressed_${id}.png`],
      },
      twitter: {
        card: 'summary_large_image',
        images: [`/images/compressed_${id}.png`],
      },
    };
  } catch (e) {
    return { title: 'Post Not Found' };
  }
}


// 2. THE PAGE COMPONENT
export default async function Post({ params }: PostProps) {
  const { id } = params;
  const filePath = path.join(process.cwd(), 'posts', `${id}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // matter(fileContents) splits the YAML header from the actual body
    const { data, content } = matter(fileContents);

    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto p-6 prose prose-invert lg:prose-xl">

          <h1 className="text-4xl mb-4">{data.title}</h1>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    notFound();
  }
}