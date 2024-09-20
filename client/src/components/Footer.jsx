const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-12 text-white">
      <div className="container mx-auto">
   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     
          <div>
            <h4 className="text-xl font-semibold mb-4">Hakkımızda</h4>
            <ul>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Şirket Bilgileri</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Kariyer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Basın Odası</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Yatırımcı İlişkileri</a></li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-xl font-semibold mb-4">Yardım ve Destek</h4>
            <ul>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Müşteri Hizmetleri</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">SSS</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Destek Talebi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">İade ve İptaller</a></li>
            </ul>
          </div>


          <div>
            <h4 className="text-xl font-semibold mb-4">Topluluk</h4>
            <ul>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Sosyal Medya</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Forum</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Ortaklık Programı</a></li>
            </ul>
          </div>

      
          <div>
            <h4 className="text-xl font-semibold mb-4">Yasal Bilgilendirme</h4>
            <ul>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Kullanım Şartları</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Çerez Politikası</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Yasal Uyarılar</a></li>
            </ul>
          </div>
        </div>

    
        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 Eneox.com - Tüm Hakları Saklıdır</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-facebook-f"></i> Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-instagram"></i> Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
