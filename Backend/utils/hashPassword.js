import becrypt from 'bcryptjs';

const hashPassword = async (password) => {
        const hashedPassword = await becrypt.hash(password,12);
        return hashedPassword;
};

const comparePassword = (password,user) => {
    return becrypt.compare(password, user.password);
}


export {
    hashPassword,
    comparePassword
}