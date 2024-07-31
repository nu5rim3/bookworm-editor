interface User {
    id: string;
    username: string;
}
export interface AuthState {
    user: User | null;
    token: string | null;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    otpStatus: "idle" | "loading" | "succeeded" | "failed";
}
interface Credentials {
    email: string;
    password: string;
}
interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
interface ConfirmOtp {
    email: string;
    code: string;
}
export declare const login: import("@reduxjs/toolkit").AsyncThunk<any, Credentials, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const register: import("@reduxjs/toolkit").AsyncThunk<any, RegisterCredentials, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const confirmOtp: import("@reduxjs/toolkit").AsyncThunk<any, ConfirmOtp, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
