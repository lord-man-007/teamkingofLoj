import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, ShoppingCart, Bell, User, ChevronLeft, ChevronRight,
  Heart, Star, MapPin, Clock, Zap, TrendingUp, Shield, Truck,
  RotateCcw, Headphones, Menu, X, ChevronDown, Eye, MessageCircle,
  Home, Grid3X3, PlusCircle, UserCircle, Filter, ArrowUp,
  Phone, Mail, Globe, Camera, PlayCircle
} from "lucide-react";
import {
  categories, flashSaleProducts, allProducts, banners,
  formatPrice, formatSold, type Product
} from "./data";

// ===================== HEADER =====================
function Header({ onSearch, cartCount }: { onSearch: (q: string) => void; cartCount: number }) {
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="bg-dark sticky top-0 z-50 shadow-lg shadow-black/30">
      {/* Top bar */}
      <div className="bg-dark-2 text-xs text-gray-400 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex gap-4">
            <span>Tải ứng dụng</span>
            <span>Kết nối: <Globe className="inline w-3.5 h-3.5 ml-1" /> <Camera className="inline w-3.5 h-3.5 ml-1" /></span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:text-primary transition-colors">Thông Báo</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Hỗ Trợ</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Đăng Ký</span>
            <span className="cursor-pointer hover:text-primary transition-colors font-semibold text-primary">Đăng Nhập</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 mr-2">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              <span className="text-primary">CHỢ</span>
              <span className="text-white">TỐT</span>
            </h1>
            <p className="text-[10px] text-gray-400 hidden md:block tracking-wider">Mua bán online #1 Việt Nam</p>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, danh mục..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
                className="w-full bg-white rounded-sm py-2.5 pl-4 pr-14 text-sm text-dark outline-none border-2 border-transparent focus:border-primary transition-colors"
              />
              <button
                onClick={() => onSearch(query)}
                className="absolute right-0 top-0 bottom-0 bg-primary hover:bg-primary-dark transition-colors px-5 rounded-r-sm"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="hidden md:flex gap-3 mt-1.5 text-xs text-gray-400">
              {["iPhone 15", "Laptop giá rẻ", "Xe máy cũ", "Nội thất", "Giày Nike"].map((tag) => (
                <span key={tag} className="cursor-pointer hover:text-primary transition-colors">{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <button className="relative text-white hover:text-primary transition-colors hidden md:block">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-accent-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">5</span>
            </button>
            <button className="relative text-white hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button className="hidden md:flex items-center gap-1.5 text-white hover:text-primary transition-colors text-sm">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-dark-2 hidden md:block border-t border-dark-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 py-1">
            <button className="flex items-center gap-1 text-white text-sm px-3 py-2 hover:text-primary transition-colors font-medium">
              <Grid3X3 className="w-4 h-4" />
              Danh mục
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="h-4 w-px bg-dark-4 mx-1"></div>
            {["Điện thoại", "Xe cộ", "Đồ điện tử", "Thời trang", "Nội thất", "Việc làm", "Thú cưng", "Dịch vụ"].map((cat) => (
              <button key={cat} className="text-gray-300 text-sm px-3 py-2 hover:text-primary transition-colors whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-dark-2 border-t border-dark-3 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {["Trang chủ", "Danh mục", "Đăng tin", "Thông báo", "Tài khoản"].map((item) => (
              <button key={item} className="block w-full text-left text-gray-300 py-2 px-3 hover:bg-dark-3 hover:text-primary rounded transition-colors">
                {item}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-primary text-white py-2 rounded text-sm font-semibold">Đăng nhập</button>
              <button className="flex-1 border border-primary text-primary py-2 rounded text-sm font-semibold">Đăng ký</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ===================== BANNER CAROUSEL =====================
function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full relative h-48 sm:h-64 md:h-80 lg:h-96 cursor-pointer">
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent flex items-center">
              <div className="px-8 md:px-16">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-primary text-lg md:text-2xl font-bold mb-4 md:mb-6">{banner.subtitle}</p>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-8 rounded-sm text-sm transition-colors shadow-lg shadow-primary/30">
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-4 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ===================== CATEGORIES =====================
function CategorySection() {
  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-dark flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-primary" />
          DANH MỤC
        </h2>
        <button className="text-sm text-primary hover:text-primary-dark font-medium">Xem tất cả &gt;</button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-center gap-2 py-5 px-2 hover:bg-warm-gray transition-colors border-r border-b border-gray-50 group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xs text-dark-3 group-hover:text-primary text-center leading-tight font-medium transition-colors">{cat.name}</span>
            <span className="text-[10px] text-gray-400">({new Intl.NumberFormat('vi-VN').format(cat.count)})</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ===================== FLASH SALE =====================
function FlashSaleSection({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 45 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-gradient-to-r from-dark via-dark-2 to-dark rounded-lg shadow-lg overflow-hidden border border-dark-3">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Zap className="w-6 h-6 text-accent-yellow animate-pulse" />
            <h2 className="text-xl md:text-2xl font-black text-primary tracking-tight">FLASH SALE</h2>
          </div>
          <div className="flex items-center gap-1 ml-3">
            {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((t, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded animate-countdown inline-block min-w-[32px] text-center">{t}</span>
                {i < 2 && <span className="text-primary font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>
        <button className="text-primary text-sm font-semibold hover:text-primary-light transition-colors hidden sm:block">
          Xem tất cả &gt;
        </button>
      </div>

      {/* Products */}
      <div className="relative group">
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto hide-scrollbar px-4 md:px-6 pb-5">
          {flashSaleProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <button onClick={() => scroll(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 bg-dark-2/90 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => scroll(1)} className="absolute right-1 top-1/2 -translate-y-1/2 bg-dark-2/90 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

function FlashSaleCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const soldPercent = Math.min(((product.sold || 0) / 1000) * 100, 95);

  return (
    <div className="min-w-[160px] sm:min-w-[180px] bg-dark-3 rounded-lg overflow-hidden flex-shrink-0 group/card hover:ring-2 hover:ring-primary transition-all cursor-pointer">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-40 sm:h-44 object-cover group-hover/card:scale-105 transition-transform duration-300" loading="lazy" />
        {product.discount && (
          <div className="absolute top-0 right-0 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
            -{product.discount}%
          </div>
        )}
        {product.badge && (
          <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5">
            {product.badge}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-2 right-2 bg-primary hover:bg-primary-dark text-white p-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-all shadow-lg"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-white text-xs line-clamp-2 mb-2 leading-relaxed">{product.name}</p>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-primary font-bold text-sm">{formatPrice(product.price)}</span>
        </div>
        {product.originalPrice && (
          <span className="text-gray-500 text-[10px] line-through">{formatPrice(product.originalPrice)}</span>
        )}
        <div className="mt-2 relative h-4 bg-dark-4 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent-red rounded-full transition-all" style={{ width: `${soldPercent}%` }} />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold">
            Đã bán {formatSold(product.sold || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ===================== PRODUCT CARD =====================
function ProductCard({ product, onAddToCart, onToggleFav, isFav }: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleFav: (id: number) => void;
  isFav: boolean;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-gray-100">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
            -{product.discount}%
          </div>
        )}
        {product.badge && (
          <div className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-sm shadow ${product.badge === "Mall" ? "bg-primary" : product.badge === "Yêu thích+" ? "bg-accent-red" : "bg-primary-dark"}`}>
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFav(product.id); }}
            className={`p-2 rounded-full shadow-lg transition-colors ${isFav ? "bg-accent-red text-white" : "bg-white/90 text-dark hover:bg-accent-red hover:text-white"}`}
          >
            <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="p-2 bg-white/90 text-dark hover:bg-primary hover:text-white rounded-full shadow-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="flex-1 bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 px-3 rounded-full shadow-lg transition-colors flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Thêm
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm text-dark-2 line-clamp-2 mb-2 leading-relaxed font-medium group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-primary font-bold text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
          {product.rating && (
            <span className="flex items-center gap-0.5 text-star">
              <Star className="w-3 h-3" fill="currentColor" />
              {product.rating}
            </span>
          )}
          {product.sold && (
            <span>Đã bán {formatSold(product.sold)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
          <span className="mx-1">·</span>
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{product.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

// ===================== PRODUCT GRID =====================
function ProductGrid({ products, onAddToCart, favorites, onToggleFav }: {
  products: Product[];
  onAddToCart: (p: Product) => void;
  favorites: Set<number>;
  onToggleFav: (id: number) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-dark flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          GỢI Ý HÔM NAY
        </h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-xs bg-dark text-white px-3 py-1.5 rounded-full hover:bg-primary transition-colors">
            <Filter className="w-3 h-3" /> Bộ lọc
          </button>
        </div>
      </div>

      {/* Sort tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
        {["Phổ biến", "Mới nhất", "Bán chạy", "Giá thấp", "Giá cao"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${i === 0 ? "bg-primary text-white font-semibold" : "bg-white text-dark-3 hover:bg-primary/10 hover:text-primary border border-gray-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.map((product, idx) => (
          <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleFav={onToggleFav}
              isFav={favorites.has(product.id)}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-12 rounded-sm transition-colors text-sm shadow-sm">
          Xem thêm sản phẩm
        </button>
      </div>
    </section>
  );
}

// ===================== FEATURES =====================
function FeaturesSection() {
  const features = [
    { icon: <Shield className="w-8 h-8" />, title: "Đảm bảo chính hãng", desc: "100% sản phẩm chính hãng" },
    { icon: <Truck className="w-8 h-8" />, title: "Giao hàng miễn phí", desc: "Cho đơn từ 300.000đ" },
    { icon: <RotateCcw className="w-8 h-8" />, title: "Đổi trả dễ dàng", desc: "Trong vòng 7 ngày" },
    { icon: <Headphones className="w-8 h-8" />, title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng hỗ trợ" },
  ];

  return (
    <section className="bg-gradient-to-r from-dark via-dark-2 to-dark rounded-lg p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3 group">
            <div className="text-primary group-hover:scale-110 transition-transform">{f.icon}</div>
            <h3 className="text-white font-semibold text-sm">{f.title}</h3>
            <p className="text-gray-400 text-xs">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================== POST AD BANNER =====================
function PostAdBanner() {
  return (
    <section className="bg-gradient-to-r from-primary via-primary-dark to-dark rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse-glow">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">ĐĂNG TIN MIỄN PHÍ</h2>
        <p className="text-white/80 text-sm md:text-base">Bán nhanh, mua nhanh - Tiếp cận hàng triệu người mua</p>
      </div>
      <button className="bg-white text-primary font-bold py-3 px-8 rounded-sm hover:bg-gray-100 transition-colors text-sm shadow-lg flex items-center gap-2 whitespace-nowrap">
        <PlusCircle className="w-5 h-5" />
        ĐĂNG TIN NGAY
      </button>
    </section>
  );
}

// ===================== STATISTICS =====================
function StatsSection() {
  const stats = [
    { value: "2.5M+", label: "Người dùng" },
    { value: "500K+", label: "Sản phẩm" },
    { value: "100K+", label: "Giao dịch/ngày" },
    { value: "63", label: "Tỉnh thành" },
  ];
  return (
    <section className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-primary mb-1">{s.value}</div>
            <div className="text-dark-4 text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================== FOOTER =====================
function Footer() {
  return (
    <footer className="bg-dark text-gray-400 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold mb-4">
              <span className="text-primary">CHỢ</span>
              <span className="text-white">TỐT</span>
            </h2>
            <p className="text-sm mb-4 leading-relaxed">Nền tảng mua bán trực tuyến hàng đầu Việt Nam. Kết nối người mua và người bán trên khắp 63 tỉnh thành.</p>
            <div className="flex gap-3">
              {[Globe, Camera, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-dark-3 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">VỀ CHỢ TỐT</h3>
            <ul className="space-y-2 text-sm">
              {["Giới thiệu", "Tuyển dụng", "Chính sách bảo mật", "Điều khoản sử dụng", "Liên hệ"].map((link) => (
                <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="space-y-2 text-sm">
              {["Trung tâm trợ giúp", "An toàn mua bán", "Quy định cần biết", "Hướng dẫn đăng tin", "Báo cáo vi phạm"].map((link) => (
                <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">LIÊN HỆ</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> 1900 636 388</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hotro@chotot.com</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> TP. Hồ Chí Minh, Việt Nam</p>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Tải ứng dụng:</p>
              <div className="flex gap-2">
                <button className="bg-dark-3 hover:bg-dark-4 text-white text-xs px-3 py-2 rounded transition-colors">📱 App Store</button>
                <button className="bg-dark-3 hover:bg-dark-4 text-white text-xs px-3 py-2 rounded transition-colors">🤖 Google Play</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-3 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">© 2024 Chợ Tốt. Tất cả quyền được bảo lưu.</p>
          <p className="text-xs text-gray-500">Giấy phép ĐKKD số: 0313004XXX do Sở KH&ĐT TP.HCM cấp</p>
        </div>
      </div>
    </footer>
  );
}

// ===================== MOBILE BOTTOM NAV =====================
function MobileBottomNav() {
  const [active, setActive] = useState(0);
  const items = [
    { icon: <Home className="w-5 h-5" />, label: "Trang chủ" },
    { icon: <Grid3X3 className="w-5 h-5" />, label: "Danh mục" },
    { icon: <PlusCircle className="w-6 h-6" />, label: "Đăng tin", special: true },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Chat" },
    { icon: <UserCircle className="w-5 h-5" />, label: "Tôi" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark border-t border-dark-3 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-1.5">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 ${item.special ? "" : i === active ? "text-primary" : "text-gray-500"}`}
          >
            {item.special ? (
              <div className="bg-primary text-white rounded-full p-2 -mt-5 shadow-lg shadow-primary/40 border-4 border-dark">
                {item.icon}
              </div>
            ) : (
              item.icon
            )}
            <span className={`text-[10px] ${item.special ? "text-primary font-semibold mt-0.5" : ""}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ===================== SCROLL TO TOP =====================
function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 md:bottom-8 right-4 bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-xl shadow-primary/30 z-40 transition-all animate-fade-in"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

// ===================== TOAST =====================
function Toast({ message, show }: { message: string; show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-dark text-white px-6 py-3 rounded-lg shadow-xl z-[100] animate-fade-in flex items-center gap-2 border border-primary/30">
      <ShoppingCart className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [_searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    showToast(`Đã thêm "${product.name.substring(0, 30)}..." vào giỏ`);
  };

  const handleToggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setDisplayedProducts(allProducts);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    );
    setDisplayedProducts(filtered.length > 0 ? filtered : allProducts);
  };

  return (
    <div className="min-h-screen bg-warm-gray pb-16 md:pb-0">
      <Header onSearch={handleSearch} cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-3 md:px-4 space-y-5 mt-5">
        {/* Banner */}
        <BannerCarousel />

        {/* Categories */}
        <CategorySection />

        {/* Flash Sale */}
        <FlashSaleSection onAddToCart={handleAddToCart} />

        {/* Features */}
        <FeaturesSection />

        {/* Post Ad Banner */}
        <PostAdBanner />

        {/* Stats */}
        <StatsSection />

        {/* Product Grid */}
        <ProductGrid
          products={displayedProducts}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFav={handleToggleFav}
        />
      </main>

      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
