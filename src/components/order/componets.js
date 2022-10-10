import {
    Step,
    StepLabel,
    Stepper,
  } from "@mui/material";

const StepperDelivered = (props) => {
    return(
    <Stepper orientation="vertical" activeStep={props.activeStep}>
      <Step>
        <StepLabel>Order Confirmed</StepLabel>
      </Step>
      <Step>
        <StepLabel>Shipped</StepLabel>
      </Step>

      <Step>
        <StepLabel>Delivered</StepLabel>
      </Step>
    </Stepper>
    )
};
const StepperCancelled =() =>{
    return(
        <Stepper orientation="vertical" activeStep={2}>
      <Step>
        <StepLabel>Order Confirmed</StepLabel>
      </Step>
      <Step>
        <StepLabel error={true}>Cancelled</StepLabel>
      </Step>
    </Stepper>
    )
}
export {StepperDelivered,StepperCancelled}