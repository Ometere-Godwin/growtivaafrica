import { Instagram, Twitter, Heart, MessageCircle, Share2 } from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

import socialPost1 from "@/assets/social-post-1.jpg";
import socialPost2 from "@/assets/social-post-2.jpg";
import socialPost3 from "@/assets/social-post-3.jpg";

const posts = [
  {
    platform: "instagram" as const,
    image: socialPost1,
    caption: "Leading with purpose. Meet Amara — one of Africa's rising voices in corporate leadership. Full feature in Issue #01 🔥",
    likes: "2,431",
    comments: "187",
    handle: "@growtivaafrica",
    time: "2h ago",
  },
  {
    platform: "twitter" as const,
    image: socialPost2,
    caption: "The future of Africa isn't being built in boardrooms alone — it's being built in co-working spaces, dorm rooms, and WhatsApp groups. 💡\n\nIssue #01 drops May 1st.",
    likes: "1,892",
    comments: "94",
    handle: "@growtivaafrica",
    time: "5h ago",
  },
  {
    platform: "instagram" as const,
    image: socialPost3,
    caption: "Golden hour in the city that never sleeps. Africa's urban energy is unmatched. 🌇 #GrowtivAfrica #AfricanCities",
    likes: "3,107",
    comments: "215",
    handle: "@growtivaafrica",
    time: "1d ago",
  },
];

const SocialFeedSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimate(0.15);

  return (
    <section className="py-24 bg-surface-light scroll-mt-20">
      <div className="container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-16 space-y-4 transition-all duration-700 ease-out ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            <Instagram className="w-4 h-4" />
            <span>Follow the Conversation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Stay <span className="text-gold">Connected</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the community across social media. Here's what we've been sharing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} index={i} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <a
            href="https://instagram.com/growtivaafrica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </a>
          <a
            href="https://twitter.com/growtivaafrica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Follow on X
          </a>
        </div>
      </div>
    </section>
  );
};

const PostCard = ({ post, index }: { post: typeof posts[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimate(0.1);

  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
          {post.platform === "instagram" ? (
            <Instagram className="w-4 h-4 text-gold" />
          ) : (
            <Twitter className="w-4 h-4 text-gold" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{post.handle}</p>
          <p className="text-xs text-muted-foreground">{post.time}</p>
        </div>
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt=""
        loading="lazy"
        width={640}
        height={640}
        className="w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-gold transition-colors">
          <Heart className="w-4 h-4" />
          <span className="text-xs font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-gold transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{post.comments}</span>
        </button>
        <button className="ml-auto text-muted-foreground hover:text-gold transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-foreground/90 line-clamp-3 leading-relaxed whitespace-pre-line">
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default SocialFeedSection;
