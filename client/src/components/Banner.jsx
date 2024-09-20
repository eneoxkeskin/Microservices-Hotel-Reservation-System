const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white h-[32rem] flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1726502102615-07a77713dade?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Banner Background" 
          className="w-full h-full object-cover"
        />
      </div>


      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-6xl font-extrabold leading-tight mb-4">
          Konaklamanızı Bulun
        </h1>
        <p className="text-lg font-light mb-8 text-gray-200">
          Oteller, tatil yerleri ve daha fazlasını keşfedin. En iyi fiyatlar ve harika fırsatlar sadece bir tık uzakta.
        </p>
        <button className="bg-[#febb02] text-[#003580] px-10 py-4 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 hover:text-[#00224f] transition duration-300 ease-in-out transform hover:scale-105">
          Fırsatları İnceleyin
        </button>
      </div>
    </div>
  );
};

export default Banner;
