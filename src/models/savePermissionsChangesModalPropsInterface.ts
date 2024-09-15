export interface savePermissionsChagesModalProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    onSave: () => void;
    role: string;
}