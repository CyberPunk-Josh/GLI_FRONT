import React, {useState,useEffect} from 'react';
import {Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { updateCourse } from '../../api/course';
import { getAcessToken } from '../../api/auth';

import "./EditCourseForm.scss";

export default function EditUserForm(props){
    const {courses, setIsVisibleModal, setReloadCourses} = props;
    const [courseData, setCourseData] = useState({ });

    useEffect(() => {
        setCourseData({ 
            name: courses.name,
            content: courses.content,
            modules: courses.modules,
            difficulty: courses.difficulty,
            active: courses.active
        })
    }, [courses])

    // function to update a user
    const updateCourseData = e => {
        const token = getAcessToken();
        let courseUpdate = courseData;

        if(!courseUpdate.name || !courseUpdate.modules || !courseUpdate.content){
            notification['error']({
                message: 'All fields are required'
            });
            return;
        } else {
            updateCourse(token, courseUpdate, courses._id).then(result => {
                notification['success']({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
            });
        };
    };

    return(
        <div className="edit-user-form">
            <EditForm courseData={courseData} setCourseData={setCourseData}  updateCourseData={updateCourseData}/>
        </div>
    )
}


function EditForm(props) {
    const {courseData, setCourseData, updateCourseData} = props;
    const {Option} = Select;

    return (
        <Form className="form-edit" onFinish={updateCourseData}>
            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix='Name: '
                            placeholder="Name"
                            value={courseData.name}
                            onChange={e => setCourseData({ ...courseData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix='Content: '
                            placeholder="Content"
                            value={courseData.content}
                            onChange={e => setCourseData({ ...courseData, content: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutters={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix='Modules: '
                            placeholder="Modules"
                            value={courseData.modules}
                            onChange={e => setCourseData({ ...courseData, modules: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Select a Status"
                            onChange={e => setCourseData({ ...courseData, active: e })}
                            value={courseData.active}
                        >
                            <Option value="Activo">Activo</Option>
                            <Option value="Inactivo">Inactivo</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutters={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix='Difficulty: '
                            placeholder="Difficulty"
                            value={courseData.difficulty}
                            onChange={e => setCourseData({ ...courseData, difficulty: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Update Course
                </Button>
            </Form.Item>
        </Form>
    )
}