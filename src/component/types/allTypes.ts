export interface BookType {
    id: number;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        imageLinks?: {
            thumbnail: string;
        };
    },
    saleInfo: {
        listPrice?: {
            amount: number;
        },
        retailPrice?: {
            amount: number;
        }
    }
}

export interface BookDetailPageProps<T = any> {
    params: T;
    searchParams: URLSearchParams;
}

export interface BookPreviewProps {
    title: string;
    link: string;
}

export interface ModalProps {
    portalId: string;
    children?: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    title?: React.ReactNode;
}