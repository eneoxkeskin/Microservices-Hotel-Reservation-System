const PopularDestinations = () => {
  const destinations = [
    {
      name: 'Paris',
      country: 'Fransa',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Roma',
      country: 'İtalya',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661963045953-b89f852e479e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Londra',
      country: 'İngiltere',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1680806490143-97e569c14662?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Fribourg',
      country: 'İsviçre',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
      Keşfedilmeyi Bekleyen Yerler
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {destinations.map((destination) => (
          <div
            key={destination.name}
            className="relative col-span-1 flex items-end w-full h-[350px] rounded-3xl overflow-hidden bg-cover bg-center transition-transform transform hover:scale-105 duration-300 shadow-lg"
            style={{ backgroundImage: `url(${destination.imageUrl})` }}
          >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>

         
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-2xl font-bold">{destination.name}</h3>
              <p className="text-md mt-1">{destination.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
