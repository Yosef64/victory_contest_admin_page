import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, TrendingUp, Users, Target, Zap, Brain, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HighlightedCard() {
  return (
    <Card className="group relative overflow-hidden transition-all duration-1000 ease-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2">
      {/* Animated Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-xl border border-white/40 rounded-2xl" />
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl" />
      
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-blue-400/30 to-purple-400/30 animate-pulse delay-1000" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-12 right-16 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-20 right-12 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-8 left-12 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-16 left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 left-16 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>
      
      {/* Content */}
      <CardContent className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1 space-y-6">
            {/* Enhanced Header with 3D Effect */}
            <div className="flex items-center gap-4 group/header">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl transform transition-all duration-500 group-hover/header:scale-110 group-hover/header:rotate-3 group-hover/header:shadow-blue-500/50">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  AI-Powered Insights
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Discover hidden patterns in your data with advanced analytics
                </p>
              </div>
            </div>
            
            {/* Enhanced Description */}
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed max-w-lg text-base font-medium">
                Uncover performance insights and visitor patterns with our intelligent analytics engine. 
                Get actionable recommendations to boost your contest performance and engagement.
              </p>
              
              {/* Feature Icons with Hover Effects */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 group/feature transform transition-all duration-300 hover:scale-105">
                  <div className="p-2 rounded-xl bg-emerald-100 group-hover/feature:bg-emerald-200 transition-colors duration-300">
                    <Zap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover/feature:text-emerald-700 transition-colors duration-300">
                    Real-time data
                  </span>
                </div>
                
                <div className="flex items-center gap-3 group/feature transform transition-all duration-300 hover:scale-105">
                  <div className="p-2 rounded-xl bg-blue-100 group-hover/feature:bg-blue-200 transition-colors duration-300">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover/feature:text-blue-700 transition-colors duration-300">
                    AI predictions
                  </span>
                </div>
                
                <div className="flex items-center gap-3 group/feature transform transition-all duration-300 hover:scale-105">
                  <div className="p-2 rounded-xl bg-purple-100 group-hover/feature:bg-purple-200 transition-colors duration-300">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover/feature:text-purple-700 transition-colors duration-300">
                    Smart alerts
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Action Section */}
          <div className="flex flex-col items-center gap-6">
            {/* Enhanced Stats Preview with 3D Effect */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-emerald-200/50 hover:-translate-y-1">
                <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <p className="text-lg font-bold text-emerald-700">+12%</p>
                <p className="text-xs text-emerald-600 font-medium">Users</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-blue-200/50 hover:-translate-y-1">
                <Target className="w-6 h-6 text-blue-600 mx-auto mb-2 animate-bounce" style={{ animationDelay: '1s' }} />
                <p className="text-lg font-bold text-blue-700">+8%</p>
                <p className="text-xs text-blue-600 font-medium">Engagement</p>
              </div>
            </div>
            
            {/* Enhanced CTA Button with Shimmer Effect */}
            <Button 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 transform"
              size="lg"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative flex items-center gap-3 text-lg">
                <Zap className="w-5 h-5 animate-pulse" />
                Get Insights
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
        
        {/* Enhanced Floating Elements with 3D Movement */}
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300 animate-pulse blur-sm" />
        <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/30 to-blue-400/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-500 animate-pulse blur-sm" />
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/2 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-700 animate-pulse blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-1000 animate-pulse blur-sm" />
      </CardContent>
      
      {/* Enhanced Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-2xl scale-110" />
    </Card>
  );
}
