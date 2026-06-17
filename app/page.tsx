"use client";

import { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/data";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, RefreshCw, Headphones, Sparkles, ChevronRight, Check, Quote } from 'lucide-react';

// ─── Inline mock data ────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Merino Wool Throw Blanket",
    category: "Home & Living",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 312,
    image: "https://www.thehuntressny.com/cdn/shop/files/the-huntress-new-york-blankets-black-ivory-plaid-merino-wool-throw-blanket-plaid-merino-wool-throw-blanket-plaid-the-huntress-ny-the-huntress-new-york-pound-ridge-45889276510499.jpg?v=1718134309&width=1080",
    badge: "Best Seller",
    isNew: false,
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 64,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 198,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "New",
    isNew: true,
  },
  {
    id: 3,
    name: "Linen Duvet Cover",
    category: "Bedroom",
    price: 145,
    originalPrice: 180,
    rating: 4.7,
    reviewCount: 427,
    image: "http://3hlinen.com/cdn/shop/files/3HLinen_Offwhite_Linen_Duvet_Cover_Set.png?v=1747894963",
    badge: "Sale",
    isNew: false,
  },
  {
    id: 4,
    name: "Walnut Desk Organiser",
    category: "Office",
    price: 52,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 143,
    image: "https://m.media-amazon.com/images/I/61yAEr-XpWL.jpg",
    badge: undefined,
    isNew: true,
  },
  {
    id: 5,
    name: "Soy Wax Candle Trio",
    category: "Wellness",
    price: 38,
    originalPrice: 48,
    rating: 4.9,
    reviewCount: 561,
    image: "https://wilderdayscandlecompany.com/cdn/shop/files/trio_lit.jpg?v=1721176545",
    badge: "Sale",
    isNew: false,
  },
  {
    id: 6,
    name: "Bamboo Bath Towel Set",
    category: "Bathroom",
    price: 72,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 289,
    image: "http://bedvoyage.com/cdn/shop/files/Bamboo-8pc-Towel-Set-Sage-main.jpg?v=1758220444",
    badge: "New",
    isNew: true,
  },
];

const categories = [
  {
    id: "home",
    label: "Home & Living",
    description: "Elevate every room",
    image: "https://houseandhome.com/wp-content/uploads/2020/12/feature-LivingRoom-091_TREES_HH_AP20_40.jpg",
    count: 142,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    description: "Cook with intention",
    image: "https://houseandhome.com/wp-content/uploads/2020/12/feature-LivingRoom-091_TREES_HH_AP20_40.jpg",
    count: 98,
  },
  {
    id: "bedroom",
    label: "Bedroom",
    description: "Rest, restored",
    image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg",
    count: 76,
  },
  {
    id: "wellness",
    label: "Wellness",
    description: "Rituals that restore",
    image: "https://www.bhg.com/thmb/mbEhjvzrbqrclPYRw-OsDtBwqBI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bedroom-wooden-accent-wall-9KdgK5zqKcz9ukcu6xy1Hx-c1217ee14b1b43e0ae82ec2046743af5.jpg",
    count: 64,
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over $75. Fast, tracked, and reliable.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Every product is hand-selected and tested to meet our exacting standards.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Changed your mind? Return anything within 60 days, no questions asked.",
  },
  {
    icon: Headphones,
    title: "Concierge Support",
    description: "Our team of product experts is available 7 days a week to help you.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia Hartley",
    role: "Interior Designer",
    avatar: "https://eyxc4smzpqy.exactdn.com/wp-content/uploads/2024/10/31776692_l.jpg?strip=all",
    rating: 5,
    text: "Lumière has completely transformed how I source pieces for my clients. The curation is impeccable — every item feels considered and beautifully made.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Architect",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "I've been shopping here for two years and the quality never disappoints. The merino throw is a permanent fixture in every project I do.",
  },
  {
    id: 3,
    name: "Isla Fontaine",
    role: "Lifestyle Blogger",
    avatar: "https://cdn.shopify.com/s/files/1/2500/1236/files/logo_Venezia_300dpi.png?height=628&pad_color=ffffff&v=1613166103&width=1200",
    rating: 5,
    text: "Finally a store that understands that good design and sustainability aren't mutually exclusive. My home has never felt more intentional.",
  },
];

