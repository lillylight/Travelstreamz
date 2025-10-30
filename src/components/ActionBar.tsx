import { Button } from "@/components/ui/button";
import { TrendingUp, ShoppingCart, Wallet, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { BasePay } from "./BasePay";
import { useAccount } from "wagmi";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActionBarProps {
  tokenSymbol: string;
  tokenPrice: number;
}

export const ActionBar = ({ tokenSymbol, tokenPrice }: ActionBarProps) => {
  const [betAmount, setBetAmount] = useState(10);
  const [buyAmount, setBuyAmount] = useState(100);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isConnected } = useAccount();

  return (
    <>
      {/* Floating Action Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open trading panel"
        >
          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:rotate-12 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 animate-ping opacity-20" />
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 p-3 sm:p-4 md:p-6 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Trading Panel</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close trading panel"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Token Info */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-purple-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">T</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">TRAVEL</p>
                  <p className="text-gray-400 text-xs sm:text-sm">TravelStreamz Token</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm sm:text-lg">$0.0234</p>
                <p className="text-green-400 text-xs sm:text-sm">+12.5%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <p className="text-gray-400 text-xs">Volume</p>
                <p className="text-white font-semibold text-sm">$1.2M</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Holders</p>
                <p className="text-white font-semibold text-sm">8.9K</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-400 text-xs">Market Cap</p>
                <p className="text-white font-semibold text-sm">$45.6M</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-gray-400 text-xs">Views</p>
              <p className="text-white font-bold text-sm sm:text-base">1.2K</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-gray-400 text-xs">XP Earned</p>
              <p className="text-white font-bold text-sm sm:text-base">450</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
              <p className="text-gray-400 text-xs">Betting Pool</p>
              <p className="text-white font-bold text-sm sm:text-base">$890</p>
            </div>
          </div>

          {/* Connect Wallet Status */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-500/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm sm:text-base">Connect wallet to start trading</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Bet Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Bet ${betAmount}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Place Your Bet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Bet Amount</label>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border rounded-lg"
                      placeholder="Enter amount"
                    />
                  </div>
                  <BasePay
                    amount={betAmount}
                    currency="USD"
                    onSuccess={() => console.log('Bet placed successfully')}
                    onError={(error) => console.error('Bet failed:', error)}
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Buy Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Buy ${buyAmount}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Buy Tokens</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Buy Amount</label>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border rounded-lg"
                      placeholder="Enter amount"
                    />
                  </div>
                  <BasePay
                    amount={buyAmount}
                    currency="USD"
                    onSuccess={() => console.log('Purchase successful')}
                    onError={(error) => console.error('Purchase failed:', error)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {[5, 10, 25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setBetAmount(amount);
                  setBuyAmount(amount);
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs sm:text-sm font-medium transition-colors"
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Powered by Base Pay */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600/20 rounded-full border border-blue-500/30">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500" />
              <span className="text-blue-300 text-xs sm:text-sm font-medium">Powered by Base Pay</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
