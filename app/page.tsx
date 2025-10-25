import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Bell, TrendingUp, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <Zap className="h-4 w-4" />
            <span>Optimize Your Marketing Stack</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            Systems That{" "}
            <span className="bg-gradient-to-r from-[#84CC16] to-[#65A30D] bg-clip-text text-transparent">Actually</span>{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] bg-clip-text text-transparent">Work</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Track, Monitor, and Optimize Your Martech Stack From One Clean Dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" variant="outline" className="text-base px-8 h-12" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-[#84CC16]">$2M+</div>
              <div className="text-sm text-muted-foreground">Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Tools Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Everything You Need</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Monitor Your Entire MarTech Stack From a Single, Beautiful Dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-Time Metrics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track uptime, response times, and health scores in real-time with instant updates.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="border-2 hover:border-[#84CC16]/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#84CC16]/10 flex items-center justify-center group-hover:bg-[#84CC16]/20 transition-colors">
                  <Bell className="h-6 w-6 text-[#84CC16]" />
                </div>
                <h3 className="text-xl font-bold">Smart Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get notified when services degrade or go down, before your customers notice.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Trend Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize patterns and optimize your stack over time with detailed analytics.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 4 */}
            <Card className="border-2 hover:border-[#84CC16]/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#84CC16]/10 flex items-center justify-center group-hover:bg-[#84CC16]/20 transition-colors">
                  <Users className="h-6 w-6 text-[#84CC16]" />
                </div>
                <h3 className="text-xl font-bold">Vendor Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Keep track of all vendor relationships, contracts, and renewal dates in one place.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 5 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cost Optimization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Identify underutilized tools and optimize spending across your entire stack.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 6 */}
            <Card className="border-2 hover:border-[#84CC16]/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#84CC16]/10 flex items-center justify-center group-hover:bg-[#84CC16]/20 transition-colors">
                  <Zap className="h-6 w-6 text-[#84CC16]" />
                </div>
                <h3 className="text-xl font-bold">Utilization Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  See which tools are being used effectively and which are collecting dust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-[#84CC16]/5">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Stop Wasting Time Digging For Answers
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Join hundreds of teams already saving time and money with our dashboard.
            </p>
            <Button size="lg" variant="outline" className="text-base px-8 h-12" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-light-1024-3MKfAUHxpc7h96q1HIurk4G5p00tRY.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-sm text-muted-foreground">
                © 2025 Works in Prod. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
