interface Window {
    theme: {
        get: () => string;
        set: (theme: string) => void;
        toggle: () => void;
    };
}
