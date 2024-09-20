const AccommodationListings = () => {
  const accommodations = [
    {
      name: 'The Ritz-Carlton',
      price: '24,000 TL / Gece',
      location: 'Los Angeles, ABD',
      imageUrl: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Marriott Marquis',
      price: '19,000 TL / Gece',
      location: 'Tokyo, Japonya',
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Four Seasons',
      price: '22,000 TL / Gece',
      location: 'Paris, Fransa',
      imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Grand Resort',
      price: '30,000 TL / Gece',
      location: 'Cenevre, İsviçre',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1683649964242-e4dabec48786?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Konaklama Seçenekleri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.name}
            className="relative col-span-1 flex items-end w-full h-[350px] rounded-3xl overflow-hidden bg-cover bg-center transition-transform transform hover:scale-105 duration-300 shadow-lg"
            style={{ backgroundImage: `url(${accommodation.imageUrl})` }}
          >
        
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>

      
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-2xl font-bold">{accommodation.name}</h3>
              <p className="text-md mt-2">{accommodation.location}</p>
              <p className="text-lg font-semibold text-blue-400 mt-4">{accommodation.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationListings;
