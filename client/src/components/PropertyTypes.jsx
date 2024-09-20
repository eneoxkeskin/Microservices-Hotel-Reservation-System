const PropertyTypes = () => {
  const propertyTypes = [
    {
      name: 'Oteller',
      description: 'En popüler otelleri keşfedin',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf',
    },
    {
      name: 'Daireler',
      description: 'Kendi eviniz gibi hissedin',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c',
    },
    {
      name: 'Tatil Köyleri',
      description: 'Lüks tatil köylerinde rahatlayın',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1719610047720-46ee577d95d1',
    },
    {
      name: 'Villalar',
      description: 'Özel villalarda konaklayın',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1',
    },
  ];

  return (
    <div className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
      Konaklama Seçeneklerini Keşfedin
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {propertyTypes.map((type) => (
          <div
            key={type.name}
            className="relative col-span-1 flex items-end w-full h-[350px] rounded-3xl overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundImage: `url(${type.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
       
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
            
        
            <div className="relative p-6 z-10 text-white">
              <h3 className="text-2xl font-bold">{type.name}</h3>
              <p className="text-md mt-2">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypes;
