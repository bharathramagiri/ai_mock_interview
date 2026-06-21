import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { 
  Sparkles, 
  MessageSquare, 
  Image as ImageIcon, 
  Brain, 
  Mic, 
  Code, 
  Search, 
  Blocks, 
  TrendingUp, 
  Rocket, 
  Infinity 
} from "lucide-react";

// Force dynamic rendering so the server always checks auth status
export const dynamic = "force-dynamic";

export default function LandingPage() {
  // Check directly on the server if the user is logged in
  const { userId } = auth();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative overflow-x-hidden select-none scroll-smooth">
      
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="text-2xl font-black tracking-tight text-gray-900 cursor-pointer">
          interview.co
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <a href="#pricing" className="hover:text-black transition py-4">Pricing</a>
          
          {/* Mega Menu Dropdown for Services */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-black transition py-4">
              <span>Services</span>
              <span className="text-[10px] transition-transform group-hover:rotate-180">▼</span>
            </button>
            
            {/* Dropdown Container with hover bridge */}
            <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 pt-4 w-[850px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 cursor-default">
              <div className="bg-[#0a0f1c] rounded-2xl shadow-2xl flex overflow-hidden border border-gray-800 text-left">
                
                {/* Left Sidebar Menu */}
                <div className="w-[30%] bg-[#0f172a] p-3 flex flex-col space-y-1">
                  <div className="px-4 py-3 bg-[#1e293b] rounded-lg text-sm font-semibold flex justify-between items-center cursor-pointer text-[#00eb9b] transition-colors">
                    <span>AI/ML</span>
                    <span>›</span>
                  </div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">CMS</div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">Data and IoT</div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">Developer Tools</div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">Gaming and Media</div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">Hosting</div>
                  <div className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer text-gray-300">Security and Networking</div>
                </div>

                {/* Right Content Area */}
                <div className="w-[70%] p-8 bg-[#0a0f1c]">
                  <h3 className="text-lg font-bold text-white mb-6">AI/ML</h3>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                    <a href="/interview" className="group/item cursor-pointer block">
                      <h4 className="text-sm font-semibold text-gray-100 mb-2 group-hover/item:text-[#00eb9b] transition">AI HR Knowledge Assistant</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">Deploy AI tools developed for Human Resources</p>
                    </a>
                    <a href="/interview" className="group/item cursor-pointer block">
                      <h4 className="text-sm font-semibold text-gray-100 mb-2 group-hover/item:text-[#00eb9b] transition">AI Recommendation Engine</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">Build tools to personalize user experiences</p>
                    </a>
                    <a href="/interview" className="group/item cursor-pointer block">
                      <h4 className="text-sm font-semibold text-gray-100 mb-2 group-hover/item:text-[#00eb9b] transition">Multimodal AI</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">Run models that process multiple data types</p>
                    </a>
                    <a href="/interview" className="group/item cursor-pointer block">
                      <h4 className="text-sm font-semibold text-gray-100 mb-2 group-hover/item:text-[#00eb9b] transition">GPU Clusters</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">GPUs clustered together for large-scale tasks</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <a href="#resources" className="flex items-center space-x-1 hover:text-black transition py-4">
            <span>Resources</span>
            <span className="text-[10px]">▼</span>
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          
          {userId ? (
            /* SHOW THIS IF LOGGED IN */
            <>
              <a href="/interview" className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 transition">
                Go to Dashboard
              </a>
              <UserButton />
            </>
          ) : (
            /* SHOW THIS IF LOGGED OUT - Standard <a> tags force a hard reload, which triggers the Middleware Login! */
            <>
              <a href="/interview" className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 transition block text-center cursor-pointer">
                Talent Login
              </a>
              <a href="/interview" className="bg-gray-950 text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-gray-800 transition block text-center cursor-pointer">
                Try for free
              </a>
            </>
          )}

          <div className="flex items-center space-x-1 text-xs font-bold text-gray-500 cursor-pointer ml-4">
            <span>EN</span>
            <span className="text-[8px]">▼</span>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16 pb-32">
        
        {/* Text Left Column */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#22252a] leading-[1.1] mb-6">
            Mock Interviews to Mastery.<br />Prepare, practice and own the real one.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-normal mb-10 max-w-lg">
            AI-based practice to help you be ready for the real interview.
          </p>
          
          <div className="flex items-center space-x-5">
            <a 
              href="/interview" 
              className="bg-[#f97316] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e06613] transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/20 block text-center cursor-pointer"
            >
              Start Now
            </a>
            {/* Drawn Arrow Vector */}
            <svg width="55" height="35" viewBox="0 0 76 49" fill="none" className="text-gray-400 stroke-current" strokeWidth="2.5" strokeLinecap="round">
              <path d="M2 39.5C18.5 45.5 49.5 42 68.5 12" />
              <path d="M56 16.5L69.5 10.5L74 24" />
            </svg>
          </div>
        </div>

        {/* Visual Graphic Right Column */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] bg-[#fbbf24] rounded-full -z-10 translate-x-4 translate-y-4"></div>
          
          <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] bg-gray-200 rounded-3xl border-4 border-white shadow-2xl overflow-hidden relative group">
            {/* Beautiful professional interview stock photo */}
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Candidate taking AI Mock Interview" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Subtle gradient overlay to make widgets and text pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
            
            {/* AI Badge */}
            <div className="absolute top-6 left-6 bg-gray-900/90 backdrop-blur-sm text-orange-400 rounded-full shadow-lg w-10 h-10 flex items-center justify-center font-black border border-gray-700/50">
              AI
            </div>

            {/* Live Analysis UI element */}
            <div className="absolute bottom-6 left-6 text-white/90 text-xs font-mono tracking-widest uppercase flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              Live Tracking Active
            </div>
          </div>

          <div className="absolute bottom-6 right-[-10px] md:right-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex flex-col space-y-3 min-w-[180px]">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">1</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <span className="text-sm">😊</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">2</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <span className="text-sm">😐</span>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50/50 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Upgrade your plan</h2>
          
          {/* Personal / Business Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button className="bg-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm text-gray-900">Personal</button>
              <button className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Business</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            {/* Free Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Free</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-gray-900">₹0</span>
                <span className="text-xs font-medium text-gray-500 ml-2">INR / month</span>
              </div>
              <p className="text-sm text-gray-600 mb-8 h-5">See what AI can do</p>
              
              <button className="w-full py-3.5 rounded-2xl border border-gray-300 font-semibold text-gray-500 mb-8 cursor-default">
                Your current plan
              </button>
              
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Core model</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Limited messages and uploads</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Limited image creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Limited memory</span>
                </li>
              </ul>
            </div>

            {/* Go Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Go</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-gray-900">₹399</span>
                <span className="text-[10px] font-medium text-gray-400 ml-2 leading-tight">INR / month<br/>(inclusive of GST)</span>
              </div>
              <p className="text-sm text-gray-600 mb-8 h-5">Keep chatting with expanded access</p>
              
              <button className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-semibold mb-8 hover:bg-gray-800 transition-colors">
                Upgrade to Go
              </button>
              
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Core model</span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>More messages and uploads</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>More image creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Longer memory</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Expanded voice mode</span>
                </li>
              </ul>
            </div>

            {/* Plus Tier (Popular) */}
            <div className="bg-[#f4f6ff] border border-indigo-100 rounded-3xl p-8 flex flex-col relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-6 right-6 bg-indigo-100/80 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Plus</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-gray-900">₹1,999</span>
                <span className="text-[10px] font-medium text-gray-400 ml-2 leading-tight">INR / month<br/>(inclusive of GST)</span>
              </div>
              <p className="text-sm text-gray-600 mb-8 h-5">Unlock the full experience</p>
              
              <button className="w-full py-3.5 rounded-2xl bg-[#5c5bde] text-white font-semibold mb-8 hover:bg-indigo-600 transition-colors shadow-sm">
                Upgrade to Plus
              </button>
              
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Advanced models</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Advanced image creation with Thinking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Expanded memory across chats</span>
                </li>
                <li className="flex items-start gap-3">
                  <Code className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Codex coding agent</span>
                </li>
                <li className="flex items-start gap-3">
                  <Search className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Expanded deep research</span>
                </li>
                <li className="flex items-start gap-3">
                  <Blocks className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Projects and custom GPTs</span>
                </li>
              </ul>
            </div>

            {/* Pro Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-1 text-gray-900">Pro</h3>
              <p className="text-xs font-medium text-gray-400 mb-1">From</p>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-bold text-gray-900">₹10,699</span>
                <span className="text-[10px] font-medium text-gray-400 ml-2 leading-tight">INR / month<br/>(inclusive of GST)</span>
              </div>
              <p className="text-sm text-gray-600 mb-8 h-5">Maximize your productivity</p>
              
              <button className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-semibold mb-8 hover:bg-gray-800 transition-colors">
                Upgrade to Pro
              </button>
              
              <ul className="space-y-4 text-sm text-gray-600 flex-1">
                <li className="font-semibold text-gray-900 mb-1">Everything in Plus and:</li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>5x or 20x more usage than Plus</span>
                </li>
                <li className="flex items-start gap-3">
                  <Rocket className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Frontier Pro model</span>
                </li>
                <li className="flex items-start gap-3">
                  <Code className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Maximum access to Codex</span>
                </li>
                <li className="flex items-start gap-3">
                  <Search className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Maximum deep research</span>
                </li>
                <li className="flex items-start gap-3">
                  <Infinity className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Unlimited core chat</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>Unlimited and faster image creation</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Absolute Bottom 3-Steps Dashboard Header Hook */}
      <section className="bg-gray-900 py-16 border-t border-gray-800 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-white">
          Unlock Your Interview Success in 3 Steps!
        </h3>
      </section>
    </div>
  );
}