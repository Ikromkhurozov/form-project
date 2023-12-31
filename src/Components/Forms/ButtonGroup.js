import React from 'react';
import {BtnWrapper, Button} from "../../assets/styles/CommonStyles";

export default function ButtonGroup ({ onBack, onSave, isLoading }){
  return(
    <BtnWrapper>
      <Button onClick={onBack} bgColor="#999" color="#fff">
        Back
      </Button>
      <Button onClick={onSave} bgColor="green" color="#fff">
        {isLoading ? "Saving...." : "Save"}
      </Button>
    </BtnWrapper>
  )
}


