// Example Components using your brand colors

// ========================================
// 1. Hero Section
// ========================================
export function Hero() {
  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6">
          Unified MarTech{' '}
          <span className="text-gradient-brand-accent">Intelligence</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Connect, analyze, and optimize your entire marketing stack from one powerful platform.
        </p>
        <div className="flex gap-4">
          <button className="bg-brand-500 hover:bg-brand-600 text-dark font-semibold px-6 py-3 rounded-lg transition-colors">
            Get Started
          </button>
          <button className="bg-dark-100 hover:bg-dark-200 text-white font-semibold px-6 py-3 rounded-lg border border-dark-200 transition-colors">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}

// ========================================
// 2. Metric Card (for dashboards)
// ========================================
export function MetricCard({ title, value, change, trend }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-dark-200">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
        {value}
      </p>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${isPositive ? 'text-brand-600' : 'text-accent-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500">vs last period</span>
      </div>
    </div>
  );
}

// ========================================
// 3. Feature Card
// ========================================
export function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white dark:bg-dark-100 rounded-xl p-8 border border-gray-200 dark:border-dark-200 hover:border-brand-500 dark:hover:border-brand-500 transition-all">
      <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

// ========================================
// 4. Navigation Bar
// ========================================
export function Navbar() {
  return (
    <nav className="bg-white dark:bg-dark border-b border-gray-200 dark:border-dark-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Your logo SVG here */}
          <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
            YourApp
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
            Features
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
            Pricing
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">
            Docs
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
            Sign In
          </button>
          <button className="bg-brand-500 hover:bg-brand-600 text-dark font-semibold px-4 py-2 rounded-lg transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </nav>
  );
}

// ========================================
// 5. Button Variants
// ========================================
export function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Primary - Lime */}
      <button className="bg-brand-500 hover:bg-brand-600 text-dark font-semibold px-6 py-3 rounded-lg transition-colors">
        Primary Action
      </button>

      {/* Secondary - Purple */}
      <button className="bg-accent-600 hover:bg-accent-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        Secondary Action
      </button>

      {/* Outline */}
      <button className="border-2 border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 font-semibold px-6 py-3 rounded-lg transition-colors">
        Outline Button
      </button>

      {/* Ghost */}
      <button className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100 font-semibold px-6 py-3 rounded-lg transition-colors">
        Ghost Button
      </button>
    </div>
  );
}

// ========================================
// 6. Badge/Tag Components
// ========================================
export function Badge({ children, variant = 'brand' }) {
  const variants = {
    brand: 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-400',
    accent: 'bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-400',
    success: 'bg-brand-100 text-brand-700',
    warning: 'bg-amber-100 text-amber-700',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

// ========================================
// 7. Alert/Notification Component
// ========================================
export function Alert({ type = 'success', children }) {
  const styles = {
    success: {
      bg: 'bg-brand-50 dark:bg-brand-950',
      border: 'border-brand-200 dark:border-brand-800',
      text: 'text-brand-800 dark:text-brand-200',
      icon: 'text-brand-600',
    },
    info: {
      bg: 'bg-accent-50 dark:bg-accent-950',
      border: 'border-accent-200 dark:border-accent-800',
      text: 'text-accent-800 dark:text-accent-200',
      icon: 'text-accent-600',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border ${style.border} ${style.text} rounded-lg p-4`}>
      {children}
    </div>
  );
}

// ========================================
// 8. Data Visualization Example
// ========================================
export function StatsGrid() {
  const stats = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', positive: true },
    { label: 'Active Campaigns', value: '24', change: '+3', positive: true },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', positive: true },
    { label: 'Avg. Order Value', value: '$156', change: '-2.1%', positive: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-dark-200">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
          <p className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            {stat.value}
          </p>
          <span className={`text-sm font-semibold ${stat.positive ? 'text-brand-600' : 'text-accent-600'}`}>
            {stat.change}
          </span>
        </div>
      ))}
    </div>
  );
}
