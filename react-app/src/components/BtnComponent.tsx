import { IoClose } from "react-icons/io5";

export const BtnComponent = () => {

    function fecharWidget() {
        window.parent.postMessage({ action: 'closeWidget' }, '*');
    }

    return (
        <button className="btn" onClick={fecharWidget} >
            <IoClose size={30} />
        </button>
    )
}