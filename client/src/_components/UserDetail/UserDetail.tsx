import React, { FC } from 'react'
import { User } from 'realm-web'

const UserDetail: FC<{ user: Realm.User }> = ({ user }) => (
  <h1>Logged in with anonymous id: {user.id}</h1>
)

export default UserDetail
