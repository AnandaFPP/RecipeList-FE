import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, FormControl, Input, Icon } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";

const LoginComp = () => {
  return (
    <Box m="5">
        <FormControl style={{ padding: 10}}>
        <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='user' />} size={7} m={2}/>} style={styles.formInput} variant='outline' placeholder="Email" width={350} height={60}/>
        </FormControl>
        <FormControl style={{ padding: 10}}>
        <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='lock' />} size={7} m={2}/>} style={styles.formInput} variant='outline' placeholder="Password" width={350} height={60} secureTextEntry={true}/>
        </FormControl>
    </Box>
  )
}

export default LoginComp

const styles = StyleSheet.create({
    formInput: {
        backgroundColor: "#F5F5F5",
        
    }
})