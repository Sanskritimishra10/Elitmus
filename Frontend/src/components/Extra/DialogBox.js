import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function DialogBox({title,message,handleOkayButton , ConfirmText }) {
  const [open, setOpen] = useState(true);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <Fragment>
      <Dialog open={open} handler={handleOkayButton}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>
          {message}
        </DialogBody>
        <DialogFooter>
          {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
          <Button variant="gradient" color="green" onClick={handleOkayButton}>
            <span>{!ConfirmText?"Confirm":ConfirmText}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}