import React, { useEffect, useState } from 'react';
import { Book, Volume2, Search, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchSuratList = async () => {
    try {
      const response = await fetch('https://equran.id/api/v2/surat');
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuratList();
  }, []);

  const filteredData = data.filter(item =>
    item.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <Navbar/>

      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">
            Baca, Dengar, dan Pelajari Al-Quran
          </h2>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Akses lengkap 114 surat Al-Quran dengan terjemahan bahasa Indonesia, 
            audio berkualitas tinggi, dan tafsir yang mudah dipahami
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari surat berdasarkan nama atau arti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-400 focus:outline-none text-emerald-900 placeholder-emerald-400 bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Teks Arab & Terjemahan</h3>
            <p className="text-emerald-600">Teks Arab lengkap dengan transliterasi dan terjemahan Indonesia</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Volume2 className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Audio Berkualitas</h3>
            <p className="text-emerald-600">Dengarkan bacaan dari qari terbaik dunia dengan suara jernih</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Tafsir Lengkap</h3>
            <p className="text-emerald-600">Memahami makna dengan tafsir yang mudah dipahami</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Daftar Surat Al-Quran</h3>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-emerald-600">Memuat data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item) => (
                <div onClick={() => navigate(`/surat/${item.nomor}`)}
                  key={item.nomor}
                  className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100 hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{item.nomor}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900 text-lg group-hover:text-emerald-600 transition-colors">
                          {item.namaLatin}
                        </h4>
                        <p className="text-sm text-emerald-600">{item.arti}</p>
                      </div>
                    </div>
                    <span className="text-2xl text-emerald-800 font-arabic">{item.nama}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-emerald-600 pt-3 border-t border-emerald-100">
                    <span>{item.jumlahAyat} Ayat</span>
                    <span className="flex items-center space-x-1">
                      <span>{item.tempatTurun}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-emerald-600">
            © 2025 SixQuran Digital Indonesia. Data dari EQuran.id
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;