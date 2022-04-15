import React, { useState, useEffect } from 'react';
import { createAction } from "../store/asyncMethods/PostMethods";
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from 'react-bootstrap';

const CreatePost = (props) => {
    const { createErrors, redirect } = useSelector((state) => state.PostReducer);
    const dispatch = useDispatch();
    const [currentImg, setcurrentImg] = useState('Choose Logo');

    const fileHandle = (e) => {
        if (e.target.files.length !== 0) { //solve error when u 2nd time choose image
            setcurrentImg(e.target.files[0].name);

            //all data send to backend
            setState({
                ...state,
                [e.target.name]: e.target.files[0],
            })
        }
    }

    const [state, setState] = useState({
        company_name: '',
        company_desc: '',
        contact: '',
        email: '',
        image: '',
        company_state: 'Maharashtra',
        company_city: 'Pune'
    });

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const createData = (e) => {
        e.preventDefault();
        if (state.contact.length != 10) {
            toast.error("contact should be 10character long")
        } else {

            // dispatch(createAction(state));
            const { company_name, company_desc, contact, email, image, company_state, company_city } = state;
            const formData = new FormData();
            formData.append('company_name', company_name);
            formData.append('company_desc', company_desc);
            formData.append('contact', contact);
            formData.append('email', email);
            formData.append('image', image);
            formData.append('company_state', company_state);
            formData.append('company_city', company_city);
            dispatch(createAction(formData));
        }
    }

    useEffect(() => {
        if (redirect) {
            props.history.push('/');
        }
        if (createErrors.length !== 0) {
            createErrors.map(err => toast.error(err.msg));
        }
    }, [createErrors, redirect]) //if createError is updated then run useEffect hook

    return (
        <>
            <div className="create mt-100">
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' }, }} />
                <div className="container">
                    <form onSubmit={createData}>
                        <div className="row ml-minus-15 mr-minus-15">
                            <div className="col-2 p-15"></div>
                            <div className="col-9 p-15">
                                <div className="card">
                                    <h3 className="card_h3">Create a new Data</h3>

                                    <div className="group">
                                        <label htmlFor="title">Company Name</label>
                                        <input type="text" name="company_name" id="company_name"
                                            value={state.company_name} onChange={handleInputs} className="group_control" placeholder="Enter Title" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="company_desc">Company Description</label>
                                        <input type="text" name="company_desc" className="group_control" id="company_name"
                                            value={state.company_desc} onChange={handleInputs} placeholder="Enter description" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="contact">contact Number</label>
                                        <input type="number" name="contact" className="group_control" id="company_name"
                                            value={state.contact} onChange={handleInputs} placeholder="Enter number" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" className="group_control" id="company_name"
                                            value={state.email} onChange={handleInputs} placeholder="Enter email" />
                                    </div>

                                    <div className='group'>
                                        <label htmlFor="states">State</label>
                                        <Form.Select id="states" aria-label="Default select example" style={{ width: '100%', height: '5vh', background: 'lightgrey', border: 'none' }}
                                            value={state.company_state} onChange={handleInputs} >
                                            <option value="1">Maharashtra</option>
                                            <option value="2">Goa</option>
                                            <option value="3">UP</option>
                                        </Form.Select>
                                    </div>

                                    <div className='group'>
                                        <label htmlFor="city">City</label>
                                        <Form.Select id="city" aria-label="Default select example" style={{ width: '100%', height: '5vh', background: 'lightgrey', border: 'none' }}
                                            value={state.company_city} onChange={handleInputs} >
                                            <option value="1">Mumbai</option>
                                            <option value="2">Pune</option>
                                            <option value="3"> Nagpur</option>
                                            <option value="4"> Ponda</option>
                                            <option value="5"> Panji</option>
                                            <option value="6"> Lakhnow</option>
                                            <option value="7"> Patna</option>
                                        </Form.Select>
                                    </div>

                                    <div className="group">
                                        <label htmlFor="image" className="image_label">{currentImg}</label>
                                        <input type="file" name="image" id="image" accept="image/*" onChange={fileHandle} />
                                    </div>


                                    {/* <div className="group">
                                        <label htmlFor="title">Company Description</label>
                                        <input type="text" name="description" className="group_control" id="company_name"
                                            value={state.description} onChange={handleInputs} placeholder="Enter description" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="title">Company Description</label>
                                        <input type="text" name="description" className="group_control" id="company_name"
                                            value={state.description} onChange={handleInputs} placeholder="Enter description" />
                                    </div> */}

                                    <div className="group">
                                        <input type="submit" className="btn btn-default btn-block"
                                            value='Create Post' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreatePost;