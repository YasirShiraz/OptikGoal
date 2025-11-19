export function AnimatedBackground() {
  return (
    <>
      {/* Main gradient background with animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-amber-600/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '4s' }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-20 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '9s', animationDelay: '1s' }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-20"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`purple-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>

        {/* Radial fade at edges */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50"></div>
      </div>

      {/* Top gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-0"></div>
      
      {/* Bottom gradient overlay */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
    </>
  );
}
