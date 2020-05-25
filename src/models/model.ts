interface RegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}
interface GeneratePasswordRequest {
    email: string;
    sifre_yenileme_kodu: number;
    yenisifre: string;
}
interface GenerateCodeRequest {
    email: string;
}