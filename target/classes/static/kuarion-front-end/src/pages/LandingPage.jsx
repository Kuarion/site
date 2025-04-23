import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto py-20 px-4">
        
        {/* White Text Section */}
        <div className="space-y-6 text-white">
          <h1 className="text-5xl font-bold mb-8">
            Lorem Ipsum Dolor
          </h1>
          
          <p className="text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          
          <p className="text-lg leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* White Background Section */}
          <div className="bg-white text-black p-8 rounded-lg my-12">
            <h2 className="text-3xl font-bold mb-4">
              Sed Ut Perspiciatis
            </h2>
            <p className="text-lg leading-relaxed">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </div>
          
          <p className="text-lg leading-relaxed">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
          </p>
        </div>
        
      </div>
    </div>
  );
}