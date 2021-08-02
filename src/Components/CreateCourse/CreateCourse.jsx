import React, {useState} from 'react';
import { Form, Input, Button, Col, Row, notification} from 'antd';
import {createCourse} from '../../api/course';
import { getAcessToken } from '../../api/auth';


const CreateCourse = (props) => {
    const {setIsVisibleModal, setReloadCourses} = props;
    const token = getAcessToken()

    // state to save the form:
    const [inputs, setInputs] = useState({
        name: "",
        content: "",
        modules: "",
        difficulty: ""
    });

    // function to save values of form:
    const changeForm = e => {
        // value of inputs:
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        })
        
    }

    // function to create a new course
    const createNewCourse = async e => {
        const nameVal = inputs.name;
        const contentVal = inputs.content;
        const modulesVal = inputs.modules;
        const difficultyVal = inputs.difficulty;

        // validation:
        if(!nameVal || !contentVal || !modulesVal || !difficultyVal || isNaN(modulesVal)) {
            notification['error']({
                message: 'All fields are required'
            })
        } else {
            // connection to server to create a new course
            const result = await createCourse(token, inputs);
            if(result.ok === false){
                notification['error']({
                    message: result.message
                })
                setIsVisibleModal(false);
                setReloadCourses(true);
                resetForm();
            } else {
                notification['success']({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
                resetForm();
            }
        }
    }

    // function to reset the form
    const resetForm = () => {
        setInputs({
            name: "",
            content: "",
            modules: "",
            difficulty: ""
        });
    }

    return ( 
        <Form className="form-edit" onChange={changeForm} onFinish={createNewCourse}>
            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Name"
                            name='name'
                            value={inputs.name}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Content"
                            name='content'
                            value={inputs.content}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Modules"
                            type="number"
                            name='modules'
                            value={inputs.modules}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Difficulty"
                            name='difficulty'
                            value={inputs.difficulty}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Create Course
                </Button>
            </Form.Item>
        </Form>
     );
}
 
export default CreateCourse;