import React,{useState} from 'react';
import { Input, Button } from 'reactstrap';
import { Container, Col, Row, Form, FormGroup, Label, } from 'reactstrap';
import useForm from './useForm';
import validate from './validate-company'

export function AddCompany({addCompany,setAdding}){
    const { handleChange, handleSubmit,company, errors } = useForm(
        submit,
        validate
      );

    const initialFormState ={id:null, name:''}

    //const [company,setCompany] = useState(initialFormState);
    const [disable,setDisable]= useState(false);
    let error="";
    function submit(){
        console.log(company)
        addCompany(company)
    
      }
   
    return(

        <Form className="form"
                onSubmit={handleSubmit}
        ><h2>Adding company form</h2>
            <Label>Name</Label>
            <Input type="text" name="name" value={company.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}
            <div>{error ? "error" : ""}</div>
            <Button disabled={disable}>Add Company</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={() => setAdding(false)} className="button muted-button">Cancel</Button>
        </Form>
    );
}
export default AddCompany;