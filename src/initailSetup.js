import Role from './models/roles';
import User from './models/users'
import _ from 'lodash'

const roleParams = { name: 'admin' }
const userParams = { username: 'admin', password: 'admins123456', firstname: 'admin', lastname: 'admin' }
const { name } = roleParams
const findRole = Role.findOne({ name })
    .then(async role => {
        if (role === null) {
            const roles = new Role(roleParams)
            await roles.save()
            const { username } = userParams
            const user = await User.findOne({ username })
                .then(async users => {
                    if (users === null) {
                        userParams.roles = [
                            roles.id
                        ]
                        const user = new User(userParams)
                        await user.save()
                    }
                }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))

