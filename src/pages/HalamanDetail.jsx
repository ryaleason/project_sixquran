import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2, BookOpen, MapPin, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const HalamanDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [currentAyat, setCurrentAyat] = useState(null);
  const [selectedQari, setSelectedQari] = useState('03');
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const {id} = useParams();

 

  const qariList = [
    { id: '01', name: 'Abdullah Al-Juhany' },
    { id: '02', name: 'Abdul Muhsin Al-Qasim' },
    { id: '03', name: 'Abdurrahman As-Sudais' },
    { id: '04', name: 'Ibrahim Al-Dossari' },
    { id: '05', name: "Misyari Rasyid Al-Afasi" }
  ];

  const fetchSuratDetail = async () => {
    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuratDetail();
  }, [id]);

  const playAudio = (audioUrl, ayatNumber) => {
    if (audioRef.current) {
      if (currentAyat === ayatNumber && playingAudio) {
        audioRef.current.pause();
        setPlayingAudio(null);
        setCurrentAyat(null);
      } else {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setPlayingAudio(audioUrl);
        setCurrentAyat(ayatNumber);
      }
    }
  };

  const playFullSurat = () => {
    if (data && data.audioFull && audioRef.current) {
      const fullAudio = data.audioFull[selectedQari];
      if (playingAudio === fullAudio) {
        audioRef.current.pause();
        setPlayingAudio(null);
      } else {
        audioRef.current.src = fullAudio;
        audioRef.current.play();
        setPlayingAudio(fullAudio);
        setCurrentAyat('full');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-600 font-medium">Memuat surat...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <p className="text-emerald-600">Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <audio ref={audioRef} onEnded={() => { setPlayingAudio(null); setCurrentAyat(null); }} />

      <header className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Daftar Surat</span>
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center">
            <div className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-1 mb-4">
              <span className="text-sm font-medium">Surat Ke-{data.nomor}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-arabic mb-3">{data.nama}</h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{data.namaLatin}</h2>
            <p className="text-xl text-emerald-100 mb-6">{data.arti}</p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <BookOpen className="w-4 h-4" />
                <span>{data.jumlahAyat} Ayat</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>{data.tempatTurun}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900">Dengarkan Surat Lengkap</h3>
                <p className="text-sm text-emerald-600">Pilih qari favorit Anda</p>
              </div>
            </div>
            <button
              onClick={playFullSurat}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              {playingAudio === data.audioFull[selectedQari] ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span className="font-medium">Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Putar</span>
                </>
              )}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {qariList.map((qari) => (
              <button
                key={qari.id}
                onClick={() => setSelectedQari(qari.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedQari === qari.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {qari.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900 text-lg mb-2">Tentang Surat Ini</h3>
              <p className="text-emerald-700 leading-relaxed">{data.deskripsi}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Ayat-ayat</h3>
          <div className="space-y-6">
            {data.ayat && data.ayat.map((ayat) => (
              <div
                key={ayat.nomorAyat}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${
                  currentAyat === ayat.nomorAyat
                    ? 'border-emerald-400 shadow-lg'
                    : 'border-emerald-100 hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{ayat.nomorAyat}</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">Ayat {ayat.nomorAyat}</span>
                  </div>
                  <button
                    onClick={() => playAudio(ayat.audio[selectedQari], ayat.nomorAyat)}
                    className="w-10 h-10 bg-emerald-100 hover:bg-emerald-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    {currentAyat === ayat.nomorAyat && playingAudio ? (
                      <Pause className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Play className="w-5 h-5 text-emerald-700" />
                    )}
                  </button>
                </div>

                <div className="text-right mb-6">
                  <p className="text-4xl leading-loose text-emerald-900 font-arabic">{ayat.teksArab}</p>
                </div>

                <div className="mb-4 p-4 bg-emerald-50 rounded-xl">
                  <p className="text-emerald-800 italic leading-relaxed">{ayat.teksLatin}</p>
                </div>

                <div className="p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-900 leading-relaxed font-medium">{ayat.teksIndonesia}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-emerald-100 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-emerald-600">
            © 2025 Al-Quran Digital Indonesia. Data dari EQuran.id
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HalamanDetail;