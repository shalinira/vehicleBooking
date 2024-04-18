import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
// import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";


const ActionButtons = (props) => {
    const handleBack = () => {
        props.previousStep();
    };

    const handleNext = () => {
        props.nextStep();
    };

    const handleFinish = () => {
        props.lastStep();
    };

    return (
        <div>
            <Row>
                {props.currentStep > 1 && (
                    <Col>
                        <Button onClick={handleBack}>Back</Button>
                    </Col>
                )}
                <Col>
                    {props.currentStep < props.totalSteps && (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                    {props.currentStep === props.totalSteps && (
                        <Button onClick={handleFinish}>Finish</Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};

const One = (props) => {
    const [info1, setInfo1] = useState({});
    const [error, setError] = useState("");

    const onInputChanged = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setInfo1((info1) => ({
            ...info1,
            [targetName]: targetValue
        }));
    };

    const validate = () => {
        if (!info1.firstname || !info1.lastname) setError("Weels  mandatory field");
        else {
            setError("");
            props.nextStep();
            props.userCallback(info1);
        }
    };

    return (
        <div >
            <span style={{ color: "red" }}>{error}</span>
            <h1>First, What,s your name?</h1>
            <form>
                <div class="mb-3" style={{ textAlign: "start" }}>
                    <label for="exampleInputEmail1" class="form-label">First Name</label>
                    <input type="text" name="firstname" class="form-control" id="exampleInputEmail1" onChange={onInputChanged} aria-describedby="emailHelp" />
                </div>
                <div class="mb-3" style={{ textAlign: "start" }}>
                    <label for="exampleInputPassword1" class="form-label" > Last Name</label>
                    <input type="text" name="lastname" class="form-control" id="exampleInputPassword1" onChange={onInputChanged} />
                </div>

            </form>
            <br />
            <ActionButtons {...props} nextStep={validate} />
        </div>
    );
};

const Two = (props) => {
    const [info2, setInfo2] = useState({});
    const [error, setError] = useState("");
    const wheelsType = props.wheelsdata.data;   

    const onInputChanged = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setInfo2((info2) => ({
            ...info2,
            [targetName]: targetValue
        }));
    };

    const validate2 = () => {
        if (!info2.weels) setError("Age is mandatory field");
        else {
            setError("");
            props.nextStep();
            props.userCallback(info2);
        }
    };


    return (<>
    <div>
    <span style={{ color: "red" }}>{error}</span>
            <h1>Select No Weels</h1>
    {wheelsType?.map((item,i)=>{
        return(<div>
            <div>           
            <div>
                <div class="form-check" style={{ width: "40%" }}>
                    <input class="form-check-input" name="weels" value={item.wheels} type="radio" onChange={onInputChanged} id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                    {item.wheels}
                    </label>
                </div></div>
            <br />
            
        </div>
        </div>)
    })}
    <ActionButtons {...props} nextStep={validate2} />
    </div>
        </>
    );
};

const Three = (props) => {
    const [info3, setInfo3] = useState({});
    const [error, setError] = useState("");
    const wheelsType = props.wheelsdata.data;   
    console.log(props)
    const onInputChanged = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;

        setInfo3((info3) => ({
            ...info3,
            [targetName]: targetValue
        }));
    };

    const validate3 = () => {
        if (!info3.vehicl) setError("vehicle is mandatory field");
        else {
            setError("");
            props.nextStep();
            props.userCallback(info3);
        }
    };


    return (
        <div>
            <span style={{ color: "red" }}>{error}</span>
            <h1>Select Vehicls</h1>
            <div>{wheelsType?.map((item,i)=>{
                return(<>
                <div class="form-check" style={{ width: "40%" }}>
                    <input class="form-check-input" name="vehicl" value={item.type} type="radio" onChange={onInputChanged} id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        {item.type}
                    </label>
                </div>
                </>)
            })}               
                </div>
            <br />
            <ActionButtons {...props} nextStep={validate3} />
        </div>
    );
};
const Four = (props) => {
    console.log("step3 receive user object");
    console.log(props.user);

    const handleLastStep = () => {
        props.lastStep();
        props.completeCallback();
    };

    return (
        <div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Default radio
                </label>
            </div>
            <br />
            <ActionButtons {...props} nextStep={handleLastStep} />
        </div>
    );
};
const Five = (props) => {
    console.log("step3 receive user object");
    console.log(props.user);

    const handleLastStep = () => {
        props.lastStep();
        props.completeCallback();
    };

    return (
        <div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Default radio
                </label>
            </div>
            <br />
            <ActionButtons {...props} nextStep={handleLastStep} />
        </div>
    );
};

const Sample3 = () => {
    const [stepWizard, setStepWizard] = useState(null);
    const [user, setUser] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [vihecledata, setvihecledata]=useState([]);

    const assignStepWizard = (instance) => {
        setStepWizard(instance);
    };

    const assignUser = (val) => {
        console.log("parent receive user callback");
        console.log(val);
        setUser((user) => ({
            ...user,
            ...val
        }));
        console.log("fedfhfjfhde");
        fatchvihecle();
    };

    const handleStepChange = (e) => {
        console.log("step change");
        console.log(e);
        setActiveStep(e.activeStep - 1);
    };

    const handleComplete = () => {
        alert("You r done. TQ");
    };
    // const fatchvihecle =()=>{
    //     return new Promise((resolve, reject) => {
    //         axios
    //           .get("https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes")
    //           .then(function (response) {
    //             resolve(response.data);
    //           })
    //           .catch(function (err) {
    //             reject(err);
    //           });
    //       });
    // }
    const fatchvihecle = () => { 
    axios.get("https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes")
        .then((response)=>{setvihecledata(response.data)})        
        .catch(err=>err);         
}




return (
    <div style={{ width: "35%" }}>
        {/* <Stepper activeStep={activeStep}>
        <Step label="Step 1" children={<MdDescription />} />
        <Step label="Personal Detail" />
        <Step label="Confirmation" />
      </Stepper> */}
        {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
        <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
            <One userCallback={assignUser} />
            <Two user={user} userCallback={assignUser} wheelsdata={vihecledata} />
            <Three user={user} userCallback={assignUser} wheelsdata={vihecledata}/>
            <Four user={user} userCallback={assignUser} />
            <Five user={user} completeCallback={handleComplete} />
        </StepWizard>
    </div>
);
};

export default Sample3;
