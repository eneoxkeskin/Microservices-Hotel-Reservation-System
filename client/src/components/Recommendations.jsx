const Recommendations = () => {
  const recommendations = [
    {
      name: 'Four Seasons Hotel',
      rating: '4.8/5',
      location: 'İstanbul, Türkiye',
      imageUrl: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Hilton Garden Inn',
      rating: '4.6/5',
      location: 'New York, ABD',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1678297269904-6c46528b36a7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Sheraton Grand',
      rating: '4.7/5',
      location: 'Tokyo, Japonya',
      imageUrl: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'The Ritz-Carlton',
      rating: '4.9/5',
      location: 'Fribourg, İsviçre',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Sizin İçin Seçtiklerimiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.name}
            className="relative col-span-1 flex items-end w-full h-[350px] rounded-3xl overflow-hidden bg-cover bg-center transition-transform transform hover:scale-105 duration-300 shadow-lg"
            style={{ backgroundImage: `url(${recommendation.imageUrl})` }}
          >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>

         
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-2xl font-bold">{recommendation.name}</h3>
              <p className="text-md mt-2">{recommendation.location}</p>
              <p className="text-lg font-semibold text-yellow-400 mt-4">{recommendation.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
