import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

// THIS IS THE FIX: It stops Vercel from freezing the page, ensuring buttons always load!
export const dynamic = "force-dynamic";

export default function LandingPage() {
  const { userId } = auth();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative overflow-x-hidden select-none">
      
      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100">
        <div className="text-2xl font-black tracking-tight text-gray-900 cursor-pointer">
          interview.co
        </div>
        
        <nav className="hidden md:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <Link href="#" className="hover:text-black transition">Pricing</Link>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition">
            <span>Services</span>
            <span className="text-[10px]">▼</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition">
            <span>Resources</span>
            <span className="text-[10px]">▼</span>
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          
          {userId ? (
            <>
              <Link href="/interview" className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 transition">
                Go to Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <SignInButton forceRedirectUrl="/interview">
                <button className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 transition">
                  Talent Login
                </button>
              </SignInButton>
              <SignInButton forceRedirectUrl="/interview">
                <button className="bg-gray-950 text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-gray-800 transition">
                  Try for free
                </button>
              </SignInButton>
            </div>
          )}

          <div className="flex items-center space-x-1 text-xs font-bold text-gray-500 cursor-pointer">
            <span>EN</span>
            <span className="text-[8px]">▼</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16 pb-32">
        
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#22252a] leading-[1.1] mb-6">
            Mock Interviews to Mastery.<br />Prepare, practice and own the real one.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-normal mb-10 max-w-lg">
            AI-based practice to help you be ready for the real interview.
          </p>
          
          <div className="flex items-center space-x-5">
            <Link 
              href="/interview" 
              className="bg-[#f97316] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e06613] transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/20"
            >
              Start Now
            </Link>
            <svg width="55" height="35" viewBox="0 0 76 49" fill="none" className="text-gray-400 stroke-current" strokeWidth="2.5" strokeLinecap="round">
              <path d="M2 39.5C18.5 45.5 49.5 42 68.5 12" />
              <path d="M56 16.5L69.5 10.5L74 24" />
            </svg>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] bg-[#fbbf24] rounded-full -z-10 translate-x-4 translate-y-4"></div>
          
          <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] bg-gray-200 rounded-3xl border-4 border-white shadow-2xl overflow-hidden flex flex-col justify-between p-8 relative">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">[ Candidate Profile Image & AI Hand Connection ]</div>
            <div className="absolute top-10 left-6 bg-gray-900 text-white rounded-full p-3 shadow-lg w-10 h-10 flex items-center justify-center font-bold">?</div>
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

      <section className="bg-gray-50 py-10 border-t border-gray-100 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Unlock Your Interview Success in 3 Steps!
        </h3>
      </section>
    </div>
  );
}