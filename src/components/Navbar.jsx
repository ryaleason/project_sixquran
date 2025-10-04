import { Book, BookOpen } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">SixQuran</h1>
                <p className="text-sm text-emerald-600">Bahasa Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Navbar
