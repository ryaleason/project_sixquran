import { Book, BookOpen } from 'lucide-react'
import React from 'react'
import alquran from '../assets/alquran.png'

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-3">
              <img src={alquran} alt="" className='w-10 h-10' />
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">SixQuran</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Navbar
