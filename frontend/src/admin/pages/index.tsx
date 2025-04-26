import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ProfilePage from '../../home/pages/ProfilePage'

export default function Admin() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <Container>
      <div className="my-5 flex items-center gap-5">
        {user?.image && (
          <img
            src={user.image}
            alt="Avatar"
            className="w-50 h-50 rounded-full object-cover border shadow"
          />
        )}
        <div>
          <h3 className="font-bold text-xl">Hello, {user?.name || 'Admin'}!</h3>
          <p className="text-gray-600">Chào mừng bạn đến với hệ thống quản lý!</p>
        </div>
      </div>
    </Container>
  )
}
