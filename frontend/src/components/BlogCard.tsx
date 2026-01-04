import Image from 'next/image';

interface BlogCardProps {
    post: {
        id: number;
        title: string;
        excerpt: string;
        image: string;
        category: string;
        date: string;
        readTime: string;
    };
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group cursor-pointer">
            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                        {post.category}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-textMuted font-medium">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-textMain group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-textMuted text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="pt-2">
                    <span className="text-secondary font-bold text-sm border-b border-transparent group-hover:border-secondary transition-all">
                        Leer más →
                    </span>
                </div>
            </div>
        </article>
    );
}
