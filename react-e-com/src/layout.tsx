import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Your header or other layout elements go here */}
      <header>
      </header>
      <div className="relative h-full font-sans antialiased">
      {/* Main content */}
        <main className='relative flex flex-col min-h-screen'
          >{children}
        </main>

        {/* Footer or other layout elements go here */}
        {/* Toaster component */}
        <Toaster />
      </div>
    </div>
  );
};

export default RootLayout;
