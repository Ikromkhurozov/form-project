import React, {lazy, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {
  Button,
  CheckboxInput,
  CustomInput,
  CustomInputWrapper, CustomSelect,
  CustomText,
  FormPageContainer,
  FormWrapper,
  Label
} from "../../assets/styles/CommonStyles";
import {CreatingOptionWrapper, ItemContent, List, ListItem} from "./SelectFormStyles";

const ButtonGroup = lazy(() => import("./ButtonGroup"));

export default function CheckboxForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [savedCheckboxInfo, setSavedCheckboxInfo] = useState([])
  const [checkboxData, setCheckboxData] = useState({
    checkboxLabel: '',
    option: '',
    nameCheckbox: '',
    inputType: "checkbox",
    inputRequired: false,
  });
  const [checkboxOptions, setCheckboxOptions] = useState([])

  const handleCheckboxData = (e) => {
    const { name, value, type, checked } = e.target;

    setCheckboxData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const handleCheckboxOption = (e) => {
    const { value } = e.target;

    setCheckboxData((prevData) => ({
      ...prevData,
      option: value,
    }));
  }

  const onAddCheckboxOption = () => {
    setCheckboxOptions((prevOptions) => [...prevOptions, checkboxData.option]);
    setCheckboxData((prevData) => ({ ...prevData, option: '' }));

    setShowOption(false)
  }

  const onSaveCheckboxInfo = () => {
    setCheckboxData(prevData => ({ ...prevData, option: checkboxOptions }));

    setSavedCheckboxInfo((prevSavedData) => [
      ...prevSavedData,
      { ...checkboxData, options: [...checkboxOptions] },
    ]);

    setCheckboxData({
      checkboxLabel: '',
      option: '',
      nameCheckbox: '',
      inputType: 'checkbox',
      inputRequired: false,
    });
    setCheckboxOptions([]);

    setShowOption(false)
  }

  const handleSave = () => {
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem('checkboxFormDetails', JSON.stringify(savedCheckboxInfo))

      setLoading(false);
      navigate(`/`)
    }, 1100);
  }

  const handleBack = () => {
    navigate(`/`)
  }

  const onRemoveElement = (index) => {
    const updatedData = [...savedCheckboxInfo];
    updatedData.splice(index, 1);
    setSavedCheckboxInfo(updatedData);
  };

  const onCancelOption = () => {
    checkboxData.option = ""
    setShowOption(false)
  }

  return (
    <FormPageContainer>
      <CustomText fontSize="22px" weight="600" color="#555">
        Fill all the Fields to create <mark>{`${checkboxData.inputType}`}</mark>
      </CustomText>

      <FormWrapper maxWidth="700px">
        <CustomInputWrapper>
          <Label>Type of input (Radio, Checkbox)</Label>
          <CustomSelect onChange={handleCheckboxData} name="inputType" value={checkboxData.inputType} marginTop="5px">
            <option value="checkbox">Checkbox input</option>
            <option value="radio">Radio input</option>
          </CustomSelect>
        </CustomInputWrapper>

        <CustomInputWrapper>
          <Label>Label of {`${checkboxData.inputType}`}</Label>
          <CustomInput onChange={handleCheckboxData} name="checkboxLabel" value={checkboxData.checkboxLabel} placeholder="Example: Please select language, that you know" marginTop="8px"></CustomInput>
        </CustomInputWrapper>

        <CustomInputWrapper>
          <Label>Name of {`${checkboxData.inputType}`}</Label>
          <CustomInput onChange={handleCheckboxData} name="nameCheckbox" value={checkboxData.nameCheckbox} placeholder={`Example: Name of ${checkboxData.inputType}`} marginTop="8px"></CustomInput>
        </CustomInputWrapper>

        { !showOption && (
          <CustomInputWrapper>
            <Button onClick={() => setShowOption(true)} color="#fff" bgColor="#5DA21A" width="180px" fontSize="15px" height="45px" marginTop="25px">Add Options to {`${checkboxData.inputType}`}</Button>
          </CustomInputWrapper>
        )}

        {showOption && (
          <CreatingOptionWrapper>
            <CustomInputWrapper>
              <Label>Value of Checkbox</Label>
              <CustomInput onChange={handleCheckboxOption} name="valueCheckbox" value={checkboxData.option} placeholder="Example: russian, english" marginTop="8px"></CustomInput>
            </CustomInputWrapper>
            <Button onClick={onCancelOption} color="#fff" bgColor="#888" width="50px" fontSize="13px" height="40px" marginTop="30px" marginRight="10px">Cancel</Button>
            <Button onClick={onAddCheckboxOption} color="#fff" bgColor="#009000" width="70px" fontSize="13px" height="40px" marginTop="30px">Add</Button>
          </CreatingOptionWrapper>
        )}

        <CustomInputWrapper flexDirection="row" alignItems="center">
          <CheckboxInput onClick={handleCheckboxData} checked={checkboxData.inputRequired} value={checkboxData.inputRequired} marginRight="10px" name="inputRequired"></CheckboxInput>
          <Label>Please check if selecting {`${checkboxData.inputType}`} is Required!</Label>
        </CustomInputWrapper>

        <Button onClick={onSaveCheckboxInfo} color="#fff" bgColor="#009000" width="320px" height="45px" marginTop="5px">Save and Add another Checkbox or Radio</Button>
      </FormWrapper>

      <List>
        {savedCheckboxInfo?.map((data, index) => (
          <ListItem key={index}>
            <ItemContent> checkboxLabel: {data?.checkboxLabel} | nameCheckbox: {data?.nameCheckbox} | type: {data?.inputType} inputRequired: {data?.inputRequired ? "Yes" : "No"} | Options: {data?.options?.map((option, index) => (
              <ItemContent key={index}>
                {option}
              </ItemContent>
              )
            )}</ItemContent>
            <Button onClick={() => onRemoveElement(index)} color="#fff" bgColor="red" width="200px" height="30px" marginLeft="20px" fontSize="14px" >Remove item if it is false</Button>
          </ListItem>
        ))}
      </List>

      <ButtonGroup onBack={handleBack} onSave={handleSave} isLoading={loading}/>

    </FormPageContainer>
  );
}
