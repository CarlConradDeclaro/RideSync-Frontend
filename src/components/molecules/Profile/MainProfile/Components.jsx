import { useState } from "react";
import { Button } from "../../../atoms/Button";
import { TextInput } from "../../../atoms/TextInput";
import { Card } from "../../Card";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { DemoStat, SelectCountries } from "../../../atoms/Select";
import { Title } from "../../../atoms/Title";

const Components = ()=> {
    const [isEdit, setIsEdit] = useState(false)
    const handleEdit = ()=>  setIsEdit(!isEdit)

    //when the cancel button is clicked, the data from the SERVER should be the data INSIDE the input fields
    const handleCancel = ()=> handleEdit()

    // const handleSave = ()=> 
    // handleSave should update the data in the database using the data from the LOCAL use

    /* 

        Need to fetch data from server here 

    */

    // FOR TESTING (Data for LOCAL use only)
    const [firstname, setFirstname] = useState('Clyde'); //values in useState should be from server
    const [lastname, setLastname] = useState('Puntanar');
    const [email, setEmail] = useState('cp@gmail.com');
    const [number, setNumber] = useState('091234567890');
    const [age, setAge] = useState(20);
    const [gender, setGender] = useState("male")
    const [demo, setDemo] = useState('Student')
    const [country, setCountry] = useState('Philippines')

    const handleFirstname = (e)=> setFirstname(e.target.value)
    const handleLastname = (e)=> setLastname(e.target.value)
    const handleEmail = (e)=> setEmail(e.target.value)
    const handleNumber = (e)=> setNumber(e.target.value)
    const handleAge = (e)=> setAge(e.target.value)
    const handleGender = (e)=> setGender(e.target.value)
    const handleDemoStat = (e)=> setDemo(e.target.value)
    const handleCountry = (selectedCountry) => setCountry(selectedCountry)
    // 
    return(
        <Card className="md:w-[750px] p-8">
            <Title value='Profile Picture' variant='profileTitle'/>
            <div className="flex gap-16 py-8">
                {console.log(country)}
                <div className="w-32 h-32 bg-colorBlue rounded-full">
                </div>
                <div className="flex items-center">
                {!isEdit ? (
                    <Button 
                        name="Edit Profile" 
                        variant="contained" 
                        bgColor="colorBlue" 
                        onClick={handleEdit} 
                    />
                    ) : (
                    <div className="flex gap-5">
                        <Button 
                        name="Save" 
                        variant="contained" 
                        onClick={handleEdit}
                        />
                        <Button 
                        name="Cancel" 
                        variant="outlined" 
                        fontColor='gray'
                        onClick={handleCancel}
                        />
                    </div>
                    )
                }    
                </div>
            </div>
            <div className="grid grid-rows-4 grid-cols-2 gap-8">
            <TextInput 
                label="Firstname"
                value={firstname}
                onChange={handleFirstname}
                isReadOnly={!isEdit}
                variant={!isEdit ? 'filled' : 'outlined'}
            />
            <TextInput 
                label="Lastname"
                value={lastname}
                onChange={handleLastname}
                isReadOnly={!isEdit}
                variant={!isEdit ? 'filled' : 'outlined'}
            />
            <TextInput 
                label="Email"
                value={email}
                onChange={handleEmail}
                isReadOnly={!isEdit}
                variant={!isEdit ? 'filled' : 'outlined'}
            />
            <TextInput 
                label="Number"
                value={number}
                onChange={handleNumber}
                type={"tel"} //Used type="tel" to remove increment/decrement button beside it
                isReadOnly={!isEdit}
                variant={!isEdit ? 'filled' : 'outlined'}
            />
            <TextInput 
                type="tel"
                label="Age"
                onChange={handleAge}
                value={age}
                width="90px"
                disabled={!isEdit}
                variant={!isEdit ? 'filled' : 'outlined'}
            />
            <FormControl>
              <SelectCountries handleCountry={handleCountry} isEdit={isEdit}/>
              {/* {!!errors.country && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.country}</FormHelperText>} */}
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={handleGender}
              >
                <FormControlLabel value="female" disabled={!isEdit} control={<Radio />} label="Female" />
                <FormControlLabel value="male" disabled={!isEdit} control={<Radio />} label="Male" />
              </RadioGroup>
              {/* {!!errors.gender && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.gender}</FormHelperText>} */}
            </FormControl>
            <FormControl>
              <DemoStat demographStat={demo} handleDemoStat={handleDemoStat} isEdit={isEdit} />
              {/* {!!errors.demographStat && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.demographStat}</FormHelperText>} */}
            </FormControl>
            </div>
        </Card>
    )
}
export default Components;