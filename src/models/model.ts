interface RegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}
interface LoginRequest {
    email: string;
    password: string;
}
interface UpdateProfileRequest {
    first_name: string;
    last_name: string;
    description: string;
}
interface GeneratePasswordRequest {
    email: string;
    sifre_yenileme_kodu: number;
    yenisifre: string;
}
interface GenerateCodeRequest {
    email: string;
}
interface isLogin {
    loginState: boolean;
}