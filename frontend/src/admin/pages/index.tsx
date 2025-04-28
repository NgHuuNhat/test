import React, { useEffect, useState } from 'react'

export default function Admin() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="container mx-auto px-4">
      <div className="my-5 flex flex-col sm:flex-row items-center gap-5">
        {user?.image && (
          <img
            src={user.image}
            alt="Avatar"
            className="w-64 h-64 sm:w-20 sm:h-20 rounded-full object-cover border shadow-md"
          />
        )}
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-xl">Hello, {user?.name || 'Admin'}!</h3>
          <p className="text-gray-600">Chào mừng bạn đến với hệ thống quản lý!</p>
        </div>
      </div>
    </div>
  )
}
