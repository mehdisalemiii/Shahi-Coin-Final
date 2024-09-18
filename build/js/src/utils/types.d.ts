export interface Task {
    id: number;
    description: string;
    reward: number;
    completed: boolean;
    link?: string;
}
export type IconProps = {
    size?: number;
    className?: string;
};
