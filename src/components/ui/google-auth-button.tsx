import { useNavigate } from "react-router-dom";
import { Button } from "./button";


export default function GoogleSignInButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        navigate('/dashboard');
    }

    return (
        <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={onClick}
        >
            {/* <GitHub className="mr-2 h-4 w-4" /> */}
            Continue with Google
        </Button>
    );
}