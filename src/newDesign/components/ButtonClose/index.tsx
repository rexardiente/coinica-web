import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styles from "./ButtonClose.module.scss";

type Props = {
 handleClick : Function;
}

// a reusable upper-right corner close button. currently used in modals
const CloseButton = ({handleClick}:Props) => {
    return(
        <Button variant='contained' color='secondary' className={`${styles.button_close}`} onClick={() => handleClick()}>
            <Close />
        </Button>
    );
};

export default CloseButton;