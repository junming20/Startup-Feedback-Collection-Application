import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'wang.guox@northeastern.edu',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: true
  },
  {
    name: 'Junming Zhao',
    email: 'junming@v',
    password: bcrypt.hashSync('12345678', 10)
  },
  {
    name: 'Jing Liu',
    email: 'jing@northeastern.edu',
    password: bcrypt.hashSync('12345678', 10)
  }
]

export default users
