import { StyleSheet ,Text, View } from 'react-native';

import Input from './Input';
import { GlobalStyles } from '../../constants/Styles';
import { useState } from 'react';
import Button  from '../UI/Button';
import { getFormatedDate } from '../../util/Date';

function ExpenseForm({onCancel, onSubmit ,isEditing , defaultValue}) {
  const [inputs, setInputs]= useState({
    amount:{ value : defaultValue? defaultValue.amount.toString() : '' , isValid : true},
    date:{ value : defaultValue ? getFormatedDate(defaultValue.date) : '' , isValid : true},
    description:{value : defaultValue ? defaultValue.description : '' , isValid : true}
  })
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs)=>{
      return{
        ...curInputs,
        [inputIdentifier]:{ value : enteredValue, isValid: true },
      }
    })
  }
  function submitHandler (){
    const expenseData ={
      amount : +inputs.amount.value,
      date: new Date(inputs.date.value),
      description:inputs.description.value
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0 
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0
      

    if ( !amountIsValid || !dateIsValid || !descriptionIsValid){
      // Alert.alert('Invalid input', 'Please give the valid input')
      setInputs((curInputs)=> {
        return{
          amount : {value : curInputs.amount.value , isValid : amountIsValid},
          date : {value : curInputs.date.value , isValid : dateIsValid},
          description : {value : curInputs.description.value , isValid : descriptionIsValid},
        }
      })
      return 
    }
    onSubmit(expenseData)
  }
  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid


  return (
    <View style={styles.form}>
     <Text style={styles.title}>Your Expenses</Text>
     <View style = { styles.inputRow}>
     <Input
        style={styles.rowInput}
        label="Amount"
        invalid ={ !inputs.amount.isValid}
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangedHandler.bind(this,'amount'),
          value: inputs.amount.value
        }}
      />
      <Input
        style={styles.rowInput}
        label="Date"
        invalid ={ !inputs.date.isValid}
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this,'date'),
          value: inputs.date.value
        }}
      />
     </View>
      <Input
        label="Description"
        invalid ={ !inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this,'description'),
          value: inputs.description.value
        }}
      />
      { formIsInvalid && <Text style={ styles.errorText}>Invalid input values - please check the entered data </Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow :{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  rowInput:{
    flex:1
  },
  form :{
    marginTop : 20
  },
  title:{
    fontWeight:'bold',
    fontSize:24,
    textAlign:'center',
    color:GlobalStyles.colors.primary100,
    marginVertical:15
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    minWidth:120,
    marginHorizontal: 8
  },
  errorText :{
    textAlign:'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
})