const deals = [
  {
    id: 7,
    name: "Handwoven Rattan Tray",
    category: "Home & Living",
    price: 34,
    originalPrice: 55,
    rating: 4.7,
    reviewCount: 88,
    image: "https://images.thdstatic.com/productImages/72b3985573a44671be34b4afe1f02979/svn/natural-color-decorative-trays-smccp21szp-64_600.jpg",
    badge: "40% Off",
  },
  {
    id: 8,
    name: "Organic Cotton Robe",
    category: "Wellness",
    price: 95,
    originalPrice: 135,
    rating: 4.9,
    reviewCount: 204,
    image: "/images/organic-cotton-bathrobe.jpg",
    badge: "30% Off",
  },
  {
    id: 9,
    name: "Marble & Brass Bookends",
    category: "Office",
    price: 48,
    originalPrice: 70,
    rating: 4.6,
    reviewCount: 117,
    image: "/images/marble-brass-bookends.jpg",
    badge: "31% Off",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
  );
}

function BadgePill({ badge }: { badge: string }) {
  const colorMap: Record<string, string> = {
    "Best Seller": "bg-violet-100 text-violet-700",
    New: "bg-emerald-100 text-emerald-700",
    Sale: "bg-rose-100 text-rose-700",
    "40% Off": "bg-rose-100 text-rose-700",
    "30% Off": "bg-rose-100 text-rose-700",
    "31% Off": "bg-rose-100 text-rose-700",
  };
  const cls = colorMap[badge] ?? "bg-slate-100 text-slate-600";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>{badge}</span>
  );
}

