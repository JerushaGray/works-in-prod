// Starter Component Library
// Copy these as you need them while building

// ========================================
// Button Component
// ========================================
export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  ...props 
}) {
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-dark',
    secondary: 'bg-accent-600 hover:bg-accent-700 text-white',
    outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button 
      className={`${variants[variant]} ${sizes[size]} font-semibold rounded-lg transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
}

// Usage:
// <Button>Primary CTA</Button>
// <Button variant="secondary">Learn More</Button>
// <Button variant="outline" size="sm">Details</Button>

// ========================================
// Logo Component (with auto dark mode)
// ========================================
export function Logo({ className = "h-8" }) {
  return (
    <>
      {/* Light mode: Purple + Lime */}
      <img 
        src="/logo-light.svg" 
        alt="Logo" 
        className={`dark:hidden ${className}`}
      />
      
      {/* Dark mode: White + Lime */}
      <img 
        src="/logo-dark.svg" 
        alt="Logo" 
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}

// ========================================
// Card Component
// ========================================
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-dark-200 hover:border-brand-500 transition-all ${className}`}>
      {children}
    </div>
  );
}

// ========================================
// Navigation Bar
// ========================================
export function Nav() {
  return (
    <nav className="bg-white dark:bg-dark border-b border-gray-200 dark:border-dark-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500">
            Features
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500">
            About
          </a>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}

// ========================================
// Status Badge
// ========================================
export function StatusBadge({ status = 'success', children }) {
  const styles = {
    success: 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    info: 'bg-accent-100 text-accent-700 dark:bg-accent-950 dark:text-accent-400',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {children}
    </span>
  );
}

// ========================================
// Metric Card (for dashboard)
// ========================================
export function MetricCard({ title, value, change, trend = 'up' }) {
  return (
    <Card>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
        {value}
      </p>
      {change && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${trend === 'up' ? 'text-brand-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500">vs last period</span>
        </div>
      )}
    </Card>
  );
}

// Usage:
// <MetricCard title="Uptime" value="99.9%" change="+0.2%" trend="up" />

// ========================================
// Hero Section
// ========================================
export function Hero() {
  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
          Systems That{' '}
          <span className="text-gradient-brand-accent">Actually Work</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Track, monitor, and optimize your martech stack from one clean dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">View Dashboard</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
}

// ========================================
// Simple Table (for stack inventory)
// ========================================
export function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-dark-100">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-dark-200">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-dark-100">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ========================================
// Link Component
// ========================================
export function Link({ href, children, className = "" }) {
  return (
    <a 
      href={href}
      className={`text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors ${className}`}
    >
      {children}
    </a>
  );
}

// ========================================
// Container (max-width wrapper)
// ========================================
export function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}

// ========================================
// Section (with consistent spacing)
// ========================================
export function Section({ children, className = "" }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

// ========================================
// Grid Layout
// ========================================
export function Grid({ children, cols = 3, className = "" }) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6 ${className}`}>
      {children}
    </div>
  );
}

// Usage:
// <Grid cols={3}>
//   <MetricCard ... />
//   <MetricCard ... />
//   <MetricCard ... />
// </Grid>
