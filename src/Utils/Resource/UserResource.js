import moment from 'moment'
// Create UserResource class For Response
class UserResource {
    constructor(user) {
        // Create UserObject
        this.UserObject = {
            id: user._id,
            phone: user.phone,
            email: user.email,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        this.auth_token = user.auth_token
    }
    static UserAndOtp(user, otp) {
        // Create UserObject
        const UserObject = {
            id: user._id,
            phone: user.phone,
            email: user.email,
            is_verified: otp.is_verified,
            verfiy_at: otp.verfiy_at,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        return {
            user: UserObject,
        }
    }
    static UserAndChild(user, child) {
        // Create UserObject
        const UserObject = {
            id: user._id,
            phone: user.phone,
            email: user.email,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        return {
            user: UserObject,
            child: child,
        }
    }
    static UserAndToken(user, token) {
        // Create UserObject
        const UserObject = {
            id: user._id,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            phone: user.phone,
            email: user.email,
            address: user.address,
            city: user.city,
            state: user.state,
            grade: user.grade,
            birthdate: user.birthdate,
            tier: user.tier,
            parent_id: user.parent,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        return {
            user: UserObject,
            token: token,
        }
    }
    static User(user) {
        // Create UserObject
        const UserObject = {
            id: user._id,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            phone: user.phone,
            email: user.email,
            address: user.address,
            city: user.city,
            state: user.state,
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
        return {
            user: UserObject,
        }
    }
}

export default UserResource
