declare const rootReducer: import("redux").Reducer<{
    auth: import("./authSlice").AuthState;
}, import("redux").UnknownAction, Partial<{
    auth: import("./authSlice").AuthState | undefined;
}>>;
export default rootReducer;
