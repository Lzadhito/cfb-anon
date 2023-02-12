export const title = "Send message from CFB to CFB <br /> Anonymously!";

// This props type is for static props
export interface StaticProps {
    children: JSX.Element | JSX.Element[];
}

// These props type are data from SSR
export interface Data {
    id: string;
    description: string;
    created_at: string;
    key: number;
}

export interface PostData {
    loading: boolean;
    data: Data[];
}

export interface ToastMessage {
    message: string;
    error: string;
}

export interface SubmitForm {
    inputTextRef: React.Ref<HTMLInputElement | HTMLElement | string | any>;
    handlePressEnter?: any;
    handleSubmit?: any;
    loadingMutation: boolean;
}

export interface CommentLikes {
    id: string | number;
    text: string | number
}
