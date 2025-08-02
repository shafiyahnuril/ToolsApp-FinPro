import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        console.log('req.query:', req.query);
        const userId = req.query.userId;
        console.log('userId:', userId);
        const user = await userModel.findById(userId);
        console.log('user:', user);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ 
            success: true, 
            userData: {
                isAccountVerified: user.isAccountVerified,
            }});

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}