interface ProductCardProps {
  product: (typeof featuredProducts)[0];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn as Variants}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
          }}
        />
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </motion.button>
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <BadgePill badge={product.badge} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-violet-600 font-medium mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-snug">{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">
              ${(product.price ?? 0).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-violet-50/40 to-white pt-20 pb-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-violet-100/50 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-violet-50/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer as Variants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                New Summer Collection — Now Live
              </motion.div>

              <motion.h1
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
              >
                Live with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400">
                  intention.
                </span>
              </motion.h1>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                {BRAND_TAGLINE} Discover premium home goods, wellness essentials, and everyday
                luxuries — each piece chosen to make your space feel like you.
              </motion.p>

              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <motion.a
                  href="#products"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-violet-200 transition-colors duration-200"
                >
                  Shop the Collection
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#categories"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-colors duration-200"
                >
                  Browse Categories
                </motion.a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start text-sm text-slate-500"
              >
                {["Free shipping over $75", "60-day returns", "4.9 ★ from 2,400+ reviews"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-violet-500" />
                      {item}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Right hero image grid */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInRight as Variants}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img
                    src="https://www.decorilla.com/online-decorating/wp-content/uploads/2023/11/Cozy-home-interior-design-ideas-for-winter.jpg"
                    alt="Cozy home interior"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
                    }}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img
                    src="https://www.adailysomething.com/wp-content/uploads/2019/04/adailysomething_amroutine-31.jpg"
                    alt="Morning coffee ritual"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80";
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img
                    src="https://www.coyuchi.com/cdn/shop/files/relaxedlinen_sheeting__sp23_1_054420b5-7cba-48c3-8330-9a86fb739007.jpg?v=1728688573"
                    alt="Linen bedroom"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80";
                    }}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img
                    src="https://target.scene7.com/is/image/Target/GUEST_9b24b618-e319-40ee-ab5b-a235cc74bed6?wid=300&hei=300&fmt=pjpeg"
                    alt="Wellness candles"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80";
                    }}
                  />
                </div>
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-violet-500 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                  <p className="text-xs text-slate-500">2,400+ happy customers</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <vp.icon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1">{vp.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{vp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-12"
          >
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Browse by Category
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Find your perfect space
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From the kitchen to the bedroom, every corner of your home deserves something
              beautiful.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {categories.map((cat) => (
              <motion.a
                key={cat.id}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                variants={shouldReduceMotion ? undefined : scaleIn as Variants}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                    {cat.label}
                  </h3>
                  <p className="text-slate-300 text-xs mt-0.5">{cat.description}</p>
                  <p className="text-violet-300 text-xs mt-1 font-medium">{cat.count} items</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Featured Products
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Handpicked for you
              </h2>
            </div>
            <motion.a
              href="#deals"
              whileHover={shouldReduceMotion ? {} : { x: 4 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#deals")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 text-violet-600 font-semibold text-sm hover:text-violet-700 transition-colors"
            >
              View all deals <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEALS BANNER ─────────────────────────────────────────────────── */}
      <section id="deals" className="py-20 bg-gradient-to-br from-violet-600 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-12"
          >
            <p className="text-violet-200 font-semibold text-sm uppercase tracking-widest mb-3">
              Limited Time
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Summer Sale — Up to 40% Off
            </h2>
            <p className="text-violet-200 max-w-xl mx-auto">
              Our biggest sale of the season. Premium pieces at prices that make sense — but only
              while stocks last.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {deals.map((product) => (
              <motion.div
                key={product.id}
                variants={shouldReduceMotion ? undefined : scaleIn as Variants}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col group"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
                    }}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <BadgePill badge={product.badge} />
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-violet-600 font-medium mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">{product.name}</h3>
                  <StarRating rating={product.rating} count={product.reviewCount} />
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-slate-900">
                        ${(product.price ?? 0).toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-12"
          >
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Loved by 2,400+ customers
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Don't take our word for it. Here's what people who live with {BRAND_NAME} every day
              have to say.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
              >
                <Quote className="w-8 h-8 text-violet-200 mb-4 flex-shrink-0" />
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              {...motionProps(slideInLeft as Variants)}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img
                    src="https://shop.vitcas.com/media/amasty/blog/cache/P/o/1000/690/Pottery-craft-ceramics.jpg"
                    alt="Artisan crafting ceramics"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80";
                    }}
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                    <img
                      src="https://blog.papermart.com/wp-content/uploads/2023/06/Eco-01.jpg"
                      alt="Sustainable packaging"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1542601906897-ecd3e6d8c4b7?w=400&q=80";
                      }}
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                    <img
                      src="https://cdn.prod.website-files.com/633ba56449e47e780c7ac81f/67fd2ee61ccd192a031533f5_Untitled%20(13).webp"
                      alt="Team curating products"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80";
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Stat pill */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white rounded-2xl shadow-xl px-6 py-3 flex items-center gap-4 whitespace-nowrap"
              >
                <div className="text-center">
                  <p className="text-xl font-bold">380+</p>
                  <p className="text-xs text-violet-200">Products</p>
                </div>
                <div className="w-px h-8 bg-violet-400" />
                <div className="text-center">
                  <p className="text-xl font-bold">48</p>
                  <p className="text-xs text-violet-200">Artisan Makers</p>
                </div>
                <div className="w-px h-8 bg-violet-400" />
                <div className="text-center">
                  <p className="text-xl font-bold">12</p>
                  <p className="text-xs text-violet-200">Countries</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              {...motionProps(slideInRight as Variants)}
              className="lg:pl-4"
            >
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-4">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Curation as a form of care
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                {BRAND_NAME} was born from a simple belief: the objects we surround ourselves with
                shape how we feel. We work directly with independent makers and sustainable brands
                across 12 countries to bring you pieces that are as thoughtfully made as they are
                beautiful.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Every product in our collection is tested by our team, vetted for ethical
                production, and chosen because it genuinely improves daily life — not just because
                it looks good in a photo.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Ethically sourced", icon: Check },
                  { label: "Carbon-neutral shipping", icon: Check },
                  { label: "Plastic-free packaging", icon: Check },
                  { label: "1% for the Planet member", icon: Check },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3 h-3 text-violet-600" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
              <motion.a
                href="#products"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-violet-200 transition-colors duration-200"
              >
                Explore the Collection <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-900/40 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-800/30 blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...motionProps(staggerContainer as Variants)}
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
              className="inline-flex items-center gap-2 bg-violet-900/60 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join the {BRAND_NAME} Community
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Get 15% off your first order
            </motion.h2>
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
              className="text-slate-400 mb-8 leading-relaxed"
            >
              Subscribe to our newsletter for early access to new arrivals, exclusive member
              discounts, and thoughtful content about intentional living.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl px-6 py-4"
              >
                <Check className="w-5 h-5" />
                <span className="font-semibold">You're in! Check your inbox for your 15% code.</span>
              </motion.div>
            ) : (
              <motion.form
                variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
                >
                  Claim 15% Off
                </motion.button>
              </motion.form>
            )}

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp as Variants}
              className="text-slate-500 text-xs mt-4"
            >
              No spam, ever. Unsubscribe at any time. We respect your privacy.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
