export interface TokenPayload {
    login: string;
    id: string;
    role: {
        id: string;
        title: string;
    };
    platform: {
        id: string;
        title: string;
    };
}
