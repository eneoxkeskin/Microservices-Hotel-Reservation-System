const LastMinuteDeals = () => {
  const lastMinuteDeals = [
    {
      name: 'Wyndham Athens Residence',
      price: '9,500 TL',
      location: 'Atina, Yunanistan',
      imageUrl: 'https://images.unsplash.com/photo-1602769247692-126fdf1f1da6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Park Plaza Westminster Bridge',
      price: '14,500 TL',
      location: 'Londra, İngiltere',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1694475429322-cac86884e5c9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Rome Key Home',
      price: '9,800 TL',
      location: 'Roma, İtalya',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1680120254458-369c37689b47?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'The Grand Hotel',
      price: '18,000 TL',
      location: 'Cenevre, İsviçre',
      imageUrl: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Hafta Sonuna Özel Fırsatları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {lastMinuteDeals.map((deal) => (
          <div
            key={deal.name}
            className="relative col-span-1 flex items-end w-full h-[350px] rounded-3xl overflow-hidden bg-cover bg-center transition-transform transform hover:scale-105 duration-300 shadow-lg"
            style={{ backgroundImage: `url(${deal.imageUrl})` }}
          >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>

           
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-2xl font-bold">{deal.name}</h3>
              <p className="text-md mt-2">{deal.location}</p>
              <p className="text-lg font-semibold text-blue-400 mt-4">{deal.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastMinuteDeals;
