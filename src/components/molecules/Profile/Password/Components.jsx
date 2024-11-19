import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { Title } from "../../../atoms/Title"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { Card } from "../../Card"
import { Button } from "../../../atoms/Button"

const Components = ()=> {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [newPassword, setNewPassword] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    

    const handleClickShowPassword = ()=>  setShowPassword(!showPassword)
    const handlePassword = (e)=> setPassword(e.target.value)

    const handleClickShowNewPassword = ()=> setShowNewPassword(!showNewPassword)
    const handleNewPassword = (e)=> setNewPassword(e.target.value)

    const handleClickShowConfirmPassword = ()=> setShowConfirmPassword(!showConfirmPassword)
    const handleConfirmPassword = (e)=> setConfirmPassword(e.target.value)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return(
        <Card className="md:w-[750px] p-8">
            <Title value="Change Password" variant="profileTitle" />
            <div className="grid gap-4 p-4">
                <FormControl size='small' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Current Password*</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={handlePassword}
                    />
                {/* {!!errors.password && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.password}</FormHelperText>} */}
                </FormControl>
                <FormControl size='small' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">New Password*</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showNewPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={showNewPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        value={newPassword}
                        onChange={handleNewPassword}
                    />
                {/* {!!errors.confirmPassword && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.confirmPassword}</FormHelperText>} */}
                </FormControl>
                <FormControl size='small' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password*</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                {/* {!!errors.confirmPassword && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.confirmPassword}</FormHelperText>} */}
                </FormControl>
            </div>
            <Button name="Change my password" variant="contained"/>
        </Card>
    )
}

export default Components