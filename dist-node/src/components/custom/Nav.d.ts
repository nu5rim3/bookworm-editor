import { LucideIcon } from "lucide-react";
interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
        path: string;
    }[];
}
export declare function Nav({ links, isCollapsed }: NavProps): import("react/jsx-runtime").JSX.Element;
export {};
