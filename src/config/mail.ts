interface IMailConfig {
    driver: 'ethereal' | 'gmail';
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
