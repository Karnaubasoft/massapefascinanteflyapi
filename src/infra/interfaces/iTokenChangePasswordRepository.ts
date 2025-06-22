export interface TokenForChangePassword {
    generateToken(): Promise<string>
    createResetToken(token: string, email: string): Promise<string>;
    validateResetLinkToken(token: string): Promise<boolean>;
    invalidateResetLinkToken(token: string): Promise<void>;
    sendPasswordRecoveryEmail(code: string, email: string): Promise<void>;
    getEmailByToken(token: string): Promise<string | null>;
    storeVerificationCode(email: string, code: string): Promise<void>;
    verifyCode(email: string, code: string): Promise<boolean>;
    allowReset(email: string): Promise<void>;
    isResetAllowed(email: string): Promise<boolean>;
    checkEmailHasCode(email: string): Promise<boolean>;
}